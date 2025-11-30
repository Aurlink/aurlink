'use client'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

function StarField(props) {
  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00F5FF"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

function NeuralConnection() {
  const points = useRef()
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.z = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={points}>
      <torusGeometry args={[0.8, 0.2, 16, 100]} />
      <pointsMaterial color="#00F5FF" size={0.01} />
    </points>
  )
}

export default function PremiumHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F2C]">
      
      {/* 3D Image Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cognitive-core-3d.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#0A0F2C]/60" />
      </div>

      {/* 3D Rotating Neural Network */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 1] }} className="w-full h-full">
          <StarField />
          <NeuralConnection />
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-15">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0F2C]/80 to-[#0A0F2C]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F2C]/60 via-transparent to-[#0A0F2C]/60" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden z-18">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#00F5FF] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00F5FF]/30 bg-[#00F5FF]/10 backdrop-blur-sm mb-8"
        >
          <div className="w-2 h-2 bg-[#00F5FF] rounded-full animate-pulse" />
          <span className="text-[#00F5FF] text-sm font-medium">AI-Powered Layer-1 Blockchain</span>
        </motion.div>

        {/* Main Headline - THREE LINES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            <span className="block text-white">The</span>
            <span className="block bg-gradient-to-r from-[#00F5FF] via-cyan-300 to-[#00F5FF] bg-clip-text text-transparent bg-size-200 animate-gradient">
              Cognitive
            </span>
            <span className="block text-white">Blockchain</span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
        >
          Powered by <span className="text-[#00F5FF] font-semibold">NeuraLink Consensus</span>. 
          Experience infinite scalability through self-optimizing AI infrastructure.
        </motion.p>

        {/* CTA Buttons - CLEAN WITH ONLY TWO MAIN CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          {/* Primary CTA - Whitepaper */}
          <Link href="/connect/whitepaper" className="block w-full sm:w-auto">
            <motion.div 
              className="group relative flex items-center justify-center bg-gradient-to-r from-[#00F5FF] to-cyan-400 text-[#0A0F2C] px-12 py-5 rounded-[3rem] text-lg font-bold overflow-hidden w-full min-w-[220px]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Read the Whitepaper
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </motion.div>
          </Link>

          {/* Secondary CTA - Waitlist */}
          <Link href="/waitlist" className="block w-full sm:w-auto">
            <motion.div 
              className="group relative flex items-center justify-center border-2 border-[#00F5FF] text-[#00F5FF] px-12 py-5 rounded-[3rem] text-lg font-bold overflow-hidden w-full min-w-[220px] bg-transparent hover:bg-[#00F5FF] transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-3 group-hover:text-[#0A0F2C] transition-colors duration-300">
                Join the Waitlist
                <ArrowRight className="w-5 h-5 transition-colors duration-300 group-hover:text-[#0A0F2C] group-hover:translate-x-2" />
              </span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: '10,000+', label: 'Target TPS' },
            { value: '1.5s', label: 'Finality Time' },
            { value: '$500K', label: 'Seed Round' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#00F5FF] mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}