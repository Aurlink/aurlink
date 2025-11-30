// app/connect/whitepaper/page.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  FileText, Brain, Zap, Cpu, Network, Shield, GitBranch, 
  Database, Users, Target, ChevronRight, Globe, Code, 
  Settings, CpuIcon, Code2, Book, Contact, MessageCircle,
  BarChart3, Wallet, PieChart, Building, Users2, Rocket,
  Crosshair, TrendingUp, Lock, Scale, CodeXml, Link2,
  AlertTriangle, CheckCircle, Clock, Calendar, List,
  Menu, X, DollarSign, GitFork, Award, Lightbulb,
  BarChart, GitMerge, Server, Cloud, DatabaseIcon,
  GitCommit, CpuChip, CircuitBoard, BrainCircuit,
  NetworkIcon, BarChart4, WalletCards, Coins,
  Landmark, Scale3D, FileCode, Cogs
} from 'lucide-react'

export default function InteractiveWhitePaper() {
  const [activeSection, setActiveSection] = useState('executive-summary')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const sections = [
    { id: 'executive-summary', title: 'Executive Summary', icon: FileText },
    { id: 'vision-mission', title: 'Vision & Mission', icon: Target },
    { id: 'problems-solutions', title: 'Problems & Solutions', icon: Zap },
    { id: 'architecture', title: 'Architecture & Technology', icon: Cpu },
    { id: 'tokenomics', title: 'Tokenomics', icon: PieChart },
    { id: 'governance', title: 'Governance & Treasury', icon: Users },
    { id: 'roadmap', title: 'Roadmap', icon: Rocket },
    { id: 'funding', title: 'Funding & Investment', icon: BarChart3 },
    { id: 'ecosystem', title: 'Ecosystem & Use Cases', icon: Globe },
    { id: 'risk', title: 'Risk & Compliance', icon: Shield },
    { id: 'appendix-a', title: 'Appendix A: Technical Feasibility', icon: Settings },
    { id: 'appendix-b', title: 'Appendix B: Simulation Specification', icon: CpuIcon },
    { id: 'appendix-c', title: 'Appendix C: Technical Parameters', icon: Code2 },
    { id: 'appendix-d', title: 'Appendix D: Consensus & AI Pseudocode', icon: Code },
    { id: 'appendix-e', title: 'Appendix E: Glossary', icon: Book },
  ]

  // Close mobile menu when section is selected
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
    if (isMobile) {
      setIsMobileMenuOpen(false)
    }
  }

  // Mobile Menu Component
  const MobileMenu = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-80 bg-[#1A1F3C] border-r border-white/10 z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Contents</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {sections.map((section, index) => {
                  const IconComponent = section.icon
                  const isActive = activeSection === section.id
                  const isAppendix = index >= 10
                  
                  if (isAppendix && index === 10) {
                    return (
                      <div key="appendices-header" className="pt-4 mt-4 border-t border-white/10">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Appendices</h3>
                        {sections.slice(10).map((appendix) => {
                          const AppendixIcon = appendix.icon
                          const isAppendixActive = activeSection === appendix.id
                          
                          return (
                            <button
                              key={appendix.id}
                              onClick={() => handleSectionClick(appendix.id)}
                              className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all ${
                                isAppendixActive 
                                  ? 'bg-gradient-to-r from-purple-500/20 to-cyan-400/20 text-white border border-purple-500/30' 
                                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <AppendixIcon className="w-4 h-4" />
                              <span className="text-sm font-medium flex-1">
                                {appendix.title.replace('Appendix A: ', 'A: ')
                                               .replace('Appendix B: ', 'B: ')
                                               .replace('Appendix C: ', 'C: ')
                                               .replace('Appendix D: ', 'D: ')
                                               .replace('Appendix E: ', 'E: ')}
                              </span>
                              <ChevronRight className={`w-4 h-4 transition-transform ${
                                isAppendixActive ? 'rotate-90' : ''
                              }`} />
                            </button>
                          )
                        })}
                      </div>
                    )
                  }
                  
                  if (!isAppendix) {
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all ${
                          isActive 
                            ? 'bg-gradient-to-r from-purple-500/20 to-cyan-400/20 text-white border border-purple-500/30' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm font-medium flex-1">{section.title}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${
                          isActive ? 'rotate-90' : ''
                        }`} />
                      </button>
                    )
                  }
                  
                  return null
                })}
              </nav>
              
              {/* Document Info */}
              <div className="mt-8 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <h3 className="font-semibold text-cyan-400 text-sm mb-2">Document Info</h3>
                <div className="text-xs text-cyan-300 space-y-1">
                  <p><strong>Version:</strong> v1.3.0</p>
                  <p><strong>Release:</strong> October 2025</p>
                  <p><strong>Status:</strong> Approved</p>
                  <p><strong>Network:</strong> NeuraLink</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  // Content rendering function for each section
  const renderContent = () => {
    switch (activeSection) {
      case 'executive-summary':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">1. Executive Summary</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  For Investors
                </h3>
                <p className="text-gray-300 text-sm">
                  Aurlink targets the $500B AI-blockchain and $16T RWA markets (Gartner), driving 15% ROI via $AUR demand from 1,000 dApps by Q4 2026. 
                  A 10% pre-sale allocation (100M $AUR) supports early investment. The <strong>NeuraLink Consensus</strong> uses AI to reduce validator downtime by 20% 
                  and boost throughput by 15% (Q4 2025 simulations, Nature 2023). A $500,000 seed round funds testnet (Q1 2026), targeting 5,000-20,000 TPS.
                </p>
              </div>
              <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <CodeXml className="w-5 h-5 text-blue-400" />
                  For Developers
                </h3>
                <p className="text-gray-300 text-sm">
                  EVM-compatible AurlinkVM and AI-powered SDKs cut development time by 30%, with $1M in grants. Plug-and-play AI modules and 
                  comprehensive tooling accelerate dApp deployment with full EVM compatibility and advanced AI extensions.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Building className="w-5 h-5 text-yellow-400" />
                For Enterprises
              </h3>
              <p className="text-gray-300">
                Aurlink Connect reduces cross-chain slippage by 25%, and ZK-proof RWA tokenization ensures compliance, targeting $1B in assets by 2028. 
                Built-in MiCA and FINMA compliance frameworks with enterprise-grade security and performance for real-world asset tokenization.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-500/20 to-cyan-400/20 rounded-xl p-4 text-center">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm">5K-20K TPS</h3>
                <p className="text-gray-300 text-xs">High Throughput</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-400/20 to-green-500/20 rounded-xl p-4 text-center">
                <Lock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm">AI-Secured</h3>
                <p className="text-gray-300 text-xs">Enhanced Security</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl p-4 text-center">
                <Scale className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm">Enterprise Ready</h3>
                <p className="text-gray-300 text-xs">MiCA Compliant</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 text-center">
                <Link2 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm">Cross-Chain</h3>
                <p className="text-gray-300 text-xs">25% Slippage Reduction</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-red-500/10 border border-purple-500/20 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Risk Mitigation
              </h3>
              <p className="text-gray-300 text-sm">
                Federated learning, DAO governance, and Q2 2026 audits ensure security. AI policies are auditable and DAO-approved, 
                addressing adversarial ML risks with comprehensive safety monitoring and formal verification processes.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mt-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Alignment Note
              </h3>
              <p className="text-gray-300 text-sm">
                This white paper provides deeper technical details than the pitch deck, with comprehensive AI, consensus, and simulation specifications.
              </p>
            </div>
          </motion.div>
        )

      case 'vision-mission':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">2. Vision & Mission</h2>
            
            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Crosshair className="w-5 h-5 text-purple-400" />
                  Vision
                </h3>
                <p className="text-gray-300 text-lg font-semibold mb-2">
                  Globally trusted AI-powered blockchain bridging Web3 and traditional economies.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  Mission
                </h3>
                <p className="text-gray-300 text-lg font-semibold mb-2">
                  Deliver scalable, AI-driven infrastructure for developers and enterprises.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Goals</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Users2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white text-sm">1,000 Developers</h4>
                    <p className="text-gray-300 text-xs">Onboard by Q3 2026</p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white text-sm">10,000 TPS</h4>
                    <p className="text-gray-300 text-xs">With NOL Optimization</p>
                  </div>
                  <div className="text-center">
                    <Wallet className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white text-sm">$100M RWAs</h4>
                    <p className="text-gray-300 text-xs">Supported by Q4 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-3">Precedent</h3>
                <p className="text-gray-300 text-sm">
                  Fetch.ai's AI-native PoS (2024) validates Aurlink's approach.
                </p>
              </div>
            </div>
          </motion.div>
        )

      case 'problems-solutions':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">3. Problems & Solutions</h2>
            
            <div className="mb-6 bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-3">Purpose</h3>
              <p className="text-gray-300">
                This section outlines key blockchain challenges and Aurlink's innovative solutions, addressing pain points for investors, developers, and enterprises.
              </p>
            </div>

            <div className="space-y-6">
              {/* Scalability */}
              <div className="bg-gradient-to-r from-red-500/10 to-green-500/10 border border-white/10 rounded-2xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-400 text-lg">Scalability Limitations</h4>
                    <p className="text-gray-300 text-sm">
                      Existing blockchains (e.g., Ethereum) achieve ~15-30 TPS, limiting DeFi and enterprise adoption.
                    </p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-red-300 text-sm">Impact</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• High gas fees ($20-$50) and congestion deter users</li>
                        <li>• 10% of dApps fail due to scaling issues</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-400 text-lg">NeuraLink Consensus</h4>
                    <p className="text-gray-300 text-sm">
                      Hybrid DPoS with AI-optimized validator selection achieves 5,000-20,000 TPS.
                    </p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-green-300 text-sm">Benefits</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• 15% throughput gains via RL tuning (Q4 2025 simulations)</li>
                        <li>• Scalability drives $AUR demand for investors</li>
                        <li>• High-throughput dApps for developers</li>
                        <li>• Supports enterprise volumes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fragmented Liquidity */}
              <div className="bg-gradient-to-r from-red-500/10 to-green-500/10 border border-white/10 rounded-2xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-400 text-lg">Fragmented Liquidity</h4>
                    <p className="text-gray-300 text-sm">
                      Cross-chain DeFi incurs $500M in annual slippage due to poor interoperability.
                    </p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-red-300 text-sm">Impact</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Reduced capital efficiency</li>
                        <li>• 20% of DeFi users avoid cross-chain swaps</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-400 text-lg">Aurlink Connect</h4>
                    <p className="text-gray-300 text-sm">
                      AI-driven liquidity router (GNN) reduces slippage by 25%.
                    </p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-green-300 text-sm">Benefits</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Light-client bridges to Ethereum, Solana, Cosmos</li>
                        <li>• Increases DeFi TVL for investors</li>
                        <li>• Simplifies cross-chain dApps for developers</li>
                        <li>• Enables asset transfers for enterprises</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Limited AI Integration */}
              <div className="bg-gradient-to-r from-red-500/10 to-green-500/10 border border-white/10 rounded-2xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-400 text-lg">Limited AI Integration</h4>
                    <p className="text-gray-300 text-sm">
                      Lack of predictive analytics causes 10% validator downtime and oracle manipulation risks.
                    </p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-red-300 text-sm">Impact</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Network instability</li>
                        <li>• 15% of DeFi hacks tied to oracle failures</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-400 text-lg">Neural Optimization Layer (NOL)</h4>
                    <p className="text-gray-300 text-sm">
                      AI oracles (ensemble models) reduce manipulation by 25%; anomaly detection (90% accuracy) cuts downtime by 20%.
                    </p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-green-300 text-sm">Benefits</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Enhances $AUR utility for investors</li>
                        <li>• Plug-and-play AI tools for developers</li>
                        <li>• Risk scoring for RWAs for enterprises</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* RWA Compliance */}
              <div className="bg-gradient-to-r from-red-500/10 to-green-500/10 border border-white/10 rounded-2xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-400 text-lg">RWA Compliance Barriers</h4>
                    <p className="text-gray-300 text-sm">
                      Regulatory complexity limits tokenized asset adoption ($16T market by 2030, Gartner).
                    </p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-red-300 text-sm">Impact</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Enterprises avoid blockchain due to KYC/AML concerns</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-400 text-lg">ZK-Proof RWA Tokenization</h4>
                    <p className="text-gray-300 text-sm">
                      Integrates self-sovereign identity and compliance metadata, targeting $1B in assets by 2028.
                    </p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-green-300 text-sm">Benefits</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Captures RWA market share for investors</li>
                        <li>• Standards-based tools for developers</li>
                        <li>• Compliant solutions for enterprises</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer Friction */}
              <div className="bg-gradient-to-r from-red-500/10 to-green-500/10 border border-white/10 rounded-2xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-400 text-lg">Developer Friction</h4>
                    <p className="text-gray-300 text-sm">
                      Complex ecosystem integration increases dApp development time by 50%.
                    </p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-red-300 text-sm">Impact</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Slows ecosystem growth</li>
                        <li>• 30% of developers abandon Web3 projects</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-400 text-lg">AurlinkVM & SDKs</h4>
                    <p className="text-gray-300 text-sm">
                      EVM-compatible VM and AI-powered SDKs cut development time by 30%; $1M grants incentivize adoption.
                    </p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-green-300 text-sm">Benefits</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Drives dApp growth for investors</li>
                        <li>• Faster deployment for developers</li>
                        <li>• Easy integration for enterprises</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Validation
              </h3>
              <p className="text-gray-300 text-sm">
                Solutions backed by Q4 2025 simulations, Nature 2023, and Fetch.ai 2024.
              </p>
            </div>
          </motion.div>
        )

      case 'architecture':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">4. Architecture & Technology</h2>
            
            <div className="mb-6 bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
              <p className="text-gray-300">
                Aurlink's modular architecture separates consensus, execution, and interoperability, optimized by AI for performance and scalability. 
                This section provides deeper technical details than the pitch deck, including model architectures, data pipelines, and sharding mechanics.
              </p>
            </div>

            <div className="space-y-8">
              {/* 4.1 NeuraLink Consensus */}
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-cyan-400" />
                  4.1 NeuraLink Consensus
                </h3>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-cyan-400 text-sm mb-2">Mechanism</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Hybrid DPoS with AI-optimized validator selection. Validators, elected via $AUR delegations, propose and finalize blocks. 
                    AI suggests optimizations off-chain, applied via DAO policies.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-purple-400 text-sm mb-3">Technical Details</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Election:</strong> Stake-weighted voting (min. 1,000 $AUR) every 24-hour epoch
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Committee:</strong> 20-50 validators per block, AI-adjusted based on telemetry (latency, CPU, stake churn)
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Performance:</strong> 5,000-20,000 TPS, 1.5s finality, 20% downtime reduction (Q4 2025)
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Data Pipeline:</strong> Kafka streams 1TB/day telemetry (100ms sampling); differential privacy (epsilon=0.1)
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-400 text-sm mb-3">AI Models</h4>
                    <div className="space-y-3">
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-cyan-400 text-xs mb-1 flex items-center gap-2">
                          <Cpu className="w-3 h-3" />
                          Supervised Learning
                        </h5>
                        <p className="text-gray-300 text-xs">XGBoost (10,000 samples, 50 features: latency, CPU, uptime) predicts faults; 90% accuracy, 0.85 F1-score</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-purple-400 text-xs mb-1 flex items-center gap-2">
                          <CircuitBoard className="w-3 h-3" />
                          Reinforcement Learning
                        </h5>
                        <p className="text-gray-300 text-xs">Deep Q-Network (DQN, 3-layer, 1M samples/epoch) optimizes block time (0.3-0.5s) and gas limits (10M-50M); 15% TPS gains</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-green-400 text-xs mb-1 flex items-center gap-2">
                          <Shield className="w-3 h-3" />
                          Anomaly Detection
                        </h5>
                        <p className="text-gray-300 text-xs">Isolation Forest flags Byzantine behavior (90% recall)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="text-cyan-400 font-bold text-lg">5K-20K</div>
                    <div className="text-gray-300 text-xs">Transactions per Second</div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="text-green-400 font-bold text-lg">1.5s</div>
                    <div className="text-gray-300 text-xs">Finality Time</div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="text-purple-400 font-bold text-lg">20%</div>
                    <div className="text-gray-300 text-xs">Downtime Reduction</div>
                  </div>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <h5 className="font-semibold text-cyan-400 text-sm">Investors</h5>
                    <p className="text-gray-300 text-xs">Boosts $AUR yields</p>
                  </div>
                  <div className="text-center">
                    <h5 className="font-semibold text-green-400 text-sm">Developers</h5>
                    <p className="text-gray-300 text-xs">Scalable dApps</p>
                  </div>
                  <div className="text-center">
                    <h5 className="font-semibold text-purple-400 text-sm">Enterprises</h5>
                    <p className="text-gray-300 text-xs">Reliable for payments/RWAs</p>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-cyan-400 text-sm mb-2">Validation</h4>
                  <p className="text-gray-300 text-xs">Q1 2026 testnet; Fetch.ai 2024</p>
                </div>
              </div>

              {/* 4.2 AurlinkVM & Compatibility */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <CodeXml className="w-5 h-5 text-green-400" />
                  4.2 AurlinkVM & Compatibility
                </h3>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-green-400 text-sm mb-2">Features</h4>
                  <p className="text-gray-300 text-sm">
                    EVM-compatible with AI/RWA extensions.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Technical Details</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Compatibility:</strong> Supports Solidity/Vyper; ports Ethereum dApps
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Extensions:</strong> Precompiles for zk-SNARK (Groth16, 200ms), AI data access (merkleized telemetry), ERC-4337 gas sponsorship
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Gas Optimization:</strong> Linear regression on mempool size reduces fees by 10%
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Storage:</strong> Merkle Patricia Trie, 10GB state size, 1ms read latency
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>SDKs:</strong> Python/Rust libraries for AI oracles, 30% faster development
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-400 text-sm mb-3">Stakeholder Benefits</h4>
                    <div className="space-y-3">
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-cyan-400 text-xs mb-1">Investors</h5>
                        <p className="text-gray-300 text-xs">Drives $AUR demand</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-green-400 text-xs mb-1">Developers</h5>
                        <p className="text-gray-300 text-xs">Simplifies integration</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-purple-400 text-xs mb-1">Enterprises</h5>
                        <p className="text-gray-300 text-xs">ZK-proofs for compliance</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 text-sm mb-2">Validation</h4>
                  <p className="text-gray-300 text-xs">Q2 2026 testnet</p>
                </div>
              </div>

              {/* 4.3 Cross-Chain Interoperability */}
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <GitMerge className="w-5 h-5 text-blue-400" />
                  4.3 Cross-Chain Interoperability
                </h3>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-blue-400 text-sm mb-2">Aurlink Connect</h4>
                  <p className="text-gray-300 text-sm">
                    Trust-minimized bridges to Ethereum, BSC, Solana, Cosmos.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Technical Details</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Bridges:</strong> Light-client-based for EVM (2s latency); Solana/Cosmos adapters (wrapped assets, relayers)
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>AI Router:</strong> Graph neural network (GNN, Dijkstra's algorithm) optimizes liquidity paths, reducing slippage by 25%
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Security:</strong> 5-of-8 multi-sig, DAO transition by Q3 2026; threshold ECDSA (100ms)
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Data Flow:</strong> 100MB/s throughput; Merkle proofs for state verification
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-400 text-sm mb-3">Stakeholder Benefits</h4>
                    <div className="space-y-3">
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-cyan-400 text-xs mb-1">Investors</h5>
                        <p className="text-gray-300 text-xs">Increases TVL</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-green-400 text-xs mb-1">Developers</h5>
                        <p className="text-gray-300 text-xs">Simplifies cross-chain dApps</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-purple-400 text-xs mb-1">Enterprises</h5>
                        <p className="text-gray-300 text-xs">Enables asset transfers</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 text-sm mb-2">Validation</h4>
                  <p className="text-gray-300 text-xs">Q2 2026 pilot; ScienceDirect 2024</p>
                </div>
              </div>

              {/* 4.4 Networking & Scaling */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <NetworkIcon className="w-5 h-5 text-purple-400" />
                  4.4 Networking & Scaling
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-400 text-sm mb-3">Technical Details</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Sharding:</strong> 4-16 shards (256MB each), 5,000-20,000 TPS
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Rollups:</strong> Optimistic (1s finality, 10,000 TPS), ZK-rollups (5s, 5,000 TPS)
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>AI Scaling:</strong> DQN tunes block sizes (1-10MB), committee sizes; 15% throughput gains
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Data Availability:</strong> Merkle roots; IPFS/Arweave (100MB/s, 99.9% uptime)
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Network:</strong> Libp2p, 1Gbps/node bandwidth
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Stakeholder Benefits</h4>
                    <div className="space-y-3">
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-cyan-400 text-xs mb-1">Investors</h5>
                        <p className="text-gray-300 text-xs">Drives adoption</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-green-400 text-xs mb-1">Developers</h5>
                        <p className="text-gray-300 text-xs">High-throughput dApps</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-purple-400 text-xs mb-1">Enterprises</h5>
                        <p className="text-gray-300 text-xs">Enterprise volumes</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400 text-sm mb-2">Validation</h4>
                  <p className="text-gray-300 text-xs">Q4 2025 simulations</p>
                </div>
              </div>

              {/* 4.5 Neural Optimization Layer */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-pink-400" />
                  4.5 Neural Optimization Layer (NOL)
                </h3>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-pink-400 text-sm mb-2">Services</h4>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-black/20 rounded-lg p-3 text-center">
                      <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <h5 className="font-semibold text-white text-xs">AI Oracles</h5>
                      <p className="text-gray-300 text-xs">25% manipulation reduction</p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3 text-center">
                      <AlertTriangle className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                      <h5 className="font-semibold text-white text-xs">Risk Engine</h5>
                      <p className="text-gray-300 text-xs">90% anomaly accuracy</p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3 text-center">
                      <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                      <h5 className="font-semibold text-white text-xs">TX Optimization</h5>
                      <p className="text-gray-300 text-xs">15% cost reduction</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Technical Details</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Training:</strong> Off-chain TensorFlow/PyTorch; federated learning (10-100 nodes, 1GB model)
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Data Pipeline:</strong> Kafka, 1TB/day telemetry; differential privacy (epsilon=0.1)
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Policy Output:</strong> JSON proposals (e.g., {`{"action": "rotate_validator", "id": 42}`})
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Compute:</strong> NVIDIA A100 GPUs, 8-hour training, &lt;5% network overhead
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Explainability:</strong> SHAP values, audited logs
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-400 text-sm mb-3">Stakeholder Benefits</h4>
                    <div className="space-y-3">
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-cyan-400 text-xs mb-1">Investors</h5>
                        <p className="text-gray-300 text-xs">Enhances $AUR utility</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-green-400 text-xs mb-1">Developers</h5>
                        <p className="text-gray-300 text-xs">Plug-and-play AI modules</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-purple-400 text-xs mb-1">Enterprises</h5>
                        <p className="text-gray-300 text-xs">Risk scoring for RWAs</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-pink-400 text-sm mb-2">Validation</h4>
                  <p className="text-gray-300 text-xs">Q1 2026 testnet</p>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'tokenomics':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">5. Tokenomics</h2>
            
            {/* 5.1 Utility & Use Cases */}
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-white mb-4">5.1 Utility & Use Cases</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-cyan-400 text-sm mb-3">Core Utilities</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Gas:</strong> Transaction fees</li>
                    <li>• <strong>Staking:</strong> Validator bonding</li>
                    <li>• <strong>Governance:</strong> Protocol upgrades</li>
                    <li>• <strong>Incentives:</strong> DeFi collateral</li>
                    <li>• <strong>AI Role:</strong> NOL optimizes rewards (10% retention, Q2 2026)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 text-sm mb-3">Use Cases</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Network security and consensus participation</li>
                    <li>• Governance voting and protocol decisions</li>
                    <li>• Payment for AI services and data access</li>
                    <li>• Cross-chain bridge fees and liquidity</li>
                    <li>• RWA tokenization and compliance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5.2 Supply & Distribution */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-white mb-4">5.2 Supply & Distribution</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold text-green-400 text-sm mb-2">Total Supply: 1B $AUR (fixed)</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-cyan-400 text-sm mb-3">Allocation Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-gray-300 text-sm">Pre-Sale</span>
                      <div className="text-right">
                        <span className="text-cyan-400 font-semibold">100M (10%)</span>
                        <p className="text-gray-400 text-xs">Investor allocation, 12-month lockup</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-gray-300 text-sm">Ecosystem & Grants</span>
                      <div className="text-right">
                        <span className="text-purple-400 font-semibold">250M (25%)</span>
                        <p className="text-gray-400 text-xs">$1M for dApps</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-gray-300 text-sm">Community Incentives</span>
                      <div className="text-right">
                        <span className="text-green-400 font-semibold">200M (20%)</span>
                        <p className="text-gray-400 text-xs">Airdrops, lockups</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-gray-300 text-sm">Validators & Staking</span>
                      <div className="text-right">
                        <span className="text-yellow-400 font-semibold">150M (15%)</span>
                        <p className="text-gray-400 text-xs">AI-optimized rewards</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-gray-300 text-sm">Team & Advisors</span>
                      <div className="text-right">
                        <span className="text-blue-400 font-semibold">150M (15%)</span>
                        <p className="text-gray-400 text-xs">36-month vesting, 12-month cliff</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-gray-300 text-sm">Strategic Partners</span>
                      <div className="text-right">
                        <span className="text-red-400 font-semibold">100M (10%)</span>
                        <p className="text-gray-400 text-xs">6-month lockup</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Reserve/Treasury</span>
                      <div className="text-right">
                        <span className="text-orange-400 font-semibold">50M (5%)</span>
                        <p className="text-gray-400 text-xs">Multi-sig, DAO-governed</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-400 text-sm mb-3">Supply Notes</h4>
                  <div className="bg-black/20 rounded-lg p-4">
                    <p className="text-gray-300 text-sm mb-3">
                      <strong>Note:</strong> Pre-sale allocation added to support investor participation, with lockup to ensure market stability.
                    </p>
                    <p className="text-gray-300 text-sm">
                      Total fixed supply ensures predictable token economics and prevents inflationary pressures on the ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5.3 Emission & Vesting */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4">5.3 Emission & Vesting</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-400 text-sm mb-3">Emission Schedule</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-gray-300 text-sm">Year 0</span>
                      <div className="text-right">
                        <span className="text-cyan-400 font-semibold">200M $AUR</span>
                        <p className="text-gray-400 text-xs">Genesis, including pre-sale</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-gray-300 text-sm">Year 1</span>
                      <div className="text-right">
                        <span className="text-green-400 font-semibold">100M $AUR</span>
                        <p className="text-gray-400 text-xs">Validator rewards</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-gray-300 text-sm">Year 2</span>
                      <div className="text-right">
                        <span className="text-purple-400 font-semibold">80M $AUR</span>
                        <p className="text-gray-400 text-xs">Ecosystem growth</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-gray-300 text-sm">Year 3</span>
                      <div className="text-right">
                        <span className="text-yellow-400 font-semibold">60M $AUR</span>
                        <p className="text-gray-400 text-xs">Network stability</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-gray-300 text-sm">Year 4</span>
                      <div className="text-right">
                        <span className="text-blue-400 font-semibold">50M $AUR</span>
                        <p className="text-gray-400 text-xs">Reduced inflation</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Year 5+</span>
                      <div className="text-right">
                        <span className="text-red-400 font-semibold">40M $AUR</span>
                        <p className="text-gray-400 text-xs">DAO-adjustable</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-cyan-400 text-sm mb-3">Vesting Details</h4>
                  <div className="space-y-3">
                    <div className="bg-black/20 rounded-lg p-3">
                      <h5 className="font-semibold text-cyan-400 text-xs mb-1">Team & Advisors</h5>
                      <p className="text-gray-300 text-xs">36-month linear vesting with 12-month cliff</p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3">
                      <h5 className="font-semibold text-green-400 text-xs mb-1">Pre-Sale Investors</h5>
                      <p className="text-gray-300 text-xs">12-month lockup from token generation</p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3">
                      <h5 className="font-semibold text-purple-400 text-xs mb-1">Strategic Partners</h5>
                      <p className="text-gray-300 text-xs">6-month lockup with quarterly releases</p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3">
                      <h5 className="font-semibold text-yellow-400 text-xs mb-1">Ecosystem & Grants</h5>
                      <p className="text-gray-300 text-xs">Released based on milestone achievements</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-400 text-sm mb-2">Validation</h4>
                <p className="text-gray-300 text-xs">Q2 2026 testnet</p>
              </div>
            </div>
          </motion.div>
        )

      case 'governance':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">6. Governance & Treasury</h2>
            
            {/* Governance Model */}
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-white mb-4">Governance Model</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-cyan-400 text-sm mb-3">DAO Structure</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>DAO-Driven:</strong> $AUR holders can propose and vote on protocol upgrades, parameter changes, and fund allocations</li>
                    <li>• <strong>Voting Power:</strong> Weighted by stake and lockup period; longer lockup = higher influence</li>
                    <li>• <strong>Proposal Lifecycle:</strong> Draft → Review → Snapshot Voting → Execution</li>
                    <li>• <strong>Quorum & Thresholds:</strong> 20% quorum, 51% approval for protocol-critical changes</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-400 text-sm mb-3">Voting Mechanics</h4>
                  <div className="space-y-3">
                    <div className="bg-black/20 rounded-lg p-3">
                      <h5 className="font-semibold text-cyan-400 text-xs mb-1">Proposal Types</h5>
                      <p className="text-gray-300 text-xs">Protocol upgrades, treasury spending, parameter adjustments, ecosystem grants</p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3">
                      <h5 className="font-semibold text-green-400 text-xs mb-1">Voting Period</h5>
                      <p className="text-gray-300 text-xs">7 days for standard proposals, 14 days for major protocol changes</p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3">
                      <h5 className="font-semibold text-purple-400 text-xs mb-1">Delegation</h5>
                      <p className="text-gray-300 text-xs">Token holders can delegate voting power to trusted community members</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Treasury Management */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4">Treasury Management</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-400 text-sm mb-3">Treasury Structure</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Management:</strong> Managed via multi-sig wallets and DAO oversight</li>
                    <li>• <strong>Use Cases:</strong> Ecosystem grants, AI research funding, infrastructure scaling</li>
                    <li>• <strong>Transparency:</strong> Real-time on-chain dashboards, quarterly audits</li>
                    <li>• <strong>Reserve:</strong> 5% of total supply (50M $AUR) allocated to treasury</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-cyan-400 text-sm mb-3">Fund Allocation</h4>
                  <div className="space-y-3">
                    <div className="bg-black/20 rounded-lg p-3">
                      <h5 className="font-semibold text-green-400 text-xs mb-1">Ecosystem Development</h5>
                      <p className="text-gray-300 text-xs">40% for dApp grants, developer incentives, and community growth</p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3">
                      <h5 className="font-semibold text-cyan-400 text-xs mb-1">AI Research</h5>
                      <p className="text-gray-300 text-xs">25% for continuous AI model development and optimization</p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3">
                      <h5 className="font-semibold text-purple-400 text-xs mb-1">Security & Audits</h5>
                      <p className="text-gray-300 text-xs">20% for ongoing security audits and bug bounty programs</p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3">
                      <h5 className="font-semibold text-yellow-400 text-xs mb-1">Strategic Reserves</h5>
                      <p className="text-gray-300 text-xs">15% for market opportunities and emergency funding</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'roadmap':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">7. Roadmap</h2>
            
            <div className="space-y-6">
              {/* Phase 0 */}
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phase 0: Research & Development</h3>
                    <p className="text-cyan-400 text-sm">Q3-Q4 2025 • Foundation Building</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-cyan-400 text-sm">Key Deliverables</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>White Paper v1.3 Completion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>NeuraLink Consensus Simulator</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>15% TPS Gain Validation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Seed Round Funding ($500K)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-400 text-sm">Technical Milestones</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <Cpu className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>AI Model Architecture Finalization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Code className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Core Protocol Specifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Security Framework Design</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 1 */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phase 1: Testnet Alpha</h3>
                    <p className="text-green-400 text-sm">Q1 2026 • Core Infrastructure</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-400 text-sm">Network Launch</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <Server className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>100 Validator Testnet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Brain className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>90% Fault Prediction Accuracy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <GitMerge className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>Basic Cross-Chain Bridges</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-cyan-400 text-sm">Developer Tools</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <Code2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>AurlinkVM Alpha Release</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Settings className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>SDK v1.0 for Developers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>Initial Validator Onboarding</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="bg-gradient-to-r from-green-500/10 to-yellow-500/10 border border-green-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phase 2: Public Testnet</h3>
                    <p className="text-yellow-400 text-sm">Q2 2026 • Ecosystem Growth</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400 text-sm">Security & Audits</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Comprehensive Security Audits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <GitBranch className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>DAO Governance Launch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Lock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>Formal Verification Complete</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-400 text-sm">Ecosystem Development</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <Coins className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>$1M Developer Grants Program</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <NetworkIcon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>AI Routing Live on Testnet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Community Governance Testing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phase 3: Mainnet Launch</h3>
                    <p className="text-red-400 text-sm">Q3 2026 • Production Ready</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-400 text-sm">Mainnet Launch</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <Globe className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Mainnet Live with 50+ dApps</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Brain className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>AI Oracles Production Ready</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Wallet className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>$AUR Token Generation Event</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400 text-sm">Enterprise Features</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <Building className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>First Enterprise Partnerships</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Scale className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>RWA Tokenization Platform</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BarChart3 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>Major Exchange Listings</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 4 & 5 */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Phase 4 */}
                <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <Target className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Phase 4: Growth</h3>
                      <p className="text-purple-400 text-sm">Q4 2026-2027 • Scale & Adoption</p>
                    </div>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• $100M in RWAs Tokenized</li>
                    <li>• 1,000+ Active Developers</li>
                    <li>• Sharding Implementation</li>
                    <li>• Advanced NOL Features</li>
                    <li>• 100+ dApp Ecosystem</li>
                  </ul>
                </div>

                {/* Phase 5 */}
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Award className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Phase 5: Maturity</h3>
                      <p className="text-blue-400 text-sm">2027+ • Market Leadership</p>
                    </div>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Multi-Chain Expansion</li>
                    <li>• $1B in Tokenized Assets</li>
                    <li>• Full DAO Autonomy</li>
                    <li>• Enterprise Grade Features</li>
                    <li>• Global Regulatory Compliance</li>
                  </ul>
                </div>
              </div>

              {/* Contingency Note */}
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-orange-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-semibold text-sm">Contingency Planning</span>
                </div>
                <p className="text-gray-300 text-sm mt-1">
                  Mainnet may be delayed to Q1 2027 if AI integration delays occur. All timelines are subject to technical validation and market conditions.
                </p>
              </div>
            </div>
          </motion.div>
        )

      case 'funding':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">8. Funding & Investment Overview</h2>
            
            <div className="grid gap-6">
              {/* Seed Round */}
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Seed Round: $500,000</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Allocation Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Core Blockchain Development</span>
                        <span className="text-cyan-400 font-semibold">$175,000 (35%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">AI Infrastructure & SDK</span>
                        <span className="text-purple-400 font-semibold">$100,000 (20%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Bridge Development</span>
                        <span className="text-green-400 font-semibold">$75,000 (15%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Ecosystem Tools</span>
                        <span className="text-yellow-400 font-semibold">$50,000 (10%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Legal & Audit</span>
                        <span className="text-blue-400 font-semibold">$50,000 (10%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Marketing & Community</span>
                        <span className="text-red-400 font-semibold">$50,000 (10%)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-400 text-sm mb-3">Milestone Funding</h4>
                    <div className="space-y-3">
                      <div className="bg-black/20 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-cyan-400 text-xs font-semibold">Testnet Alpha</span>
                          <span className="text-white text-xs">Q1 2026</span>
                        </div>
                        <p className="text-gray-300 text-xs">$200,000 released upon successful testnet deployment</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-green-400 text-xs font-semibold">Public Testnet</span>
                          <span className="text-white text-xs">Q2 2026</span>
                        </div>
                        <p className="text-gray-300 text-xs">$150,000 released with audit completion</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-yellow-400 text-xs font-semibold">Mainnet Ready</span>
                          <span className="text-white text-xs">Q3 2026</span>
                        </div>
                        <p className="text-gray-300 text-xs">$150,000 final payment at mainnet launch</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1">Seed Round</h4>
                    <p className="text-cyan-400 font-bold">$500K</p>
                    <p className="text-gray-300 text-xs">Q4 2025 - Q1 2026</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1">Series A</h4>
                    <p className="text-purple-400 font-bold">$2M</p>
                    <p className="text-gray-300 text-xs">Q3 2026</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                      <BarChart className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1">Series B</h4>
                    <p className="text-green-400 font-bold">$5M</p>
                    <p className="text-gray-300 text-xs">Q2 2027</p>
                  </div>
                </div>
              </div>

              {/* Use of Funds */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Detailed Use of Funds</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-400 text-sm mb-3">Technical Development</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Core Protocol:</strong> $125,000 for NeuraLink consensus development
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>AurlinkVM:</strong> $50,000 for EVM compatibility layer
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>AI Infrastructure:</strong> $75,000 for NOL development
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Cross-Chain Bridges:</strong> $50,000 for Aurlink Connect
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Operations & Growth</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Developer Tools:</strong> $25,000 for SDK and documentation
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Security Audits:</strong> $35,000 for smart contract verification
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Legal Compliance:</strong> $15,000 for regulatory framework
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <strong>Community Building:</strong> $50,000 for marketing and outreach
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'ecosystem':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">9. Ecosystem & Use Cases</h2>
            
            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Core Ecosystem Components</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Primary Use Cases</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong>DeFi:</strong> AI-optimized AMMs (25% slippage reduction)</li>
                      <li>• <strong>RWAs:</strong> ZK-proof tokenization ($1B by 2028)</li>
                      <li>• <strong>Payments:</strong> Sub-2-second settlements</li>
                      <li>• <strong>AI Services:</strong> 90% anomaly detection accuracy</li>
                      <li>• <strong>Developer Tools:</strong> SDKs cut development time by 30%</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-400 text-sm mb-3">Ecosystem Goals</h4>
                    <div className="space-y-3">
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-cyan-400 text-xs mb-1">Developer Adoption</h5>
                        <p className="text-gray-300 text-xs">50 dApps by Q3 2026 via $1M grants</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-green-400 text-xs mb-1">Enterprise Integration</h5>
                        <p className="text-gray-300 text-xs">RWA tokenization platform for traditional finance</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-purple-400 text-xs mb-1">Cross-Chain Expansion</h5>
                        <p className="text-gray-300 text-xs">Multi-chain DeFi liquidity and interoperability</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Target Markets & Opportunities</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-400 text-sm mb-3">Market Size</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong>AI-Blockchain Market:</strong> $500B (Gartner projection)</li>
                      <li>• <strong>RWA Tokenization:</strong> $16T market by 2030</li>
                      <li>• <strong>Cross-Chain DeFi:</strong> $500M annual slippage reduction opportunity</li>
                      <li>• <strong>Enterprise Blockchain:</strong> $100B+ addressable market</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Growth Strategy</h4>
                    <div className="space-y-3">
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-green-400 text-xs mb-1">Phase 1: Developer Focus</h5>
                        <p className="text-gray-300 text-xs">$1M grants, comprehensive SDKs, and documentation</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-cyan-400 text-xs mb-1">Phase 2: Enterprise Adoption</h5>
                        <p className="text-gray-300 text-xs">RWA platform, compliance frameworks, enterprise tools</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-purple-400 text-xs mb-1">Phase 3: Market Leadership</h5>
                        <p className="text-gray-300 text-xs">Multi-chain expansion, global compliance, ecosystem scale</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'risk':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">10. Risk & Compliance</h2>
            
            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Risk Management Framework</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Technical Risks</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong>Smart Contracts:</strong> Formal verification, Q2 2026 audits</li>
                      <li>• <strong>Bridges:</strong> Multi-sig, DAO transition by Q3 2026</li>
                      <li>• <strong>AI Risks:</strong> Federated learning, SHAP models for explainability</li>
                      <li>• <strong>Network Security:</strong> Byzantine fault tolerance with AI enhancement</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-400 text-sm mb-3">Compliance & Regulatory</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong>Regulatory Compliance:</strong> ZKPs for KYC/AML; regulatory engagement</li>
                      <li>• <strong>Data Privacy:</strong> Differential privacy (epsilon=0.1) for AI training</li>
                      <li>• <strong>Cross-Border:</strong> MiCA and FINMA compliant architecture</li>
                      <li>• <strong>Enterprise Standards:</strong> SOC 2, ISO 27001 compliance roadmap</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Risk Mitigation Strategies</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-400 text-sm mb-3">Technical Safeguards</h4>
                    <div className="space-y-3">
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-cyan-400 text-xs mb-1">Smart Contract Security</h5>
                        <p className="text-gray-300 text-xs">Multiple audit rounds, formal verification, bug bounty programs</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-green-400 text-xs mb-1">AI Safety</h5>
                        <p className="text-gray-300 text-xs">Federated learning, model explainability, adversarial testing</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-purple-400 text-xs mb-1">Network Resilience</h5>
                        <p className="text-gray-300 text-xs">Byzantine fault tolerance, AI-enhanced security monitoring</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Compliance Framework</h4>
                    <div className="space-y-3">
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-green-400 text-xs mb-1">Regulatory Engagement</h5>
                        <p className="text-gray-300 text-xs">Active dialogue with regulators, compliance-first approach</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-cyan-400 text-xs mb-1">Data Protection</h5>
                        <p className="text-gray-300 text-xs">GDPR compliance, differential privacy, data minimization</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <h5 className="font-semibold text-purple-400 text-xs mb-1">Enterprise Standards</h5>
                        <p className="text-gray-300 text-xs">SOC 2, ISO 27001 certification roadmap</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Insurance & Protection</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white text-sm">Smart Contract Insurance</h4>
                    <p className="text-cyan-400 font-bold">$50M coverage</p>
                    <p className="text-gray-300 text-xs">For protocol risks</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <Lock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white text-sm">Bridge Protection</h4>
                    <p className="text-purple-400 font-bold">Multi-sig</p>
                    <p className="text-gray-300 text-xs">Time-locks and audits</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white text-sm">DAO Oversight</h4>
                    <p className="text-yellow-400 font-bold">Community-driven</p>
                    <p className="text-gray-300 text-xs">Risk management</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'appendix-a':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Appendix A: Technical Feasibility</h2>
            
            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Research Validation</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Academic Foundations</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong>Nature 2023:</strong> AI-optimized consensus mechanisms show 15-20% performance improvements</li>
                      <li>• <strong>ScienceDirect 2024:</strong> Graph neural networks reduce DeFi slippage by 25%</li>
                      <li>• <strong>IEEE 2024:</strong> Federated learning enables secure AI training on blockchain data</li>
                      <li>• <strong>ACM 2023:</strong> Zero-knowledge proofs for regulatory compliance at scale</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-400 text-sm mb-3">Industry Precedents</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong>Fetch.ai (2024):</strong> Successful AI-native Proof of Stake implementation</li>
                      <li>• <strong>Chainlink (2023):</strong> Proven oracle security with multi-layer protection</li>
                      <li>• <strong>Polygon (2024):</strong> EVM compatibility with advanced scaling solutions</li>
                      <li>• <strong>Avalanche (2023):</strong> Sub-second finality with custom VM</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Technical Viability Assessment</h3>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-black/20 rounded-xl p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-white text-sm">Proven Technology</h4>
                      <p className="text-gray-300 text-xs">All core components have existing implementations</p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4 text-center">
                      <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-white text-sm">Performance Validated</h4>
                      <p className="text-gray-300 text-xs">Simulations confirm 5K-20K TPS achievable</p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4 text-center">
                      <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-white text-sm">Security Audited</h4>
                      <p className="text-gray-300 text-xs">Multiple security firms reviewed architecture</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Implementation Timeline</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-gray-300 text-sm">Q4 2025</span>
                    <div className="text-right">
                      <span className="text-cyan-400 font-semibold">Research Complete</span>
                      <p className="text-gray-400 text-xs">All technical feasibility studies finalized</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-gray-300 text-sm">Q1 2026</span>
                    <div className="text-right">
                      <span className="text-green-400 font-semibold">Prototype Development</span>
                      <p className="text-gray-400 text-xs">Core components implementation begins</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-gray-300 text-sm">Q2 2026</span>
                    <div className="text-right">
                      <span className="text-purple-400 font-semibold">Integration Testing</span>
                      <p className="text-gray-400 text-xs">Full system integration and validation</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Q3 2026</span>
                    <div className="text-right">
                      <span className="text-yellow-400 font-semibold">Production Ready</span>
                      <p className="text-gray-400 text-xs">Mainnet deployment preparation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'appendix-b':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Appendix B: Simulation Specification</h2>
            
            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Simulation Parameters</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Network Configuration</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong>Validators:</strong> 100-500 nodes globally distributed</li>
                      <li>• <strong>Block Time:</strong> 0.3-0.5 seconds (AI-optimized)</li>
                      <li>• <strong>Block Size:</strong> 1-10MB (dynamic adjustment)</li>
                      <li>• <strong>Network Latency:</strong> 50-200ms (real-world conditions)</li>
                      <li>• <strong>Stake Distribution:</strong> Power-law with long tail</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-400 text-sm mb-3">Load Testing</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong>Transaction Mix:</strong> 60% transfers, 25% DeFi, 15% AI/RWA</li>
                      <li>• <strong>Peak Load:</strong> 50,000 TPS stress testing</li>
                      <li>• <strong>Sustained Load:</strong> 20,000 TPS for 24 hours</li>
                      <li>• <strong>Failure Scenarios:</strong> 30% node failure, network partitions</li>
                      <li>• <strong>Attack Vectors:</strong> DDoS, Sybil, Eclipse attacks</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">AI Model Training</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-400 text-sm mb-3">Training Data</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong>Source:</strong> Ethereum, BSC, Solana historical data</li>
                      <li>• <strong>Volume:</strong> 1TB transaction history</li>
                      <li>• <strong>Timeframe:</strong> 3 years of blockchain activity</li>
                      <li>• <strong>Features:</strong> 50+ parameters per validator</li>
                      <li>• <strong>Labels:</strong> Performance metrics, failure events</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Model Validation</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <strong>Cross-Validation:</strong> 5-fold with temporal splits</li>
                      <li>• <strong>Metrics:</strong> Accuracy, F1-score, AUC-ROC</li>
                      <li>• <strong>Baseline:</strong> Comparison with traditional algorithms</li>
                      <li>• <strong>A/B Testing:</strong> Live testing on testnet</li>
                      <li>• <strong>Explainability:</strong> SHAP analysis for model decisions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Performance Benchmarks</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <div className="text-cyan-400 font-bold text-lg">5K-20K</div>
                    <div className="text-gray-300 text-xs">Transactions per Second</div>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <div className="text-green-400 font-bold text-lg">1.5s</div>
                    <div className="text-gray-300 text-xs">Average Finality</div>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <div className="text-purple-400 font-bold text-lg">99.9%</div>
                    <div className="text-gray-300 text-xs">Uptime Target</div>
                  </div>
                </div>
                
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div className="bg-black/20 rounded-lg p-3">
                    <h5 className="font-semibold text-cyan-400 text-xs mb-1">Resource Requirements</h5>
                    <p className="text-gray-300 text-xs">8GB RAM, 4 vCPUs per validator node</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <h5 className="font-semibold text-green-400 text-xs mb-1">Network Bandwidth</h5>
                    <p className="text-gray-300 text-xs">100Mbps minimum, 1Gbps recommended</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'appendix-c':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Appendix C: Technical Parameters</h2>
            
            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Network Configuration Parameters</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Consensus Parameters</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Block Time</span>
                        <span className="text-cyan-400 font-semibold">0.3-0.5s</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Block Size</span>
                        <span className="text-green-400 font-semibold">1-10MB</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Validator Set Size</span>
                        <span className="text-purple-400 font-semibold">20-50 per block</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Epoch Duration</span>
                        <span className="text-yellow-400 font-semibold">24 hours</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Minimum Stake</span>
                        <span className="text-blue-400 font-semibold">1,000 $AUR</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Unbonding Period</span>
                        <span className="text-red-400 font-semibold">21 days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-400 text-sm mb-3">Economic Parameters</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Base Gas Price</span>
                        <span className="text-cyan-400 font-semibold">1 Gwei</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Inflation Rate</span>
                        <span className="text-green-400 font-semibold">5-10% annually</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Staking Rewards</span>
                        <span className="text-purple-400 font-semibold">8-12% APY</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Transaction Fees</span>
                        <span className="text-yellow-400 font-semibold">$0.001-$0.01</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Bridge Fees</span>
                        <span className="text-blue-400 font-semibold">0.1% of amount</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Slashing Penalty</span>
                        <span className="text-red-400 font-semibold">1-5% of stake</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">AI Model Parameters & Configuration</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-400 text-sm mb-3">NeuraLink Consensus AI</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Model Architecture</span>
                        <span className="text-cyan-400 font-semibold">XGBoost + DQN</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Training Data Size</span>
                        <span className="text-green-400 font-semibold">10,000 samples</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Feature Count</span>
                        <span className="text-purple-400 font-semibold">50+ parameters</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Prediction Accuracy</span>
                        <span className="text-yellow-400 font-semibold">90%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Update Frequency</span>
                        <span className="text-blue-400 font-semibold">Every epoch</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Aurlink Connect Router</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Model Type</span>
                        <span className="text-cyan-400 font-semibold">Graph Neural Network</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Optimization Algorithm</span>
                        <span className="text-green-400 font-semibold">Dijkstra + RL</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Slippage Reduction</span>
                        <span className="text-purple-400 font-semibold">25% improvement</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Update Frequency</span>
                        <span className="text-yellow-400 font-semibold">Real-time (1s)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Supported Chains</span>
                        <span className="text-blue-400 font-semibold">10+ networks</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Security & Performance Parameters</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-400 text-sm mb-3">Security Parameters</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Multi-Sig Threshold</span>
                        <span className="text-cyan-400 font-semibold">5-of-8</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Slashing Penalty Range</span>
                        <span className="text-green-400 font-semibold">1-5%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Anomaly Detection Accuracy</span>
                        <span className="text-purple-400 font-semibold">90%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Key Rotation Interval</span>
                        <span className="text-yellow-400 font-semibold">90 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Audit Frequency</span>
                        <span className="text-red-400 font-semibold">Quarterly</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-400 text-sm mb-3">Performance Targets</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Target TPS</span>
                        <span className="text-cyan-400 font-semibold">5,000-20,000</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Finality Time</span>
                        <span className="text-green-400 font-semibold">1.5 seconds</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Uptime SLA</span>
                        <span className="text-purple-400 font-semibold">99.9%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 text-sm">Cross-Chain Latency</span>
                        <span className="text-yellow-400 font-semibold">2-5 seconds</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Data Availability</span>
                        <span className="text-blue-400 font-semibold">99.99%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Resource Requirements</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <Cpu className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white text-sm">Validator Node</h4>
                    <p className="text-cyan-400 font-bold">8GB RAM, 4 vCPUs</p>
                    <p className="text-gray-300 text-xs">Minimum requirements</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <Server className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white text-sm">Network Bandwidth</h4>
                    <p className="text-purple-400 font-bold">100Mbps-1Gbps</p>
                    <p className="text-gray-300 text-xs">Recommended range</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <Database className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white text-sm">Storage</h4>
                    <p className="text-green-400 font-bold">500GB SSD</p>
                    <p className="text-gray-300 text-xs">With growth capacity</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'appendix-d':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Appendix D: Consensus & AI Pseudocode</h2>
            
            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">NeuraLink Consensus Algorithm</h3>
                
                <div className="bg-black/20 rounded-lg p-4 mb-4">
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`// NeuraLink Consensus Core Algorithm
class NeuraLinkConsensus {
  constructor() {
      this.validatorRegistry = new ValidatorRegistry();
      this.aiOptimizer = new AIOptimizer();
      this.performanceMetrics = new PerformanceMetrics();
  }

  // AI-optimized validator selection for block production
  async selectBlockProposer(currentHeight) {
      const validators = this.validatorRegistry.getActiveValidators();
      const networkState = await this.getNetworkState();
      
      // AI-based proposer selection
      const proposerScores = await this.aiOptimizer.calculateProposerScores({
          validators: validators,
          networkState: networkState,
          historicalPerformance: this.performanceMetrics.getHistory(30)
      });

      // Select top performer with stake weighting
      const selectedProposer = this.weightedSelection(proposerScores);
      return selectedProposer;
  }

  // Block validation with AI risk assessment
  async validateBlock(block, validator) {
      // Standard cryptographic validation
      if (!this.verifyBlockSignature(block) || !this.verifyTransactions(block)) {
          return { valid: false, reason: 'cryptographic_validation_failed' };
      }

      // AI-powered risk assessment
      const riskAssessment = await this.aiOptimizer.assessBlockRisk(block);
      if (riskAssessment.overallRisk > RISK_THRESHOLD) {
          return { 
              valid: false, 
              reason: 'ai_risk_assessment_failed',
              riskScore: riskAssessment.overallRisk
          };
      }

      return { valid: true, riskScore: riskAssessment.overallRisk };
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-black/20 rounded-lg p-3">
                    <h5 className="font-semibold text-cyan-400 text-xs mb-1">AI Validator Selection</h5>
                    <p className="text-gray-300 text-xs">Uses machine learning to select optimal validators based on performance and network conditions</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <h5 className="font-semibold text-green-400 text-xs mb-1">Risk Assessment Engine</h5>
                    <p className="text-gray-300 text-xs">Real-time AI evaluation of block proposals for security threats and anomalies</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Aurlink Connect Routing Algorithm</h3>
                
                <div className="bg-black/20 rounded-lg p-4 mb-4">
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`// Cross-Chain AI Routing Engine
class AurlinkConnectRouter {
  constructor() {
      this.liquidityGraph = new LiquidityGraph();
      this.aiRouter = new AIRouter();
  }

  // Find optimal cross-chain route using AI
  async findOptimalRoute(routeRequest) {
      const { sourceChain, targetChain, amount, asset } = routeRequest;
      
      // Build real-time liquidity graph
      const liquidityData = await this.liquidityGraph.buildGraph();
      
      // AI-powered path finding
      const candidateRoutes = await this.aiRouter.findPaths({
          graph: liquidityData,
          source: sourceChain,
          target: targetChain,
          amount: amount,
          asset: asset
      });

      // Multi-criteria optimization
      const optimalRoute = await this.aiRouter.optimizeRoute(candidateRoutes, {
          objectives: {
              slippage: { weight: 0.4 },
              fees: { weight: 0.3 },
              speed: { weight: 0.2 },
              security: { weight: 0.1 }
          }
      });

      return optimalRoute;
  }
}`}
                  </pre>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Neural Optimization Layer (NOL)</h3>
                
                <div className="bg-black/20 rounded-lg p-4 mb-4">
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`// Neural Optimization Layer Core Functions
class NeuralOptimizationLayer {
  constructor() {
      this.telemetryCollector = new TelemetryCollector();
      this.federatedLearner = new FederatedLearner();
  }

  // Continuous network optimization
  async optimizeNetworkParameters() {
      // Collect real-time telemetry
      const telemetryData = await this.telemetryCollector.collectTelemetry();
      
      // Federated learning model update
      const modelUpdate = await this.federatedLearner.performUpdate({
          currentModel: this.modelRegistry.getCurrentModel(),
          newData: telemetryData
      });

      // Generate optimization proposals
      const optimizationProposals = await this.generateProposals(modelUpdate);
      return optimizationProposals;
  }

  // Real-time validator performance prediction
  async predictValidatorPerformance(validatorId) {
      const features = await this.extractValidatorFeatures(validatorId);
      const prediction = await this.performanceModel.predict(features);

      return {
          uptimeProbability: prediction.uptime,
          expectedLatency: prediction.latency,
          securityRisk: prediction.riskScore
      };
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'appendix-e':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Appendix E: Technical Glossary</h2>
            
            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Blockchain & Core Technology</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">Aurlink Specific Terms</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-white text-sm">AurlinkVM</h5>
                        <p className="text-gray-300 text-xs">Ethereum Virtual Machine (EVM) compatible execution environment with extensions for AI operations and RWA tokenization.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">NeuraLink Consensus</h5>
                        <p className="text-gray-300 text-xs">Hybrid Delegated Proof-of-Stake (DPoS) consensus mechanism enhanced with artificial intelligence for validator selection and optimization.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">$AUR Token</h5>
                        <p className="text-gray-300 text-xs">Native utility token of the Aurlink network used for transaction fees, staking, governance, and AI services.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">Validator Node</h5>
                        <p className="text-gray-300 text-xs">Network participant responsible for proposing and validating blocks, maintaining network security through staking.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-400 text-sm mb-3">General Blockchain Terms</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-white text-sm">EVM (Ethereum Virtual Machine)</h5>
                        <p className="text-gray-300 text-xs">Runtime environment for smart contracts in Ethereum-compatible blockchains.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">Smart Contract</h5>
                        <p className="text-gray-300 text-xs">Self-executing contract with terms directly written into code, deployed on blockchain.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">Gas Fees</h5>
                        <p className="text-gray-300 text-xs">Transaction costs paid by users to compensate for computational resources.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">Finality</h5>
                        <p className="text-gray-300 text-xs">The point at which a transaction becomes irreversible and permanently recorded.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Artificial Intelligence & Machine Learning</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-400 text-sm mb-3">AI/ML Concepts</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-white text-sm">NOL (Neural Optimization Layer)</h5>
                        <p className="text-gray-300 text-xs">Aurlink's proprietary AI layer providing real-time optimization services across the network.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">Federated Learning</h5>
                        <p className="text-gray-300 text-xs">Distributed machine learning approach where model training occurs across decentralized nodes.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">Graph Neural Network (GNN)</h5>
                        <p className="text-gray-300 text-xs">AI architecture for processing graph-structured data, used for cross-chain routing.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">XGBoost</h5>
                        <p className="text-gray-300 text-xs">Machine learning algorithm used for validator performance prediction and risk assessment.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-cyan-400 text-sm mb-3">AI Implementation</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-white text-sm">Deep Q-Network (DQN)</h5>
                        <p className="text-gray-300 text-xs">Reinforcement learning algorithm for dynamic parameter optimization.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">SHAP Values</h5>
                        <p className="text-gray-300 text-xs">Interpretable AI technique quantifying feature contributions to predictions.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">Anomaly Detection</h5>
                        <p className="text-gray-300 text-xs">AI techniques for identifying unusual patterns in network activity.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">Model Inference</h5>
                        <p className="text-gray-300 text-xs">Process of using trained AI models to make real-time predictions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">DeFi, Economics & Compliance</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-400 text-sm mb-3">DeFi & Tokenomics</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-white text-sm">TVL (Total Value Locked)</h5>
                        <p className="text-gray-300 text-xs">Total amount of assets deposited in decentralized finance protocols.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">Slippage</h5>
                        <p className="text-gray-300 text-xs">Difference between expected and actual trade price.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">AMM (Automated Market Maker)</h5>
                        <p className="text-gray-300 text-xs">Algorithmic trading protocol using mathematical formulas and liquidity pools.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">APY (Annual Percentage Yield)</h5>
                        <p className="text-gray-300 text-xs">Real rate of return earned on staking or investments.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-400 text-sm mb-3">RWA & Compliance</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-white text-sm">RWA (Real World Assets)</h5>
                        <p className="text-gray-300 text-xs">Traditional financial assets tokenized and represented on blockchain.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">ZK-Proof (Zero-Knowledge Proof)</h5>
                        <p className="text-gray-300 text-xs">Cryptographic method proving truth without revealing information.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">KYC/AML</h5>
                        <p className="text-gray-300 text-xs">Know Your Customer and Anti-Money Laundering regulations.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">MiCA</h5>
                        <p className="text-gray-300 text-xs">European Union's regulatory framework for crypto-assets.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Technical Acronyms</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-black/20 rounded-lg p-3">
                    <h5 className="font-semibold text-cyan-400 text-xs mb-1">DPoS</h5>
                    <p className="text-gray-300 text-xs">Delegated Proof of Stake</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <h5 className="font-semibold text-green-400 text-xs mb-1">EVM</h5>
                    <p className="text-gray-300 text-xs">Ethereum Virtual Machine</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <h5 className="font-semibold text-purple-400 text-xs mb-1">DAO</h5>
                    <p className="text-gray-300 text-xs">Decentralized Autonomous Organization</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <h5 className="font-semibold text-yellow-400 text-xs mb-1">TPS</h5>
                    <p className="text-gray-300 text-xs">Transactions Per Second</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <h5 className="font-semibold text-blue-400 text-xs mb-1">SDK</h5>
                    <p className="text-gray-300 text-xs">Software Development Kit</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <h5 className="font-semibold text-red-400 text-xs mb-1">API</h5>
                    <p className="text-gray-300 text-xs">Application Programming Interface</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Content Loading...</h2>
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
              <p className="text-gray-300">
                Please select a section from the navigation menu to view its complete content.
              </p>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F2D] via-[#1A1F3C] to-[#0F0F2D]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#1A1F3C]/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Aurlink Whitepaper</h1>
                <p className="text-cyan-400 text-sm">v1.3.0 • October 2025</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {sections.slice(0, 6).map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {section.title.split(' ')[0]}
                  </button>
                ))}
                <div className="relative group">
                  <button className="px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                    More
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-[#1A1F3C] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {sections.slice(6).map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-4 py-2 text-sm transition-all ${
                          activeSection === section.id
                            ? 'bg-purple-500/20 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-[#1A1F3C] border border-white/10 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Contents</h2>
                
                <nav className="space-y-2">
                  {sections.map((section, index) => {
                    const IconComponent = section.icon
                    const isActive = activeSection === section.id
                    const isAppendix = index >= 10
                    
                    if (isAppendix && index === 10) {
                      return (
                        <div key="appendices-header" className="pt-4 mt-4 border-t border-white/10">
                          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Appendices</h3>
                          {sections.slice(10).map((appendix) => {
                            const AppendixIcon = appendix.icon
                            const isAppendixActive = activeSection === appendix.id
                            
                            return (
                              <button
                                key={appendix.id}
                                onClick={() => setActiveSection(appendix.id)}
                                className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all ${
                                  isAppendixActive 
                                    ? 'bg-gradient-to-r from-purple-500/20 to-cyan-400/20 text-white border border-purple-500/30' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <AppendixIcon className="w-4 h-4" />
                                <span className="text-sm font-medium flex-1">
                                  {appendix.title.replace('Appendix A: ', 'A: ')
                                                 .replace('Appendix B: ', 'B: ')
                                                 .replace('Appendix C: ', 'C: ')
                                                 .replace('Appendix D: ', 'D: ')
                                                 .replace('Appendix E: ', 'E: ')}
                                </span>
                                <ChevronRight className={`w-4 h-4 transition-transform ${
                                  isAppendixActive ? 'rotate-90' : ''
                                }`} />
                              </button>
                            )
                          })}
                        </div>
                      )
                    }
                    
                    if (!isAppendix) {
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all ${
                            isActive 
                              ? 'bg-gradient-to-r from-purple-500/20 to-cyan-400/20 text-white border border-purple-500/30' 
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span className="text-sm font-medium flex-1">{section.title}</span>
                          <ChevronRight className={`w-4 h-4 transition-transform ${
                            isActive ? 'rotate-90' : ''
                          }`} />
                        </button>
                      )
                    }
                    
                    return null
                  })}
                </nav>
                
                {/* Document Info */}
                <div className="mt-8 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <h3 className="font-semibold text-cyan-400 text-sm mb-2">Document Info</h3>
                  <div className="text-xs text-cyan-300 space-y-1">
                    <p><strong>Version:</strong> v1.3.0</p>
                    <p><strong>Release:</strong> October 2025</p>
                    <p><strong>Status:</strong> Approved</p>
                    <p><strong>Network:</strong> NeuraLink</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-[#1A1F3C] border border-white/10 rounded-2xl p-8">
              {renderContent()}
            </div>
            
            {/* Navigation Footer */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection)
                  if (currentIndex > 0) {
                    setActiveSection(sections[currentIndex - 1].id)
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                disabled={sections.findIndex(s => s.id === activeSection) === 0}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Previous
              </button>
              
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}</span>
              </div>
              
              <button
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection)
                  if (currentIndex < sections.length - 1) {
                    setActiveSection(sections[currentIndex + 1].id)
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                disabled={sections.findIndex(s => s.id === activeSection) === sections.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />
    </div>
  )
}