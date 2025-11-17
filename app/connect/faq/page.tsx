// app/connect/faq/page.tsx
'use client';
import { motion } from 'framer-motion';
import { ChevronDown, Search, MessageCircle, BookOpen, Users, Rocket } from 'lucide-react';
import { useState } from 'react';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      category: 'Technology & Architecture',
      icon: <Rocket className="w-5 h-5" />,
      questions: [
        {
          question: 'How does Aurlink achieve cross-chain interoperability?',
          answer: 'Aurlink uses a revolutionary multi-layer architecture combining zero-knowledge proofs, AI-powered routing algorithms, and a decentralized oracle network. This enables secure and efficient communication between 25+ blockchain networks with sub-second finality and military-grade security.'
        },
        {
          question: 'What makes Aurlink different from other interoperability solutions?',
          answer: 'Aurlink is the first platform to integrate artificial intelligence directly into the blockchain interoperability layer. Our AI algorithms optimize routing, predict network conditions, and detect security threats in real-time, delivering 5x faster transactions and 47% lower costs compared to traditional bridges.'
        },
        {
          question: 'Is Aurlink secure against bridge attacks?',
          answer: 'Yes. Aurlink employs multiple security layers including: 1) Zero-knowledge proof verification for all cross-chain transactions, 2) AI-powered threat detection that monitors for suspicious patterns, 3) $500M insurance fund covering all bridged assets, and 4) Formal verification of all smart contracts. We have maintained a perfect security record with zero exploits since launch.'
        }
      ]
    },
    {
      category: 'Token & Economics',
      icon: <BookOpen className="w-5 h-5" />,
      questions: [
        {
          question: 'What is the utility of the $AUR token?',
          answer: '$AUR serves multiple critical functions: 1) Governance - token holders vote on protocol upgrades and parameters, 2) Staking - secure the network and earn rewards, 3) Transaction fees - pay for cross-chain transfers and premium services, 4) Access - unlock enterprise features and API access. The token is designed to capture value from the entire Aurlink ecosystem.'
        },
        {
          question: 'What is the total supply and distribution of $AUR?',
          answer: 'Total supply is 1 billion $AUR tokens with the following distribution: 25% Ecosystem & Development, 20% Public Sale, 15% Team & Advisors, 15% Community & Marketing, 15% Foundation Reserve, and 10% Liquidity & Exchange. All team and advisor tokens are subject to 4-year vesting with 1-year cliff.'
        },
        {
          question: 'How can I stake $AUR tokens?',
          answer: 'Staking is available through the Aurlink Wallet interface. Simply connect your wallet, navigate to the staking section, and choose your preferred validator. Current APY ranges from 8-15% depending on network conditions and staking duration. Staked tokens help secure the network and participate in governance while earning rewards.'
        }
      ]
    },
    {
      category: 'Development & Integration',
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          question: 'How do I integrate Aurlink into my dApp?',
          answer: 'Integration is straightforward with our comprehensive SDK and API documentation. Most developers can integrate cross-chain functionality in under 2 hours. We provide: 1) JavaScript/TypeScript SDK, 2) REST APIs with OpenAPI specification, 3) Smart contract templates for Solidity and Vyper, and 4) Step-by-step tutorials for common use cases.'
        },
        {
          question: 'What chains does Aurlink currently support?',
          answer: 'Aurlink currently supports Ethereum, BNB Chain, Polygon, Solana, Arbitrum, Optimism, Base, and Avalanche, with 18 additional chains in development. Our universal interoperability protocol ensures consistent performance and security across all connected networks.'
        },
        {
          question: 'Are there grants available for developers?',
          answer: 'Yes! The Aurlink Foundation has allocated $10M for developer grants across three tiers: Seed ($5K-25K), Growth ($25K-100K), and Scale ($100K-500K). Grants include technical mentorship, marketing support, and access to our enterprise partner network. Applications are reviewed on a rolling basis.'
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
              <MessageCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Frequently Asked Questions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Answers</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Find answers to common questions about Aurlink technology, token economics, 
              and how to get started building on our platform.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search questions and answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="text-green-400">
                  {category.icon}
                </div>
                <h2 className="text-3xl font-bold text-white">{category.category}</h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 10 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <motion.div
                      key={item.question}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-6 text-left flex items-center justify-between gap-4"
                      >
                        <h3 className="text-lg font-semibold text-white flex-1">
                          {item.question}
                        </h3>
                        <ChevronDown 
                          className={`w-5 h-5 text-green-400 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: isOpen ? 'auto' : 0,
                          opacity: isOpen ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-gray-300 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-3xl p-12"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Still Have Questions?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Our team is here to help you get the information you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300">
                Join Community Discord
              </button>
              <button className="px-8 py-4 border border-green-400 text-green-400 rounded-xl font-semibold hover:bg-green-400/10 transition-all duration-300">
                Contact Support
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}