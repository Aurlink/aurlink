// app/learn/investors/page.tsx
'use client';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Users, Zap } from 'lucide-react';

export default function InvestorsPage() {
  const metrics = [
    { value: '$2.5B', label: 'Total Addressable Market', description: 'Blockchain interoperability market size by 2025' },
    { value: '47%', label: 'Annual Growth', description: 'Projected CAGR for cross-chain solutions' },
    { value: '15M+', label: 'Target Users', description: 'Potential user base across integrated chains' },
    { value: '24/7', label: 'Uptime', description: 'Enterprise-grade reliability guarantee' },
  ];

  const investmentHighlights = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Patent-Pending Technology',
      description: 'Protected AI-blockchain fusion with 5 pending patents in interoperability space'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Proven Revenue Model',
      description: 'Multiple revenue streams: transaction fees, enterprise licensing, and premium API access'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Strategic Partnerships',
      description: 'Established relationships with major blockchain foundations and enterprise clients'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'First-Mover Advantage',
      description: 'Pioneering AI-driven cross-chain solutions in rapidly expanding market'
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
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Opportunity</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Join the frontier of blockchain interoperability. Aurlink is positioned to capture the $2.5B 
              cross-chain market with AI-enhanced infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                Read Investor Deck
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border border-cyan-400 text-cyan-400 rounded-xl font-semibold hover:bg-cyan-400/10 transition-all duration-300">
                Schedule Meeting
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{metric.value}</div>
                <div className="text-lg font-semibold text-white mb-2">{metric.label}</div>
                <div className="text-sm text-gray-400">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Invest</span> in Aurlink?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {investmentHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {highlight.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{highlight.title}</h3>
                <p className="text-gray-300 leading-relaxed">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Analysis */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Market Position & Competitive Edge</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-4">Market Opportunity</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>$2.5B blockchain interoperability market by 2025 (Gartner)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>47% CAGR in cross-chain transaction volume</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Enterprise blockchain adoption growing at 65% annually</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-4">Competitive Advantage</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>AI-powered security reduces bridge exploits by 92%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>5x faster transaction processing vs competitors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Multi-chain support: Ethereum, BSC, Polygon, Solana, and more</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}