'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Network, Code2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SolutionShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "NeuraLink Consensus",
      description: "Hybrid DPoS with predictive AI for intelligent validator optimization and fault prediction.",
      metrics: [
        { value: "90%", label: "Fault Prediction Accuracy" },
        { value: "20%", label: "Downtime Reduction" },
        { value: "5K-20K", label: "Target TPS" }
      ],
      animation: "neural",
      color: "from-cyan-400 to-[#00F5FF]"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Neural Optimization Layer",
      description: "Self-healing network that dynamically tunes parameters in real-time using reinforcement learning.",
      metrics: [
        { value: "15%", label: "Higher Throughput" },
        { value: "Real-time", label: "Parameter Tuning" },
        { value: "Adaptive", label: "Load Scaling" }
      ],
      animation: "optimization",
      color: "from-[#00F5FF] to-cyan-300"
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Modular AI Stack",
      description: "Pre-built AI modules and EVM compatibility that accelerate dApp development dramatically.",
      metrics: [
        { value: "30%", label: "Faster Development" },
        { value: "$1M", label: "Grants Program" },
        { value: "Plug-and-play", label: "SDKs" }
      ],
      animation: "modular",
      color: "from-cyan-300 to-[#00F5FF]"
    }
  ]

  // Animation variants for smooth fade in/out
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        staggerDirection: -1
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
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  }

  return (
    <motion.section 
      ref={ref}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-[#0A142E] to-[#0A0F2C] overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F5FF]/5 rounded-full blur-3xl"
          animate={isInView ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl"
          animate={isInView ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        
        {/* Neural Pathway Connections */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <motion.path
              d="M 10%,30% C 30%,10% 70%,10% 90%,30%"
              stroke="url(#pathGradient)"
              strokeWidth="2"
              fill="none"
              animate={isInView ? { pathLength: [0, 1, 0] } : { pathLength: 0 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.path
              d="M 10%,70% C 30%,90% 70%,90% 90%,70%"
              stroke="url(#pathGradient)"
              strokeWidth="2"
              fill="none"
              animate={isInView ? { pathLength: [0, 1, 0] } : { pathLength: 0 }}
              transition={{ duration: 3, delay: 1, repeat: Infinity }}
            />
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F5FF" stopOpacity="0" />
                <stop offset="50%" stopColor="#00F5FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00F5FF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            The Aurlink
            <span className="block bg-gradient-to-r from-[#00F5FF] to-cyan-300 bg-clip-text text-transparent">
              Solution
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Three revolutionary technologies working in harmony to create the world's first 
            cognitive blockchain infrastructure.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div 
          className="grid lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              custom={index}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full bg-[#1A1F3C]/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 transition-all duration-500 group-hover:border-[#00F5FF]/30 group-hover:bg-[#1A1F3C]/60 group-hover:transform group-hover:scale-105">
                
                {/* Animated Gradient Border */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00F5FF] to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  animate={isInView ? {
                    background: [
                      'linear-gradient(45deg, #00F5FF, #00E5FF, #00F5FF)',
                      'linear-gradient(135deg, #00F5FF, #00E5FF, #00F5FF)',
                    ]
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="absolute inset-[2px] rounded-3xl bg-[#0A0F2C] -z-10" />

                {/* Icon with Animation */}
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 text-[#0A0F2C]`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  animate={isInView ? { 
                    scale: [1, 1.05, 1],
                    transition: { duration: 2, repeat: Infinity, delay: index * 0.5 }
                  } : {}}
                >
                  {feature.icon}
                </motion.div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>

                {/* Animated Metrics */}
                <div className="space-y-3 mb-6">
                  {feature.metrics.map((metric, metricIndex) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.2 + metricIndex * 0.1 + 0.6 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 backdrop-blur-sm"
                    >
                      <span className="text-[#00F5FF] font-bold text-lg">{metric.value}</span>
                      <span className="text-gray-300 text-sm text-right">{metric.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Learn More Link */}
                <Link href="/build/docs/quick-start">
                  <motion.div
                    className="flex items-center text-[#00F5FF] font-semibold cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    animate={isInView ? { 
                      opacity: [0.7, 1, 0.7],
                      transition: { duration: 2, repeat: Infinity, delay: 1 + index * 0.2 }
                    } : {}}
                  >
                    <span className="mr-2">Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>

                {/* Feature-specific Animations */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  {/* Neural Network Animation for Card 1 */}
                  {feature.animation === "neural" && (
                    <div className="absolute inset-0">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-[#00F5FF] rounded-full"
                          style={{
                            left: `${20 + i * 10}%`,
                            top: `${30 + Math.sin(i) * 20}%`,
                          }}
                          animate={isInView ? {
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.8, 0.3],
                          } : {}}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Optimization Flow Animation for Card 2 */}
                  {feature.animation === "optimization" && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F5FF]/10 to-transparent"
                      animate={isInView ? {
                        x: ['-100%', '100%'],
                      } : {}}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}

                  {/* Modular Connection Animation for Card 3 */}
                  {feature.animation === "modular" && (
                    <div className="absolute inset-0">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 border-2 border-[#00F5FF] rounded"
                          style={{
                            left: `${25 + i * 15}%`,
                            top: '70%',
                          }}
                          animate={isInView ? {
                            scale: [1, 1.2, 1],
                            borderColor: ['#00F5FF', '#00F5FF80', '#00F5FF'],
                          } : {}}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Glow Effect */}
              <motion.div 
                className="absolute inset-0 rounded-3xl bg-[#00F5FF] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-20"
                animate={isInView ? {
                  opacity: [0, 0.1, 0],
                  transition: { duration: 3, repeat: Infinity, delay: index * 0.3 }
                } : {}}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.p 
            className="text-gray-400 mb-6"
            animate={isInView ? {
              opacity: [0.5, 1, 0.5],
              transition: { duration: 2, repeat: Infinity }
            } : {}}
          >
            Ready to experience the future of blockchain?
          </motion.p>
          <Link href="/build/docs/quick-start">
            <motion.button
              className="bg-gradient-to-r from-[#00F5FF] to-cyan-400 text-[#0A0F2C] px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isInView ? {
                scale: [1, 1.02, 1],
                transition: { duration: 2, repeat: Infinity }
              } : {}}
            >
              Explore Technical Documentation
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}