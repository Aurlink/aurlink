// app/learn/use-cases/defi/page.tsx
'use client';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, ArrowRight, Lock, Users, PieChart, Rocket } from 'lucide-react';

export default function DeFiPage() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI-Optimized Trading',
      description: 'Machine learning algorithms predict market movements and optimize trading strategies in real-time',
      metrics: ['47% higher returns', '0.01s execution speed', '95% accuracy rate']
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Cross-Chain Security',
      description: 'Military-grade security protocols with AI-powered threat detection across all connected chains',
      metrics: ['$500M insurance fund', '0 security breaches', '24/7 monitoring']
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Yield Optimization',
      description: 'Automated yield farming across multiple protocols with risk-adjusted portfolio management',
      metrics: ['15-25% APY', 'Multi-chain strategies', 'Auto-compounding']
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Institutional Grade',
      description: 'Compliant DeFi solutions with KYC/AML integration and institutional security standards',
      metrics: ['Regulatory compliant', 'Institutional custody', 'Audit trails']
    },
  ];

  const protocols = [
    {
      name: 'Aurlink Swap',
      volume: '$2.4B',
      fee: '0.05%',
      chains: ['Ethereum', 'BSC', 'Polygon', 'Solana'],
      description: 'Cross-chain DEX with best-price routing'
    },
    {
      name: 'Aurlink Lend',
      volume: '$1.8B',
      fee: '0.02%',
      chains: ['Ethereum', 'Arbitrum', 'Optimism'],
      description: 'Multi-chain lending with isolated pools'
    },
    {
      name: 'Aurlink Yield',
      volume: '$3.1B',
      fee: '0.1%',
      chains: ['All Supported'],
      description: 'Automated yield aggregation across chains'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-blue-500/20 border border-blue-400/30 rounded-full px-6 py-3 mb-8">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-semibold">DeFi Revolution</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">DeFi</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Experience the future of decentralized finance with AI-powered trading, cross-chain interoperability, 
              and institutional-grade security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                Launch App
                <Rocket className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border border-blue-400 text-blue-400 rounded-xl font-semibold hover:bg-blue-400/10 transition-all duration-300">
                View Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">{feature.description}</p>
                <div className="flex flex-wrap gap-3">
                  {feature.metrics.map((metric, metricIndex) => (
                    <span key={metricIndex} className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-400 text-sm font-medium">
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Statistics */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Protocol <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Ecosystem</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {protocols.map((protocol, index) => (
              <motion.div
                key={protocol.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-2xl p-8 hover:border-blue-400/40 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{protocol.name}</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Volume</span>
                    <span className="text-white font-semibold">{protocol.volume}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Protocol Fee</span>
                    <span className="text-green-400 font-semibold">{protocol.fee}</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{protocol.description}</p>
                <div className="flex flex-wrap gap-2">
                  {protocol.chains.map((chain, chainIndex) => (
                    <span key={chainIndex} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                      {chain}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Advantage Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold text-white mb-6">The AI Advantage</h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Our proprietary AI algorithms analyze market data across multiple chains in real-time, 
                  identifying opportunities and executing trades with precision impossible for human traders.
                </p>
                <div className="space-y-4">
                  {[
                    'Real-time cross-chain arbitrage detection',
                    'Predictive liquidity movement analysis',
                    'Risk-adjusted portfolio optimization',
                    'Automated market making strategies'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300">{item}</span>
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
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-conic from-blue-500 via-cyan-500 to-blue-500 rounded-2xl p-1">
                    <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                        <div className="text-white font-bold text-xl">AI Analytics</div>
                        <div className="text-gray-400">Live Dashboard</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    LIVE
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}