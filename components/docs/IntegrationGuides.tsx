// components/docs/IntegrationGuides.tsx
'use client'
import { useState } from 'react'
import { CheckIcon, ClockIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface IntegrationGuide {
  id: string
  title: string
  description: string
  platform: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  steps: {
    title: string
    description: string
    code?: string
    link?: string
  }[]
}

const integrationGuides: IntegrationGuide[] = [
  {
    id: 'nextjs',
    title: 'Next.js Integration',
    description: 'Add Aurlink AI and blockchain features to your Next.js application',
    platform: 'Next.js',
    difficulty: 'beginner',
    estimatedTime: '15 minutes',
    steps: [
      {
        title: 'Install SDK',
        description: 'Add the Aurlink SDK to your project',
        code: 'npm install @aurlink/sdk'
      },
      {
        title: 'Environment Variables',
        description: 'Add your API key to environment variables',
        code: `# .env.local
AURLINK_API_KEY=your_api_key_here
AURLINK_NETWORK=testnet`
      },
      {
        title: 'Create API Route',
        description: 'Set up server-side API routes for secure operations',
        code: `// pages/api/network-info.js
import { AurlinkClient } from '@aurlink/sdk'

export default async function handler(req, res) {
  const client = new AurlinkClient({
    apiKey: process.env.AURLINK_API_KEY,
    network: process.env.AURLINK_NETWORK
  })
  
  const networkInfo = await client.network.getInfo()
  res.json(networkInfo)
}`
      },
      {
        title: 'Client Component',
        description: 'Create a React component to display network data',
        code: `// components/NetworkStatus.jsx
'use client'
import { useState, useEffect } from 'react'

export function NetworkStatus() {
  const [networkInfo, setNetworkInfo] = useState(null)

  useEffect(() => {
    fetch('/api/network-info')
      .then(res => res.json())
      .then(setNetworkInfo)
  }, [])

  return (
    <div>
      <h3>Network Status</h3>
      {networkInfo && (
        <p>TPS: {networkInfo.tps}</p>
      )}
    </div>
  )
}`
      }
    ]
  },
  {
    id: 'express',
    title: 'Express.js Backend',
    description: 'Build a Node.js backend with Express and Aurlink SDK',
    platform: 'Express.js',
    difficulty: 'intermediate',
    estimatedTime: '25 minutes',
    steps: [
      {
        title: 'Project Setup',
        description: 'Initialize your Express.js project',
        code: `npm init -y
npm install express @aurlink/sdk cors dotenv`
      },
      {
        title: 'Server Configuration',
        description: 'Set up your Express server with Aurlink integration',
        code: `// server.js
const express = require('express')
const { AurlinkClient } = require('@aurlink/sdk')
require('dotenv').config()

const app = express()
const client = new AurlinkClient({
  apiKey: process.env.AURLINK_API_KEY
})

app.use(express.json())

// Network info endpoint
app.get('/api/network', async (req, res) => {
  try {
    const info = await client.network.getInfo()
    res.json(info)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Transaction endpoint
app.post('/api/transactions', async (req, res) => {
  try {
    const result = await client.transactions.send(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})`
      }
    ]
  },
  {
    id: 'react-native',
    title: 'React Native Mobile App',
    description: 'Integrate Aurlink into your React Native mobile application',
    platform: 'React Native',
    difficulty: 'intermediate',
    estimatedTime: '30 minutes',
    steps: [
      {
        title: 'Install Dependencies',
        description: 'Add required packages to your React Native project',
        code: 'npm install @aurlink/sdk react-native-crypto'
      },
      {
        title: 'Polyfill Setup',
        description: 'Configure polyfills for React Native environment',
        code: `// polyfill.js
import { Platform } from 'react-native'

if (Platform.OS !== 'web') {
  require('react-native-crypto')
}`
      },
      {
        title: 'Mobile Component',
        description: 'Create a mobile-friendly component for blockchain interactions',
        code: `// components/BlockchainActions.js
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { AurlinkClient } from '@aurlink/sdk'

export function BlockchainActions() {
  const [client] = useState(() => new AurlinkClient({
    apiKey: 'your-mobile-api-key'
  }))

  const checkNetwork = async () => {
    try {
      const info = await client.network.getInfo()
      Alert.alert('Network Status', \`TPS: \${info.tps}\`)
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={checkNetwork}>
        <Text>Check Network</Text>
      </TouchableOpacity>
    </View>
  )
}`
      }
    ]
  }
]

export function IntegrationGuides() {
  const [selectedGuide, setSelectedGuide] = useState(integrationGuides[0])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400'
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'advanced': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-300 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-gray-700">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Integration Guides</h3>
          <p className="text-gray-600 dark:text-gray-400">Step-by-step guides for popular platforms</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 p-6">
        {/* Sidebar - Guide List */}
        <div className="lg:col-span-1">
          <div className="space-y-2">
            {integrationGuides.map(guide => (
              <button
                key={guide.id}
                onClick={() => setSelectedGuide(guide)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  selectedGuide.id === guide.id
                    ? 'bg-purple-500/10 border-purple-500/50 text-purple-700 dark:text-purple-300'
                    : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600'
                }`}
              >
                <div className="font-semibold mb-1">{guide.title}</div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{guide.platform}</span>
                  <span>•</span>
                  <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(guide.difficulty)}`}>
                    {guide.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                  <ClockIcon className="w-3 h-3" />
                  {guide.estimatedTime}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Guide Steps */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700">
            {/* Guide Header */}
            <div className="p-6 border-b border-gray-300 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedGuide.title}
                </h2>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(selectedGuide.difficulty)}`}>
                    {selectedGuide.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <ClockIcon className="w-4 h-4" />
                    {selectedGuide.estimatedTime}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{selectedGuide.description}</p>
            </div>

            {/* Steps */}
            <div className="p-6">
              <div className="space-y-8">
                {selectedGuide.steps.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-4 h-4 text-white" />
                      </div>
                      {index < selectedGuide.steps.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{step.description}</p>
                      
                      {step.code && (
                        <div className="bg-gray-900 rounded-lg p-4 mb-4">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
                            {step.code}
                          </pre>
                        </div>
                      )}

                      {step.link && (
                        <a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
                        >
                          Learn more
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}