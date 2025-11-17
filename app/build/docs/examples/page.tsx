// app/docs/examples/page.tsx
'use client'
import { motion } from 'framer-motion'
import { Code, ExternalLink, Play, Star, Users } from 'lucide-react'

const examples = [
  {
    title: 'AI-Powered Prediction Market',
    description: 'A complete prediction market that uses AI for accurate forecasting and risk assessment.',
    category: 'DeFi',
    difficulty: 'Intermediate',
    tags: ['AI', 'Prediction', 'Solidity', 'React'],
    code: 'https://github.com/aurlink/examples/tree/main/prediction-market',
    demo: 'https://prediction-demo.aurlink.io',
    features: ['AI Oracle Integration', 'Real-time Predictions', 'Liquidity Pools', 'Governance'],
    stars: 142,
    contributors: 8
  },
  {
    title: 'Cross-Chain NFT Bridge',
    description: 'Bridge NFTs between Aurlink and other networks with AI-optimized routing.',
    category: 'NFT',
    difficulty: 'Advanced',
    tags: ['Cross-Chain', 'NFT', 'Bridge', 'AI Routing'],
    code: 'https://github.com/aurlink/examples/tree/main/nft-bridge',
    demo: 'https://nft-bridge.aurlink.io',
    features: ['Multi-Chain Support', 'Gas Optimization', 'Batch Transfers', 'Security'],
    stars: 89,
    contributors: 5
  },
  {
    title: 'RWA Tokenization Platform',
    description: 'Compliant real-world asset tokenization with ZK-proof verification.',
    category: 'RWA',
    difficulty: 'Expert',
    tags: ['RWA', 'ZK-Proofs', 'Compliance', 'Governance'],
    code: 'https://github.com/aurlink/examples/tree/main/rwa-tokenization',
    demo: 'https://rwa.aurlink.io',
    features: ['ZK Verification', 'Regulatory Compliance', 'Asset Management', 'DAO Governance'],
    stars: 203,
    contributors: 12
  },
  {
    title: 'Neural Optimization Demo',
    description: 'Showcase of NOL integration for real-time dApp optimization.',
    category: 'AI',
    difficulty: 'Beginner',
    tags: ['NOL', 'Optimization', 'React', 'API'],
    code: 'https://github.com/aurlink/examples/tree/main/neural-optimization',
    demo: 'https://nol-demo.aurlink.io',
    features: ['Real-time Optimization', 'Performance Metrics', 'A/B Testing', 'Analytics'],
    stars: 67,
    contributors: 3
  }
]

export default function ExamplesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            Code
            <span className="block bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Examples
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-world examples and reference implementations to kickstart your Aurlink development.
          </p>
        </motion.div>

        {/* Examples Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {examples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 transition-all duration-500 group-hover:border-cyan-400/30 group-hover:bg-white/10 group-hover:transform group-hover:-translate-y-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {example.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{example.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      example.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      example.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {example.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                      {example.category}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {example.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-white/5 text-cyan-400 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold text-sm mb-2">Features</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {example.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{example.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{example.contributors}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.a
                    href={example.code}
                    className="flex items-center gap-2 flex-1 justify-center py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors group/code"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Code className="w-4 h-4" />
                    <span>View Code</span>
                  </motion.a>
                  <motion.a
                    href={example.demo}
                    className="flex items-center gap-2 flex-1 justify-center py-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all group/demo"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-4 h-4" />
                    <span>Live Demo</span>
                    <ExternalLink className="w-4 h-4 group-hover/demo:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl border border-white/10 p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Want to contribute?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Share your Aurlink projects and examples with the community.
            </p>
            <motion.a
              href="https://github.com/aurlink/examples"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="w-5 h-5" />
              <span>Contribute on GitHub</span>
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}