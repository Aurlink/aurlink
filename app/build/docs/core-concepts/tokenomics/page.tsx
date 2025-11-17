// app/docs/core-concepts/tokenomics/page.tsx - COMPLETE
'use client'
import { motion } from 'framer-motion'
import { CodeBlock } from '@/components/docs/CodeBlock'

const content = {
  title: '$AUR Token Economics',
  description: 'Complete guide to $AUR token utility, distribution, emission schedule, and economic model powering the Aurlink ecosystem.',
  sections: [
    {
      title: 'Token Overview',
      content: `$AUR is the native utility token of the Aurlink ecosystem, serving as the foundation for network security, governance, and economic incentives. With a fixed total supply of 1 billion tokens, $AUR enables staking, fee payment, governance, and access to AI services.`,
      type: 'text'
    },
    {
      title: 'Token Utility',
      content: `$AUR serves multiple critical functions within the ecosystem:`,
      type: 'code',
      code: `// $AUR Token Utility Functions
const tokenUtility = {
  // 1. Network Security & Staking
  staking: {
    validatorBonding: true,    // Secure the network
    nominatorDelegation: true, // Participate in consensus
    minimumStake: 1000,        // 1,000 AUR minimum
    slashingConditions: true   // Penalize malicious behavior
  },
  
  // 2. Transaction Fees
  fees: {
    gas: true,                 // Pay for transaction execution
    crossChain: true,          // Cross-chain bridge fees
    aiServices: true,          // NOL and AI precompile usage
    storage: true              // Data storage costs
  },
  
  // 3. Governance
  governance: {
    voting: true,              // Protocol upgrade proposals
    parameterChanges: true,    // Network parameter adjustments
    treasuryManagement: true,  // DAO treasury spending
    validatorElections: true   // Validator set changes
  },
  
  // 4. Ecosystem Incentives
  incentives: {
    liquidityMining: true,     // DEX liquidity provision
    developerGrants: true,     // Ecosystem development
    userRewards: true,         // User acquisition and retention
    aiServiceAccess: true      // Premium AI features
  },
  
  // 5. Cross-Chain Utility
  crossChain: {
    bridgeAsset: true,         // Primary bridge currency
    liquidityBacking: true,    // Back cross-chain liquidity
    feeDiscounts: true         // Discounts for $AUR holders
  }
};`,
      language: 'javascript'
    },
    {
      title: 'Token Distribution',
      content: `The total fixed supply of 1 billion $AUR tokens is allocated as follows:`,
      type: 'code',
      code: `// $AUR Token Distribution (1,000,000,000 total)
const tokenDistribution = {
  // Initial Distribution
  preSale: {
    percentage: 10,      // 10%
    tokens: 100000000,   // 100,000,000 AUR
    lockup: 12,          // 12-month lockup
    vesting: 'linear',   // Linear release
    purpose: 'Early investor allocation'
  },
  
  ecosystemGrants: {
    percentage: 25,      // 25%
    tokens: 250000000,   // 250,000,000 AUR
    lockup: 6,           // 6-month initial lockup
    vesting: '48 months', // 4-year vesting
    purpose: 'dApp development, partnerships, grants'
  },
  
  communityIncentives: {
    percentage: 20,      // 20%
    tokens: 200000000,   // 200,000,000 AUR
    lockup: 3,           // 3-month lockup
    vesting: '36 months', // 3-year vesting
    purpose: 'Airdrops, liquidity mining, user rewards'
  },
  
  validatorsStaking: {
    percentage: 15,      // 15%
    tokens: 150000000,   // 150,000,000 AUR
    lockup: 0,           // No lockup
    vesting: 'emission', // Released via staking rewards
    purpose: 'Validator rewards and staking incentives'
  },
  
  teamAdvisors: {
    percentage: 15,      // 15%
    tokens: 150000000,   // 150,000,000 AUR
    lockup: 12,          // 12-month cliff
    vesting: '36 months', // 3-year vesting after cliff
    purpose: 'Team compensation and advisor rewards'
  },
  
  strategicPartners: {
    percentage: 10,      // 10%
    tokens: 100000000,   // 100,000,000 AUR
    lockup: 6,           // 6-month lockup
    vesting: '24 months', // 2-year vesting
    purpose: 'Strategic partnerships and ecosystem development'
  },
  
  reserveTreasury: {
    percentage: 5,       // 5%
    tokens: 50000000,    // 50,000,000 AUR
    lockup: 0,           // No lockup
    vesting: 'dao',      // DAO-controlled release
    purpose: 'Network security, insurance, strategic reserves'
  }
};`,
      language: 'javascript'
    },
    {
      title: 'Emission Schedule',
      content: `$AUR tokens are released according to a predictable emission schedule:`,
      type: 'code',
      code: `// $AUR Emission Schedule
const emissionSchedule = {
  year0: {
    tokens: 200000000,   // 200M - Genesis + pre-sale
    purpose: 'Network launch and initial distribution',
    inflation: 'N/A'     // Genesis year
  },
  
  year1: {
    tokens: 100000000,   // 100M
    purpose: 'Validator rewards and ecosystem growth',
    inflation: 12.5,     // 12.5% annual inflation
    breakdown: {
      stakingRewards: 60000000,    // 60M
      ecosystemGrants: 25000000,   // 25M
      communityIncentives: 15000000 // 15M
    }
  },
  
  year2: {
    tokens: 80000000,    // 80M
    purpose: 'Continued growth and adoption',
    inflation: 8.9,      // 8.9% annual inflation
    breakdown: {
      stakingRewards: 48000000,    // 48M
      ecosystemGrants: 20000000,   // 20M
      communityIncentives: 12000000 // 12M
    }
  },
  
  year3: {
    tokens: 60000000,    // 60M
    purpose: 'Network stability and maturity',
    inflation: 6.4,      // 6.4% annual inflation
    breakdown: {
      stakingRewards: 36000000,    // 36M
      ecosystemGrants: 15000000,   // 15M
      communityIncentives: 9000000  // 9M
    }
  },
  
  year4: {
    tokens: 50000000,    // 50M
    purpose: 'Sustainable growth phase',
    inflation: 5.0,      // 5.0% annual inflation
    breakdown: {
      stakingRewards: 30000000,    // 30M
      ecosystemGrants: 12500000,   // 12.5M
      communityIncentives: 7500000  // 7.5M
    }
  },
  
  year5Plus: {
    tokens: 40000000,    // 40M annually (adjustable by DAO)
    purpose: 'Long-term sustainability',
    inflation: 3.8,      // 3.8% annual inflation (decreasing)
    daoAdjustable: true  // DAO can adjust based on network needs
  }
};`,
      language: 'javascript'
    },
    {
      title: 'Staking Mechanics',
      content: `Participate in network security through staking:`,
      type: 'code',
      code: `// Staking Implementation Example
import { AurlinkStaking } from '@aurlink/staking-sdk';

class StakingManager {
  constructor() {
    this.staking = new AurlinkStaking({
      network: 'mainnet',
      rpcUrl: 'https://rpc.aurlink.io'
    });
  }
  
  async stakeTokens(amount, validatorAddress) {
    // Check minimum stake requirement
    const minStake = await this.staking.getMinimumStake();
    require(amount >= minStake, 'Amount below minimum stake');
    
    // Stake tokens with validator
    const stakeResult = await this.staking.delegate({
      validator: validatorAddress,
      amount: amount,
      lockPeriod: 0 // 0 = no fixed lock period
    });
    
    return {
      transactionHash: stakeResult.txHash,
      shares: stakeResult.shares,
      estimatedAPY: stakeResult.estimatedAPY
    };
  }
  
  async getStakingRewards(address) {
    const rewards = await this.staking.getPendingRewards(address);
    
    return {
      pendingRewards: rewards.amount,
      claimable: rewards.claimable,
      nextRewardDistribution: rewards.nextDistribution
    };
  }
  
  async claimRewards() {
    const claimTx = await this.staking.claimRewards();
    return claimTx.txHash;
  }
  
  async unstakeTokens(amount) {
    // Initiate unstaking (21-day unbonding period)
    const unstakeTx = await this.staking.undelegate(amount);
    
    return {
      transactionHash: unstakeTx.txHash,
      unbondingComplete: unstakeTx.unbondingEndTime,
      estimatedCompletion: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)
    };
  }
}

// Usage Example
const staking = new StakingManager();

// Stake 5,000 AUR with a validator
const result = await staking.stakeTokens(
  '5000000000000000000000', // 5,000 AUR (18 decimals)
  '0xValidatorAddress'
);

console.log('Staking successful:', result.transactionHash);
console.log('Estimated APY:', result.estimatedAPY + '%');`,
      language: 'javascript'
    },
    {
      title: 'Governance System',
      content: `Participate in Aurlink governance:`,
      type: 'code',
      code: `// Governance Implementation
import { AurlinkGovernance } from '@aurlink/governance-sdk';

class GovernanceManager {
  constructor() {
    this.gov = new AurlinkGovernance({
      network: 'mainnet',
      apiKey: process.env.AURLINK_API_KEY
    });
  }
  
  async createProposal(title, description, actions) {
    const proposal = await this.gov.createProposal({
      title: title,
      description: description,
      actions: actions, // Array of governance actions
      deposit: '10000000000000000000' // 10 AUR deposit
    });
    
    return {
      proposalId: proposal.id,
      votingStart: proposal.votingStart,
      votingEnd: proposal.votingEnd
    };
  }
  
  async vote(proposalId, voteOption, votingPower) {
    const vote = await this.gov.vote({
      proposalId: proposalId,
      vote: voteOption, // 'yes', 'no', 'abstain', 'veto'
      votingPower: votingPower // Based on staked AUR
    });
    
    return vote.txHash;
  }
  
  async getProposalStatus(proposalId) {
    const status = await this.gov.getProposalStatus(proposalId);
    
    return {
      status: status.status, // 'pending', 'voting', 'passed', 'rejected'
      turnout: status.turnout, // Voting participation percentage
      results: status.results, // Vote breakdown
      executionETA: status.executionETA
    };
  }
}

// Governance Actions Examples
const governanceActions = [
  // 1. Parameter Change
  {
    type: 'parameter_change',
    module: 'staking',
    param: 'minimum_stake',
    value: '2000000000000000000000' // Increase to 2,000 AUR
  },
  
  // 2. Treasury Spending
  {
    type: 'treasury_spend',
    recipient: '0xGrantRecipient',
    amount: '50000000000000000000000', // 50,000 AUR
    description: 'Developer grant for ecosystem project'
  },
  
  // 3. Protocol Upgrade
  {
    type: 'software_upgrade',
    name: 'v1.4.0',
    height: 2500000,
    info: 'https://github.com/aurlink/upgrades/v1.4.0.md'
  }
];`,
      language: 'javascript'
    },
    {
      title: 'Economic Security',
      content: `The $AUR economic model ensures network security:`,
      type: 'text'
    },
    {
      title: 'Security Mechanisms',
      content: [
        '**Staking Ratio**: Target 40-60% of total supply staked for optimal security',
        '**Inflation Control**: Dynamic inflation based on staking participation',
        '**Slashing Conditions**: 5% slash for double-signing, 0.1% per hour for downtime',
        '**Insurance Fund**: 5% of treasury reserved for slashing insurance',
        '**Validator Rotation**: AI-optimized validator set rotation every 24 hours',
        '**Economic Finality**: Transactions achieve economic finality based on staked value'
      ],
      type: 'list'
    },
    {
      title: 'Integration Examples',
      content: `Integrate $AUR into your applications:`,
      type: 'code',
      code: `// DEX Integration Example
const { Aurlink, AMM } = require('@aurlink/sdk');

class DEXIntegration {
  constructor() {
    this.aurlink = new Aurlink({ network: 'mainnet' });
    this.amm = new AMM('aurlink-amm');
  }
  
  async addLiquidity(tokenA, tokenB, amountA, amountB) {
    // Add liquidity to AMM pool
    const lpTokens = await this.amm.addLiquidity({
      tokenA: tokenA,
      tokenB: tokenB,
      amountADesired: amountA,
      amountBDesired: amountB,
      to: '0xYourAddress',
      deadline: Math.floor(Date.now() / 1000) + 3600 // 1 hour
    });
    
    // Earn $AUR liquidity mining rewards
    const rewards = await this.amm.stakeLPTokens(lpTokens);
    
    return {
      lpTokens: lpTokens,
      dailyRewards: rewards.dailyAUR,
      apy: rewards.estimatedAPY
    };
  }
  
  async swapTokens(tokenIn, tokenOut, amountIn) {
    // Swap tokens with $AUR fee discount
    const swap = await this.amm.swapExactTokensForTokens({
      amountIn: amountIn,
      amountOutMin: 0, // Use AMM calculation
      path: [tokenIn, tokenOut],
      to: '0xYourAddress',
      deadline: Math.floor(Date.now() / 1000) + 1800 // 30 minutes
    });
    
    return {
      amountOut: swap.amountOut,
      priceImpact: swap.priceImpact,
      fee: swap.fee,
      aurFeeDiscount: swap.aurFeeDiscount // Discount for $AUR holders
    };
  }
}

// AI Service Payment Example
class AIServicePayment {
  constructor() {
    this.aurlink = new Aurlink({ network: 'mainnet' });
  }
  
  async useAIService(service, input, options = {}) {
    // Estimate service cost
    const costEstimate = await this.aurlink.ai.estimateCost({
      service: service,
      input: input,
      options: options
    });
    
    // Pay with $AUR
    const result = await this.aurlink.ai.executeService({
      service: service,
      input: input,
      payment: {
        token: 'AUR',
        amount: costEstimate.cost,
        maxCost: costEstimate.maxCost // Prevent overcharging
      },
      options: options
    });
    
    return {
      result: result.output,
      cost: result.actualCost,
      transaction: result.txHash
    };
  }
}

// Usage Examples
const dex = new DEXIntegration();

// Add USDC-AUR liquidity
const liquidity = await dex.addLiquidity(
  '0xUSDC_Address',
  '0xAUR_Address',
  '1000000000', // 1000 USDC
  '500000000000000000000' // 500 AUR
);

console.log('LP tokens received:', liquidity.lpTokens);
console.log('Daily $AUR rewards:', liquidity.dailyRewards);`,
      language: 'javascript'
    }
  ]
}

export default function TokenomicsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">{content.title}</h1>
          <p className="text-xl text-gray-300">{content.description}</p>
        </motion.div>

        <div className="prose prose-invert prose-cyan max-w-none">
          {content.sections.map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">{section.title}</h2>
              
              {section.type === 'text' && (
                <p className="text-gray-300 leading-relaxed">{section.content as string}</p>
              )}
              
              {section.type === 'list' && (
                <ul className="text-gray-300 space-y-3">
                  {(section.content as string[]).map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              )}
              
              {section.type === 'code' && section.code && (
                <CodeBlock code={section.code} language={section.language || 'javascript'} />
              )}
            </motion.section>
          ))}
        </div>

        {/* Economic Dashboard CTA */}
        <div className="mt-12 p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Live Economic Dashboard</h3>
          <p className="text-gray-300 mb-4">
            Monitor real-time $AUR economics, staking metrics, and network statistics.
          </p>
          <div className="flex gap-4">
            <a
              href="https://dashboard.aurlink.io/tokenomics"
              className="flex-1 text-center py-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              View Live Dashboard →
            </a>
            <a
              href="/docs/tutorials/staking-guide"
              className="flex-1 text-center py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              Staking Tutorial
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}