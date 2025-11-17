// app/docs/cross-chain/page.tsx
'use client'
import { motion } from 'framer-motion'
import { DocsLayout } from '@/components/docs/DocsLayout'
import { ApiEndpoint } from '@/components/docs/ApiEndpoint'
import { CodePlayground } from '@/components/docs/CodePlayground'

const supportedChains = [
  {
    name: 'Ethereum',
    id: 'ethereum',
    status: 'Live',
    features: ['ERC-20', 'NFTs', 'DeFi'],
    latency: '2-5 minutes'
  },
  {
    name: 'Aurlink',
    id: 'aurlink',
    status: 'Native', 
    features: ['AI-Optimized', 'High TPS', 'Low Fees'],
    latency: '2-5 seconds'
  },
  {
    name: 'Polygon',
    id: 'polygon', 
    status: 'Live',
    features: ['Low Fees', 'EVM Compatible', 'Growing Ecosystem'],
    latency: '1-3 minutes'
  },
  {
    name: 'Arbitrum',
    id: 'arbitrum',
    status: 'Coming Soon',
    features: ['Layer 2', 'High Throughput', 'EVM+'],
    latency: '1-2 minutes'
  }
]

const connectEndpoints = [
  {
    method: 'POST',
    path: '/connect/route',
    description: 'Find optimal cross-chain route',
    parameters: [
      {
        name: 'fromChain',
        type: 'string',
        required: true,
        description: 'Source chain ID'
      },
      {
        name: 'toChain', 
        type: 'string',
        required: true,
        description: 'Destination chain ID'
      },
      {
        name: 'fromToken',
        type: 'string', 
        required: true,
        description: 'Source token address or symbol'
      },
      {
        name: 'toToken',
        type: 'string',
        required: true, 
        description: 'Destination token address or symbol'
      },
      {
        name: 'amount',
        type: 'string',
        required: true,
        description: 'Amount to transfer'
      }
    ],
    response: {
      code: 200,
      example: `{
  "routeId": "route_abc123",
  "fromChain": "ethereum",
  "toChain": "aurlink", 
  "fromToken": "ETH",
  "toToken": "AUR",
  "amountIn": "1000000000000000000",
  "amountOut": "450000000000000000000",
  "steps": [
    {
      "type": "bridge",
      "protocol": "Aurlink Connect",
      "estimatedTime": 12,
      "fee": "10000000000000000"
    }
  ],
  "totalFee": "10000000000000000",
  "estimatedTime": 12,
  "aiOptimized": true,
  "riskScore": 0.03
}`
    }
  },
  {
    method: 'POST', 
    path: '/connect/execute',
    description: 'Execute a cross-chain route',
    parameters: [
      {
        name: 'routeId',
        type: 'string',
        required: true,
        description: 'Route ID from /connect/route'
      },
      {
        name: 'fromAddress',
        type: 'string',
        required: true,
        description: 'Source address'
      },
      {
        name: 'toAddress',
        type: 'string',
        required: true,
        description: 'Destination address'
      }
    ],
    response: {
      code: 200,
      example: `{
  "executionId": "exec_abc123",
  "routeId": "route_abc123", 
  "status": "pending",
  "transactions": [
    {
      "chain": "ethereum",
      "txHash": "0x...",
      "status": "confirmed"
    }
  ],
  "estimatedCompletion": 1635724860,
  "trackingUrl": "https://explorer.aurlink.io/connect/track/exec_abc123"
}`
    }
  }
]

const workflowSteps = [
  {
    step: 1,
    title: "Find Route",
    description: "AI finds the optimal path between chains",
    details: "Considers fees, speed, security, and liquidity"
  },
  {
    step: 2, 
    title: "User Approval",
    description: "Review route details and confirm",
    details: "See exact amounts, fees, and estimated time"
  },
  {
    step: 3,
    title: "Execute Transfer", 
    description: "Assets move securely between chains",
    details: "Monitored by AI for security and efficiency"
  },
  {
    step: 4,
    title: "Completion",
    description: "Assets arrive at destination",
    details: "Full tracking and confirmation"
  }
]

export default function CrossChainPage() {
  return (
    <DocsLayout>
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Cross-Chain Connect
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Seamlessly transfer assets between blockchains with AI-optimized routing, 
            security monitoring, and real-time tracking.
          </p>
        </motion.div>

        {/* Supported Chains */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Supported Chains</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportedChains.map((chain) => (
              <div key={chain.id} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{chain.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    chain.status === 'Live' 
                      ? 'bg-green-500/20 text-green-400'
                      : chain.status === 'Native'
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {chain.status}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-400">Latency</div>
                    <div className="text-white font-medium">{chain.latency}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Features</div>
                    <div className="space-y-1">
                      {chain.features.map((feature, index) => (
                        <div key={index} className="text-xs text-gray-300">• {feature}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div key={step.step} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-purple-400">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 mb-3">{step.description}</p>
                <p className="text-sm text-gray-400">{step.details}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Playground */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <CodePlayground />
        </motion.div>

        {/* API Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8">API Reference</h2>
          <div className="space-y-6">
            {connectEndpoints.map((endpoint, index) => (
              <ApiEndpoint key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </motion.div>
      </div>
    </DocsLayout>
  )
}