// app/learn/use-cases/aurlink-connect/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Network, Zap, Shield, GitBranch, ArrowRight, Cpu, Lock, Globe } from 'lucide-react';

export default function AurlinkConnectPage() {
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Universal Interoperability',
      description: 'Seamlessly connect and communicate across 25+ blockchain networks with unified APIs',
      metrics: ['25+ chains', '0.5s latency', '99.99% uptime']
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI-Powered Routing',
      description: 'Intelligent pathfinding algorithm selects optimal routes based on cost, speed, and security',
      metrics: ['47% cost savings', '5x faster', 'AI optimized']
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Military-Grade Security',
      description: 'Multi-layered security with zero-knowledge proofs and real-time threat detection',
      metrics: ['$500M insured', '0 exploits', '24/7 monitoring']
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Enterprise Scalability',
      description: 'Handle millions of cross-chain transactions with sub-second finality and guaranteed delivery',
      metrics: ['10M TPS capacity', '<1s finality', 'Auto-scaling']
    },
  ];

  const supportedChains = [
    { name: 'Ethereum', status: 'Live', tps: '15,000', latency: '0.2s' },
    { name: 'BNB Chain', status: 'Live', tps: '25,000', latency: '0.1s' },
    { name: 'Polygon', status: 'Live', tps: '65,000', latency: '0.3s' },
    { name: 'Solana', status: 'Live', tps: '50,000', latency: '0.4s' },
    { name: 'Arbitrum', status: 'Live', tps: '40,000', latency: '0.2s' },
    { name: 'Avalanche', status: 'Live', tps: '4,500', latency: '0.5s' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-6 py-3 mb-8">
              <Network className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">Blockchain Interoperability</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Aurlink <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Connect</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              The universal bridge for Web3. Connect any blockchain, any asset, any application - 
              with enterprise-grade security and AI-optimized performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                Launch Bridge
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border border-cyan-400 text-cyan-400 rounded-xl font-semibold hover:bg-cyan-400/10 transition-all duration-300">
                View API Docs
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
                <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">{feature.description}</p>
                <div className="flex flex-wrap gap-3">
                  {feature.metrics.map((metric, metricIndex) => (
                    <span key={metricIndex} className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-medium">
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Chains */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Supported <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Networks</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect across the entire blockchain ecosystem with unified APIs and consistent performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportedChains.map((chain, index) => (
              <motion.div
                key={chain.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{chain.name}</h3>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-semibold">
                    {chain.status}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Throughput</span>
                    <span className="text-white font-semibold">{chain.tps} TPS</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Latency</span>
                    <span className="text-cyan-400 font-semibold">{chain.latency}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold text-white mb-6">Advanced Architecture</h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Aurlink Connect uses a revolutionary multi-layered architecture that combines 
                  zero-knowledge proofs, AI routing, and decentralized validation to deliver 
                  unparalleled security and performance.
                </p>
                <div className="space-y-4">
                  {[
                    'Zero-Knowledge Proof Verification',
                    'AI-Powered Route Optimization',
                    'Decentralized Oracle Network',
                    'Multi-Signature Security',
                    'Real-Time Threat Detection',
                    'Automated Failover Systems'
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
                  <div className="w-80 h-80 bg-gradient-conic from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl p-1">
                    <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <GitBranch className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                        <div className="text-white font-bold text-xl">Multi-Layer</div>
                        <div className="text-gray-400">Architecture</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
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