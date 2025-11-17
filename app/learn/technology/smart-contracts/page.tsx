// app/learn/technology/smart-contracts/page.tsx
'use client';
import { motion } from 'framer-motion';
import { FileCode, Shield, Zap, Cpu, GitBranch, Rocket, TestTube, Users } from 'lucide-react';

export default function SmartContractsPage() {
  const capabilities = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI-Enhanced Execution',
      description: 'Smart contracts that learn and adapt to market conditions in real-time',
      features: ['Dynamic fee optimization', 'Predictive gas pricing', 'Auto-scaling logic']
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Military-Grade Security',
      description: 'Formally verified contracts with automated vulnerability detection',
      features: ['Zero-day exploit protection', 'Multi-sig governance', 'Audit trails']
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Cross-Chain Interop',
      description: 'Deploy once, run across all supported blockchain networks',
      features: ['Universal contract standard', 'Chain-agnostic logic', 'Shared state']
    },
  ];

  const templates = [
    {
      name: 'DeFi Protocol',
      complexity: 'Advanced',
      audits: '3',
      chains: ['Ethereum', 'BSC', 'Polygon'],
      description: 'Complete DeFi suite with lending, borrowing, and yield farming'
    },
    {
      name: 'NFT Marketplace',
      complexity: 'Intermediate',
      audits: '2',
      chains: ['All Supported'],
      description: 'Multi-chain NFT platform with royalty enforcement'
    },
    {
      name: 'DAO Framework',
      complexity: 'Advanced',
      audits: '4',
      chains: ['Ethereum', 'Polygon'],
      description: 'Governance and treasury management for decentralized organizations'
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
              <FileCode className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-semibold">Smart Contracts 2.0</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Contracts</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Next-generation smart contracts powered by AI. Self-optimizing, cross-chain compatible, 
              and enterprise-ready from day one.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {capability.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{capability.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{capability.description}</p>
                <ul className="space-y-2">
                  {capability.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Library */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Production <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Templates</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Battle-tested smart contract templates audited by leading security firms and deployed in production environments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">{template.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    template.complexity === 'Advanced' 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {template.complexity}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">{template.description}</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Security Audits</span>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span className="text-white font-semibold">{template.audits}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-400 text-sm">Supported Chains</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {template.chains.map((chain, chainIndex) => (
                        <span key={chainIndex} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                          {chain}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 bg-purple-500/20 border border-purple-400/30 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all duration-300">
                  Use Template
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Workflow */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold text-white mb-6">Enterprise Development Workflow</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: 'Code',
                      icon: <FileCode className="w-5 h-5" />,
                      description: 'Write contracts in Solidity, Vyper, or our AI-assisted language'
                    },
                    {
                      step: 'Test',
                      icon: <TestTube className="w-5 h-5" />,
                      description: 'Automated testing with 95%+ coverage and security scanning'
                    },
                    {
                      step: 'Audit',
                      icon: <Shield className="w-5 h-5" />,
                      description: 'Third-party security audits and formal verification'
                    },
                    {
                      step: 'Deploy',
                      icon: <Rocket className="w-5 h-5" />,
                      description: 'One-click deployment across multiple chains simultaneously'
                    },
                  ].map((stage, index) => (
                    <div key={stage.step} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                        {stage.icon}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{stage.step}</div>
                        <div className="text-gray-400 text-sm">{stage.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 rounded-full px-6 py-3 mb-6">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-semibold">Trusted by Enterprises</span>
                </div>
                <div className="text-6xl font-bold text-white mb-4">$4.2B+</div>
                <div className="text-gray-400 text-xl mb-2">Total Value Secured</div>
                <div className="text-gray-500">Across 150+ production deployments</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}