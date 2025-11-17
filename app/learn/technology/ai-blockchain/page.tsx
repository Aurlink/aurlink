// app/learn/technology/ai-blockchain/page.tsx
'use client';
import React from 'react';
import { Brain, Zap, Shield, Code, TrendingUp, Cpu, ArrowRight } from 'lucide-react';

export default function AIBlockchainPage() {
  const capabilities = [
    {
      icon: Brain,
      title: "Predictive Optimization",
      stats: "60% gas reduction",
      description: "AI analyzes and optimizes transaction costs in real-time",
      features: ["Smart fee estimation", "Bundle optimization", "Route optimization"]
    },
    {
      icon: Shield,
      title: "Advanced Security",
      stats: "99.9% threat detection",
      description: "Machine learning identifies and prevents suspicious activities",
      features: ["Behavioral analysis", "Real-time monitoring", "Automated patches"]
    },
    {
      icon: Zap,
      title: "Performance Boost",
      stats: "300% faster execution",
      description: "AI-optimized code execution and resource allocation",
      features: ["Load prediction", "Smart caching", "Parallel processing"]
    },
    {
      icon: Code,
      title: "Developer AI",
      stats: "50% less code",
      description: "AI-assisted development with smart suggestions and debugging",
      features: ["Code completion", "Error prevention", "Auto-documentation"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Cpu className="w-8 h-8 text-cyan-400 mr-3" />
            <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold">
              AI-Powered Blockchain
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Intelligent Blockchain Technology
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Learn how AI enhances speed and security. Harness the power of artificial intelligence 
            to create faster, safer, and smarter blockchain applications.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold text-cyan-400 mb-2">300%</div>
            <div className="text-gray-400">Faster Execution</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold text-green-400 mb-2">60%</div>
            <div className="text-gray-400">Gas Reduction</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
            <div className="text-gray-400">Threat Detection</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold text-amber-400 mb-2">50%</div>
            <div className="text-gray-400">Less Code</div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <div key={index} className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-3 bg-cyan-500/10 rounded-xl mr-4 group-hover:bg-cyan-500/20 transition-colors">
                    <capability.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{capability.title}</h3>
                    <p className="text-cyan-400 font-semibold">{capability.stats}</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 text-lg">{capability.description}</p>
              <div className="flex flex-wrap gap-2">
                {capability.features.map((feature, featureIndex) => (
                  <span key={featureIndex} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300 border border-gray-600">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Deep Dive */}
        <div className="bg-gray-800/20 rounded-2xl p-8 border border-gray-700 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">How AI Enhances Blockchain</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Performance</h4>
              <p className="text-gray-400 text-sm">Real-time optimization and predictive scaling</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Security</h4>
              <p className="text-gray-400 text-sm">Continuous threat detection and prevention</p>
            </div>
            <div className="text-center">
              <Brain className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Intelligence</h4>
              <p className="text-gray-400 text-sm">Smart automation and decision making</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-12 border border-cyan-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Build with AI?</h3>
            <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
              Start developing intelligent applications on the world's first AI-optimized blockchain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-semibold text-lg transition-colors flex items-center justify-center">
                <Code className="w-5 h-5 mr-2" />
                Start Building
              </button>
              <button className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold text-lg transition-colors">
                Read Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}