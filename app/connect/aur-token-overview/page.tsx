// app/connect/aur-token-overview/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, Users, Lock, Zap, Globe } from 'lucide-react';

export default function AURTokenOverviewPage() {
  const tokenomics = [
    { category: 'Ecosystem & Grants', percentage: 25, color: 'from-cyan-500 to-blue-500' },
    { category: 'Team & Advisors', percentage: 15, color: 'from-purple-500 to-pink-500' },
    { category: 'Public Sale', percentage: 10, color: 'from-green-500 to-emerald-500' },
    { category: 'Community Incentives', percentage: 20, color: 'from-orange-500 to-red-500' },
    { category: 'Validators & Staking', percentage: 15, color: 'from-yellow-500 to-amber-500' },
    { category: 'Strategic Partners', percentage: 10, color: 'from-cyan-500 to-blue-500' },
    { category: 'Foundation Reserve', percentage: 5, color: 'from-indigo-500 to-purple-500' },
  ];

  const utilities = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Protocol Governance',
      description: 'Vote on network upgrades, fee parameters, and ecosystem development'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Network Security',
      description: 'Stake $AUR to secure the network and earn staking rewards'
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: 'Transaction Fees',
      description: 'Pay for cross-chain transactions and premium services'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Ecosystem Access',
      description: 'Access premium features and enterprise-grade services'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-purple-500/20 border border-purple-400/30 rounded-full px-6 py-3 mb-8">
              <Coins className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-semibold">$AUR Token</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Heart</span> of Aurlink
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              $AUR powers the entire Aurlink ecosystem - from governance and staking to cross-chain transactions 
              and premium service access.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center"
            >
              <Coins className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white">1 Billion</div>
              <div className="text-gray-400">Total Supply</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center"
            >
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white">18</div>
              <div className="text-gray-400">Decimal Places</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center"
            >
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white">Multi-Chain</div>
              <div className="text-gray-400">Native Deployment</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center"
            >
              <Lock className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white">ERC-20 +</div>
              <div className="text-gray-400">Token Standard</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-8">Tokenomics</h2>
              <div className="space-y-4">
                {tokenomics.map((item, index) => (
                  <div key={item.category} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-gray-300 font-medium">{item.category}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-bold w-12 text-right">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              {/* Tokenomics Chart Placeholder */}
              <div className="w-80 h-80 rounded-full bg-gradient-conic from-cyan-500 via-purple-500 to-pink-500 p-4">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">$AUR</div>
                    <div className="text-gray-400">Distribution</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Utilities Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Token <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Utilities</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {utilities.map((utility, index) => (
              <motion.div
                key={utility.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {utility.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{utility.title}</h3>
                <p className="text-gray-300 leading-relaxed">{utility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Token Launch Roadmap</h2>
          </motion.div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-purple-500/30 h-full"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {[
                { phase: 'Q4 2025', title: 'Private Sale', description: 'Strategic round with institutional investors' },
                { phase: 'Q4 2025', title: 'Public Sale', description: 'Community offering and IDO launch' },
                { phase: 'Q3 2026', title: 'Exchange Listings', description: 'Top-tier CEX and DEX listings' },
                { phase: 'Q4 2026', title: 'Staking Launch', description: 'Staking rewards program activation' },
              ].map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="w-1/2 pr-8 pl-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <div className="text-purple-400 font-semibold mb-2">{item.phase}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-4 border-slate-900 z-10"></div>
                  <div className="w-1/2 pl-8 pr-8"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}