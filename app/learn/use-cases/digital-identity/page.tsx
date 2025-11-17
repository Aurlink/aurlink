// app/learn/use-cases/digital-identity/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Fingerprint, Shield, Zap, UserCheck, Lock, Globe, Award, Users } from 'lucide-react';

export default function DigitalIdentityPage() {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Self-Sovereign Identity',
      description: 'Users own and control their identity data with zero-knowledge proof verification',
      benefits: ['No central authority', 'User-controlled data', 'Privacy by design']
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Instant Verification',
      description: 'Real-time identity verification across platforms with biometric authentication',
      benefits: ['<2 second verification', '99.9% accuracy', 'Multi-factor auth']
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Military-Grade Security',
      description: 'End-to-end encryption with quantum-resistant algorithms and decentralized storage',
      benefits: ['Zero-knowledge proofs', 'Quantum safe', 'Immutable audit trail']
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Compliance',
      description: 'Built-in compliance with GDPR, CCPA, and international identity standards',
      benefits: ['GDPR compliant', 'KYC/AML ready', 'Cross-border compatible']
    },
  ];

  const useCases = [
    {
      sector: 'Financial Services',
      applications: ['KYC/AML compliance', 'Cross-border banking', 'Credit scoring'],
      impact: '80% reduction in onboarding time'
    },
    {
      sector: 'Healthcare',
      applications: ['Patient records', 'Telemedicine', 'Clinical trials'],
      impact: 'Secure sharing across 200+ facilities'
    },
    {
      sector: 'Government',
      applications: ['Digital passports', 'Voting systems', 'Social benefits'],
      impact: '99.9% reduction in identity fraud'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-indigo-500/20 border border-indigo-400/30 rounded-full px-6 py-3 mb-8">
              <Fingerprint className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-400 font-semibold">Digital Identity Revolution</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Own Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Identity</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Take back control of your digital identity with blockchain-powered self-sovereign identity. 
              Secure, private, and universally verifiable across all platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                Create Digital ID
                <UserCheck className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border border-indigo-400 text-indigo-400 rounded-xl font-semibold hover:bg-indigo-400/10 transition-all duration-300">
                Enterprise Solutions
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-3 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Applications</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.sector}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-400/20 rounded-2xl p-8 hover:border-indigo-400/40 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-6">{useCase.sector}</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-sm text-indigo-400 font-semibold mb-2">Applications</div>
                    <ul className="space-y-2">
                      {useCase.applications.map((app, appIndex) => (
                        <li key={appIndex} className="flex items-center gap-2 text-gray-300 text-sm">
                          <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-400/20 rounded-lg p-4">
                  <div className="text-indigo-400 font-semibold text-sm">BUSINESS IMPACT</div>
                  <div className="text-white font-bold text-lg mt-1">{useCase.impact}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/20 rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold text-white mb-6">Enterprise-Grade Security</h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Our digital identity platform combines zero-knowledge proofs, biometric authentication, 
                  and decentralized storage to deliver military-grade security while maintaining user privacy.
                </p>
                <div className="space-y-4">
                  {[
                    'Zero-Knowledge Proof Verification',
                    'Biometric Multi-Factor Authentication',
                    'Decentralized Identity Storage',
                    'Quantum-Resistant Cryptography',
                    'GDPR & CCPA Compliant',
                    'Real-Time Threat Detection'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-indigo-400" />
                      <span className="text-gray-300">{item}</span>
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
                <Users className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
                <div className="text-6xl font-bold text-white mb-4">2.5M+</div>
                <div className="text-gray-400 text-xl mb-2">Identities Secured</div>
                <div className="text-gray-500">With zero data breaches</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}