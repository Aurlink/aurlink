// app/build/docs/quick-start/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Code2, Terminal, Zap, BookOpen, Rocket, Shield, Cpu, GitBranch } from 'lucide-react';

export default function QuickStartPage() {
  const steps = [
    {
      step: '01',
      icon: <Terminal className="w-6 h-6" />,
      title: 'Environment Setup',
      description: 'Install Aurlink CLI and configure your development environment',
      code: 'npm install -g @aurlink/cli',
      duration: '5 min'
    },
    {
      step: '02',
      icon: <Code2 className="w-6 h-6" />,
      title: 'Initialize Project',
      description: 'Create your first Aurlink dApp with our starter template',
      code: 'aurlink init my-dapp',
      duration: '2 min'
    },
    {
      step: '03',
      icon: <Zap className="w-6 h-6" />,
      title: 'Deploy Contract',
      description: 'Deploy your smart contract to Aurlink testnet',
      code: 'aurlink deploy --network testnet',
      duration: '3 min'
    },
    {
      step: '04',
      icon: <Rocket className="w-6 h-6" />,
      title: 'Go Live',
      description: 'Deploy to mainnet and start building your user base',
      code: 'aurlink deploy --network mainnet',
      duration: '1 min'
    },
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Built-in Security',
      description: 'Automated security audits and vulnerability scanning',
      items: ['Smart contract analysis', 'Gas optimization', 'Access control']
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Multi-Chain Ready',
      description: 'Deploy once, run everywhere across supported chains',
      items: ['Ethereum', 'BSC', 'Polygon', 'Solana', 'More...']
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: 'CI/CD Integration',
      description: 'Seamless integration with your development workflow',
      items: ['GitHub Actions', 'Automated testing', 'One-click deployment']
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-green-500/20 border border-green-400/30 rounded-full px-6 py-3 mb-8">
              <Code2 className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Developer Quick Start</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Build in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">Minutes</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Get your dApp running on Aurlink in under 15 minutes. Our developer-friendly tools and 
              comprehensive documentation make blockchain development accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Start Steps */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-12">Get Started in 4 Steps</h2>
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                        {step.step}
                      </div>
                      <div className="flex-1 w-0.5 bg-green-500/30 mt-4"></div>
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-green-400">{step.icon}</div>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{step.description}</p>
                      <div className="bg-slate-800 rounded-lg p-4 border border-green-400/20">
                        <code className="text-green-400 font-mono text-sm">{step.code}</code>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Prerequisites</h3>
                <div className="space-y-4">
                  {[
                    'Node.js 18+ installed',
                    'Basic JavaScript knowledge',
                    'MetaMask or similar wallet',
                    'Git installed'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-400/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Need Help?</h3>
                <p className="text-gray-300 mb-6">
                  Our developer community is here to help you get started and answer any questions.
                </p>
                <div className="space-y-3">
                  <button className="w-full text-left p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="font-semibold text-white">Join Discord</div>
                    <div className="text-gray-400 text-sm">Real-time developer support</div>
                  </button>
                  <button className="w-full text-left p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="font-semibold text-white">View Examples</div>
                    <div className="text-gray-400 text-sm">Complete dApp examples</div>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Developer Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">Experience</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-green-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-400/20 rounded-3xl p-12"
          >
            <BookOpen className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Start Building?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Explore our comprehensive documentation and start building the next generation of dApps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300">
                View Full Documentation
              </button>
              <button className="px-8 py-4 border border-green-400 text-green-400 rounded-xl font-semibold hover:bg-green-400/10 transition-all duration-300">
                Try Interactive Tutorial
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}