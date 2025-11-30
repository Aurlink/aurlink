use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, TokenAccount, Token, Transfer};

declare_id!("YourProgramIDHere1111111111111111111111111111111");

#[program]
pub mod aurlink_sale {
    use super::*;

    pub fn initialize_sale(
        ctx: Context<InitializeSale>,
        tiers: Vec<Tier>,
    ) -> Result<()> {
        let sale = &mut ctx.accounts.sale_state;
        sale.owner = *ctx.accounts.owner.key;
        sale.tiers = tiers;
        sale.current_tier = 0;
        sale.total_sold = 0;
        Ok(())
    }

    pub fn buy_tokens(
        ctx: Context<BuyTokens>,
        amount: u64, // in USDC smallest units
    ) -> Result<()> {
        let sale = &mut ctx.accounts.sale_state;
        let buyer_info = &mut ctx.accounts.buyer_info;

        require!(sale.current_tier < sale.tiers.len() as u8, SaleError::SaleInactive);

        let tier = &mut sale.tiers[sale.current_tier as usize];

        // Enforce per-wallet tier limit
        let new_contribution = buyer_info.contributions[sale.current_tier as usize] + amount;
        require!(new_contribution <= tier.max_per_wallet, SaleError::ExceededWalletLimit);

        // Calculate token amount
        let tokens_to_buy = amount.checked_mul(10u64.pow(18)).unwrap()
            .checked_div(tier.price).unwrap();

        // Ensure tier supply not exceeded
        let tokens_available = tier.supply.checked_sub(tier.sold).unwrap();
        require!(tokens_to_buy <= tokens_available, SaleError::TierSoldOut);

        // Transfer USDC/USDT from buyer to treasury
        token::transfer(
            ctx.accounts.into_transfer_to_treasury_context(),
            amount,
        )?;

        // Update states
        tier.sold = tier.sold.checked_add(tokens_to_buy).unwrap();
        buyer_info.contributions[sale.current_tier as usize] = new_contribution;
        buyer_info.tokens_bought = buyer_info.tokens_bought.checked_add(tokens_to_buy).unwrap();
        sale.total_sold = sale.total_sold.checked_add(tokens_to_buy).unwrap();

        // Advance tier if sold out
        if tier.sold >= tier.supply {
            sale.current_tier += 1;
        }

        // Transfer AUR tokens to buyer
        token::transfer(
            ctx.accounts.into_transfer_to_buyer_context(),
            tokens_to_buy,
        )?;

        Ok(())
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Tier {
    pub supply: u64,            // total tokens in this tier
    pub sold: u64,              // tokens sold
    pub price: u64,             // price in USDC smallest units per token
    pub max_per_wallet: u64,    // USD max per wallet in this tier
}

#[account]
pub struct SaleState {
    pub owner: Pubkey,
    pub tiers: Vec<Tier>,
    pub current_tier: u8,
    pub total_sold: u64,
}

#[account]
pub struct BuyerInfo {
    pub contributions: Vec<u64>,  // contribution per tier
    pub tokens_bought: u64,
}

#[error_code]
pub enum SaleError {
    #[msg("Sale is not active")]
    SaleInactive,
    #[msg("Wallet contribution exceeded tier limit")]
    ExceededWalletLimit,
    #[msg("This tier is sold out")]
    TierSoldOut,
}

#[derive(Accounts)]
pub struct InitializeSale<'info> {
    #[account(init, payer = owner, space = 8 + 1024)]
    pub sale_state: Account<'info, SaleState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct BuyTokens<'info> {
    #[account(mut)]
    pub sale_state: Account<'info, SaleState>,
    #[account(mut)]
    pub buyer_info: Account<'info, BuyerInfo>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(mut)]
    pub treasury: Account<'info, TokenAccount>,
    #[account(mut)]
    pub token_mint: Account<'info, Mint>,
    #[account(mut)]
    pub buyer_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

impl<'info> BuyTokens<'info> {
    fn into_transfer_to_treasury_context(&self) -> CpiContext<'_, '_, '_, 'info, token::Transfer<'info>> {
        CpiContext::new(
            self.token_program.to_account_info(),
            token::Transfer {
                from: self.buyer.to_account_info(), 
                to: self.treasury.to_account_info(),
                authority: self.buyer.to_account_info(),
            },
        )
    }

    fn into_transfer_to_buyer_context(&self) -> CpiContext<'_, '_, '_, 'info, token::Transfer<'info>> {
        CpiContext::new(
            self.token_program.to_account_info(),
            token::Transfer {
                from: self.token_mint.to_account_info(),
                to: self.buyer_token_account.to_account_info(),
                authority: self.sale_state.to_account_info(),
            },
        )
    }
}
