// components/docs/CodeSandboxEmbed.tsx
'use client'
import { useState } from 'react'
import { PlayIcon } from '@heroicons/react/24/outline'

interface CodeSandboxProps {
  title: string
  description: string
  files: Record<string, string>
  template?: 'node' | 'javascript' | 'react'
}

const createCodeSandbox = async (files: Record<string, string>, template: string = 'node') => {
  // This would create an actual CodeSandbox in production
  // For now, we'll simulate the process
  const parameters = {
    files: Object.entries(files).reduce((acc, [filename, content]) => {
      acc[filename] = { content, isBinary: false }
      return acc
    }, {} as any),
    template
  }

  // In a real implementation, you'd POST to CodeSandbox API
  console.log('Creating CodeSandbox with:', parameters)
  
  // Return a mock sandbox ID for demonstration
  return 'mock-sandbox-id'
}

const exampleTemplates = {
  basic: {
    title: 'Basic Aurlink Integration',
    description: 'Simple example showing network info and transaction sending',
    template: 'node' as const,
    files: {
      'package.json': JSON.stringify({
        name: 'aurlink-basic-example',
        version: '1.0.0',
        type: 'module',
        dependencies: {
          '@aurlink/sdk': '^1.3.0',
          'dotenv': '^16.0.0'
        }
      }, null, 2),
      'index.js': `import { AurlinkClient } from '@aurlink/sdk'
import 'dotenv/config'

const client = new AurlinkClient({
  apiKey: process.env.AURLINK_API_KEY,
  network: 'testnet'
})

async function main() {
  try {
    // Get network info
    const networkInfo = await client.network.getInfo()
    console.log('Network TPS:', networkInfo.tps)
    console.log('AI Performance:', networkInfo.aiPerformance)

    // Send a test transaction
    const txResult = await client.transactions.send({
      from: process.env.FROM_ADDRESS,
      to: '0x742E6e1d18458F4477c5C24046475999F433e7c5',
      value: '1000000000000000' // 0.001 ETH
    })

    console.log('Transaction sent:', txResult.txHash)
    console.log('AI Optimization:', txResult.aiOptimization)
    
  } catch (error) {
    console.error('Error:', error)
  }
}

main()`,
      '.env.example': `AURLINK_API_KEY=your_api_key_here
FROM_ADDRESS=your_wallet_address_here`
    }
  },
  aiTrading: {
    title: 'AI Trading Bot',
    description: 'Advanced trading bot using Aurlink AI predictions',
    template: 'node' as const,
    files: {
      'package.json': JSON.stringify({
        name: 'aurlink-ai-trader',
        version: '1.0.0',
        type: 'module',
        dependencies: {
          '@aurlink/sdk': '^1.3.0',
          'dotenv': '^16.0.0',
          'node-cron': '^3.0.0'
        }
      }, null, 2),
      'index.js': `import { AurlinkClient } from '@aurlink/sdk'
import cron from 'node-cron'
import 'dotenv/config'

const client = new AurlinkClient({
  apiKey: process.env.AURLINK_API_KEY
})

class TradingBot {
  constructor() {
    this.portfolio = new Map()
  }

  async analyzeMarket(symbol) {
    // Get AI prediction
    const prediction = await client.ai.inference({
      model: 'price_prediction_v2',
      input: {
        historical_prices: await this.getPriceHistory(symbol),
        market_indicators: await this.getMarketData(symbol)
      }
    })

    // Get risk assessment
    const risk = await client.ai.inference({
      model: 'risk_assessment_v1',
      input: {
        trade_amount: 1000, // $1000
        market_volatility: prediction.volatility
      }
    })

    return { prediction, risk }
  }

  async executeTrade(symbol, action, amount) {
    console.log(\`Executing \${action} order for \${symbol}: $\${amount}\`)
    
    // In a real implementation, you'd integrate with an exchange API
    // For demo purposes, we'll just log the action
    return { success: true, orderId: Math.random().toString(36) }
  }

  async tradingCycle() {
    const symbols = ['BTC/USD', 'ETH/USD', 'AUR/USD']
    
    for (const symbol of symbols) {
      const analysis = await this.analyzeMarket(symbol)
      
      if (analysis.prediction.confidence > 0.8 && analysis.risk.riskScore < 0.1) {
        await this.executeTrade(symbol, 'BUY', 1000)
      } else if (analysis.prediction.confidence < 0.3 || analysis.risk.riskScore > 0.3) {
        await this.executeTrade(symbol, 'SELL', 1000)
      }
    }
  }
}

const bot = new TradingBot()

// Run trading bot every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log('Running trading cycle...')
  bot.tradingCycle()
})

console.log('AI Trading Bot started!')`,
      '.env.example': `AURLINK_API_KEY=your_api_key_here`
    }
  }
}

export function CodeSandboxEmbed({ template = 'basic' }: { template?: keyof typeof exampleTemplates }) {
  const [isLoading, setIsLoading] = useState(false)
  const [sandboxId, setSandboxId] = useState<string | null>(null)

  const example = exampleTemplates[template]

  const openInCodeSandbox = async () => {
    setIsLoading(true)
    try {
      const id = await createCodeSandbox(example.files, example.template)
      setSandboxId(id)
      
      // In production, you'd redirect to the actual CodeSandbox
      window.open(`https://codesandbox.io/s/${id}`, '_blank')
    } catch (error) {
      console.error('Failed to create CodeSandbox:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-300 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{example.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{example.description}</p>
        </div>
        <button
          onClick={openInCodeSandbox}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white rounded-lg transition-colors"
        >
          <PlayIcon className="w-4 h-4" />
          {isLoading ? 'Creating...' : 'Open in CodeSandbox'}
        </button>
      </div>

      <div className="grid gap-4">
        {Object.entries(example.files).map(([filename, content]) => (
          <div key={filename} className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm font-medium text-gray-300">{filename}</span>
              <button
                onClick={() => navigator.clipboard.writeText(content)}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Copy
              </button>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto max-h-64">
              {content}
            </pre>
          </div>
        ))}
      </div>

      {sandboxId && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-400 text-sm">
            CodeSandbox created! You can now edit and run the code in your browser.
          </p>
        </div>
      )}
    </div>
  )
}