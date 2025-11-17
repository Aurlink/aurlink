// app/docs/api/rest/page.tsx - COMPLETE
'use client'
import { motion } from 'framer-motion'
import { ApiEndpoint } from '@/components/docs/ApiEndpoint'

const content = {
  title: 'REST API Reference',
  description: 'Complete REST API documentation for interacting with the Aurlink network, AI services, and ecosystem components.',
  sections: [
    {
      title: 'Base URL & Authentication',
      content: `All API endpoints are relative to the base URL and require API key authentication.`,
      type: 'code',
      code: `// Base URLs
Mainnet: https://api.aurlink.io/v1
Testnet: https://api-testnet.aurlink.io/v1

// Authentication
All requests require an API key in the header:
curl -H "X-API-Key: your-api-key" \\
     https://api.aurlink.io/v1/network/info

// Getting an API Key
1. Visit https://dashboard.aurlink.io
2. Create an account
3. Generate API key in developer settings
4. Set appropriate permissions

// Rate Limits
Free Tier: 1,000 requests/hour
Developer Tier: 10,000 requests/hour  
Enterprise Tier: 100,000 requests/hour

// Response Format
All responses follow this format:
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "v1.3.0"
  }
}

// Error Format
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "Invalid API key provided",
    "details": { ... }
  },
  "meta": { ... }
}`,
      language: 'javascript'
    }
  ]
}

