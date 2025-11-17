'use client'
import { motion } from 'framer-motion'
import { FileText, Calendar, User, ArrowRight, BookOpen, ExternalLink, Zap, Cpu, Network, Brain, Shield, Database, GitBranch, Target, Code, Building, CheckCircle, PieChart, Settings, Code2, Book, Contact, Globe, MessageCircle } from 'lucide-react'

export default function WhitepapersPage() {
  const technicalDocs = [
    {
      title: "Aurlink White Paper v1.3",
      description: "Complete technical specification of the Aurlink ecosystem with NeuraLink Consensus, AurlinkVM architecture, tokenomics, and AI integration.",
      version: "v1.3.0",
      date: "2025-10-01",
      author: "Aurlink Research Team",
      pages: 85,
      category: "Technical Specification",
      color: "from-purple-500 to-cyan-400",
      featured: true,
      link: "/whitepaper/full",
      icon: FileText,
      highlights: ["NeuraLink Consensus", "5K-20K TPS", "AI-Optimized", "EVM Compatible"],
      contentPreview: {
        sections: [
          "Executive Summary", "Vision & Mission", "Problems & Solutions", 
          "Architecture & Technology", "Tokenomics", "Governance & Treasury",
          "Roadmap", "Funding & Investment", "Ecosystem & Use Cases", 
          "Risk & Compliance", "Technical Appendices A-F"
        ],
        keyPoints: [
          "Targets $500B AI-blockchain and $16T RWA markets",
          "AI reduces validator downtime by 20%",
          "EVM-compatible AurlinkVM with AI extensions",
          "1B $AUR fixed supply with DAO governance"
        ]
      }
    },
    {
      title: "NeuraLink Consensus Protocol",
      description: "AI-enhanced DPoS consensus with fault prediction, validator optimization, and 15% throughput gains.",
      version: "v2.1.0",
      date: "2024-01-08",
      author: "Prof. Michael Chen",
      pages: 45,
      category: "Consensus",
      color: "from-cyan-400 to-[#00F5FF]",
      link: "/whitepaper/neuralink-consensus",
      icon: Zap,
      highlights: ["Hybrid DPoS", "AI Optimization", "Fault Prediction", "5K-20K TPS"]
    },
    {
      title: "AurlinkVM Architecture",
      description: "EVM-compatible virtual machine with AI precompiles, zk-SNARK support, and neural optimization layer.",
      version: "v1.2.0",
      date: "2024-01-10",
      author: "Dr. Elena Rodriguez",
      pages: 62,
      category: "Virtual Machine",
      color: "from-[#00F5FF] to-cyan-300",
      link: "/whitepaper/aurlinkvm",
      icon: Cpu,
      highlights: ["EVM Compatibility", "AI Precompiles", "ZK-SNARK", "Gas Optimization"]
    },
    {
      title: "Tokenomics & Economic Model",
      description: "Complete $AUR token economics, distribution, emission schedule, and governance mechanisms.",
      version: "v1.1.0",
      date: "2024-01-01",
      author: "Finance Research Team",
      pages: 38,
      category: "Economics",
      color: "from-cyan-300 to-purple-400",
      link: "/whitepaper/tokenomics",
      icon: Network,
      highlights: ["1B Fixed Supply", "DAO Governance", "Staking Rewards", "Ecosystem Grants"]
    },
    {
      title: "Cross-Chain Interoperability",
      description: "Aurlink Connect protocol for trust-minimized bridges and AI-guided cross-chain routing.",
      version: "v1.3.0",
      date: "2024-01-03",
      author: "Alex Thompson",
      pages: 42,
      category: "Interoperability",
      color: "from-purple-400 to-cyan-400",
      link: "/whitepaper/cross-chain",
      icon: GitBranch,
      highlights: ["Multi-Chain", "AI Routing", "25% Slippage Reduction", "Light Clients"]
    },
    {
      title: "RWA Tokenization Framework",
      description: "ZK-proof real-world asset tokenization with compliance and regulatory frameworks.",
      version: "v1.0.0",
      date: "2024-01-15",
      author: "Compliance Team",
      pages: 35,
      category: "Compliance",
      color: "from-cyan-500 to-[#00F5FF]",
      link: "/whitepaper/rwa-tokenization",
      icon: Shield,
      highlights: ["ZK-Proofs", "MiCA Compliant", "KYC/AML", "$1B RWA Target"]
    }
  ]

  // Real white paper content sections from the document
  const whitePaperContent = {
    executiveSummary: {
      investors: "Aurlink targets the $500B AI-blockchain and $16T RWA markets (Gartner), driving 15% ROI via $AUR demand from 1,000 dApps by Q4 2026. A 10% pre-sale allocation (100M $AUR) supports early investment. The NeuraLink Consensus uses AI to reduce validator downtime by 20% and boost throughput by 15% (Q4 2025 simulations, Nature 2023). A $500,000 seed round funds testnet (Q1 2026), targeting 5,000–20,000 TPS.",
      developers: "EVM-compatible AurlinkVM and AI-powered SDKs cut development time by 30%, with $1M in grants.",
      enterprises: "Aurlink Connect reduces cross-chain slippage by 25%, and ZK-proof RWA tokenization ensures compliance, targeting $1B in assets by 2028.",
      riskMitigation: "Federated learning, DAO governance, and Q2 2026 audits ensure security."
    },
    visionMission: {
      vision: "Globally trusted AI-powered blockchain bridging Web3 and traditional economies.",
      mission: "Deliver scalable, AI-driven infrastructure for developers and enterprises.",
      goals: [
        "Onboard 1,000 developers (Q3 2026)",
        "Achieve 10,000 TPS", 
        "Support $100M in RWAs (Q4 2026)"
      ]
    },
    problemsSolutions: [
      {
        problem: "Scalability Limitations",
        impact: "High gas fees ($20–$50) and congestion deter users; 10% of dApps fail due to scaling issues.",
        solution: "NeuraLink Consensus: Hybrid DPoS with AI-optimized validator selection achieves 5,000–20,000 TPS, with 15% throughput gains via RL tuning (Q4 2025 simulations).",
        benefits: "Investors: Scalability drives $AUR demand. Developers: High-throughput dApps. Enterprises: Supports enterprise volumes."
      },
      {
        problem: "Fragmented Liquidity", 
        impact: "Cross-chain DeFi incurs $500M in annual slippage due to poor interoperability; 20% of DeFi users avoid cross-chain swaps.",
        solution: "Aurlink Connect: AI-driven liquidity router (GNN) reduces slippage by 25%, with light-client bridges to Ethereum, Solana, Cosmos.",
        benefits: "Investors: Increases DeFi TVL. Developers: Simplifies cross-chain dApps. Enterprises: Enables asset transfers."
      },
      {
        problem: "Limited AI Integration",
        impact: "Lack of predictive analytics causes 10% validator downtime and oracle manipulation risks; 15% of DeFi hacks tied to oracle failures.",
        solution: "Neural Optimization Layer (NOL): AI oracles (ensemble models) reduce manipulation by 25%; anomaly detection (90% accuracy) cuts downtime by 20%.",
        benefits: "Investors: Enhances $AUR utility. Developers: Plug-and-play AI tools. Enterprises: Risk scoring for RWAs."
      }
    ],
    architecture: {
      neuralink: {
        mechanism: "Hybrid DPoS with AI-optimized validator selection. Validators elected via $AUR delegations propose and finalize blocks.",
        models: [
          "Supervised Learning: XGBoost (10,000 samples, 50 features) predicts faults; 90% accuracy, 0.85 F1-score",
          "Reinforcement Learning: Deep Q-Network (DQN, 3-layer, 1M samples/epoch) optimizes block time (0.3–0.5s) and gas limits (10M–50M); 15% TPS gains",
          "Anomaly Detection: Isolation Forest flags Byzantine behavior (90% recall)"
        ],
        performance: "5,000–20,000 TPS, 1.5s finality, 20% downtime reduction (Q4 2025)"
      },
      aurlinkVM: {
        features: "EVM-compatible with AI/RWA extensions. Supports Solidity/Vyper; ports Ethereum dApps.",
        extensions: "Precompiles for zk-SNARK (Groth16, 200ms), AI data access (merkleized telemetry), ERC-4337 gas sponsorship.",
        optimization: "Linear regression on mempool size reduces fees by 10%"
      }
    },
    tokenomics: {
      utility: ["Gas: Transaction fees", "Staking: Validator bonding", "Governance: Protocol upgrades", "Incentives: DeFi collateral"],
      supply: {
        total: "1B $AUR (fixed)",
        distribution: [
          { allocation: "Pre-Sale", percentage: "10%", tokens: "100M", notes: "Investor allocation, 12-month lockup" },
          { allocation: "Ecosystem & Grants", percentage: "25%", tokens: "250M", notes: "$1M for dApps" },
          { allocation: "Team & Advisors", percentage: "15%", tokens: "150M", notes: "36-month vesting, 12-month cliff" }
        ]
      },
      emission: [
        { year: "Year 0", tokens: "200M", remarks: "Genesis, including pre-sale" },
        { year: "Year 1", tokens: "100M", remarks: "Validator rewards" },
        { year: "Year 2", tokens: "80M", remarks: "Ecosystem growth" }
      ]
    },
    roadmap: [
      { phase: "Phase 1: Testnet Alpha", date: "Q1 2026", deliverables: "100 validators, 90% fault accuracy" },
      { phase: "Phase 2: Public Testnet", date: "Q2 2026", deliverables: "Audits, $1M grants, AI routing" },
      { phase: "Phase 3: Mainnet", date: "Q3 2026", deliverables: "AI oracles, 50 dApps" },
      { phase: "Phase 4: Growth", date: "Q4 2026-2027", deliverables: "$100M RWAs" }
    ],
    appendices: {
      a: {
        title: "Technical Feasibility of NeuraLink & NOL",
        overview: "NeuraLink and NOL integrate AI to enhance scalability and reliability, with detailed model architectures and data flows.",
        architecture: {
          telemetry: "1TB/day, 100ms sampling, Kafka pipeline, <5% node overhead",
          aiModels: "XGBoost (90% accuracy), DQN (15% TPS gains), Isolation Forest (90% recall)",
          training: "NVIDIA A100 GPUs, 8-hour training, TensorFlow/PyTorch, 1GB model"
        }
      },
      b: {
        title: "Simulation Specification", 
        overview: "Validates NeuraLink and NOL, targeting 15% TPS gains, 90% fault accuracy, 20% finality reduction.",
        setup: "Cosmos SDK simulator, 100-1,000 nodes, 10,000 TPS bursts, 10% fault rate",
        metrics: "15% TPS increase, 90% fault accuracy, 20% finality reduction, <5% network latency overhead"
      }
    }
  }

  const whitePaperSections = [
    { title: "Executive Summary", icon: FileText, description: "Overview for investors, developers, and enterprises" },
    { title: "Vision & Mission", icon: Target, description: "Global AI-powered blockchain vision" },
    { title: "Problems & Solutions", icon: Zap, description: "Blockchain challenges and Aurlink's solutions" },
    { title: "Architecture & Technology", icon: Cpu, description: "Technical deep dive into all components" },
    { title: "Tokenomics", icon: Network, description: "$AUR utility, supply, and distribution" },
    { title: "Governance & Treasury", icon: Shield, description: "DAO governance and fund management" },
    { title: "Roadmap", icon: GitBranch, description: "Development timeline and milestones" },
    { title: "Risk & Compliance", icon: Database, description: "Security measures and regulatory compliance" },
    { title: "Technical Appendices", icon: Settings, description: "Detailed specifications and pseudocode" }
  ]

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
              Aurlink
              <span className="block bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Technical Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete technical specifications, architecture deep-dives, and research papers for the Aurlink ecosystem. Based on the official v1.3 White Paper.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main White Paper Feature */}
      <section className="py-20 bg-gradient-to-b from-[#0A0F2C] to-[#071226]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="relative bg-gradient-to-r from-purple-500/20 to-cyan-400/20 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-8 group hover:border-cyan-400/50 transition-all duration-500">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-2">
                        Official White Paper
                      </span>
                      <h2 className="text-3xl font-bold text-white">Aurlink White Paper v1.3</h2>
                      <p className="text-gray-300 mt-2">Investor Release Candidate • Approved for External Presentation</p>
                    </div>
                  </div>
                  
                  {/* Real Executive Summary Content */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Executive Summary</h3>
                    <div className="space-y-4">
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-400 mb-2">For Investors</h4>
                        <p className="text-gray-300 text-sm">{whitePaperContent.executiveSummary.investors}</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                          <h4 className="font-semibold text-green-400 mb-2">For Developers</h4>
                          <p className="text-gray-300 text-sm">{whitePaperContent.executiveSummary.developers}</p>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                          <h4 className="font-semibold text-purple-400 mb-2">For Enterprises</h4>
                          <p className="text-gray-300 text-sm">{whitePaperContent.executiveSummary.enterprises}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="text-center p-4 bg-white/5 rounded-xl group/highlight hover:bg-cyan-500/20 transition-all">
                      <div className="text-2xl font-bold text-cyan-400 group-hover/highlight:scale-110 transition-transform">5K-20K</div>
                      <div className="text-sm text-gray-400">TPS</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl group/highlight hover:bg-purple-500/20 transition-all">
                      <div className="text-2xl font-bold text-purple-400 group-hover/highlight:scale-110 transition-transform">15%</div>
                      <div className="text-sm text-gray-400">Throughput Gain</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl group/highlight hover:bg-green-500/20 transition-all">
                      <div className="text-2xl font-bold text-green-400 group-hover/highlight:scale-110 transition-transform">1.5s</div>
                      <div className="text-sm text-gray-400">Finality</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl group/highlight hover:bg-blue-500/20 transition-all">
                      <div className="text-2xl font-bold text-blue-400 group-hover/highlight:scale-110 transition-transform">1B</div>
                      <div className="text-sm text-gray-400">$AUR Supply</div>
                    </div>
                  </div>

                  {/* Section Preview */}
                  <div className="mb-8">
                    <h4 className="text-white font-semibold mb-4">Document Sections</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {whitePaperSections.map((section, index) => {
                        const IconComponent = section.icon;
                        return (
                          <div key={section.title} className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 rounded-lg p-3">
                            <IconComponent className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs">{section.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <motion.a
                    href="/whitepaper/full"
                    className="inline-flex items-center justify-center gap-3 w-full max-w-sm py-4 bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all group/button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Read Full White Paper</span>
                    <ArrowRight className="w-5 h-5 group-hover/button:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
                
                {/* Document Details */}
                <div className="lg:w-80 bg-black/30 rounded-2xl p-6 border border-white/10 group-hover:border-cyan-400/30 transition-all">
                  <h4 className="font-semibold text-white mb-4">Document Details</h4>
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Version:</span>
                      <span className="text-cyan-400">v1.3.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Release Date:</span>
                      <span className="text-gray-300">October 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400">Approved</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pages:</span>
                      <span className="text-gray-300">85</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Network:</span>
                      <span className="text-purple-400">NeuraLink</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                      <p className="text-xs text-cyan-300">
                        <strong>Compliance:</strong> MiCA & FINMA aligned
                      </p>
                    </div>
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <p className="text-xs text-purple-300">
                        <strong>Target:</strong> $16T RWA Market
                      </p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <p className="text-xs text-green-300">
                        <strong>AI Integration:</strong> 20% downtime reduction
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="font-semibold text-white mb-3">Key Features</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <CheckCircle className="w-3 h-3" />
                        <span>AI-Optimized Consensus</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-400">
                        <CheckCircle className="w-3 h-3" />
                        <span>EVM Compatibility</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-3 h-3" />
                        <span>Cross-Chain Interop</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-400">
                        <CheckCircle className="w-3 h-3" />
                        <span>RWA Tokenization</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technical Documentation Grid */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white text-center mb-12">Technical Specifications</h3>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {technicalDocs.filter(doc => !doc.featured).map((doc, index) => {
                const IconComponent = doc.icon;
                return (
                  <motion.div
                    key={doc.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                    className="group"
                  >
                    <div className="relative h-full bg-[#1A1F3C]/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 transition-all duration-500 group-hover:border-purple-500/30 group-hover:bg-[#1A1F3C]/60 group-hover:transform group-hover:-translate-y-2">
                      
                      {/* Gradient Header */}
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${doc.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                        {doc.title}
                      </h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">{doc.description}</p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {doc.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/5 text-cyan-400 text-xs rounded-full border border-cyan-400/20"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* Metadata */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{doc.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <User className="w-4 h-4" />
                          <span>{doc.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <BookOpen className="w-4 h-4" />
                          <span>{doc.pages} pages • {doc.category}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-cyan-400">
                          <span>Version: {doc.version}</span>
                        </div>
                      </div>

                      {/* Read Button */}
                      <motion.a
                        href={doc.link}
                        className="flex items-center justify-center gap-3 w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all group/button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <BookOpen className="w-5 h-5" />
                        <span>Read Specification</span>
                        <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                      </motion.a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Documentation Hub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl border border-white/10 p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">Complete Technical Documentation</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Access the full Aurlink technical ecosystem including API references, SDK documentation, and implementation guides.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/whitepaper/full"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Read Full White Paper</span>
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="/docs"
                  className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-5 h-5" />
                  <span>Developer Documentation</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}