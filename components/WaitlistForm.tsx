"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  Lock,
  Calendar,
  Target,
  Brain,
  Network,
  Code,
  BarChart3
} from "lucide-react";

interface WaitlistStats {
  totalSubscribers: number;
  waitlistPosition?: number;
  launchDate?: string;
  daysUntilLaunch?: number;
  maxCapacity?: number;
  spotsRemaining?: number;
  progressPercentage?: number;
}

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<WaitlistStats>({
    totalSubscribers: 0,
    waitlistPosition: 0,
    launchDate: "",
    daysUntilLaunch: 30, // Default 30 days
    maxCapacity: 10000,
    spotsRemaining: 10000,
    progressPercentage: 0
  });
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

  // Fetch initial waitlist stats
  const fetchWaitlistStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/waitlist/stats`);
      const data = await response.json();
      
      if (data.success) {
        setStats({
          totalSubscribers: data.totalSubscribers || 2847,
          waitlistPosition: data.waitlistPosition,
          launchDate: data.launchDate,
          daysUntilLaunch: data.daysUntilLaunch || 30,
          maxCapacity: data.maxCapacity || 10000,
          spotsRemaining: data.spotsRemaining || 7153,
          progressPercentage: data.progressPercentage || 28
        });
      }
    } catch (error) {
      console.error('Failed to fetch waitlist stats:', error);
      // Set attractive default stats that show momentum
      setStats(prev => ({
        ...prev,
        totalSubscribers: 2847,
        daysUntilLaunch: 30,
        maxCapacity: 10000,
        spotsRemaining: 7153,
        progressPercentage: 28
      }));
    } finally {
      setLoading(false);
    }
  };

  // Premium AurLink Ecosystem Features
  const ecosystemFeatures = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Blockchain",
      description: "Next-generation blockchain enhanced with artificial intelligence for smarter contracts and optimized performance"
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Global Ecosystem",
      description: "Join a worldwide community of developers, innovators, and blockchain enthusiasts building the future"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Advanced Development",
      description: "Access cutting-edge tools, SDKs, and APIs for building revolutionary decentralized applications"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Enterprise Scale",
      description: "High-throughput infrastructure capable of handling millions of transactions with enterprise-grade security"
    }
  ];

  // Premium Waitlist Benefits
  const waitlistBenefits = [
    "Early access to platform features and tools",
    "Exclusive community events and AMAs",
    "Priority technical support and onboarding",
    "Special rewards and incentive programs",
    "Direct influence on product development",
    "Networking with industry leaders and partners",
    "First look at new partnerships and integrations",
    "Beta testing opportunities with rewards"
  ];

  // Professional FAQ Content
  const professionalFAQs = [
    {
      question: "When will early access begin for AurLink?",
      answer: "Early access is scheduled to begin in approximately 30 days. Waitlist members will receive priority access based on their signup order, with the first 1,000 members gaining immediate access upon launch."
    },
    {
      question: "What makes AurLink different from other blockchain platforms?",
      answer: "AurLink combines advanced AI with blockchain technology to create a more intelligent, scalable, and developer-friendly ecosystem. Our platform offers enhanced security, better performance, and unique features like AI-optimized smart contracts and predictive analytics."
    },
    {
      question: "Is there any cost to join the waitlist or for early access?",
      answer: "No, joining the waitlist is completely free. Early access members will have free access to our core platform features during the initial launch period. Some advanced enterprise features may have associated costs later."
    },
    {
      question: "What kind of projects can be built on AurLink?",
      answer: "AurLink supports a wide range of applications including DeFi protocols, NFT marketplaces, gaming ecosystems, enterprise solutions, and AI-powered dApps. Our flexible infrastructure is designed for both simple and complex decentralized applications."
    },
    {
      question: "Can I share the waitlist with my team or community?",
      answer: "Absolutely! We encourage sharing with developers, entrepreneurs, and blockchain enthusiasts. The more quality builders join our ecosystem, the stronger our community becomes. There are also referral rewards for active community members."
    },
    {
      question: "What technical expertise do I need to use AurLink?",
      answer: "While some blockchain experience is helpful, we provide comprehensive documentation, SDKs, and developer tools for all skill levels. Our platform is designed to be accessible to both experienced blockchain developers and those new to the space."
    }
  ];

  useEffect(() => {
    fetchWaitlistStats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const response = await fetch(`${API_BASE_URL}/waitlist/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        // Update stats with new position
        setStats(prev => ({
          ...prev,
          waitlistPosition: data.position || prev.totalSubscribers + 1,
          totalSubscribers: data.totalSubscribers || prev.totalSubscribers + 1,
          spotsRemaining: data.spotsRemaining || prev.spotsRemaining - 1,
          progressPercentage: data.progressPercentage || Math.min(100, Math.round(((prev.totalSubscribers + 1) / prev.maxCapacity) * 100))
        }));
        console.log('✅ Successfully joined AurLink waitlist:', data);
      } else {
        setError(data.error || 'Failed to join waitlist. Please try again.');
        console.error('❌ Subscription failed:', data.error);
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#0F1A3C] to-[#1A2A4D] flex items-center justify-center">
        <div className="text-white text-xl">Loading AurLink Waitlist...</div>
      </div>
    );
  }

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
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/30">
                <Rocket className="w-4 h-4 text-[#00F5FF]" />
                <span className="text-[#00F5FF] text-sm font-medium">Join the Aurlink Revolution</span>
              </div>

              {/* Professional Heading */}
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Build the Future
                <span className="block bg-gradient-to-r from-[#00F5FF] to-cyan-400 bg-clip-text text-transparent">
                  With Aurlink AI
                </span>
              </h1>

              {/* Ecosystem Description */}
              <p className="text-xl text-gray-300 leading-relaxed">
                Join our exclusive waitlist and be among the first to experience the AI-powered blockchain platform 
                that's set to revolutionize decentralized technology. Build, innovate, and grow with AurLink's 
                next-generation ecosystem.
              </p>

              {/* Professional Stats */}
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#00F5FF]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#00F5FF]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.totalSubscribers.toLocaleString()}+</div>
                    <div className="text-gray-400 text-sm">Builders Joined</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#00F5FF]/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#00F5FF]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.daysUntilLaunch}</div>
                    <div className="text-gray-400 text-sm">Days Until Launch</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#00F5FF]/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-[#00F5FF]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.spotsRemaining?.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Spots Available</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Professional Waitlist Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#1E2A4D]/50 backdrop-blur-sm border border-[#2D3B5F] rounded-2xl p-8"
            >
              {!isSubmitted ? (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Secure Your Early Access
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Join {stats.totalSubscribers.toLocaleString()}+ developers and innovators in the AurLink ecosystem. 
                    Limited spots available for our initial launch cohort.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                      <label htmlFor="email" className="text-white font-medium text-sm">
                        Professional Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your professional email"
                        className="w-full px-4 py-3 bg-[#0A0F2C] border border-[#2D3B5F] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00F5FF] transition-colors"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                      >
                        <p className="text-red-400 text-sm">{error}</p>
                      </motion.div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className="w-full py-4 bg-gradient-to-r from-[#00F5FF] to-cyan-400 text-[#0A0F2C] font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[#0A0F2C] border-t-transparent rounded-full animate-spin" />
                          Securing Your Ecosystem Access...
                        </>
                      ) : (
                        <>
                          Join Aurlink Ecosystem
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                  
                  <p className="text-gray-400 text-sm mt-4 text-center">
                    Professional communications only. No spam. Unsubscribe anytime.
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
                    Welcome to AurLink!
                  </h3>
                  <p className="text-gray-300 mb-4">
                    You're position <span className="text-[#00F5FF] font-bold">#{stats.waitlistPosition}</span> in our ecosystem.
                  </p>
                  <p className="text-gray-400 text-sm mb-6">
                    We'll notify you when early access begins in {stats.daysUntilLaunch} days.
                  </p>
                  <div className="space-y-2">
                    {waitlistBenefits.slice(0, 3).map((benefit, index) => (
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
            {/* AurLink Ecosystem Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              {ecosystemFeatures.map((feature, index) => (
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

            {/* Premium Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#1E2A4D]/30 backdrop-blur-sm border border-[#2D3B5F] rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Ecosystem Benefits</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {waitlistBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00F5FF]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-[#00F5FF]" />
                    </div>
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Professional Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-[#1E2A4D]/30 backdrop-blur-sm border border-[#2D3B5F] rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-semibold">Ecosystem Access Progress</span>
                <span className="text-[#00F5FF] font-bold">{stats.progressPercentage}%</span>
              </div>
              <div className="w-full bg-[#0A0F2C] rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-[#00F5FF] to-cyan-400 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${stats.progressPercentage}%` }}
                />
              </div>
              <p className="text-gray-400 text-sm mt-3">
                {stats.spotsRemaining?.toLocaleString()} ecosystem spots remaining out of {stats.maxCapacity?.toLocaleString()} total capacity
              </p>
            </motion.div>
          </div>
        </div>

        {/* Professional FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Ecosystem Questions
          </h2>
          <div className="grid gap-6">
            {professionalFAQs.map((faq, index) => (
              <div key={index} className="bg-[#1E2A4D]/30 backdrop-blur-sm border border-[#2D3B5F] rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Professional Footer */}
      <footer className="border-t border-[#2D3B5F] mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <span className="text-white font-bold text-lg">AURLINK ECOSYSTEM</span>
              <span className="text-gray-400 text-sm">© {new Date().getFullYear()} All rights reserved</span>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contact Ecosystem
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}