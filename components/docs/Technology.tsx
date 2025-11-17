'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Code2, Brain, Network, Zap, Cpu, Link2, ArrowRight, Play, BookOpen, FileText, Github, Download } from 'lucide-react'

export default function TechnologyPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const [activeDemo, setActiveDemo] = useState('aurion')

  const techStack = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Aurion Language",
      description: "The cognitive smart contract language that blends deterministic execution with AI reasoning.",
      features: ["AI-Powered Logic", "Cross-Chain Native", "Gas Optimization", "Learning Hooks"],
      code: `contract AdaptiveStake {
  aur config { 
    model: "aur://reward_optimizer_v1" 
  }
  flow on_stake(user, amount) {
    score = AI(model).predict(user.activity)
    reward = base_reward * score
    transfer(user, reward)
  }
}`,
      color: "from-purple-500 to-cyan-400",
      documentation: {
        whitepaper: "/whitepaper/aurion-language-spec.pdf",
        api: "/docs/aurion",
        examples: "/docs/aurion/examples",
        github: "https://github.com/aurlink/aurion"
      }
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "AurlinkVM",
      description: "Next-generation virtual machine with EVM compatibility and AI execution extensions.",
      features: ["EVM Compatible", "AI Precompiles", "ZK-Proof Ready", "Parallel Execution"],
      code: `// Custom AI precompiles
const result = aurlinkVM.executeAI({
  operation: 'neural_predict',
  model: modelHash,
  input: data
});`,
      color: "from-cyan-400 to-[#00F5FF]",
      documentation: {
        whitepaper: "/whitepaper/aurlinkvm-architecture.pdf",
        api: "/docs/aurlinkvm",
        specs: "/docs/aurlinkvm/specifications",
        github: "https://github.com/aurlink/aurlinkvm"
      }
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "NeuraLink Consensus",
      description: "AI-enhanced consensus mechanism with predictive validator optimization.",
      features: ["90% Fault Prediction", "20% Downtime Reduction", "Adaptive Committee", "5K-20K TPS"],
      code: `// AI-driven validator selection
consensus.predict_faults(validators);
consensus.optimize_committee(telemetry);`,
      color: "from-[#00F5FF] to-cyan-300",
      documentation: {
        whitepaper: "/whitepaper/neuralink-consensus.pdf",
        api: "/docs/consensus",
        validator: "/docs/consensus/validator-guide",
        research: "/research/neuralink-paper"
      }
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Neural Optimization Layer",
      description: "Self-healing network that dynamically tunes parameters using reinforcement learning.",
      features: ["Real-time Optimization", "15% Throughput Gain", "Adaptive Scaling", "Anomaly Detection"],
      code: `// NOL policy generation
policy = NOL.optimize({
  block_time: telemetry.latency,
  gas_limit: network_load
});`,
      color: "from-cyan-300 to-purple-400",
      documentation: {
        whitepaper: "/whitepaper/neural-optimization-layer.pdf",
        api: "/docs/nol",
        integration: "/docs/nol/integration",
        research: "/research/nol-algorithms"
      }
    },
    {
      icon: <Link2 className="w-8 h-8" />,
      title: "Aurlink Connect",
      description: "AI-guided cross-chain interoperability with intelligent routing.",
      features: ["Multi-Chain Bridges", "25% Slippage Reduction", "AI Routing", "Light Clients"],
      code: `// Cross-chain asset transfer
bridge.transfer(
  asset, 
  amount, 
  from: "Ethereum",
  to: "Aurlink",
  route: AI.optimize_route()
);`,
      color: "from-purple-400 to-cyan-400",
      documentation: {
        whitepaper: "/whitepaper/aurlink-connect-protocol.pdf",
        api: "/docs/connect",
        security: "/docs/connect/security",
        sdk: "/docs/connect/sdk"
      }
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Polygon Edge Foundation",
      description: "Enterprise-grade blockchain framework with EVM compatibility at the core.",
      features: ["EVM Native", "High Performance", "Proven Security", "Modular Architecture"],
      code: `// Standard Ethereum RPC
web3.eth.getBalance(address);
web3.eth.sendTransaction(tx);`,
      color: "from-cyan-500 to-[#00F5FF]",
      documentation: {
        docs: "https://polygon.technology/docs/edge",
        github: "https://github.com/0xPolygon/polygon-edge",
        deployment: "/docs/deployment/edge-setup"
      }
    }
  ]

  // ... (keep containerVariants and itemVariants the same)

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      {/* Hero Section - Keep existing */}
      
      {/* Aurion Deep Dive Section - Keep existing */}
      
      {/* Enhanced Tech Stack Grid with Documentation */}
      <motion.section 
        ref={ref}
        className="py-20 lg:py-32 bg-gradient-to-b from-[#0A0F2C] to-[#071226]"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.title}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative h-full bg-[#1A1F3C]/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 transition-all duration-500 group-hover:border-purple-500/30 group-hover:bg-[#1A1F3C]/60 group-hover:transform group-hover:scale-105">
                  
                  {/* Gradient Border */}
                  <motion.div 
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                    animate={isInView ? {
                      background: [
                        `linear-gradient(45deg, ${tech.color.split(' ')[0]}, ${tech.color.split(' ')[2]}, ${tech.color.split(' ')[0]})`,
                        `linear-gradient(135deg, ${tech.color.split(' ')[0]}, ${tech.color.split(' ')[2]}, ${tech.color.split(' ')[0]})`,
                      ]
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="absolute inset-[2px] rounded-3xl bg-[#0A0F2C] -z-10" />

                  {/* Icon */}
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tech.color} flex items-center justify-center mb-6 text-white`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    {tech.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">{tech.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{tech.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tech.features.map((feature) => (
                      <span 
                        key={feature}
                        className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-sm border border-white/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Code Preview */}
                  <div className="bg-black/50 rounded-xl p-4 border border-white/10 mb-6">
                    <pre className="text-cyan-300 text-sm font-mono overflow-x-auto">
                      {tech.code}
                    </pre>
                  </div>

                  {/* DOCUMENTATION GATEWAY - NEW SECTION */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      Technical Documentation
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Whitepaper */}
                      {tech.documentation.whitepaper && (
                        <motion.a
                          href={tech.documentation.whitepaper}
                          className="flex items-center gap-2 px-3 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/20 transition-colors group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FileText className="w-4 h-4" />
                          <span>Whitepaper</span>
                        </motion.a>
                      )}

                      {/* API Docs */}
                      {tech.documentation.api && (
                        <motion.a
                          href={tech.documentation.api}
                          className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/20 transition-colors group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Code2 className="w-4 h-4" />
                          <span>API Docs</span>
                        </motion.a>
                      )}

                      {/* GitHub */}
                      {tech.documentation.github && (
                        <motion.a
                          href={tech.documentation.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-gray-500/10 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-500/20 transition-colors group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-4 h-4" />
                          <span>GitHub</span>
                        </motion.a>
                      )}

                      {/* Additional Docs */}
                      {tech.documentation.specs && (
                        <motion.a
                          href={tech.documentation.specs}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-colors group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Download className="w-4 h-4" />
                          <span>Specs</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-purple-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-20" />
              </motion.div>
            ))}
          </div>

          {/* Global Documentation CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl border border-white/10 p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">Complete Technical Documentation</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Access comprehensive specifications, API references, and implementation guides for the entire Aurlink stack.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/docs"
                  className="bg-gradient-to-r from-purple-500 to-cyan-400 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Explore Full Documentation</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="/whitepaper"
                  className="border-2 border-[#00F5FF] text-[#00F5FF] px-8 py-4 rounded-2xl font-semibold hover:bg-[#00F5FF] hover:text-[#0A0F2C] transition-all duration-300 flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-5 h-5" />
                  <span>Technical Whitepapers</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Keep existing Aurion deep dive and enhanced CTA sections */}
    </div>
  )
}