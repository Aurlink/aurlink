// app/docs/page.tsx
'use client'
import { motion } from 'framer-motion'
import { 
  BookOpen, Code, Cpu, Database, Zap, Network, Shield, 
  GitBranch, Brain, Settings, FileText, ArrowRight,
  Search, Play, Terminal, Download,
  ChevronRight, ExternalLink, Users, BarChart3,
  Key, Wallet, Server, Cloud, Lock,
  Copy, Check, MessageCircle, Github, Twitter,
  Mail, Rocket, Globe, Cog, Coins,
  CheckCircle, Clock, Star, Zap as Lightning
} from 'lucide-react'
import { useState, useEffect } from 'react'

// Reading Progress Component
function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const windowHeight = scrollHeight - clientHeight
      const currentProgress = (scrollTop / windowHeight) * 100
      setProgress(currentProgress)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50">
      <div 
        className="h-full bg-cyan-400 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// Table of Contents Component
function TableOfContents({ categories }: { categories: any[] }) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )

    categories.forEach(category => {
      const element = document.getElementById(category.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [categories])

  return (
    <div className="hidden lg:block sticky top-24">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h4 className="font-semibold text-white mb-4">On This Page</h4>
        <nav className="space-y-2">
          {categories.map(category => (
            <a 
              key={category.id} 
              href={`#${category.id}`}
              className={`block text-sm transition-colors py-1 ${
                activeSection === category.id 
                  ? 'text-cyan-400 font-medium' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {category.title}
            </a>
          ))}
        </nav>
        
        <div className="mt-6 pt-6 border-t border-white/10">
          <h5 className="font-semibold text-white mb-3">Quick Actions</h5>
          <div className="space-y-2">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors w-full text-left"
            >
              <Download className="w-4 h-4" />
              Export as PDF
            </button>
            <button 
              onClick={() => {
                const links = categories.map(cat => `#${cat.id} - ${cat.title}`).join('\n')
                navigator.clipboard.writeText(links)
              }}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors w-full text-left"
            >
              <Copy className="w-4 h-4" />
              Copy All Links
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Code Snippet Component
function CodeSnippet({ 
  code, 
  language = 'javascript'
}: { 
  code: string; 
  language?: string;
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="relative bg-gray-900 rounded-lg p-4 my-4 border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-400 text-sm font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded text-sm text-gray-300 hover:bg-gray-700 transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="text-sm text-gray-100 overflow-x-auto font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// Documentation Content Component
function DocumentationContent({ doc }: { doc: any }) {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-white mb-6">{doc.content.title}</h2>
      <p className="text-xl text-gray-300 mb-8">{doc.content.description}</p>
      
      {doc.content.features && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {doc.content.features.map((feature: any, index: number) => {
            const FeatureIcon = feature.icon
            return (
              <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <FeatureIcon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      )}

      {doc.content.steps && (
        <div className="space-y-6 mb-8">
          {doc.content.steps.map((step: any, index: number) => (
            <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 text-sm font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">{step.description}</p>
              {step.code && <CodeSnippet code={step.code} />}
            </div>
          ))}
        </div>
      )}

      {doc.content.components && (
        <div className="space-y-6">
          {doc.content.components.map((component: any, index: number) => (
            <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">{component.name}</h3>
              <p className="text-gray-300 mb-4">{component.description}</p>
              <ul className="space-y-2">
                {component.details.map((detail: string, detailIndex: number) => (
                  <li key={detailIndex} className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [activeDoc, setActiveDoc] = useState<any>(null)
  const [showAllContent, setShowAllContent] = useState(false)

  // All documentation content is now self-contained in this file
  const documentationContent = {
    introduction: {
      title: "Welcome to Aurlink",
      description: "Aurlink is a next-generation blockchain platform that combines AI-powered consensus with EVM compatibility, enabling developers to build intelligent, scalable decentralized applications.",
      features: [
        {
          icon: Brain,
          title: "AI-Enhanced Consensus",
          description: "NeuraLink consensus mechanism with machine learning optimization"
        },
        {
          icon: Zap,
          title: "High Performance",
          description: "10,000+ TPS with sub-second finality through optimized execution"
        },
        {
          icon: GitBranch,
          title: "Cross-Chain Native",
          description: "Built-in interoperability with Ethereum, Polygon, and other major chains"
        },
        {
          icon: Shield,
          title: "Enterprise Security",
          description: "Military-grade security with formal verification and AI-powered auditing"
        }
      ]
    },
    quickStart: {
      title: "Quick Start Guide",
      steps: [
        {
          title: "Install Aurlink CLI",
          description: "Get started with our command-line interface",
          code: `npm install -g @aurlink/cli\n# or using yarn\nyarn global add @aurlink/cli`
        },
        {
          title: "Initialize Your Project",
          description: "Create a new Aurlink dApp project",
          code: `aurlink init my-dapp\ncd my-dapp\nnpm install`
        },
        {
          title: "Configure Your Environment",
          description: "Set up your development environment",
          code: `# Create .env file\ncp .env.example .env\n\n# Add your configuration\nAURLINK_NETWORK=testnet\nPRIVATE_KEY=your_private_key\nAPI_KEY=your_api_key`
        },
        {
          title: "Deploy Your First Contract",
          description: "Deploy a smart contract to Aurlink testnet",
          code: `# Compile your contract\naurlink compile\n\n# Deploy to testnet\naurlink deploy --network testnet`
        }
      ]
    },
    architecture: {
      title: "System Architecture",
      components: [
        {
          name: "NeuraLink Consensus",
          description: "AI-enhanced Delegated Proof-of-Stake consensus with predictive block validation",
          details: [
            "Machine learning-based validator selection",
            "Predictive transaction ordering",
            "Adaptive block size optimization",
            "Real-time network health monitoring"
          ]
        },
        {
          name: "Aurlink Virtual Machine",
          description: "EVM-compatible execution environment with AI precompiles and optimizations",
          details: [
            "Full EVM bytecode compatibility",
            "AI-powered gas optimization",
            "Neural network inference precompiles",
            "Hardware acceleration support"
          ]
        },
        {
          name: "Cross-Chain Bridge",
          description: "Trustless interoperability protocol for asset and data transfer",
          details: [
            "Multi-chain asset bridging",
            "Cross-chain message passing",
            "Liquidity aggregation",
            "Fraud detection system"
          ]
        }
      ]
    },
    neuraLink: {
      title: "NeuraLink Consensus Protocol",
      description: "Advanced consensus combining staking with machine learning for optimal network performance",
      features: [
        {
          icon: Brain,
          title: "AI-Powered Validator Selection",
          description: "Machine learning algorithms select validators based on performance, reliability, and stake"
        },
        {
          icon: Lightning,
          title: "Predictive Block Proposal",
          description: "AI models predict optimal transaction ordering for maximum throughput"
        },
        {
          icon: Coins,
          title: "Dynamic Reward Distribution",
          description: "Smart reward system that adapts to network conditions and validator performance"
        },
        {
          icon: Shield,
          title: "Sybil Attack Resistance",
          description: "Advanced identity verification and stake-based security measures"
        }
      ]
    },
    aurlinkVM: {
      title: "Aurlink Virtual Machine",
      description: "Enhanced EVM execution environment with native AI capabilities and optimizations",
      features: [
        {
          icon: Code,
          title: "Ethereum Compatibility",
          description: "Full support for existing Ethereum smart contracts and tooling"
        },
        {
          icon: Brain,
          title: "AI Precompiles",
          description: "Built-in functions for neural network inference and machine learning"
        },
        {
          icon: Cog,
          title: "Gas Optimization",
          description: "AI-powered gas estimation and optimization for cost-effective execution"
        },
        {
          icon: Rocket,
          title: "Hardware Acceleration",
          description: "GPU and TPU support for compute-intensive operations"
        }
      ]
    },
    tokenomics: {
      title: "$AUR Token Economics",
      description: "Comprehensive token utility and economic model designed for sustainable growth",
      features: [
        {
          icon: Network,
          title: "Network Security",
          description: "Stake $AUR to participate in consensus and secure the network"
        },
        {
          icon: Users,
          title: "Governance",
          description: "Vote on protocol upgrades and parameter changes"
        },
        {
          icon: Cloud,
          title: "Transaction Fees",
          description: "Pay for computation, storage, and AI services on the network"
        },
        {
          icon: Star,
          title: "Validator Incentives",
          description: "Earn rewards for operating nodes and providing services"
        }
      ]
    }
  }

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-400',
      docs: [
        {
          title: 'Introduction to Aurlink',
          description: 'Overview of the Aurlink ecosystem and its core components',
          icon: BookOpen,
          content: documentationContent.introduction,
          tags: ['beginner', 'overview'],
          estimatedTime: '5 min read'
        },
        {
          title: 'Quick Start Guide',
          description: 'Set up your development environment and deploy your first dApp',
          icon: Play,
          content: documentationContent.quickStart,
          tags: ['tutorial', 'setup'],
          estimatedTime: '15 min read'
        },
        {
          title: 'Architecture Overview',
          description: 'Deep dive into Aurlink modular architecture and components',
          icon: Cpu,
          content: documentationContent.architecture,
          tags: ['architecture', 'technical'],
          estimatedTime: '10 min read'
        }
      ]
    },
    {
      id: 'core-concepts',
      title: 'Core Concepts',
      icon: Brain,
      color: 'from-purple-500 to-pink-400',
      docs: [
        {
          title: 'NeuraLink Consensus',
          description: 'AI-enhanced DPoS consensus mechanism and validator selection',
          icon: Zap,
          content: documentationContent.neuraLink,
          tags: ['consensus', 'AI', 'staking'],
          estimatedTime: '20 min read'
        },
        {
          title: 'AurlinkVM',
          description: 'EVM-compatible virtual machine with AI precompiles',
          icon: Cpu,
          content: documentationContent.aurlinkVM,
          tags: ['VM', 'EVM', 'execution'],
          estimatedTime: '15 min read'
        },
        {
          title: 'Tokenomics & $AUR',
          description: 'Token utility, distribution, and economic model',
          icon: Wallet,
          content: documentationContent.tokenomics,
          tags: ['token', 'economics', 'staking'],
          estimatedTime: '12 min read'
        }
      ]
    }
  ]

  const featuredGuides = [
    {
      title: 'Build Your First AI-Enhanced dApp',
      description: 'Step-by-step tutorial to build a predictive DeFi application',
      category: 'Tutorial',
      level: 'Beginner',
      duration: '45 min',
      content: documentationContent.quickStart
    },
    {
      title: 'Understanding NeuraLink Consensus',
      description: 'Deep dive into AI-powered consensus mechanism',
      category: 'Guide',
      level: 'Intermediate',
      duration: '30 min',
      content: documentationContent.neuraLink
    },
    {
      title: 'AurlinkVM AI Precompiles',
      description: 'Leverage built-in AI functions in your smart contracts',
      category: 'Advanced',
      level: 'Expert',
      duration: '60 min',
      content: documentationContent.aurlinkVM
    }
  ]

  const quickLinks = [
    { title: 'API Quick Reference', icon: Code, color: 'bg-blue-500' },
    { title: 'Smart Contract Examples', icon: FileText, color: 'bg-green-500' },
    { title: 'Troubleshooting Guide', icon: Settings, color: 'bg-orange-500' },
    { title: 'Network Status', icon: BarChart3, color: 'bg-purple-500' }
  ]

  // Search functionality
  const handleSearch = (query: string) => {
    setIsSearching(true)
    setSearchQuery(query)
    setTimeout(() => setIsSearching(false), 300)
  }

  const filteredCategories = categories.map(category => ({
    ...category,
    docs: category.docs.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.docs.length > 0)

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
        searchInput?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (activeDoc && !showAllContent) {
    return (
      <div className="min-h-screen bg-[#0A0F2C] pt-20">
        <ReadingProgress />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setActiveDoc(null)}
            className="flex items-center gap-2 text-cyan-400 mb-6 hover:text-cyan-300 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Documentation
          </button>
          <DocumentationContent doc={activeDoc} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <ReadingProgress />

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Developer
              <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Everything you need to build on Aurlink. From beginner tutorials to advanced AI integration.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documentation... (Ctrl+K)"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                {isSearching && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          >
            {quickLinks.map((link, index) => (
              <motion.button
                key={link.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all group"
              >
                <div className={`w-10 h-10 ${link.color} rounded-lg flex items-center justify-center text-white`}>
                  <link.icon className="w-5 h-5" />
                </div>
                <span className="text-white font-medium text-sm">{link.title}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gradient-to-b from-[#0A0F2C] to-[#071226]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              
              {/* Featured Tutorials */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-white mb-8">Featured Guides</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {featuredGuides.map((guide, index) => (
                    <motion.div
                      key={guide.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group cursor-pointer"
                      onClick={() => {
                        setActiveDoc({
                          title: guide.title,
                          content: guide.content
                        })
                        setShowAllContent(false)
                      }}
                    >
                      <div className="relative h-full bg-gradient-to-br from-blue-500/10 to-cyan-400/10 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6 transition-all duration-500 group-hover:border-cyan-400/30 group-hover:transform group-hover:-translate-y-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                            {guide.category}
                          </span>
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                            {guide.level}
                          </span>
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full ml-auto">
                            {guide.duration}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{guide.title}</h3>
                        <p className="text-gray-300 text-sm mb-4">{guide.description}</p>
                        <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all">
                          Read Guide
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Documentation Categories */}
              <div className="space-y-12">
                {filteredCategories.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
                    <p className="text-gray-400">
                      Try different keywords or browse the categories below
                    </p>
                  </motion.div>
                ) : (
                  filteredCategories.map((category, categoryIndex) => {
                    const IconComponent = category.icon
                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                        id={category.id}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {category.docs.map((doc, docIndex) => {
                            const DocIcon = doc.icon
                            return (
                              <motion.div
                                key={doc.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (docIndex * 0.05) }}
                                className="group cursor-pointer"
                                onClick={() => {
                                  setActiveDoc(doc)
                                  setShowAllContent(false)
                                }}
                              >
                                <div className="relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 transition-all duration-500 group-hover:border-cyan-400/30 group-hover:bg-white/10 group-hover:transform group-hover:-translate-y-1">
                                  <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
                                      <DocIcon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                          {doc.title}
                                        </h3>
                                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
                                      </div>
                                      <p className="text-gray-300 text-sm mb-3">{doc.description}</p>
                                      <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                          {doc.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded">
                                              {tag}
                                            </span>
                                          ))}
                                        </div>
                                        <span className="text-gray-400 text-xs">{doc.estimatedTime}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </div>

              {/* Show All Content Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-16 text-center"
              >
                <button
                  onClick={() => setShowAllContent(true)}
                  className="inline-flex items-center gap-3 bg-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-cyan-600 transition-all"
                >
                  <BookOpen className="w-5 h-5" />
                  View Complete Documentation
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>

            {/* Table of Contents Sidebar */}
            <div className="lg:w-80">
              <TableOfContents categories={categories} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}