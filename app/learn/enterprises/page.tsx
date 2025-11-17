// app/learn/enterprises/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Building2, Shield, Zap, BarChart3, Globe2, Users } from 'lucide-react';

export default function EnterprisesPage() {
  const solutions = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Enhanced Security',
      description: 'Military-grade encryption with AI-powered threat detection',
      features: ['Zero-knowledge proofs', 'Multi-sig governance', 'Real-time monitoring']
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Enterprise Scalability',
      description: 'Handle millions of transactions with sub-second finality',
      features: ['Horizontal scaling', 'Load balancing', '99.99% uptime SLA']
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Compliance Ready',
      description: 'Built-in regulatory compliance for global operations',
      features: ['KYC/AML integration', 'Audit trails', 'GDPR compliance']
    },
    {
      icon: <Globe2 className="w-8 h-8" />,
      title: 'Cross-Chain Operations',
      description: 'Seamlessly operate across multiple blockchain networks',
      features: ['Unified API', 'Asset interoperability', 'Chain abstraction']
    },
  ];

  const caseStudies = [
    {
      company: 'Global Logistics Corp',
      challenge: '$2.3B in supply chain inefficiencies',
      solution: 'Aurlink supply chain tracking',
      result: '47% reduction in operational costs'
    },
    {
      company: 'FinTech International',
      challenge: 'Cross-border payment delays',
      solution: 'Aurlink payment corridors',
      result: '89% faster settlements'
    },
    {
      company: 'Healthcare Systems Ltd',
      challenge: 'Patient data silos',
      solution: 'Aurlink health records',
      result: 'Secure data sharing across 200+ facilities'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-blue-500/20 border border-blue-400/30 rounded-full px-6 py-3 mb-8">
              <Building2 className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-semibold">Enterprise Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Blockchain for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Business</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Transform your enterprise with AI-powered blockchain infrastructure. 
              Secure, scalable, and compliant solutions for the modern business landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{solution.title}</h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
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
              Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Success Stories</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-2xl p-8 hover:border-blue-400/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-4">{study.company}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-blue-400 font-semibold mb-1">Challenge</div>
                    <div className="text-gray-300 text-sm">{study.challenge}</div>
                  </div>
                  <div>
                    <div className="text-sm text-cyan-400 font-semibold mb-1">Solution</div>
                    <div className="text-gray-300 text-sm">{study.solution}</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-400 font-semibold mb-1">Result</div>
                    <div className="text-gray-300 text-sm font-semibold">{study.result}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-3xl p-12"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Enterprise?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Schedule a personalized demo and discover how Aurlink can drive your digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
                Request Enterprise Demo
              </button>
              <button className="px-8 py-4 border border-blue-400 text-blue-400 rounded-xl font-semibold hover:bg-blue-400/10 transition-all duration-300">
                Read Whitepaper
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}