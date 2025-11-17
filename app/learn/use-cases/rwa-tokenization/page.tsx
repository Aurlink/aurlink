// app/learn/use-cases/rwa-tokenization/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Building2, Landmark, TrendingUp, Shield, Globe, BarChart3, ArrowRight, Users } from 'lucide-react';

export default function RWATokenizationPage() {
  const assetClasses = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Real Estate',
      value: '$12.8T',
      description: 'Commercial and residential properties with fractional ownership',
      features: ['24/7 trading', 'Global liquidity', 'Automated compliance']
    },
    {
      icon: <Landmark className="w-8 h-8" />,
      title: 'Private Equity',
      value: '$6.2T',
      description: 'Venture capital and private company shares with enhanced liquidity',
      features: ['Secondary markets', 'Transparent valuation', 'Global access']
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Commodities',
      value: '$4.5T',
      description: 'Precious metals, energy, and agricultural products',
      features: ['Instant settlement', 'Fractional ownership', 'Price discovery']
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Fine Art & Collectibles',
      value: '$1.7T',
      description: 'Museum-grade assets with provable ownership and authenticity',
      features: ['Provenance tracking', 'Insurance integration', 'Appreciation potential']
    },
  ];

  const benefits = [
    {
      metric: '47%',
      description: 'Increase in asset liquidity through fractional ownership'
    },
    {
      metric: '24/7',
      description: 'Global trading accessibility across all time zones'
    },
    {
      metric: '80%',
      description: 'Reduction in settlement time from weeks to minutes'
    },
    {
      metric: '$500M+',
      description: 'Minimum transaction size reduced through fractionalization'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-rose-500/20 border border-rose-400/30 rounded-full px-6 py-3 mb-8">
              <Building2 className="w-5 h-5 text-rose-400" />
              <span className="text-rose-400 font-semibold">Real World Asset Tokenization</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Tokenize the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">Physical World</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Transform illiquid real-world assets into globally tradable digital tokens. 
              Unlock $280T in traditional assets with blockchain efficiency and transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-rose-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                Explore Asset Classes
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border border-rose-400 text-rose-400 rounded-xl font-semibold hover:bg-rose-400/10 transition-all duration-300">
                Read Whitepaper
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Asset Classes */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              $280T <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">Market Opportunity</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {assetClasses.map((asset, index) => (
              <motion.div
                key={asset.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-rose-400 group-hover:scale-110 transition-transform duration-300">
                    {asset.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{asset.value}</div>
                    <div className="text-gray-400 text-sm">Market Size</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{asset.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{asset.description}</p>
                <div className="flex flex-wrap gap-2">
                  {asset.features.map((feature, featureIndex) => (
                    <span key={featureIndex} className="px-3 py-1 bg-rose-500/20 border border-rose-400/30 rounded-full text-rose-400 text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.metric}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-400/20 rounded-2xl p-8 text-center hover:border-rose-400/40 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-rose-400 mb-2">{benefit.metric}</div>
                <div className="text-gray-300 text-sm leading-relaxed">{benefit.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Security */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-400/20 rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold text-white mb-6">Regulatory Compliance Framework</h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Our comprehensive compliance infrastructure ensures full regulatory adherence 
                  across 150+ jurisdictions with automated KYC/AML and real-time reporting.
                </p>
                <div className="space-y-4">
                  {[
                    'SEC & ESMA Compliance Ready',
                    'Automated KYC/AML Verification',
                    'Real-Time Tax Reporting',
                    'Cross-Border Regulatory Mapping',
                    'Smart Contract Legal Enforcement',
                    'Audit Trail Preservation'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-rose-400" />
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
                <Globe className="w-16 h-16 text-rose-400 mx-auto mb-6" />
                <div className="text-6xl font-bold text-white mb-4">150+</div>
                <div className="text-gray-400 text-xl mb-2">Jurisdictions Covered</div>
                <div className="text-gray-500">Global regulatory compliance</div>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <Users className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                    <div className="text-white font-bold">45K+</div>
                    <div className="text-gray-400 text-sm">Verified Investors</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <Building2 className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                    <div className="text-white font-bold">$2.4B</div>
                    <div className="text-gray-400 text-sm">Assets Tokenized</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}