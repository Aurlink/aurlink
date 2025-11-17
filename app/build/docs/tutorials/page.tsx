// app/docs/tutorials/page.tsx
'use client'
import { motion } from 'framer-motion'
import { DocsLayout } from '@/components/docs/DocsLayout'
import { CodePlayground } from '@/components/docs/CodePlayground'
import { ClockIcon, ChartBarIcon, CpuChipIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline'

const tutorials = [
  {
    id: 'build-trading-bot',
    title: 'Build an AI-Powered Trading Bot',
    description: 'Create a trading bot that uses Aurlink AI predictions for automated trading decisions',
    duration: '25 min',
    difficulty: 'Intermediate',
    icon: ChartBarIcon,
    steps: [
      {
        title: 'Set Up Project',
        description: 'Initialize your trading bot project with the Aurlink SDK',
        code: `npm init -y
npm install @aurlink/sdk axios`
      },
      {
        title: 'Configure AI Models',
        description: 'Set up price prediction and risk assessment models',
        code: `import { AurlinkClient } from '@aurlink/sdk'

const client = new AurlinkClient({
  apiKey: process.env.AURLINK_API_KEY
})

// Get available models
const models = await client.ai.getModels()
const priceModel = models.find(m => m.id === 'price_prediction_v2')`
      },
      {
        title: 'Implement Trading Logic',
        description: 'Create decision-making logic based on AI predictions',
        code: `async function evaluateTrade(symbol, amount) {
  // Get AI prediction
  const prediction = await client.ai.inference({
    model: 'price_prediction_v2',
    input: {
      historical_prices: await getPriceHistory(symbol),
      market_indicators: await getMarketData(symbol)
    }
  })

  // Get risk assessment
  const risk = await client.ai.inference({
    model: 'risk_assessment_v1',
    input: {
      trade_amount: amount,
      market_volatility: prediction.volatility,
      portfolio_exposure: getCurrentExposure()
    }
  })

  // Make decision
  if (prediction.confidence > 0.8 && risk.riskScore < 0.1) {
    return { action: 'BUY', confidence: prediction.confidence }
  } else if (prediction.confidence < 0.3 || risk.riskScore > 0.3) {
    return { action: 'SELL', confidence: 1 - prediction.confidence }
  }
  
  return { action: 'HOLD', confidence: 0.5 }
}`
      }
    ]
  },
  {
    id: 'cross-chain-dapp',
    title: 'Create a Cross-Chain DeFi Application',
    description: 'Build a DeFi app that operates across multiple blockchains using Aurlink Connect',
    duration: '35 min',
    difficulty: 'Advanced',
    icon: ArrowsRightLeftIcon,
    steps: [
      {
        title: 'Set Up Multi-Chain Support',
        description: 'Configure your app to work with multiple blockchains',
        code: `// Supported chains configuration
const SUPPORTED_CHAINS = {
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    rpcUrl: process.env.ETH_RPC_URL
  },
  aurlink: {
    id: 'aurlink', 
    name: 'Aurlink',
    rpcUrl: process.env.AURLINK_RPC_URL
  },
  polygon: {
    id: 'polygon',
    name: 'Polygon',
    rpcUrl: process.env.POLYGON_RPC_URL
  }
}`
      },
      {
        title: 'Implement Cross-Chain Swaps',
        description: 'Add the ability to swap assets between chains',
        code: `async function crossChainSwap(fromChain, toChain, fromToken, toToken, amount) {
  // Find optimal route
  const route = await client.connect.findRoute({
    fromChain,
    toChain,
    fromToken, 
    toToken,
    amount
  })

  // Execute the route
  const execution = await client.connect.executeRoute({
    routeId: route.routeId,
    fromAddress: userAddress,
    toAddress: userAddress
  })

  // Monitor progress
  const monitor = setInterval(async () => {
    const status = await client.connect.getStatus(execution.executionId)
    updateUI(status)
    
    if (status.status === 'completed') {
      clearInterval(monitor)
      showSuccess('Swap completed!')
    }
  }, 5000)
}`
      },
      {
        title: 'Add Liquidity Management',
        description: 'Manage liquidity across multiple chains',
        code: `class CrossChainLiquidityManager {
  async rebalanceLiquidity() {
    // Get AI recommendations for optimal liquidity distribution
    const recommendation = await client.ai.inference({
      model: 'liquidity_optimization_v1',
      input: {
        current_allocation: await this.getAllocations(),
        market_conditions: await this.getMarketConditions(),
        fee_estimates: await this.getFeeEstimates()
      }
    })

    // Execute rebalancing if AI recommends
    if (recommendation.confidence > 0.75) {
      await this.executeRebalancing(recommendation.actions)
    }
  }
}`
      }
    ]
  },
  {
    id: 'ai-analytics-dashboard',
    title: 'Build an AI Analytics Dashboard',
    description: 'Create a dashboard that visualizes AI-powered network analytics and predictions',
    duration: '20 min',
    difficulty: 'Beginner',
    icon: CpuChipIcon,
    steps: [
      {
        title: 'Set Up Data Collection',
        description: 'Collect real-time data from the Aurlink network',
        code: `// Real-time data collection
const wsClient = new AurlinkWebSocketClient({
  apiKey: process.env.AURLINK_API_KEY
})

// Subscribe to network metrics
wsClient.subscribe('network', (data) => {
  updateDashboard({
    tps: data.tps,
    blockTime: data.blockTime,
    aiPerformance: data.aiPerformance
  })
})

// Subscribe to AI predictions
wsClient.subscribe('ai_predictions', (prediction) => {
  updatePredictions(prediction)
})`
      },
      {
        title: 'Create Visualization Components',
        description: 'Build charts and graphs for data visualization',
        code: `function PerformanceChart({ data }) {
  return (
    <div className="chart-container">
      <LineChart data={data}>
        <Line 
          dataKey="tps" 
          stroke="#8884d8" 
          name="Transactions Per Second"
        />
        <Line
          dataKey="aiOptimizationGain"
          stroke="#82ca9d"
          name="AI Optimization Gain"
        />
      </LineChart>
    </div>
  )
}`
      },
      {
        title: 'Implement Alert System',
        description: 'Set up AI-powered alerts for important events',
        code: `// AI-powered alert system
async function checkForAlerts() {
  const networkHealth = await client.network.getHealth()
  const predictions = await client.ai.getPredictions()
  
  // Check for anomalies
  if (networkHealth.anomalyScore > 0.8) {
    sendAlert('Network anomaly detected', 'high')
  }
  
  // Check prediction confidence
  if (predictions.confidence < 0.6) {
    sendAlert('Low prediction confidence', 'medium')
  }
}

// Run checks every minute
setInterval(checkForAlerts, 60000)`
      }
    ]
  }
]

export default function TutorialsPage() {
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
            Tutorials & Guides
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Step-by-step tutorials to help you build powerful applications 
            with Aurlink AI and cross-chain capabilities.
          </p>
        </motion.div>

        {/* Tutorials Grid */}
        <div className="grid gap-8 mb-16">
          {tutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 overflow-hidden"
            >
              {/* Tutorial Header */}
              <div className="p-8 border-b border-gray-700">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <tutorial.icon className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h2 className="text-2xl font-bold text-white">{tutorial.title}</h2>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <ClockIcon className="w-4 h-4" />
                        {tutorial.duration}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        tutorial.difficulty === 'Beginner' 
                          ? 'bg-green-500/20 text-green-400'
                          : tutorial.difficulty === 'Intermediate'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {tutorial.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-300 text-lg">{tutorial.description}</p>
                  </div>
                </div>
              </div>

              {/* Tutorial Steps */}
              <div className="p-8">
                <div className="space-y-8">
                  {tutorial.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex gap-6">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-400 font-semibold text-sm">{stepIndex + 1}</span>
                        </div>
                        {stepIndex < tutorial.steps.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-600 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-300 mb-4">{step.description}</p>
                        <div className="bg-gray-900 rounded-lg p-4">
                          <pre className="text-sm text-gray-300">{step.code}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Playground */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <CodePlayground />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Building?
            </h3>
            <p className="text-gray-200 mb-6">
              Join thousands of developers building the future of decentralized applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get API Key
              </button>
              <button className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </DocsLayout>
  )
}