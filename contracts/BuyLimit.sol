// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract AURLINKTokenSale {
    IERC20 public aurlinkToken;
    address public owner;
    address public treasury;

    // Token sale parameters
    uint256 public constant TOTAL_TOKENS = 100_000_000 * 10**18; // 100M AUR

    struct SaleTier {
        uint256 tierSupply;
        uint256 tokensSold;
        uint256 priceUSD; // price per token in USD (6 decimals for USDC/USDT)
        bool isActive;
    }

    SaleTier[4] public tiers;

    // Wallet tier limits in USD (6 decimals, to match USDC/USDT)
    uint256[4] public tierWalletLimits = [
        50_000 * 10**6,  // Tier 1: $50k
        75_000 * 10**6,  // Tier 2: $75k
        100_000 * 10**6, // Tier 3: $100k
        type(uint256).max // Tier 4: no strict limit
    ];

    mapping(address => uint256) public usdContributed; // USD equivalent per wallet
    mapping(address => uint256) public tokensBought;

    uint256 public totalSold;
    uint256 public totalRaisedUSD;
    bool public saleActive;

    // Events
    event TokensPurchased(address buyer, uint256 tier, uint256 amount, uint256 usdSpent);
    event TierAdvanced(uint256 newTier);

    constructor(address _tokenAddress, address _treasury) {
        aurlinkToken = IERC20(_tokenAddress);
        owner = msg.sender;
        treasury = _treasury;

        // Initialize tiers (USD prices, 6 decimals)
        tiers[0] = SaleTier(20_000_000 * 10**18, 0, 25_000, true);   // $0.025
        tiers[1] = SaleTier(30_000_000 * 10**18, 0, 30_000, false);  // $0.030
        tiers[2] = SaleTier(20_000_000 * 10**18, 0, 35_000, false);  // $0.035
        tiers[3] = SaleTier(30_000_000 * 10**18, 0, 40_000, false);  // $0.040

        saleActive = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // ----------- Multi-Currency Handling -----------
    // For simplicity, we accept USD stablecoins directly
    // BNB, SOL, MATIC should be converted off-chain to USD equivalent
    // Here we just accept USD amount in "usdAmount" parameter for on-chain enforcement

    function buyTokensUSD(uint256 usdAmount, address buyer) external onlyOwner {
        require(saleActive, "Sale not active");
        require(usdAmount > 0, "Zero amount");

        uint256 currentTier = getCurrentTier();
        require(currentTier < tiers.length, "All tiers sold out");

        uint256 tierLimit = tierWalletLimits[currentTier];
        require(usdContributed[buyer] + usdAmount <= tierLimit, "Exceeds wallet limit for tier");

        uint256 tokensToBuy = (usdAmount * 10**18) / tiers[currentTier].priceUSD; // token amount

        if (tokensToBuy > tiers[currentTier].tierSupply - tiers[currentTier].tokensSold) {
            tokensToBuy = tiers[currentTier].tierSupply - tiers[currentTier].tokensSold;
            usdAmount = (tokensToBuy * tiers[currentTier].priceUSD) / 10**18; // adjust USD
        }

        // Update tier
        tiers[currentTier].tokensSold += tokensToBuy;
        if (tiers[currentTier].tokensSold >= tiers[currentTier].tierSupply) {
            tiers[currentTier].isActive = false;
            if (currentTier < tiers.length - 1) {
                tiers[currentTier + 1].isActive = true;
                emit TierAdvanced(currentTier + 1);
            }
        }

        // Update totals
        totalSold += tokensToBuy;
        totalRaisedUSD += usdAmount;

        // Update user stats
        usdContributed[buyer] += usdAmount;
        tokensBought[buyer] += tokensToBuy;

        // Transfer tokens to buyer
        aurlinkToken.transfer(buyer, tokensToBuy);

        emit TokensPurchased(buyer, currentTier, tokensToBuy, usdAmount);
    }

    function getCurrentTier() public view returns (uint256) {
        for (uint256 i = 0; i < tiers.length; i++) {
            if (tiers[i].isActive) return i;
        }
        return tiers.length; // all tiers sold out
    }

    // Admin functions
    function setSaleActive(bool active) external onlyOwner {
        saleActive = active;
    }

    function withdrawTokens(uint256 amount) external onlyOwner {
        aurlinkToken.transfer(owner, amount);
    }

    function withdrawBNB() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
