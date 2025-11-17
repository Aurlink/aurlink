// components/docs/WebhookTester.tsx
'use client'
import { useState } from 'react'
import { PlayIcon, ClipboardIcon, CheckIcon, PlusIcon } from '@heroicons/react/24/outline'

interface WebhookEvent {
  id: string
  name: string
  description: string
  payload: any
}

const webhookEvents: WebhookEvent[] = [
  {
    id: 'transaction.confirmed',
    name: 'Transaction Confirmed',
    description: 'Triggered when a transaction is confirmed on chain',
    payload: {
      event: 'transaction.confirmed',
      data: {
        txHash: '0x5f9a7a8f4e6b1c3d8e2f4a9b6c8d3e1f7a2b5c9d4e6f8a3b1c7d9e2f4a6b8c5d',
        blockNumber: 1542892,
        from: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
        to: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
        value: '1000000000000000000',
        status: 'confirmed'
      },
      timestamp: '2024-01-20T10:30:00Z'
    }
  },
  {
    id: 'ai.prediction.updated',
    name: 'AI Prediction Updated',
    description: 'Triggered when AI model predictions are updated',
    payload: {
      event: 'ai.prediction.updated',
      data: {
        model: 'price_prediction_v2',
        prediction: 0.85,
        confidence: 0.92,
        symbols: ['BTC/USD', 'ETH/USD'],
        timestamp: '2024-01-20T10:30:00Z'
      }
    }
  },
  {
    id: 'cross-chain.completed',
    name: 'Cross-Chain Transfer Completed',
    description: 'Triggered when a cross-chain transfer is completed',
    payload: {
      event: 'cross-chain.completed',
      data: {
        executionId: 'exec_abc123def456',
        fromChain: 'ethereum',
        toChain: 'aurlink',
        fromToken: 'ETH',
        toToken: 'AUR',
        amount: '1000000000000000000',
        status: 'completed'
      },
      timestamp: '2024-01-20T10:30:00Z'
    }
  }
]

export function WebhookTester() {
  const [selectedEvent, setSelectedEvent] = useState(webhookEvents[0])
  const [webhookUrl, setWebhookUrl] = useState('https://your-server.com/webhooks')
  const [isTesting, setIsTesting] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])
  const [copied, setCopied] = useState(false)

  const testWebhook = async () => {
    setIsTesting(true)
    
    // Simulate webhook test
    setTimeout(() => {
      const result = {
        id: Date.now().toString(),
        event: selectedEvent.id,
        url: webhookUrl,
        status: Math.random() > 0.2 ? 200 : 500,
        response: Math.random() > 0.2 ? 'Webhook delivered successfully' : 'Failed to deliver webhook',
        timestamp: new Date().toISOString()
      }
      
      setTestResults(prev => [result, ...prev.slice(0, 4)]) // Keep last 5 results
      setIsTesting(false)
    }, 2000)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-300 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-gray-700">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Webhook Testing</h3>
          <p className="text-gray-600 dark:text-gray-400">Test and debug your webhook integrations</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 p-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Webhook URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Webhook URL
            </label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-server.com/webhooks"
              className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Event Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Test Event
            </label>
            <select
              value={selectedEvent.id}
              onChange={(e) => {
                const event = webhookEvents.find(ev => ev.id === e.target.value)
                if (event) setSelectedEvent(event)
              }}
              className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {webhookEvents.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {selectedEvent.description}
            </p>
          </div>

          {/* Test Button */}
          <button
            onClick={testWebhook}
            disabled={isTesting || !webhookUrl}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded-lg transition-colors"
          >
            <PlayIcon className="w-4 h-4" />
            {isTesting ? 'Testing...' : 'Test Webhook'}
          </button>

          {/* Manual Testing */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Manual Testing</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Use this cURL command to test manually:
            </p>
            <div className="bg-gray-900 rounded-lg p-3 relative">
              <button
                onClick={() => copyToClipboard(`curl -X POST \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(selectedEvent.payload, null, 2)}' \\\n  ${webhookUrl}`)}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white transition-colors"
              >
                {copied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <ClipboardIcon className="w-4 h-4" />}
              </button>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`curl -X POST \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(selectedEvent.payload, null, 2)}' \\\n  ${webhookUrl}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Test Results
          </label>
          <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                Run a test to see results here
              </div>
            ) : (
              <div className="space-y-3">
                {testResults.map(result => (
                  <div
                    key={result.id}
                    className={`p-3 rounded-lg border ${
                      result.status === 200
                        ? 'bg-green-500/10 border-green-500/20'
                        : 'bg-red-500/10 border-red-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${
                        result.status === 200 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {result.event}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        result.status === 200
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {result.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mb-1">
                      {new Date(result.timestamp).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-300">
                      {result.response}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Webhook Payload Preview */}
      <div className="p-6 border-t border-gray-300 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Event Payload</h4>
        <div className="bg-gray-900 rounded-lg p-4">
          <pre className="text-sm text-gray-300 overflow-x-auto">
            {JSON.stringify(selectedEvent.payload, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}