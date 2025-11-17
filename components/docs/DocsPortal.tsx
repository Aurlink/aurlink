'use client'
import { motion } from 'framer-motion'
import { Search, BookOpen, Code2, Cpu, Network, Brain, Link2, Download, ArrowRight, FileText, Github, Play } from 'lucide-react'
import { useState } from 'react'

export default function DocsPortal() {
  const [searchQuery, setSearchQuery] = useState('')

  const docSections = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Aurion Language",
      description: "Complete guide to the cognitive smart contract language",
      color: "from-purple-500 to-cyan-400",
      links: [
        { name: "Getting Started", href: "/docs/aurion/getting-started", type: "guide" },
        { name: "Syntax Reference", href: "/docs/aurion/syntax", type: "reference" },
        { name: "AI Integration", href: "/docs/aurion/ai-integration", type: "guide" },
        { name: "Examples", href: "/docs/aurion/examples", type: "examples" },
        { name: "API Reference", href: "/docs/aurion/api", type: "api" },
        { name: "Best Practices", href: "/docs/aurion/best-practices", type: "guide" }
      ]
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "AurlinkVM",
      description: "Virtual machine architecture and execution environment",
      color: "from-cyan-400 to-[#00F5FF]",
      links: [
        { name: "Architecture Overview", href: "/docs/aurlinkvm/architecture", type: "guide" },
        { name: "EVM Compatibility", href: "/docs/aurlinkvm/evm-compatibility", type: "reference" },
        { name: "AI Precompiles", href: "/docs/aurlinkvm/ai-precompiles", type: "api" },
        { name: "Gas Model", href: "/docs/aurlinkvm/gas-model", type: "reference" },
        { name: "Deployment Guide", href: "/docs/aurlinkvm/deployment", type: "guide" },
        { name: "Performance Tuning", href: "/docs/aurlinkvm/performance", type: "guide" }
      ]
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "NeuraLink Consensus",
      description: "AI-enhanced consensus protocol and validator guides",
      color: "from-[#00F5FF] to-cyan-300",
      links: [
        { name: "Protocol Specification", href: "/docs/consensus/specification", type: "reference" },
        { name: "Validator Setup", href: "/docs/consensus/validator-setup", type: "guide" },
        { name: "Fault Prediction", href: "/docs/consensus/fault-prediction", type: "api" },
        { name: "Security Model", href: "/docs/consensus/security", type: "guide" },
        { name: "Performance Metrics", href: "/docs/consensus/performance", type: "reference" },
        { name: "Governance", href: "/docs/consensus/governance", type: "guide" }
      ]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Neural Optimization Layer",
      description: "Self-optimizing network layer documentation",
      color: "from-cyan-300 to-purple-400",
      links: [
        { name: "Architecture", href: "/docs/nol/architecture", type: "guide" },
        { name: "API Reference", href: "/docs/nol/api", type: "api" },
        { name: "Integration Guide", href: "/docs/nol/integration", type: "guide" },
        { name: "Telemetry Data", href: "/docs/nol/telemetry", type: "reference" },
        { name: "Optimization Algorithms", href: "/docs/nol/algorithms", type: "reference" },
        { name: "Monitoring", href: "/docs/nol/monitoring", type: "guide" }
      ]
    },
    {
      icon: <Link2 className="w-8 h-8" />,
      title: "Aurlink Connect",
      description: "Cross-chain interoperability and bridge protocols",
      color: "from-purple-400 to-cyan-400",
      links: [
        { name: "Bridge Protocol", href: "/docs/connect/protocol", type: "reference" },
        { name: "SDK Documentation", href: "/docs/connect/sdk", type: "api" },
        { name: "Security Audit", href: "/docs/connect/security", type: "guide" },
        { name: "Multi-Chain Setup", href: "/docs/connect/setup", type: "guide" },
        { name: "API Reference", href: "/docs/connect/api", type: "api" },
        { name: "Troubleshooting", href: "/docs/connect/troubleshooting", type: "guide" }
      ]
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: "Tutorials & Examples",
      description: "Step-by-step guides and practical examples",
      color: "from-cyan-500 to-[#00F5FF]",
      links: [
        { name: "Quick Start", href: "/docs/tutorials/quick-start", type: "tutorial" },
        { name: "Build Your First dApp", href: "/docs/tutorials/first-dapp", type: "tutorial" },
        { name: "AI Contract Examples", href: "/docs/tutorials/ai-contracts", type: "examples" },
        { name: "Cross-Chain dApps", href: "/docs/tutorials/cross-chain", type: "tutorial" },
        { name: "Video Tutorials", href: "/docs/tutorials/videos", type: "tutorial" },
        { name: "Community Projects", href: "/docs/tutorials/community", type: "examples" }
      ]
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return <BookOpen className="w-4 h-4" />
      case 'reference': return <FileText className="w-4 h-4" />
      case 'api': return <Code2 className="w-4 h-4" />
      case 'examples': return <Play className="w-4 h-4" />
      case 'tutorial': return <Play className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'text-blue-400 bg-blue-500/10'
      case 'reference': return 'text-purple-400 bg-purple-500/10'
      case 'api': return 'text-cyan-400 bg-cyan-500/10'
      case 'examples': return 'text-green-400 bg-green-500/10'
      case 'tutorial': return 'text-orange-400 bg-orange-500/10'
      default: return 'text-gray-400 bg-gray-500/10'
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Technical
              <span className="block bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Comprehensive guides, API references, and technical specifications for the Aurlink ecosystem.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documentation Grid */}
      <section className="py-20 bg-gradient-to-b from-[#0A0F2C] to-[#071226]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full bg-[#1A1F3C]/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 transition-all duration-500 group-hover:border-purple-500/30 group-hover:bg-[#1A1F3C]/60">
                  
                  {/* Gradient Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${section.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                    {section.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{section.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{section.description}</p>

                  {/* Links */}
                  <div className="space-y-2">
                    {section.links.map((link) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all group/link"
                        whileHover={{ x: 5 }}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(link.type)}`}>
                          {getTypeIcon(link.type)}
                        </div>
                        <span className="text-gray-300 group-hover/link:text-white transition-colors flex-1">
                          {link.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover/link:text-cyan-400 transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            <div className="text-center p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
              <Github className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">GitHub Repository</h3>
              <p className="text-gray-300 mb-4">Access the complete source code and contribute to development.</p>
              <motion.a
                href="https://github.com/aurlink"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Explore Code <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>

            <div className="text-center p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
              <FileText className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Technical Whitepapers</h3>
              <p className="text-gray-300 mb-4">In-depth technical specifications and research papers.</p>
              <motion.a
                href="/whitepaper"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Read Whitepapers <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>

            <div className="text-center p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
              <Play className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Interactive Playground</h3>
              <p className="text-gray-300 mb-4">Test Aurion contracts and explore features in real-time.</p>
              <motion.a
                href="/playground"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Start Building <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}