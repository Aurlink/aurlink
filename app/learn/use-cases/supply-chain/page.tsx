// app/learn/use-cases/supply-chain/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Package, Shield, TrendingUp, Clock, Globe, BarChart3, ArrowRight, Users } from 'lucide-react';

export default function SupplyChainPage() {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'End-to-End Transparency',
      description: 'Immutable tracking from raw materials to end consumer with real-time verification',
      impact: 'Eliminate $2.3B in counterfeit goods'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Operational Efficiency',
      description: 'Automated processes reduce manual errors and streamline global logistics',
      impact: '47% reduction in operational costs'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Real-Time Monitoring',
      description: 'Live tracking of shipments, conditions, and compliance across the entire chain',
      impact: '89% faster issue resolution'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Compliance',
      description: 'Automated regulatory compliance across 150+ countries with smart contract enforcement',
      impact: '100% audit trail compliance'
    },
  ];

  const caseStudies = [
    {
      company: 'Global Pharma Inc',
      challenge: 'Drug counterfeiting costing $200M annually',
      solution: 'Aurlink pharmaceutical tracking',
      result: 'Zero counterfeit incidents in 12 months'
    },
    {
      company: 'Auto Manufacturers Ltd',
      challenge: 'Supply chain disruptions causing $150M losses',
      solution: 'Real-time parts tracking system',
      result: '98% on-time delivery rate achieved'
    },
    {
      company: 'Food Distributors Corp',
      challenge: 'Food spoilage and recall inefficiencies',
      solution: 'Temperature and condition monitoring',
      result: '99.7% reduction in spoilage losses'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-6 py-3 mb-8">
              <Package className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Supply Chain Revolution</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Supply Chain <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Transformed</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Transform global supply chains with blockchain-powered transparency, AI-driven optimization, 
              and real-time tracking across every step of your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                Request Demo
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border border-emerald-400 text-emerald-400 rounded-xl font-semibold hover:bg-emerald-400/10 transition-all duration-300">
                Download Case Study
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">{benefit.description}</p>
                <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-lg p-4">
                  <div className="text-emerald-400 font-semibold text-sm">BUSINESS IMPACT</div>
                  <div className="text-white font-bold text-lg mt-1">{benefit.impact}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Success Stories</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-400/20 rounded-2xl p-8 hover:border-emerald-400/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-4">{study.company}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-emerald-400 font-semibold mb-1">Challenge</div>
                    <div className="text-gray-300 text-sm">{study.challenge}</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-400 font-semibold mb-1">Solution</div>
                    <div className="text-gray-300 text-sm">{study.solution}</div>
                  </div>
                  <div>
                    <div className="text-sm text-yellow-400 font-semibold mb-1">Result</div>
                    <div className="text-gray-300 text-sm font-semibold">{study.result}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-400/20 rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold text-white mb-6">Technology Stack</h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Our comprehensive supply chain solution combines blockchain transparency with IoT sensors, 
                  AI analytics, and smart contract automation to deliver unprecedented visibility and efficiency.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'IoT Sensors', value: 'Real-time tracking' },
                    { name: 'Blockchain', value: 'Immutable records' },
                    { name: 'AI Analytics', value: 'Predictive insights' },
                    { name: 'Smart Contracts', value: 'Automated compliance' },
                  ].map((tech, index) => (
                    <div key={tech.name} className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-emerald-400 font-semibold">{tech.name}</div>
                      <div className="text-gray-400 text-sm">{tech.value}</div>
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
                <BarChart3 className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                <div className="text-6xl font-bold text-white mb-4">$4.8B</div>
                <div className="text-gray-400 text-xl mb-2">Supply Chain Value Secured</div>
                <div className="text-gray-500">Across global enterprise deployments</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}