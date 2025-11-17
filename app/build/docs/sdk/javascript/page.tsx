// app/docs/sdk/javascript/page.tsx
'use client'
import { motion } from 'framer-motion'
import { DocsLayout } from '@/components/docs/DocsLayout'
import { ApiEndpoint } from '@/components/docs/ApiEndpoint'

const installation = `npm install @aurlink/sdk
# or
yarn add @aurlink/sdk`

const quickStart = `import { AurlinkClient } from '@aurlink/sdk'

// Initialize client
const client = new AurlinkClient({
  apiKey: 'your-api-key',
  network: 'mainnet' // or 'testnet'
})

// Get network info
const networkInfo = await client.network.getInfo()

// Send transaction
const txResult = await client.transactions.send({
  from: '0xYourAddress',
  to: '0xRecipientAddress',
  value: '1000000000000000000'
})

// AI Inference
const prediction = await client.ai.inference({
  model: 'price_prediction_v2',
  input: {
    historical_prices: [100, 105, 110, 108, 115]
  }
})`

const examples = [
  {
    title: "Real-time Network Monitoring",
    description: "Monitor network health and performance",
    code: `// Subscribe to network updates
client.network.subscribe({
  onBlock: (block) => {
    console.log('New block:', block.number)
    console.log('AI optimizations:', block.aiOptimizations)
  },
  onHealthChange: (health) => {
    console.log('Network health:', health)
  }
})`
  },
  {
    title: "Batch Transactions",
    description: "Send multiple transactions efficiently",
    code: `// Batch transactions with AI optimization
const batchResult = await client.transactions.batchSend([
  {
    to: '0xAddress1',
    value: '1000000000000000000'
  },
  {
    to: '0xAddress2', 
    value: '2000000000000000000'
  }
], {
  optimizeGas: true, // Let AI optimize gas costs
  parallelize: true  // Use parallel processing
})`
  },
  {
    title: "Cross-chain Routing",
    description: "Find optimal routes between chains",
    code: `// Find cross-chain route
const route = await client.connect.findRoute({
  fromChain: 'ethereum',
  toChain: 'aurlink',
  fromToken: 'ETH',
  toToken: 'AUR',
  amount: '1000000000000000000'
})

// Execute route
const execution = await client.connect.executeRoute({
  routeId: route.routeId,
  fromAddress: '0xYourAddress',
  toAddress: '0xRecipientAddress'
})`
  }
]

const sdkEndpoints = [
  {
    method: 'GET',
    path: '/network/info',
    description: 'Get network information',
    parameters: [],
    response: {
      code: 200,
      example: `{
  "network": "aurlink-mainnet",
  "version": "1.3.0",
  "blockHeight": 1542892,
  "health": "healthy"
}`
    }
  },
  {
    method: 'POST',
    path: '/transactions/send',
    description: 'Send transaction',
    parameters: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: 'Sender address'
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: 'Recipient address'
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: 'Amount in wei'
      }
    ],
    response: {
      code: 200,
      example: `{
  "txHash": "0x...",
  "status": "pending",
  "estimatedConfirmation": 1.2
}`
    }
  }
]

export default function JavaScriptSdkPage() {
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
            JavaScript SDK
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Fully featured TypeScript SDK for interacting with the Aurlink network, 
            AI services, and cross-chain connectivity.
          </p>
        </motion.div>

        {/* Installation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Installation</h2>
          <div className="bg-gray-900 rounded-lg p-6">
            <pre className="text-sm text-gray-300">{installation}</pre>
          </div>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
          <div className="bg-gray-900 rounded-lg p-6">
            <pre className="text-sm text-gray-300">{quickStart}</pre>
          </div>
        </motion.div>

        {/* Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Examples</h2>
          <div className="grid gap-8">
            {examples.map((example, index) => (
              <div key={example.title} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-2">{example.title}</h3>
                <p className="text-gray-300 mb-4">{example.description}</p>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-sm text-gray-300">{example.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* API Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">API Reference</h2>
          <div className="space-y-6">
            {sdkEndpoints.map((endpoint, index) => (
              <ApiEndpoint key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </motion.div>
      </div>
    </DocsLayout>
  )
}