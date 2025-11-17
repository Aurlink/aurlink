// app/docs/quick-start/page.tsx
'use client'
import { motion } from 'framer-motion'
import { DocsLayout } from '@/components/docs/DocsLayout'
import { CheckIcon, RocketLaunchIcon, KeyIcon, CodeBracketIcon, CpuChipIcon } from '@heroicons/react/24/outline'

const steps = [
  {
    title: "Get Your API Key",
    description: "Sign up and generate your API key from the dashboard",
    icon: KeyIcon,
    code: `// Visit dashboard
https://dashboard.aurlink.io

// Create account and navigate to:
Developer Settings → API Keys → Generate New Key`,
    tips: ["Store your API key securely", "Set appropriate permissions for your use case"]
  },
  {
    title: "Make Your First API Call",
    description: "Test connectivity with a simple network info request",
    icon: CodeBracketIcon,
    code: `curl -X GET \\
  -H "X-API-Key: YOUR_API_KEY" \\
  https://api.aurlink.io/v1/network/info`,
    tips: ["Use testnet for development", "Check rate limits"]
  },
  {
    title: "Send Your First Transaction",
    description: "Execute a transaction on the Aurlink network",
    icon: RocketLaunchIcon,
    code: `curl -X POST \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "0xYourAddress",
    "to": "0xRecipientAddress", 
    "value": "1000000000000000000",
    "data": "0x"
  }' \\
  https://api.aurlink.io/v1/transactions/send`,
    tips: ["Start with small amounts", "Use testnet tokens first"]
  },
  {
    title: "Try AI Inference",
    description: "Use the Neural Optimization Layer for predictions",
    icon: CpuChipIcon,
    code: `curl -X POST \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "price_prediction_v2",
    "input": {
      "historical_prices": [100, 105, 110, 108, 115],
      "market_indicators": { "volume": 5000000 }
    }
  }' \\
  https://api.aurlink.io/v1/ai/inference`,
    tips: ["Experiment with different models", "Check model accuracy metrics"]
  }
]

const features = [
  "High throughput (12,500+ TPS)",
  "AI-optimized gas fees", 
  "Cross-chain interoperability",
  "Real-time market predictions",
  "Enterprise-grade security",
  "24/7 monitoring and support"
]

export default function QuickStartPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get Started in 5 Minutes
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Start building on Aurlink with our step-by-step guide. From API key to AI inference in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={feature} className="flex items-center gap-2 text-gray-300">
                <CheckIcon className="w-5 h-5 text-green-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-400 mt-2 text-center">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {step.title}
                  </h2>
                  <p className="text-gray-300 mb-6">
                    {step.description}
                  </p>
                  
                  {/* Code Block */}
                  <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                      {step.code}
                    </pre>
                  </div>
                  
                  {/* Tips */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="text-blue-400 font-semibold mb-2">Pro Tips:</h4>
                    <ul className="text-blue-300 text-sm space-y-1">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build?
            </h3>
            <p className="text-gray-200 mb-6">
              Explore our detailed documentation for advanced features and use cases.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                View REST API
              </button>
              <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                JavaScript SDK
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </DocsLayout>
  )
}