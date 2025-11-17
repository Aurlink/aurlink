// app/learn/end-users/page.tsx
'use client';
import React from 'react';
import { Shield, Zap, Users, Rocket, ArrowRight, Play, Star, CheckCircle } from 'lucide-react';

export default function EndUsersPage() {
  const features = [
    {
      icon: Shield,
      title: "Secure & Simple",
      description: "Enterprise-grade security without the complexity",
      benefits: ["No technical knowledge needed", "One-click transactions", "Built-in security protocols"]
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant transactions with near-zero fees",
      benefits: ["2-second finality", "Fractional cent costs", "24/7 availability"]
    },
    {
      icon: Users,
      title: "Community Powered",
      description: "Join a global community of innovators",
      benefits: ["Voting rights", "Community rewards", "Governance participation"]
    },
    {
      icon: Rocket,
      title: "Future Ready",
      description: "Built for the next generation of applications",
      benefits: ["AI-powered features", "Cross-chain compatibility", "Regular upgrades"]
    }
  ];

  const useCases = [
    {
      title: "Digital Collectibles",
      description: "Create, buy, and trade unique digital assets securely",
      icon: "🎨"
    },
    {
      title: "Secure Payments",
      description: "Send and receive payments globally with minimal fees",
      icon: "💳"
    },
    {
      title: "Decentralized Apps",
      description: "Access powerful applications without middlemen",
      icon: "📱"
    },
    {
      title: "Community Governance",
      description: "Have a say in platform decisions and发展方向",
      icon: "🗳️"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-cyan-400 mr-3" />
            <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold">
              For End-Users
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blockchain Made Simple
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore how Aurlink makes blockchain simple and accessible. No technical knowledge required - 
            just powerful tools that work for everyone.
          </p>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold text-cyan-400 mb-2">2M+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold text-green-400 mb-2">2s</div>
            <div className="text-gray-400">Transaction Speed</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold text-purple-400 mb-2">$0.001</div>
            <div className="text-gray-400">Average Fee</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold text-amber-400 mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mr-4">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">What Can You Do?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-800/20 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/30 transition-all duration-300 text-center">
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="font-bold text-white mb-2">{useCase.title}</h3>
                <p className="text-gray-400 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-12 border border-cyan-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">Start Your Journey Today</h3>
            <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
              Join millions of users already experiencing the future of blockchain technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-semibold text-lg transition-colors flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
              <button className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold text-lg transition-colors">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}