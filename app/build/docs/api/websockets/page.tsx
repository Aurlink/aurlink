// app/docs/api/websockets/page.tsx
'use client'
import { motion } from 'framer-motion'
import { DocsLayout } from '@/components/docs/DocsLayout'
import { ApiEndpoint } from '@/components/docs/ApiEndpoint'

const connectionExample = `// Connect to WebSocket
const ws = new WebSocket('wss://api.aurlink.io/v1/ws')

ws.onopen = () => {
  // Authenticate
  ws.send(JSON.stringify({
    type: 'auth',
    apiKey: 'your-api-key'
  }))
  
  // Subscribe to blocks
  ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'blocks'
  }))
}

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  console.log('Received:', data)
}`

const channels = [
  {
    name: 'blocks',
    description: 'Real-time block updates with AI optimization metrics',
    events: [
      'block.added',
      'block.finalized',
      'block.optimized'
    ]
  },
  {
    name: 'transactions',
    description: 'Transaction lifecycle events and AI risk analysis',
    events: [
      'transaction.pending',
      'transaction.confirmed',
      'transaction.failed',
      'transaction.risk_updated'
    ]
  },
  {
    name: 'network',
    description: 'Network health and performance metrics',
    events: [
      'network.health_change',
      'network.performance_update',
      'network.validator_change'
    ]
  },
  {
    name: 'ai_predictions',
    description: 'Real-time AI model predictions and market insights',
    events: [
      'prediction.updated',
      'model.retrained',
      'anomaly.detected'
    ]
  }
]

const examples = [
  {
    title: "Real-time Block Monitoring",
    description: "Monitor new blocks with AI optimization data",
    code: `// Subscribe to blocks
{
  "type": "subscribe",
  "channel": "blocks"
}

// Receive block data
{
  "channel": "blocks",
  "event": "block.added",
  "data": {
    "number": 1542892,
    "hash": "0x...",
    "aiOptimizations": {
      "tpsGain": 0.15,
      "gasSavings": 1250000,
      "faultPredictions": 3
    }
  }
}`
  },
  {
    title: "Transaction Risk Monitoring",
    description: "Get real-time risk analysis for transactions",
    code: `// Subscribe to transactions
{
  "type": "subscribe", 
  "channel": "transactions",
  "filters": {
    "address": "0xYourAddress"
  }
}

// Receive risk analysis
{
  "channel": "transactions",
  "event": "transaction.risk_updated", 
  "data": {
    "txHash": "0x...",
    "riskScore": 0.02,
    "anomalyDetection": "normal",
    "recommendations": ["proceed"]
  }
}`
  }
]

export default function WebsocketsPage() {
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
            WebSocket API
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time data streams for blocks, transactions, AI predictions, and network metrics.
          </p>
        </motion.div>

        {/* Connection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Connection</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">URLs</h3>
              <div className="space-y-2">
                <div className="bg-gray-900 rounded-lg p-4">
                  <code className="text-green-400">Mainnet:</code>
                  <div className="text-gray-300 text-sm mt-1">wss://api.aurlink.io/v1/ws</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <code className="text-yellow-400">Testnet:</code>
                  <div className="text-gray-300 text-sm mt-1">wss://api-testnet.aurlink.io/v1/ws</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Authentication</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300">{`{
  "type": "auth",
  "apiKey": "your-api-key"
}`}</pre>
              </div>
            </div>
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
            <pre className="text-sm text-gray-300">{connectionExample}</pre>
          </div>
        </motion.div>

        {/* Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Channels</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {channels.map((channel) => (
              <div key={channel.name} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-2 capitalize">{channel.name}</h3>
                <p className="text-gray-300 mb-4">{channel.description}</p>
                <div className="space-y-2">
                  {channel.events.map((event) => (
                    <div key={event} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <code>{event}</code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
      </div>
    </DocsLayout>
  )
}