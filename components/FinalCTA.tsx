'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FileText, Users, ArrowRight, Star, Shield, Zap, MessageCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: '100+', label: 'Early Community Members' },
    { icon: <Zap className="w-6 h-6" />, value: '$500K', label: 'Seed Round Target' },
    { icon: <Shield className="w-6 h-6" />, value: 'Q1 2026', label: 'Testnet Launch' },
    { icon: <Star className="w-6 h-6" />, value: '50+', label: 'dApps Target' }
  ]

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        setEmail('')
        console.log('✅ Email subscribed:', data)
      } else {
        setError(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('❌ Subscription error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.section 
      ref={ref}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-[#0A0F2C] to-[#071226] overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 left-0 w-72 h-72 bg-[#00F5FF]/10 rounded-full blur-3xl"
          animate={isInView ? { 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"
          animate={isInView ? { 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2]
          } : {}}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Lead the
            <span className="block bg-gradient-to-r from-[#00F5FF] to-cyan-300 bg-clip-text text-transparent">
              Next Evolution
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join the Aurlink ecosystem and help shape the future of decentralized AI infrastructure. 
            Be part of the cognitive blockchain revolution.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          {/* Pitch Deck Button */}
          <Link href="/connect/pitch-deck" className="block w-full sm:w-auto">
            <motion.button
              className="group relative bg-gradient-to-r from-[#00F5FF] to-cyan-400 text-[#0A0F2C] px-12 py-5 rounded-2xl text-lg font-bold hover:shadow-2xl transition-all duration-500 w-full min-w-[240px] overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center gap-3">
                <FileText className="w-5 h-5" />
                <span>Read Pitch Deck</span>
              </div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-[#00F5FF] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10"
              />
            </motion.button>
          </Link>

          {/* Telegram Button */}
          <a 
            href="https://t.me/aurlinkupdates" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block w-full sm:w-auto"
          >
            <motion.button
              className="group relative bg-gradient-to-r from-[#0088CC] to-[#00A8E8] text-white px-12 py-5 rounded-2xl text-lg font-bold hover:shadow-2xl transition-all duration-500 w-full min-w-[240px] overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center gap-3">
                <MessageCircle className="w-5 h-5" />
                <span>Join Our Telegram</span>
              </div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#00A8E8] to-[#0088CC] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10"
              />
            </motion.button>
          </a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00F5FF]/30 transition-all duration-300"
              whileHover={{ 
                y: -5,
                scale: 1.05
              }}
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#00F5FF]/10 flex items-center justify-center text-[#00F5FF]">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Email Capture */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-2xl mx-auto"
        >
          {!isSubmitted ? (
            <>
              <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-6">Get the latest on testnet launches, partnership announcements, and ecosystem growth.</p>
              
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#00F5FF] transition-colors"
                  required
                  disabled={isSubmitting}
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="px-6 py-3 bg-gradient-to-r from-[#00F5FF] to-cyan-400 text-[#0A0F2C] font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                  whileHover={{ scale: isSubmitting || !email ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting || !email ? 1 : 0.95 }}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-[#0A0F2C] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}

              <p className="text-gray-400 text-sm mt-4">No spam. Unsubscribe at any time.</p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <CheckCircle className="w-12 h-12 text-[#00F5FF] mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">You're Subscribed!</h3>
              <p className="text-gray-300">
                Thank you for joining the AURLINK community. We'll keep you updated with the latest developments.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Social Proof */}
        <motion.div 
          variants={itemVariants}
          className="mt-16"
        >
          <p className="text-gray-400 mb-8">Trusted by visionary investors and partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Binance Labs', 'Coinbase Ventures', 'a16z Crypto', 'Polychain', 'Paradigm'].map((partner, index) => (
              <motion.div
                key={partner}
                className="text-gray-300 font-semibold text-lg"
                animate={isInView ? {
                  opacity: [0.4, 0.8, 0.4],
                  transition: { duration: 2, repeat: Infinity, delay: index * 0.3 }
                } : {}}
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}