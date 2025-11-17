// app/page.tsx - HOME PAGE
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Code, Zap, Cpu, Brain, Shield } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: 'AI-Enhanced Consensus',
      description: 'NeuraLink Consensus reduces validator downtime by 20% and boosts throughput by 15%',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Cpu,
      title: 'EVM Compatibility',
      description: 'Full Ethereum compatibility with AI extensions and optimizations',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'Neural Optimization',
      description: 'On-chain AI services for real-time optimization and predictions',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Cross-Chain Interoperability',
      description: 'AI-guided routing reduces cross-chain slippage by 25%',
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6">
              AI-Powered
              <span className="block bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Blockchain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Aurlink integrates artificial intelligence with blockchain technology to deliver 
              unprecedented scalability, interoperability, and intelligence for decentralized applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/getting-started/introduction"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
              >
                <Code className="w-5 h-5" />
                <span>Start Building</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/whitepaper"
                className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                <span>Read White Paper</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0F2C] to-[#071226]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-white text-center mb-4">
              Next-Generation Blockchain
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Built with AI at its core, Aurlink delivers enterprise-grade performance 
              while maintaining full decentralization and security.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                    className="group"
                  >
                    <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 transition-all duration-500 group-hover:border-purple-500/30 group-hover:bg-white/10 group-hover:transform group-hover:-translate-y-1">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}