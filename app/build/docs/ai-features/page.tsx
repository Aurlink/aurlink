// app/docs/ai-features/page.tsx
'use client'
import { motion } from 'framer-motion'
import { DocsLayout } from '@/components/docs/DocsLayout'
import { ApiEndpoint } from '@/components/docs/ApiEndpoint'
import { CpuChipIcon, ChartBarIcon, BoltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const features = [
  {
    icon: ChartBarIcon,
    title: "Predictive Analytics",
    description: "AI-powered price predictions, risk assessment, and market trend analysis",
    benefits: ["95% prediction accuracy", "Real-time market insights", "Multi-factor analysis"]
  },
  {
    icon: BoltIcon,
    title: "Performance Optimization",
    description: "Neural network optimized transaction processing and gas fee prediction",
    benefits: ["15% TPS improvement", "20% gas cost reduction", "Dynamic fee optimization"]
  },
  {
    icon: ShieldCheckIcon,
    title: "Security & Risk",
    description: "Anomaly detection, fraud prevention, and smart contract vulnerability assessment",
    benefits: ["99.9% anomaly detection", "Real-time risk scoring", "Automated threat response"]
  },
  {
    icon: CpuChipIcon,
    title: "Network Intelligence",
    description: "Self-healing network, validator performance optimization, and load balancing",
    benefits: ["40% downtime reduction", "Smart load distribution", "Predictive maintenance"]
  }
]

const models = [
  {
    id: "price_prediction_v2",
    name: "Price Prediction Model",
    category: "prediction",
    accuracy: 0.92,
    latency: 200,
    description: "Predicts cryptocurrency price movements using historical data and market indicators",
    useCases: ["Trading strategies", "Portfolio management", "Risk assessment"]
  },
  {
    id: "risk_assessment_v1", 
    name: "Risk Assessment Model",
    category: "security",
    accuracy: 0.88,
    latency: 300,
    description: "Evaluates transaction and protocol risks using behavioral analysis and pattern recognition",
    useCases: ["Fraud detection", "Compliance monitoring", "Insurance underwriting"]
  },
  {
    id: "gas_optimizer_v3",
    name: "Gas Optimization Model",
    category: "performance", 
    accuracy: 0.95,
    latency: 150,
    description: "Predicts optimal gas prices and identifies gas-saving opportunities in smart contracts",
    useCases: ["Transaction optimization", "Contract deployment", "Cost reduction"]
  }
]

const aiEndpoints = [
  {
    method: 'POST',
    path: '/ai/inference',
    description: 'Perform inference with any AI model',
    parameters: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: 'Model identifier'
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
        description: 'Inference options like timeout, confidence threshold'
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
  "explanation": "Bullish trend predicted based on recent patterns",
  "alternativeScenarios": [...]
}`
    }
  },
  {
    method: 'GET', 
    path: '/ai/models',
    description: 'List available AI models and capabilities',
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
      "description": "Predicts asset price movements"
    }
  ]
}`
    }
  }
]

export default function AiFeaturesPage() {
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
            AI Features
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Neural Optimization Layer powering predictive analytics, performance optimization, 
            and intelligent security for the Aurlink network.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">AI Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={feature.title} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2 text-sm text-green-400">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Models */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Available Models</h2>
          <div className="grid gap-6">
            {models.map((model) => (
              <div key={model.id} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{model.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                        {model.category}
                      </span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                        {(model.accuracy * 100).toFixed(0)}% accuracy
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                        {model.latency}ms latency
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{model.description}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Use Cases:</h4>
                  <div className="flex flex-wrap gap-2">
                    {model.useCases.map((useCase, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-sm">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* API Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">AI API Reference</h2>
          <div className="space-y-6">
            {aiEndpoints.map((endpoint, index) => (
              <ApiEndpoint key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Start Building with AI
            </h3>
            <p className="text-gray-200 mb-6">
              Integrate powerful AI capabilities into your dApps with just a few API calls.
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get API Key
            </button>
          </div>
        </motion.div>
      </div>
    </DocsLayout>
  )
}