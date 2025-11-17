"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";
import Link from "next/link";
import { 
  CheckCircle, 
  Star, 
  Users, 
  Rocket, 
  Shield, 
  Zap,
  ArrowRight,
  Globe,
  Cpu,
  Lock
} from "lucide-react";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Blockchain",
      description: "Experience next-generation blockchain enhanced with artificial intelligence"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Ecosystem",
      description: "Join a worldwide community of developers and innovators"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Advanced Technology",
      description: "Access cutting-edge blockchain infrastructure and tools"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Enhanced Security",
      description: "Enterprise-grade security with AI-driven threat detection"
    }
  ];

  const benefits = [
    "Early access to platform features",
    "Exclusive community events",
    "Priority technical support",
    "Special rewards and incentives",
    "Influence product development",
    "Network with industry leaders"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#0F1A3C] to-[#1A2A4D]">
      {/* Navigation */}
      <nav className="relative z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-white font-bold text-xl">AURLINK</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/30">
                <Star className="w-4 h-4 text-[#00F5FF]" />
                <span className="text-[#00F5FF] text-sm font-medium">Join the Future of Blockchain</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Be Among the
                <span className="block bg-gradient-to-r from-[#00F5FF] to-cyan-400 bg-clip-text text-transparent">
                  First to Experience
                </span>
                Aurlink
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-300 leading-relaxed">
                Join our exclusive waitlist and get early access to the AI-powered blockchain platform 
                that's set to revolutionize decentralized technology. Limited spots available.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#00F5FF]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#00F5FF]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">2,847+</div>
                    <div className="text-gray-400 text-sm">Early Members</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#00F5FF]/10 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-[#00F5FF]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">30 Days</div>
                    <div className="text-gray-400 text-sm">Until Launch</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Waitlist Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#1E2A4D]/50 backdrop-blur-sm border border-[#2D3B5F] rounded-2xl p-8"
            >
              {!isSubmitted ? (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2">Join the Waitlist</h3>
                  <p className="text-gray-400 mb-6">
                    Enter your email to secure your spot and get early access benefits.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                      <label htmlFor="email" className="text-white font-medium text-sm">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 bg-[#0A0F2C] border border-[#2D3B5F] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00F5FF] transition-colors"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-[#00F5FF] to-cyan-400 text-[#0A0F2C] font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[#0A0F2C] border-t-transparent rounded-full animate-spin" />
                          Securing Your Spot...
                        </>
                      ) : (
                        <>
                          Join Waitlist
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                  
                  <p className="text-gray-400 text-sm mt-4 text-center">
                    No spam ever. Unsubscribe at any time.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-[#00F5FF] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Welcome to Aurlink!
                  </h3>
                  <p className="text-gray-300 mb-6">
                    You're now on the waitlist. We'll notify you when early access begins.
                  </p>
                  <div className="space-y-2">
                    {benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-400">
                        <CheckCircle className="w-4 h-4 text-[#00F5FF]" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#1E2A4D]/30 backdrop-blur-sm border border-[#2D3B5F] rounded-xl p-6 hover:border-[#00F5FF]/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#00F5FF]/10 flex items-center justify-center mb-4 group-hover:bg-[#00F5FF]/20 transition-colors">
                    <div className="text-[#00F5FF]">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#1E2A4D]/30 backdrop-blur-sm border border-[#2D3B5F] rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Waitlist Benefits</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00F5FF]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-[#00F5FF]" />
                    </div>
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-[#1E2A4D]/30 backdrop-blur-sm border border-[#2D3B5F] rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-semibold">Waitlist Progress</span>
                <span className="text-[#00F5FF] font-bold">68%</span>
              </div>
              <div className="w-full bg-[#0A0F2C] rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-[#00F5FF] to-cyan-400 h-3 rounded-full transition-all duration-1000"
                  style={{ width: '68%' }}
                />
              </div>
              <p className="text-gray-400 text-sm mt-3">
                1,937 spots remaining out of 6,000 total
              </p>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6">
            {[
              {
                question: "When will early access begin?",
                answer: "Early access is scheduled to begin in approximately 30 days. Waitlist members will receive priority access based on their signup order."
              },
              {
                question: "Is there any cost to join the waitlist?",
                answer: "No, joining the waitlist is completely free. You'll get early access to the platform and exclusive benefits at no cost."
              },
              {
                question: "What makes Aurlink different?",
                answer: "Aurlink combines AI with blockchain technology to create a more intelligent, scalable, and user-friendly platform for developers and enterprises."
              },
              {
                question: "Can I share the waitlist with others?",
                answer: "Yes! Sharing with friends and colleagues is encouraged. The more people join, the faster we can build our community."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-[#1E2A4D]/30 backdrop-blur-sm border border-[#2D3B5F] rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#2D3B5F] mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <span className="text-white font-bold text-lg">AURLINK</span>
              <span className="text-gray-400 text-sm">© 2024 All rights reserved</span>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}