const endpoints = [
  {
    method: 'GET',
    path: '/network/info',
    description: 'Get comprehensive network information and status',
    parameters: [],
    response: {
      code: 200,
      example: `{
  "network": "aurlink-mainnet",
  "version": "1.3.0",
  "blockHeight": 1542892,
  "blockTime": "0.4s",
  "tps": 12500,
  "activeValidators": 89,
  "totalStaked": "45000000000000000000000000",
  "health": "healthy",
  "aiPerformance": {
    "tpsGain": 0.15,
    "downtimeReduction": 0.2,
    "faultPredictionAccuracy": 0.9
  }
}`
    }
  },
  {
    method: 'GET',
    path: '/blocks/{blockNumber}',
    description: 'Get detailed information about a specific block',
    parameters: [
      {
        name: 'blockNumber',
        type: 'number',
        required: true,
        description: 'The block number to retrieve'
      },
      {
        name: 'includeTransactions',
        type: 'boolean',
        required: false,
        description: 'Include full transaction details'
      }
    ],
    response: {
      code: 200,
      example: `{
  "number": 1542892,
  "hash": "0x5f9a7a8f4e6b1c3d8e2f4a9b6c8d3e1f7a2b5c9d4e6f8a3b1c7d9e2f4a6b8c5d",
  "timestamp": 1635724800,
  "validator": "0x8c3a2b5d9e1f7a4c6b8d2e5f9a3b1c7d4e6f8a2b",
  "transactionCount": 142,
  "gasUsed": 12500000,
  "gasLimit": 50000000,
  "aiOptimizations": {
    "tpsGain": 0.15,
    "faultPredictions": 3,
    "gasSavings": 1250000
  },
  "transactions": [
    {
      "hash": "0x3a2b5d9e1f7a4c6b8d2e5f9a3b1c7d4e6f8a2b5c",
      "from": "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
      "to": "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
      "value": "1000000000000000000",
      "gasUsed": 21000,
      "status": "success"
    }
  ]
}`
    }
  },
  {
    method: 'GET',
    path: '/transactions/{transactionHash}',
    description: 'Get detailed information about a specific transaction',
    parameters: [
      {
        name: 'transactionHash',
        type: 'string',
        required: true,
        description: 'The transaction hash'
      }
    ],
    response: {
      code: 200,
      example: `{
  "hash": "0x3a2b5d9e1f7a4c6b8d2e5f9a3b1c7d4e6f8a2b5c",
  "blockNumber": 1542892,
  "from": "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
  "to": "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
  "value": "1000000000000000000",
  "gasUsed": 21000,
  "gasPrice": "25000000000",
  "status": "success",
  "timestamp": 1635724800,
  "input": "0x",
  "logs": [],
  "aiAnalysis": {
    "riskScore": 0.02,
    "anomalyDetection": "normal",
    "gasOptimization": "optimal"
  }
}`
    }
  },
  {
    method: 'POST',
    path: '/transactions/send',
    description: 'Send a transaction to the network',
    parameters: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: 'Sender address (must be controlled by API key)'
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
        description: 'Amount to send in wei'
      },
      {
        name: 'data',
        type: 'string',
        required: false,
        description: 'Transaction data (hex encoded)'
      },
      {
        name: 'gasLimit',
        type: 'number',
        required: false,
        description: 'Gas limit (default: 21000)'
      }
    ],
    response: {
      code: 200,
      example: `{
  "txHash": "0x5f9a7a8f4e6b1c3d8e2f4a9b6c8d3e1f7a2b5c9d4e6f8a3b1c7d9e2f4a6b8c5d",
  "status": "pending",
  "gasUsed": 21000,
  "estimatedConfirmation": 1.2,
  "aiOptimization": {
    "gasSaved": 2100,
    "optimizationType": "gas_price_prediction"
  }
}`
    }
  },
  {
    method: 'POST',
    path: '/ai/inference',
    description: 'Perform AI inference using Neural Optimization Layer',
    parameters: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: 'AI model identifier (e.g., price_prediction_v2)'
      },
      {
        name: 'input',
        type: 'object',
        required: true,
        description: 'Input data for inference'
      },
      {
        name: 'options',
        type: 'object',
        required: false,
        description: 'Additional inference options'
      }
    ],
    response: {
      code: 200,
      example: `{
  "prediction": 0.85,
  "confidence": 0.92,
  "inferenceTime": 0.045,
  "gasCost": 50000,
  "modelUsed": "price_prediction_v2",
  "explanation": "The model predicts bullish trend based on recent market patterns",
  "alternativeScenarios": [
    {
      "scenario": "bearish",
      "probability": 0.08,
      "conditions": "market volatility increases"
    }
  ]
}`
    }
  },
  {
    method: 'GET',
    path: '/ai/models',
    description: 'Get list of available AI models and their capabilities',
    parameters: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: 'Filter by model category'
      }
    ],
    response: {
      code: 200,
      example: `{
  "models": [
    {
      "id": "price_prediction_v2",
      "name": "Price Prediction Model",
      "category": "prediction",
      "accuracy": 0.92,
      "latency": 200,
      "gasCost": 50000,
      "description": "Predicts asset price movements",
      "inputSchema": {
        "historical_prices": "array[number]",
        "market_indicators": "object"
      },
      "outputSchema": {
        "prediction": "number",
        "confidence": "number",
        "trend": "string"
      }
    },
    {
      "id": "risk_assessment_v1",
      "name": "Risk Assessment Model",
      "category": "analytics",
      "accuracy": 0.88,
      "latency": 300,
      "gasCost": 75000,
      "description": "Assesses transaction and protocol risks"
    }
  ]
}`
    }
  },
  {
    method: 'POST',
    path: '/connect/route',
    description: 'Find optimal cross-chain route using Aurlink Connect',
    parameters: [
      {
        name: 'fromChain',
        type: 'string',
        required: true,
        description: 'Source chain (e.g., ethereum, aurlink)'
      },
      {
        name: 'toChain',
        type: 'string',
        required: true,
        description: 'Destination chain'
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
      },
      {
        name: 'slippage',
        type: 'number',
        required: false,
        description: 'Maximum slippage tolerance (default: 0.5)'
      }
    ],
    response: {
      code: 200,
      example: `{
  "routeId": "route_abc123def456",
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
  "riskScore": 0.03,
  "alternativeRoutes": [
    {
      "routeId": "route_xyz789",
      "amountOut": "448000000000000000000",
      "totalFee": "8000000000000000",
      "estimatedTime": 15
    }
  ]
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
        description: 'Route ID from /connect/route endpoint'
      },
      {
        name: 'fromAddress',
        type: 'string',
        required: true,
        description: 'Source address executing the transfer'
      },
      {
        name: 'toAddress',
        type: 'string',
        required: true,
        description: 'Destination address to receive funds'
      },
      {
        name: 'deadline',
        type: 'number',
        required: false,
        description: 'Transaction deadline in minutes (default: 30)'
      }
    ],
    response: {
      code: 200,
      example: `{
  "executionId": "exec_abc123def456",
  "routeId": "route_abc123def456",
  "status": "pending",
  "transactions": [
    {
      "chain": "ethereum",
      "txHash": "0x8d3a2b5d9e1f7a4c6b8d2e5f9a3b1c7d4e6f8a2b5c9d4e6f8a3b1c7d9e2f4a6b8",
      "status": "confirmed"
    }
  ],
  "estimatedCompletion": 1635724860,
  "trackingUrl": "https://explorer.aurlink.io/connect/track/exec_abc123def456"
}`
    }
  }
]

export default function RestApiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {content.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {content.description}
          </p>
        </motion.div>

        {/* Base URL & Authentication Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              {content.sections[0].title}
            </h2>
            <p className="text-gray-300 mb-6">
              {content.sections[0].content}
            </p>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                {content.sections[0].code}
              </pre>
            </div>
          </div>
        </motion.div>

        {/* API Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            API Endpoints
          </h2>
          
          {endpoints.map((endpoint, index) => (
            <motion.div
              key={endpoint.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <ApiEndpoint endpoint={endpoint} />
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Start CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-200 mb-6">
              Generate your API key and start building with Aurlink today.
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get API Key
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}