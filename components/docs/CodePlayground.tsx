// components/docs/CodePlayground.tsx
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon, StopIcon, ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'

interface PlaygroundExample {
  id: string
  name: string
  description: string
  code: string
  language: 'javascript' | 'python' | 'curl'
}

const examples: PlaygroundExample[] = [
  {
    id: 'network-info',
    name: 'Get Network Info',
    description: 'Fetch current network status and performance metrics',
    language: 'javascript',
    code: `const response = await fetch('https://api.aurlink.io/v1/network/info', {
  headers: {
    'X-API-Key': 'your-api-key'
  }
});

const data = await response.json();
console.log('Network TPS:', data.tps);
console.log('AI Performance:', data.aiPerformance);`
  },
  {
    id: 'send-transaction',
    name: 'Send Transaction',
    description: 'Execute a transaction with AI-optimized gas fees',
    language: 'javascript',
    code: `const transaction = {
  from: '0xYourAddress',
  to: '0xRecipientAddress',
  value: '1000000000000000000', // 1 ETH
  data: '0x'
};

const response = await fetch('https://api.aurlink.io/v1/transactions/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify(transaction)
});

const result = await response.json();
console.log('Transaction hash:', result.txHash);
console.log('AI Optimization:', result.aiOptimization);`
  },
  {
    id: 'ai-inference',
    name: 'AI Price Prediction',
    description: 'Get AI-powered price predictions',
    language: 'javascript',
    code: `const inferenceData = {
  model: 'price_prediction_v2',
  input: {
    historical_prices: [100, 105, 110, 108, 115, 120, 118, 125],
    market_indicators: {
      volume: 5000000,
      volatility: 0.15,
      sentiment: 0.72
    }
  }
};

const response = await fetch('https://api.aurlink.io/v1/ai/inference', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify(inferenceData)
});

const prediction = await response.json();
console.log('Prediction:', prediction.prediction);
console.log('Confidence:', prediction.confidence);
console.log('Explanation:', prediction.explanation);`
  },
  {
    id: 'curl-example',
    name: 'cURL - Block Info',
    description: 'Get block information using cURL',
    language: 'curl',
    code: `curl -X GET \\
  -H "X-API-Key: your-api-key" \\
  https://api.aurlink.io/v1/blocks/1542892`
  }
]

export function CodePlayground() {
  const [selectedExample, setSelectedExample] = useState(examples[0])
  const [code, setCode] = useState(examples[0].code)
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const runCode = async () => {
    setIsRunning(true)
    setOutput('Running code...\n')
    
    // Simulate API call with mock response
    setTimeout(() => {
      let mockOutput = ''
      
      switch (selectedExample.id) {
        case 'network-info':
          mockOutput = `{
  "network": "aurlink-mainnet",
  "version": "1.3.0",
  "blockHeight": 1542892,
  "tps": 12500,
  "aiPerformance": {
    "tpsGain": 0.15,
    "downtimeReduction": 0.2
  }
}`
          break
        case 'send-transaction':
          mockOutput = `{
  "txHash": "0x5f9a7a8f4e6b1c3d8e2f4a9b6c8d3e1f7a2b5c9d4e6f8a3b1c7d9e2f4a6b8c5d",
  "status": "pending",
  "aiOptimization": {
    "gasSaved": 2100,
    "optimizationType": "gas_price_prediction"
  }
}`
          break
        case 'ai-inference':
          mockOutput = `{
  "prediction": 0.85,
  "confidence": 0.92,
  "explanation": "Bullish trend predicted based on recent market patterns",
  "alternativeScenarios": [
    {
      "scenario": "bearish",
      "probability": 0.08
    }
  ]
}`
          break
        case 'curl-example':
          mockOutput = `{
  "number": 1542892,
  "hash": "0x5f9a7a8f4e6b1c3d8e2f4a9b6c8d3e1f7a2b5c9d4e6f8a3b1c7d9e2f4a6b8c5d",
  "transactionCount": 142,
  "aiOptimizations": {
    "tpsGain": 0.15,
    "gasSavings": 1250000
  }
}`
          break
      }
      
      setOutput(`✅ Execution successful:\n\n${mockOutput}`)
      setIsRunning(false)
    }, 1500)
  }

  const handleExampleSelect = (example: PlaygroundExample) => {
    setSelectedExample(example)
    setCode(example.code)
    setOutput('')
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 border-b border-gray-700">
        <div>
          <h3 className="text-xl font-bold text-white">Code Playground</h3>
          <p className="text-gray-400">Test API calls directly in your browser</p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded-lg transition-colors"
          >
            {isRunning ? (
              <StopIcon className="w-4 h-4" />
            ) : (
              <PlayIcon className="w-4 h-4" />
            )}
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
          <button
            onClick={() => copyToClipboard(code)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            {copied ? (
              <CheckIcon className="w-4 h-4 text-green-400" />
            ) : (
              <ClipboardIcon className="w-4 h-4" />
            )}
            Copy
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 p-6">
        {/* Left Side - Examples and Code Editor */}
        <div className="space-y-4">
          {/* Example Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Select Example:
            </label>
            <select
              value={selectedExample.id}
              onChange={(e) => {
                const example = examples.find(ex => ex.id === e.target.value)
                if (example) handleExampleSelect(example)
              }}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {examples.map(example => (
                <option key={example.id} value={example.id}>
                  {example.name}
                </option>
              ))}
            </select>
          </div>

          {/* Code Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-400">
                Code:
              </label>
              <span className="text-xs text-gray-500 capitalize">
                {selectedExample.language}
              </span>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {selectedExample.description}
            </p>
          </div>
        </div>

        {/* Right Side - Output */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Output:
          </label>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-600 h-80">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
              {output || 'Click "Run Code" to see the output here...'}
            </pre>
          </div>
        </div>
      </div>

      {/* Quick Examples Grid */}
      <div className="p-6 border-t border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">Quick Examples</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {examples.map(example => (
            <button
              key={example.id}
              onClick={() => handleExampleSelect(example)}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedExample.id === example.id
                  ? 'bg-purple-500/20 border-purple-500/50 text-white'
                  : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              <div className="text-sm font-medium mb-1">{example.name}</div>
              <div className="text-xs text-gray-400">{example.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}