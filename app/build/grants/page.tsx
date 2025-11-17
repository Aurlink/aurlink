// app/build/grants/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Award, Rocket, Users, Coins, Code2, Zap, TrendingUp, Globe } from 'lucide-react';

export default function GrantsPage() {
  const grantTiers = [
    {
      tier: 'Seed',
      amount: '$5K - $25K',
      focus: 'Early-stage prototypes and MVPs',
      benefits: [
        'Technical mentorship',
        'Access to Aurlink APIs',
        'Community support',
        'Demo day opportunity'
      ],
      for: 'Individual developers and small teams'
    },
    {
      tier: 'Growth',
      amount: '$25K - $100K',
      focus: 'Scaling proven concepts',
      benefits: [
        'Strategic partnerships',
        'Marketing support',
        'Legal and compliance',
        'Investor introductions'
      ],
      for: 'Teams with traction and users'
    },
    {
      tier: 'Scale',
      amount: '$100K - $500K',
      focus: 'Enterprise-ready solutions',
      benefits: [
        'Enterprise integration',
        'Dedicated engineering support',
        'Global deployment assistance',
        'Co-marketing campaigns'
      ],
      for: 'Established projects ready to scale'
    },
  ];

  const successStories = [
    {
      project: 'CrossChain Swap',
      grant: '$50K Growth Grant',
      achievement: 'Processed $2.4B in volume',
      description: 'Built the first AI-optimized cross-chain DEX'
    },
    {
      project: 'Secure Identity',
      grant: '$25K Seed Grant',
      achievement: '2M+ identities secured',
      description: 'Revolutionary self-sovereign identity platform'
    },
    {
      project: 'SupplyTrack',
      grant: '$100K Scale Grant',
      achievement: '$150M in goods tracked',
      description: 'Enterprise supply chain transparency solution'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-amber-500/20 border border-amber-400/30 rounded-full px-6 py-3 mb-8">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-semibold">Developer Grants Program</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Future</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Get funded to build the next generation of decentralized applications. 
              $10M grant pool available for innovative projects on Aurlink.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                Apply for Grant
                <Rocket className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border border-amber-400 text-amber-400 rounded-xl font-semibold hover:bg-amber-400/10 transition-all duration-300">
                View Guidelines
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grant Tiers */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Grant <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Tiers</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {grantTiers.map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-400/20 rounded-2xl p-8 hover:border-amber-400/40 transition-all duration-300 group"
              >
                <div className="text-center mb-6">
                  <div className="text-amber-400 text-sm font-semibold mb-2">{tier.tier} TIER</div>
                  <div className="text-3xl font-bold text-white mb-2">{tier.amount}</div>
                  <div className="text-gray-400 text-sm">{tier.focus}</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-amber-400 font-semibold text-sm mb-2">BENEFITS</div>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Zap className="w-3 h-3 text-amber-400" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-400/20 rounded-lg p-4">
                  <div className="text-amber-400 font-semibold text-sm">IDEAL FOR</div>
                  <div className="text-white text-sm mt-1">{tier.for}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Grant Success Stories</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how our grant recipients are building the future of decentralized technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.project}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{story.project}</h3>
                <div className="text-amber-400 font-semibold text-sm mb-4">{story.grant}</div>
                <div className="bg-amber-500/10 border border-amber-400/20 rounded-lg p-3 mb-4">
                  <div className="text-white font-bold text-lg">{story.achievement}</div>
                </div>
                <p className="text-gray-300 text-sm">{story.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/20 rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold text-white mb-6">Application Process</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: 'Submit Proposal',
                      description: 'Detailed project proposal with technical specifications',
                      duration: '1-2 weeks'
                    },
                    {
                      step: 'Technical Review',
                      description: 'Evaluation by our engineering and product teams',
                      duration: '2-3 weeks'
                    },
                    {
                      step: 'Interview',
                      description: 'Meet the team and discuss implementation details',
                      duration: '1 week'
                    },
                    {
                      step: 'Grant Award',
                      description: 'Contract signing and initial funding disbursement',
                      duration: '1 week'
                    },
                  ].map((stage, index) => (
                    <div key={stage.step} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">{stage.step}</div>
                        <div className="text-gray-400 text-sm">{stage.description}</div>
                      </div>
                      <div className="text-amber-400 text-sm font-semibold">{stage.duration}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <Coins className="w-16 h-16 text-amber-400 mx-auto mb-6" />
                <div className="text-6xl font-bold text-white mb-4">$10M</div>
                <div className="text-gray-400 text-xl mb-2">Total Grant Pool</div>
                <div className="text-gray-500">Supporting innovation in Web3</div>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <TrendingUp className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <div className="text-white font-bold">45</div>
                    <div className="text-gray-400 text-sm">Projects Funded</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <Globe className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <div className="text-white font-bold">18</div>
                    <div className="text-gray-400 text-sm">Countries</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}