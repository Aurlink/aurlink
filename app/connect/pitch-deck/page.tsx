// app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function EnterprisePitchDeck() {
  const [activeSection, setActiveSection] = useState('executive-summary');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Executive Summary', href: '#executive-summary' },
    { name: 'Vision', href: '#vision' },
    { name: 'Problem', href: '#problem' },
    { name: 'Solution', href: '#solution' },
    { name: 'Technology', href: '#technology' },
    { name: 'Market', href: '#market' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Investment', href: '#investment' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id')!;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const StatCard = ({ number, label, suffix = '' }) => (
    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
      <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        {number}{suffix}
      </div>
      <div className="text-gray-400 text-sm mt-2">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Navigation Header */}
      <header className="fixed top-0 z-50 w-full bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-white font-semibold text-xl">Aurlink</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="hidden lg:block">
              <button 
                onClick={() => scrollToSection('#investment')}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-6 py-2.5 rounded-lg text-white font-semibold text-sm transition-all duration-300 transform hover:scale-105"
              >
                Invest Now
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-6 h-0.5 bg-gray-300"></div>
                <div className="w-6 h-0.5 bg-gray-300"></div>
                <div className="w-6 h-0.5 bg-gray-300"></div>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/10">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-300 hover:text-white font-medium text-left"
                  >
                    {item.name}
                  </button>
                ))}
                <button 
                  onClick={() => scrollToSection('#investment')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-4 py-2 rounded-lg text-white font-semibold text-sm transition-all duration-300"
                >
                  Invest Now
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Executive Summary Section */}
      <section id="executive-summary" className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 mb-8">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-400 text-sm font-medium">AI-Powered Layer-1 Blockchain</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                The Intelligent
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Blockchain
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Aurlink is a next-generation Layer-1 blockchain that integrates artificial intelligence 
                to deliver unmatched scalability, interoperability, and developer simplicity through 
                our revolutionary NeuraLink Consensus mechanism.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">AI-driven consensus reduces downtime by <strong className="text-cyan-400">20%</strong></span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Plug-and-play modules cut dApp development time by <strong className="text-cyan-400">30%</strong></span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Targeting the <strong className="text-cyan-400">$16T RWA market</strong> by 2030</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Backed by <strong className="text-cyan-400">$500,000 seed round</strong> for Q1 2026 testnet</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('#investment')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
                >
                  Invest in Aurlink
                </button>
                <button 
                  onClick={() => scrollToSection('#technology')}
                  className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
                >
                  Explore Technology
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Aurlink?</h3>
                
                <div className="space-y-6">
                  {[
                    {
                      title: 'Solves Blockchain Trilemma',
                      description: 'AI-driven optimization delivers speed, security, and decentralization',
                      icon: '🎯'
                    },
                    {
                      title: 'Enterprise Ready',
                      description: 'Compliance-first with ZK-proofs for real-world asset tokenization',
                      icon: '🏢'
                    },
                    {
                      title: 'Developer Friendly',
                      description: 'EVM compatibility and pre-built modules accelerate development',
                      icon: '⚡'
                    },
                    {
                      title: 'Risk Mitigated',
                      description: 'Auditable AI policies with DAO governance and federated learning',
                      icon: '🛡️'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-2xl flex-shrink-0">{item.icon}</div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">20%</div>
                    <div className="text-gray-400 text-xs">Downtime Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">15%</div>
                    <div className="text-gray-400 text-xs">Higher Throughput</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">90%</div>
                    <div className="text-gray-400 text-xs">Fault Prediction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">30%</div>
                    <div className="text-gray-400 text-xs">Faster Development</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            {[
              {
                title: 'Technology',
                description: 'AI-native architecture',
                href: '#technology',
                icon: '🤖',
                color: 'from-blue-500 to-cyan-400'
              },
              {
                title: 'Market',
                description: '$1.4T opportunity',
                href: '#market',
                icon: '📈',
                color: 'from-green-500 to-emerald-400'
              },
              {
                title: 'Investment',
                description: '$500K seed round',
                href: '#investment',
                icon: '💎',
                color: 'from-purple-500 to-pink-400'
              }
            ].map((card, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(card.href)}
                className="group text-left p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-xl">{card.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm">{card.description}</p>
                <div className="text-cyan-400 text-sm mt-3 flex items-center space-x-1">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our <span className="text-cyan-400">Vision</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A globally trusted blockchain ecosystem where AI powers intelligent DeFi, 
              tokenized assets, and autonomous infrastructure for the intelligent economy.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Key Objectives</h3>
              <div className="space-y-6">
                {[
                  {
                    target: '1,000+ Developers',
                    timeline: 'By Q3 2026',
                    description: 'Onboard via AI-driven grants and educational programs'
                  },
                  {
                    target: '10,000 TPS',
                    timeline: 'With NOL Optimization',
                    description: 'Achieve enterprise-grade transaction throughput'
                  },
                  {
                    target: '$1B in Tokenized Assets',
                    timeline: 'By 2028',
                    description: 'Support real estate and RWA tokenization'
                  },
                  {
                    target: '25% Cost Reduction',
                    timeline: 'For DeFi Transactions',
                    description: 'Through AI-optimized routing and gas estimation'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-8 h-8 bg-cyan-400/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-4 h-4 bg-cyan-400 rounded"></div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-white">{item.target}</h4>
                        <span className="text-cyan-400 text-sm bg-cyan-400/10 px-2 py-1 rounded-full">{item.timeline}</span>
                      </div>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Industry Validation</h3>
              <div className="space-y-6">
                <div className="p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <div className="text-blue-400 font-semibold mb-2">Fetch.ai Precedent</div>
                  <p className="text-gray-300 text-sm">
                    Fetch.ai's successful AI-native blockchain validates our approach, 
                    with NeuraLink adding consensus-level AI for superior performance.
                  </p>
                </div>
                
                <div className="p-6 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div className="text-green-400 font-semibold mb-2">Academic Research</div>
                  <p className="text-gray-300 text-sm">
                    Backed by 2023 Nature study on AI-enhanced consensus and 2024 Frontiers 
                    research on adaptive consensus mechanisms.
                  </p>
                </div>
                
                <div className="p-6 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <div className="text-purple-400 font-semibold mb-2">Market Timing</div>
                  <p className="text-gray-300 text-sm">
                    Perfect timing with AI and blockchain convergence, and the emerging 
                    $16T real-world asset tokenization market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Continued from previous implementation */}
      <section id="problem" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              The Blockchain <span className="text-red-400">Trilemma</span> is Real
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Current Layer-1 solutions force developers and enterprises to choose between 
              scalability, security, and decentralization.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                {[
                  {
                    icon: '⚡',
                    title: 'Performance Trade-offs',
                    description: 'Ethereum struggles with 15 TPS while sacrificing decentralization for cost efficiency.'
                  },
                  {
                    icon: '🔧',
                    title: 'Developer Complexity',
                    description: 'Building dApps requires 20+ hours integrating external oracles and analytics tools.'
                  },
                  {
                    icon: '🔀',
                    title: 'Fragmented Ecosystems',
                    description: 'Limited interoperability costs DeFi platforms $500M annually in slippage.'
                  },
                  {
                    icon: '📊',
                    title: 'Reactive Networks',
                    description: 'Static consensus mechanisms fail to adapt, reducing throughput by 15% during peak loads.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">The Cost of Compromise</h3>
                  <p className="text-gray-400">Traditional blockchains can't have it all</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: 'Scalability', value: 40, color: 'from-red-400 to-orange-400' },
                    { name: 'Security', value: 80, color: 'from-yellow-400 to-amber-400' },
                    { name: 'Decentralization', value: 60, color: 'from-blue-400 to-cyan-400' },
                    { name: 'Cost Efficiency', value: 30, color: 'from-green-400 to-emerald-400' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.name}</span>
                        <span className="text-gray-400">{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-1000`}
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              The <span className="text-cyan-400">Aurlink</span> Solution
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A next-generation Layer-1 blockchain that integrates artificial intelligence 
              at the consensus layer to deliver unmatched performance and interoperability.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-cyan-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">NeuraLink Consensus</h3>
                <div className="space-y-4">
                  {[
                    { feature: 'AI-Powered Fault Prediction', value: '90% accuracy' },
                    { feature: 'Dynamic Parameter Tuning', value: '15% higher TPS' },
                    { feature: 'Validator Optimization', value: '20% reduced downtime' },
                    { feature: 'Cross-Chain Routing', value: '25% less slippage' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0">
                      <span className="text-gray-300">{item.feature}</span>
                      <span className="text-cyan-400 font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-3">🚀 Neural Optimization Layer</h4>
                <p className="text-gray-400">
                  Reinforcement learning dynamically adjusts network parameters in real-time, 
                  optimizing performance under variable loads.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-3">🔗 Aurlink Connect</h4>
                <p className="text-gray-400">
                  AI-guided bridges to Ethereum, Solana, and Cosmos reduce cross-chain 
                  latency by 15% and slippage by 25%.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-3">🏗️ Modular Architecture</h4>
                <p className="text-gray-400">
                  Plug-and-play modules for AI oracles, KYC, and analytics cut dApp 
                  development time by 30%.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Comparison */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Competitive Advantage</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 text-gray-400 font-semibold">Feature</th>
                    <th className="text-center py-4 text-gray-400 font-semibold">Ethereum</th>
                    <th className="text-center py-4 text-gray-400 font-semibold">Solana</th>
                    <th className="text-center py-4 text-cyan-400 font-semibold">Aurlink</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'AI-Enhanced Consensus', ethereum: '❌', solana: '❌', aurlink: '✅' },
                    { feature: 'Predictive Optimization', ethereum: '❌', solana: '❌', aurlink: '✅' },
                    { feature: 'Cross-Chain AI Routing', ethereum: '❌', solana: '❌', aurlink: '✅' },
                    { feature: 'Plug-and-Play Modules', ethereum: '❌', solana: '❌', aurlink: '✅' },
                    { feature: 'RWA Compliance Ready', ethereum: '⚠️', solana: '⚠️', aurlink: '✅' }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-4 text-gray-300">{row.feature}</td>
                      <td className="text-center py-4 text-gray-400">{row.ethereum}</td>
                      <td className="text-center py-4 text-gray-400">{row.solana}</td>
                      <td className="text-center py-4 text-cyan-400 font-semibold">{row.aurlink}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Advanced <span className="text-cyan-400">Tech Stack</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built on cutting-edge AI research and blockchain technology, validated by 
              academic literature and industry precedents.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Architecture Overview</h3>
              <div className="space-y-6">
                {[
                  {
                    step: '1',
                    title: 'Telemetry Layer',
                    description: 'Real-time data collection from validators, mempool, and cross-chain bridges'
                  },
                  {
                    step: '2',
                    title: 'AI Model Training',
                    description: 'Off-chain supervised learning and RL models for optimization'
                  },
                  {
                    step: '3',
                    title: 'Policy Management',
                    description: 'DAO-approved policies for network parameter adjustments'
                  },
                  {
                    step: '4',
                    title: 'On-Chain Enforcement',
                    description: 'Smart contract execution with safety monitoring'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Technical Validation</h3>
              <div className="space-y-4">
                {[
                  { source: 'Nature (2023)', finding: '15% fault detection gains with ML' },
                  { source: 'Frontiers (2024)', finding: 'RL improves throughput by 15%' },
                  { source: 'Fetch.ai Precedent', finding: 'AI-native PoS validation' },
                  { source: 'IEEE (2025)', finding: 'Anomaly detection endorsement' }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-cyan-400 font-semibold mb-1">{item.source}</div>
                    <div className="text-gray-300 text-sm">{item.finding}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Mitigation */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Enterprise-Grade Security</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Decentralization First',
                  description: 'Federated learning and DAO governance prevent AI centralization',
                  icon: '🛡️'
                },
                {
                  title: 'Deterministic Execution',
                  description: 'On-chain enforcers ensure blockchain consensus integrity',
                  icon: '⚡'
                },
                {
                  title: 'Adversarial Protection',
                  description: 'Robust training and anomaly detection prevent ML attacks',
                  icon: '🔒'
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-6">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className="text-lg font-semibold text-white mb-3">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Market Section */}
      <section id="market" className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              $1.4T <span className="text-cyan-400">Market Opportunity</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Positioned at the intersection of AI, blockchain, and the rapidly growing 
              real-world asset tokenization market.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'Real-World Assets',
                value: '$16T',
                description: 'Projected RWA market by 2030',
                growth: '45% CAGR',
                color: 'from-green-500 to-emerald-400'
              },
              {
                title: 'AI-Blockchain Market',
                value: '$500B',
                description: 'Gartner projected market size',
                growth: '60% CAGR',
                color: 'from-blue-500 to-cyan-400'
              },
              {
                title: 'DeFi Market',
                value: '$200B',
                description: 'Current addressable market',
                growth: '35% CAGR',
                color: 'from-purple-500 to-pink-400'
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10 text-center">
                <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-white text-2xl font-bold">{item.value}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <div className="text-cyan-400 font-semibold">{item.growth}</div>
              </div>
            ))}
          </div>

          {/* Market Share Projection */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white text-center mb-8">RWA Market Capture Strategy</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total RWA Market (2030)</span>
                <span className="text-cyan-400 font-semibold">$16T</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full w-[5%] transition-all duration-1000"></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Aurlink Target: 5% Market Share</span>
                <span className="text-cyan-400 font-semibold">$800M</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              $AUR <span className="text-cyan-400">Token Economics</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Sustainable token distribution designed to align incentives across developers, 
              validators, and the community.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Token Allocation</h3>
              <div className="space-y-4">
                {[
                  { category: 'Ecosystem & Grants', percentage: '25%', amount: '250M $AUR', color: 'bg-blue-500' },
                  { category: 'Community Incentives', percentage: '20%', amount: '200M $AUR', color: 'bg-cyan-400' },
                  { category: 'Validators & Staking', percentage: '15%', amount: '150M $AUR', color: 'bg-green-500' },
                  { category: 'Team & Advisors', percentage: '15%', amount: '150M $AUR', color: 'bg-purple-500' },
                  { category: 'Pre-Sale', percentage: '10%', amount: '100M $AUR', color: 'bg-orange-500' },
                  { category: 'Strategic Partners', percentage: '10%', amount: '100M $AUR', color: 'bg-pink-500' },
                  { category: 'Reserve/Treasury', percentage: '5%', amount: '50M $AUR', color: 'bg-gray-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 ${item.color} rounded`}></div>
                      <span className="text-white font-medium">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-semibold">{item.percentage}</div>
                      <div className="text-gray-400 text-sm">{item.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Vesting Schedule</h3>
              <div className="space-y-6">
                {[
                  { group: 'Team & Advisors', schedule: '36-month vesting, 12-month cliff' },
                  { group: 'Pre-Sale Investors', schedule: '12-month lockup' },
                  { group: 'Strategic Partners', schedule: '6-month lockup' },
                  { group: 'Ecosystem Grants', schedule: 'Linear release over 24 months' }
                ].map((item, index) => (
                  <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="text-lg font-semibold text-white mb-2">{item.group}</h4>
                    <p className="text-gray-400">{item.schedule}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">AI-Optimized Staking</h4>
                <p className="text-cyan-300 text-sm">
                  NOL dynamically adjusts staking rewards based on network load and validator performance, 
                  validated in Q2 2026 testnet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Strategic <span className="text-cyan-400">Roadmap</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Clear, measurable milestones driving toward mainnet launch and ecosystem growth.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 h-full"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {[
                {
                  quarter: 'Q4 2025',
                  title: 'AI Model Simulation',
                  achievements: [
                    'Simulate NOL RL models',
                    'Target 15% TPS gains',
                    'Publish simulation report'
                  ],
                  status: 'current'
                },
                {
                  quarter: 'Q1 2026',
                  title: 'Testnet Launch',
                  achievements: [
                    'Launch with 100 validators',
                    'Validate fault prediction (90% accuracy)',
                    'Release AI SDKs'
                  ],
                  status: 'upcoming'
                },
                {
                  quarter: 'Q2 2026',
                  title: 'Ecosystem Growth',
                  achievements: [
                    '$100K AI hackathon',
                    'Deploy Aurlink Connect',
                    'Pilot AI governance'
                  ],
                  status: 'upcoming'
                },
                {
                  quarter: 'Q3 2026',
                  title: 'Mainnet Launch',
                  achievements: [
                    'Launch mainnet with AI oracles',
                    'Onboard 50 dApps',
                    'Enterprise RWA pilots'
                  ],
                  status: 'upcoming'
                },
                {
                  quarter: 'Q4 2026',
                  title: 'Global Scale',
                  achievements: [
                    'Support 1,000 dApps',
                    'Expand to multi-region clusters',
                    'Target $100M in tokenized assets'
                  ],
                  status: 'upcoming'
                }
              ].map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-white/10">
                      <div className="inline-flex items-center space-x-2 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 mb-3">
                        <span className="text-cyan-400 text-sm font-semibold">{item.quarter}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <ul className="space-y-2">
                        {item.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="text-gray-400 flex items-center">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-4 border-gray-900"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section id="investment" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-cyan-400">$500K</span> Seed Round
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join us in building the future of intelligent blockchain infrastructure.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Use of Proceeds</h3>
              <div className="space-y-4">
                {[
                  { category: 'Core Development', percentage: '35%', amount: '$175K', description: 'NeuraLink consensus and EVM layer' },
                  { category: 'AI SDK & NOL', percentage: '25%', amount: '$125K', description: 'RL models and fault prediction' },
                  { category: 'Bridge Development', percentage: '15%', amount: '$75K', description: 'Aurlink Connect to Ethereum/Solana' },
                  { category: 'Ecosystem Tools', percentage: '10%', amount: '$50K', description: 'Developer portal and analytics' },
                  { category: 'Legal & Audit', percentage: '10%', amount: '$50K', description: 'AI model and smart contract audits' },
                  { category: 'Marketing & Community', percentage: '5%', amount: '$25K', description: 'Hackathons and awareness' }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-semibold">{item.category}</h4>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-cyan-400 font-semibold">{item.percentage}</div>
                        <div className="text-gray-400 text-sm">{item.amount}</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: item.percentage }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Investment Highlights</h3>
              <div className="space-y-4 mb-8">
                {[
                  'First-mover in AI-native consensus layer',
                  '$500B AI-blockchain market opportunity',
                  '15% TPS improvement validated in simulations',
                  'Enterprise-grade RWA compliance ready',
                  'Backed by academic research and industry precedent'
                ].map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-gray-900 rounded"></div>
                    </div>
                    <span className="text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Expected ROI</h4>
                <p className="text-cyan-300 text-sm">
                  $125K in AI development will enable 1,000 dApps by Q4 2026, 
                  driving significant $AUR token demand and ecosystem growth.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Invest in the Future?</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join our seed round and help build the intelligent blockchain infrastructure 
                for the next generation of decentralized applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25">
                  Schedule Investment Call
                </button>
                <button className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                  View Pitch Deck PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-white font-semibold text-xl">Aurlink</span>
              </div>
              <p className="text-gray-400 text-sm">
                The intelligent Layer-1 blockchain powered by AI-driven consensus.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('#technology')} className="text-gray-400 hover:text-cyan-400 transition-colors">Technology</button></li>
                <li><button onClick={() => scrollToSection('#solution')} className="text-gray-400 hover:text-cyan-400 transition-colors">Solutions</button></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('#executive-summary')} className="text-gray-400 hover:text-cyan-400 transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('#vision')} className="text-gray-400 hover:text-cyan-400 transition-colors">Vision</button></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Aurlink Blockchain. All rights reserved. 
              <span className="block mt-2 text-gray-500">
                Built with ❤️ for the future of decentralized intelligence.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}