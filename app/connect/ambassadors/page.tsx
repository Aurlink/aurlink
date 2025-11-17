// app/connect/ambassadors/page.tsx
'use client'

import React from "react";
import { motion } from "framer-motion";

// Animation components that wrap motion for client-side only
const MotionHeader = motion.header;
const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

export default function AurlinkPioneersPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const tiers = [
    { title: 'Pioneer', emoji: '🧭', desc: 'Join, engage, learn, and grow with the community', reward: 'Founder Badge', color: 'from-blue-500 to-cyan-500' },
    { title: 'Builder', emoji: '⚙️', desc: 'Contribute to code, tools, or documentation', reward: 'XP + Spotlight', color: 'from-green-500 to-emerald-500' },
    { title: 'Sentinel', emoji: '🛡️', desc: 'Run a node, test the network, ensure uptime', reward: 'Leaderboard + Drop', color: 'from-purple-500 to-indigo-500' },
    { title: 'Ambassador', emoji: '🌍', desc: 'Represent Aurlink in your region', reward: 'Merch + Feature', color: 'from-orange-500 to-red-500' },
    { title: 'Architect', emoji: '🧩', desc: 'Core contributor and advisor', reward: 'Governance Rights', color: 'from-yellow-500 to-amber-500' }
  ];

  const missions = [
    { title: 'Share an Insight', desc: 'Write a short thread about Aurlink or AI consensus on X', reward: '10 XP', difficulty: 'Easy' },
    { title: 'Fix Documentation', desc: 'Improve README or developer docs on GitHub', reward: '25 XP', difficulty: 'Medium' },
    { title: 'Run a Validator', desc: 'Deploy a validator on Testnet and submit report', reward: '100 XP', difficulty: 'Hard' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1724] via-[#071026] to-[#051023] text-slate-100 antialiased">
      {/* Header */}
      <MotionHeader 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto px-6 md:px-8 py-10 flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-purple-500 to-indigo-400 rounded-2xl shadow-lg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">Aurlink</h1>
            <p className="text-xs text-slate-400">The Blockchain That Learns</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm text-slate-300">
          {['About', 'Tiers', 'Missions', 'Rewards', 'Join'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-200">
              {item}
            </a>
          ))}
          <a href="/docs" className="px-3 py-1 rounded-full border border-slate-700 hover:bg-slate-800 transition-colors">
            Docs
          </a>
        </nav>
        
        <div className="flex items-center space-x-3">
          <a href="#join" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 font-medium shadow-lg hover:shadow-purple-500/25 transition-all">
            Become a Pioneer
          </a>
          <a href="https://discord.gg/" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-700 hover:bg-slate-800 transition-colors">
            Join Discord
          </a>
        </div>
      </MotionHeader>

      <main className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Hero Section */}
        <MotionSection 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 md:py-24"
        >
          <div>
            <MotionH2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Join the Frontier of <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-400">Intelligence</span> and Decentralization
            </MotionH2>

            <MotionP variants={itemVariants} className="mt-6 text-slate-300 text-lg max-w-xl leading-relaxed">
              The <strong className="text-white">Aurlink Pioneers Program</strong> is your gateway into the core of the world's first AI-learning blockchain. Earn recognition, unlock rewards, and help shape a network that evolves with every interaction.
            </MotionP>

            <MotionDiv variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
              <a href="#join" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Become a Pioneer
              </a>
              <a href="https://discord.gg/" className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-colors">
                Join the Discord
              </a>
            </MotionDiv>

            <MotionDiv variants={itemVariants} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <strong className="text-white">Early Access</strong>
                <div className="mt-1 text-slate-400 text-sm">Priority Testnet access and exclusive drops</div>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <strong className="text-white">Recognition</strong>
                <div className="mt-1 text-slate-400 text-sm">On-chain credentials & eternal badges</div>
              </div>
            </MotionDiv>
          </div>

          <MotionDiv variants={itemVariants} className="relative">
            <div className="w-full rounded-2xl border border-slate-700 p-6 bg-gradient-to-b from-slate-900/60 to-slate-900/30 shadow-2xl backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-xs uppercase text-slate-400 font-semibold tracking-wide">Featured Mission</div>
                  <h3 className="mt-2 text-xl font-bold text-white">Run & Report — Testnet Validator Sprint</h3>
                  <p className="mt-3 text-slate-300 leading-relaxed">
                    Start a validator node on the Aurlink Testnet, maintain uptime, and submit a structured report. Earn Sentinel XP and priority rewards.
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <a href="#missions" className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 font-medium hover:shadow-lg transition-all">
                      Start Mission
                    </a>
                    <a href="#tiers" className="px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
                      See Tiers
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                <div className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                  <div className="font-semibold text-slate-300">Status</div>
                  <div className="mt-1 text-green-400 font-medium">Open</div>
                </div>
                <div className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                  <div className="font-semibold text-slate-300">Reward</div>
                  <div className="mt-1 text-purple-400 font-medium">Sentinel XP + Badge</div>
                </div>
                <div className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                  <div className="font-semibold text-slate-300">Time</div>
                  <div className="mt-1 text-slate-200 font-medium">1 Week</div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -bottom-6 -left-6 -z-10 opacity-20">
              <div className="w-72 h-72 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-3xl"></div>
            </div>
          </MotionDiv>
        </MotionSection>

        {/* About Section */}
        <MotionSection 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          id="about"
          className="py-16"
        >
          <div className="max-w-3xl">
            <h3 className="text-3xl font-bold text-white">Who Are the Pioneers?</h3>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Aurlink Pioneers are the earliest supporters driving the evolution of the network. From developers and validators to community leaders and creators — every Pioneer helps the chain learn, grow, and adapt through meaningful contributions.
            </p>
          </div>
        </MotionSection>

        {/* Tiers Section */}
        <MotionSection 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          id="tiers"
          className="py-16"
        >
          <h3 className="text-3xl font-bold text-white">Tiers & Roles</h3>
          <p className="mt-3 text-slate-400 max-w-2xl text-lg">
            Rise through the ranks by contributing to code, running nodes, hosting events, and helping others learn. Each tier unlocks new responsibilities and rewards.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {tiers.map((tier, index) => (
              <MotionDiv
                key={tier.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-5 bg-slate-800/30 rounded-2xl border border-slate-700 text-center hover:border-slate-600 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{tier.emoji}</div>
                <div className="font-bold text-lg text-white">{tier.title}</div>
                <div className="mt-2 text-sm text-slate-300 leading-relaxed">{tier.desc}</div>
                <div className="mt-4 text-xs">
                  <span className="text-slate-400">Reward: </span>
                  <span className="font-semibold text-slate-200">{tier.reward}</span>
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionSection>

        {/* Missions Section */}
        <MotionSection 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          id="missions"
          className="py-16"
        >
          <h3 className="text-3xl font-bold text-white">Pioneer Missions</h3>
          <p className="mt-3 text-slate-400 max-w-2xl text-lg">
            Weekly missions help you earn XP, level up, and contribute to the network in meaningful ways.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {missions.map((mission, index) => (
              <MotionDiv
                key={mission.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="font-bold text-white text-lg">{mission.title}</div>
                    <div className="mt-2 text-slate-300 text-sm leading-relaxed">{mission.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Reward</div>
                    <div className="font-semibold text-green-400">{mission.reward}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-slate-700 rounded text-slate-300">
                    {mission.difficulty}
                  </span>
                  <div className="flex gap-2">
                    <a href="#join" className="px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 font-medium text-sm hover:shadow-lg transition-all">
                      Start
                    </a>
                    <a href="#" className="px-3 py-2 rounded-lg border border-slate-700 text-sm hover:bg-slate-800 transition-colors">
                      Details
                    </a>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionSection>

        {/* Rewards Section */}
        <MotionSection 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          id="rewards"
          className="py-16"
        >
          <h3 className="text-3xl font-bold text-white">Rewards & Recognition</h3>
          <p className="mt-3 text-slate-400 max-w-2xl text-lg">
            Aurlink rewards effort with lasting recognition — from on-chain credentials to exclusive drops for top Pioneers.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/20 border border-slate-700 hover:border-purple-500/30 transition-all duration-300">
              <div className="text-xs uppercase text-purple-400 font-semibold tracking-wide">Recognition</div>
              <div className="mt-3 font-bold text-white text-lg">On-chain Credentials</div>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Every verified contribution is preserved as immutable proof of work on the blockchain for eternal recognition.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/20 border border-slate-700 hover:border-indigo-500/30 transition-all duration-300">
              <div className="text-xs uppercase text-indigo-400 font-semibold tracking-wide">Rewards</div>
              <div className="mt-3 font-bold text-white text-lg">XP & Token Allocations</div>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                XP converts into future airdrops, governance rights, and exclusive access to network incentives.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/20 border border-slate-700 hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-xs uppercase text-cyan-400 font-semibold tracking-wide">Perks</div>
              <div className="mt-3 font-bold text-white text-lg">Priority Access</div>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Early access to Testnet phases, developer tooling, grant programs, and partner collaborations.
              </p>
            </div>
          </div>
        </MotionSection>

        {/* CTA Section */}
        <MotionSection 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          id="join"
          className="py-20 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-4xl font-bold text-white">Be Part of the Chain That Learns</h3>
            <p className="mt-4 text-slate-300 text-lg">
              Early pioneers will forever be remembered as the ones who helped train the intelligence behind Aurlink.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#" className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Join as Pioneer
              </a>
              <a href="https://discord.gg/" className="px-6 py-4 rounded-md border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-colors">
                Enter the Discord
              </a>
            </div>

            <div className="mt-6 text-sm text-slate-500">
              By joining you agree to community guidelines. Participation is non-binding and contributes to future eligibility for rewards.
            </div>
          </div>
        </MotionSection>
      </main>

      {/* Footer */}
      <MotionSection 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-16 border-t border-slate-800 py-8"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} Aurlink Labs — The Blockchain That Learns
          </div>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'GitHub', 'Docs'].map((item) => (
              <a key={item} href={`/${item.toLowerCase()}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </MotionSection>
    </div>
  );
}