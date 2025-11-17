// app/learn/technology/scalability/page.tsx
'use client';
import React from 'react';
import { Server, Globe, Cpu, Database, Zap, TrendingUp, ArrowRight } from 'lucide-react';

export default function ScalabilityPage() {
  const features = [
    {
      icon: Server,
      title: "Elastic Scaling",
      description: "Automatically scale resources based on real-time demand",
      metrics: "10,000+ TPS capacity",
      details: ["Auto-scaling nodes", "Load-aware routing", "Cost optimization"]
    },
    {
      icon: Globe,
      title: "Global Distribution",
      description: "Worldwide CDN with multi-region deployment",
      metrics: "50+ locations worldwide", 
      details: ["Edge computing", "Low-latency routing", "Geo-redundancy"]
    },
    {
      icon: Cpu,
      title: "High Performance",
      description: "Enterprise-grade infrastructure for maximum throughput",
      metrics: "Sub-second finality",
      details: ["Parallel processing", "Smart caching", "Optimized consensus"]
    },
    {
      icon: Database,
      title: "Reliable Storage",
      description: "Distributed storage with guaranteed availability",
      metrics: "99.99% uptime SLA",
      details: ["Data sharding", "Automated backups", "Cross-chain sync"]
    }
  ];

  const technicalSpecs = [
    { label: "Transactions Per Second", value: "10,000+ TPS" },
    { label: "Network Latency", value: "< 200ms worldwide" },
    { label: "Storage Capacity", value: "Unlimited scaling" },
    { label: "Consensus Time", value: "2 second block time" },
    { label: "Node Distribution", value: "1000+ global nodes" },
    { label: "Data Redundancy", value: "5x replication" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-green-400 mr-3" />
            <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
              Scalable Infrastructure
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Enterprise-Grade Scaling
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Handle high demand with dynamic resource allocation. From startup to enterprise, 
            we grow with you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 hover:border-green-500/30 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-500/10 rounded-xl mr-4 group-hover:bg-green-500/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                    <p className="text-green-400 font-semibold">{feature.metrics}</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 text-lg">{feature.description}</p>
              <div className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center text-gray-300">
                    <Zap className="w-4 h-4 text-green-400 mr-3" />
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Specifications */}
        <div className="bg-gray-800/20 rounded-2xl p-8 border border-gray-700 mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSpecs.map((spec, index) => (
              <div key={index} className="text-center p-6 bg-gray-700/20 rounded-xl border border-gray-600">
                <div className="text-2xl font-bold text-green-400 mb-2">{spec.value}</div>
                <div className="text-gray-400 text-sm">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Server className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Modular Design</h4>
            <p className="text-gray-400 text-sm">Swap components without downtime or service interruption</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Global Reach</h4>
            <p className="text-gray-400 text-sm">Deploy anywhere with our worldwide node infrastructure</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Cpu className="w-6 h-6 text-amber-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Future Proof</h4>
            <p className="text-gray-400 text-sm">Designed to evolve with emerging technologies and standards</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-12 border border-green-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">Scale with Confidence</h3>
            <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
              Build applications that can handle millions of users without compromising performance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg transition-colors flex items-center justify-center">
                <Database className="w-5 h-5 mr-2" />
                View Architecture
              </button>
              <button className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold text-lg transition-colors">
                Start Building
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}