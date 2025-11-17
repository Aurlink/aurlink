// app/build/templates/page.tsx
'use client';
import React from 'react';
import { FileCode, Zap, Users, Lock, TrendingUp, Crown, Sparkles, ArrowRight } from 'lucide-react';

export default function TemplatesPage() {
  const templateCategories = [
    {
      icon: FileCode,
      title: "Vesting & Token Distribution",
      description: "Automated token release schedules for teams, investors, and community",
      color: "from-blue-500 to-cyan-500",
      templates: [
        {
          name: "Team Vesting",
          description: "Linear vesting with cliff periods",
          features: ["Cliff periods", "Linear release", "Multi-beneficiary"],
          difficulty: "Beginner",
          users: "12.4K"
        },
        {
          name: "Investor Lock-up",
          description: "Secure token distribution for investors",
          features: ["Custom lock periods", "Early release options", "Compliance ready"],
          difficulty: "Intermediate",
          users: "8.7K"
        },
        {
          name: "Community Airdrop",
          description: "Mass distribution with claim conditions",
          features: ["Merit-based distribution", "Claim deadlines", "Gas optimization"],
          difficulty: "Beginner",
          users: "15.2K"
        }
      ]
    },
    {
      icon: Zap,
      title: "DeFi & Financial",
      description: "Advanced financial instruments and decentralized finance protocols",
      color: "from-green-500 to-emerald-500",
      templates: [
        {
          name: "Liquidity Pool",
          description: "Automated market maker with custom curves",
          features: ["Custom fee structures", "Impermanent loss protection", "Multi-asset support"],
          difficulty: "Advanced",
          users: "6.3K"
        },
        {
          name: "Staking Protocol",
          description: "Token staking with reward distribution",
          features: ["Time-based rewards", "Slashing conditions", "Governance rights"],
          difficulty: "Intermediate",
          users: "9.8K"
        },
        {
          name: "Flash Loan",
          description: "Uncollateralized instant loans",
          features: ["Arbitrage opportunities", "Risk management", "Multi-protocol"],
          difficulty: "Advanced",
          users: "4.2K"
        }
      ]
    }
  ];

  const premiumFeatures = [
    {
      icon: Sparkles,
      title: "AI-Optimized",
      description: "Templates automatically optimized for gas efficiency and security"
    },
    {
      icon: Zap,
      title: "One-Click Deploy",
      description: "Deploy to multiple chains simultaneously with single click"
    },
    {
      icon: Crown,
      title: "Audited & Secure",
      description: "All templates professionally audited and battle-tested"
    },
    {
      icon: TrendingUp,
      title: "Adaptive Logic",
      description: "Smart contracts that adapt to market conditions and user behavior"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <FileCode className="w-8 h-8 text-cyan-400 mr-3" />
            <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold">
              Smart Contract Templates
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Prebuilt Templates for Adaptive Smart Contracts
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Prebuilt templates for creating adaptive smart contracts. Jumpstart your development 
            with professionally designed, audited, and AI-optimized smart contract templates.
          </p>
        </div>

        {/* Premium Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Template Categories */}
        <div className="space-y-12">
          {templateCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-gray-800/20 rounded-2xl p-8 border border-gray-700">
              {/* Category Header */}
              <div className="flex items-center mb-8">
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mr-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.templates.map((template, templateIndex) => (
                  <div key={templateIndex} className="bg-gray-800/50 rounded-xl p-6 border border-gray-600 hover:border-cyan-500/30 transition-all duration-300 group">
                    {/* Template Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">
                          {template.name}
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">{template.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        template.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                        template.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {template.difficulty}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {template.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                      <div className="flex items-center text-sm text-gray-400">
                        <Users className="w-4 h-4 mr-1" />
                        {template.users} users
                      </div>
                      <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center">
                        Use Template
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-12 border border-cyan-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">Start Building Today</h3>
            <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
              Join 50,000+ developers already building with our smart contract templates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Explore All Templates
              </button>
              <button className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold text-lg transition-colors">
                Request Custom Template
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              All templates include free audits, multi-chain deployment, and lifetime updates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}