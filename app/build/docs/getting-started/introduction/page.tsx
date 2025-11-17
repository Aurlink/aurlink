// app/docs/getting-started/introduction/page.tsx - COMPLETE PRODUCTION CONTENT
'use client'
import { motion } from 'framer-motion'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { TableOfContents } from '@/components/docs/TableOfContents'

const content = {
  title: 'Introduction to Aurlink',
  description: 'Get started with Aurlink - the AI-powered blockchain platform. Learn core concepts, architecture, and build your first dApp.',
  sections: [
    {
      title: 'What is Aurlink?',
      content: `Aurlink is a next-generation blockchain platform that seamlessly integrates artificial intelligence with decentralized technology. It's designed to solve key challenges in scalability, interoperability, and intelligence through AI-powered optimization at the protocol level.`,
      type: 'text'
    },
    {
      title: 'Key Features & Benefits',
      content: [
        '**AI-Enhanced Consensus**: NeuraLink Consensus uses machine learning to optimize validator performance, reducing downtime by 20%',
        '**EVM Compatibility**: Full compatibility with Ethereum tooling and smart contracts with additional AI precompiles',
        '**Cross-Chain Interoperability**: AI-guided routing reduces cross-chain slippage by 25% with trust-minimized bridges',
        '**Neural Optimization Layer**: On-chain AI services for real-time optimization, predictions, and risk assessment',
        '**High Performance**: 5,000-20,000 TPS with 1.5s finality through optimized architecture',
        '**Real-World Asset Tokenization**: Compliant RWA tokenization with ZK-proof verification and regulatory frameworks'
      ],
      type: 'list'
    },
    {
      title: 'Architecture Overview',
      content: `Aurlink features a modular architecture that separates consensus, execution, and interoperability layers, all optimized by AI for maximum performance and scalability. The platform consists of four main layers:`,
      type: 'text'
    },
    {
      title: 'Core Components',
      content: [
        '**NeuraLink Consensus**: Hybrid DPoS with AI-optimized validator selection and fault prediction',
        '**AurlinkVM**: EVM-compatible execution environment with AI precompiles and zk-SNARK support',
        '**Aurlink Connect**: Cross-chain interoperability protocol with AI-guided liquidity routing',
        '**Neural Optimization Layer (NOL)**: On-chain AI services for dApps and protocol optimization',
        '**Aurion Language**: Cognitive smart contract language with native AI integration'
      ],
      type: 'list'
    },
    {
      title: 'Quick Start Example',
      content: `Here's how to deploy your first smart contract on Aurlink:`,
      type: 'code',
      code: `// Install Aurlink SDK
npm install @aurlink/sdk ethers

// Import and initialize
import { Aurlink } from '@aurlink/sdk'
import { ethers } from 'ethers'

// Connect to Aurlink network
const provider = new ethers.providers.JsonRpcProvider('https://rpc.aurlink.io')
const aurlink = new Aurlink({ provider })

// Deploy a simple contract
const contractCode = \`
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloAurlink {
    string public message;
    
    constructor(string memory _message) {
        message = _message;
    }
    
    function updateMessage(string memory _newMessage) public {
        message = _newMessage;
    }
}
\`

// Deploy using Aurlink SDK
const deployment = await aurlink.contracts.deploy({
  code: contractCode,
  constructorArgs: ['Hello Aurlink!']
})

console.log('Contract deployed at:', deployment.address)
console.log('Transaction hash:', deployment.txHash)`,
      language: 'javascript'
    },
    {
      title: 'Network Information',
      content: [
        '**Mainnet RPC**: https://rpc.aurlink.io',
        '**Testnet RPC**: https://rpc-testnet.aurlink.io',
        '**Chain ID**: 7890 (Mainnet), 7891 (Testnet)',
        '**Currency**: AUR (1 AUR = 10^18 wei)',
        '**Block Time**: 400ms target',
        '**Explorer**: https://explorer.aurlink.io'
      ],
      type: 'list'
    },
    {
      title: 'Next Steps',
      content: `Now that you understand the basics, here's what to explore next:`,
      type: 'text'
    },
    {
      title: 'Learning Path',
      content: [
        '**Beginner**: Follow our Quick Start guide to deploy your first dApp',
        '**Intermediate**: Explore Smart Contract development with AI integration',
        '**Advanced**: Dive into Cross-Chain interoperability and NOL services',
        '**Expert**: Master Real-World Asset tokenization and compliance'
      ],
      type: 'list'
    }
  ]
}

export default function IntroductionPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl font-bold text-white mb-4">{content.title}</h1>
              <p className="text-xl text-gray-300">{content.description}</p>
            </motion.div>

            <div className="prose prose-invert prose-cyan max-w-none">
              {content.sections.map((section, index) => (
                <motion.section
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-12"
                  id={section.title.toLowerCase().replace(/\s+/g, '-')}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">{section.title}</h2>
                  
                  {section.type === 'text' && (
                    <p className="text-gray-300 leading-relaxed">{section.content as string}</p>
                  )}
                  
                  {section.type === 'list' && (
                    <ul className="text-gray-300 space-y-3">
                      {(section.content as string[]).map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {section.type === 'code' && section.code && (
                    <CodeBlock code={section.code} language={section.language || 'javascript'} />
                  )}
                </motion.section>
              ))}
            </div>

            {/* Next Steps Navigation */}
            <div className="mt-12 p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Ready to continue?</h3>
              <div className="flex gap-4">
                <a
                  href="/docs/getting-started/quickstart"
                  className="flex-1 text-center py-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Quick Start Guide →
                </a>
                <a
                  href="/docs/core-concepts/neuralink-consensus"
                  className="flex-1 text-center py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
                >
                  Core Concepts
                </a>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="hidden xl:block w-64 flex-shrink-0">
            <TableOfContents sections={content.sections} />
          </div>
        </div>
      </div>
    </div>
  )
}