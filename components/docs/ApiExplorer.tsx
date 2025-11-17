// components/docs/ApiExplorer.tsx
'use client'
import { useState } from 'react'
import { PlayIcon, StopIcon, ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'

interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  headers: Record<string, string>
  body: string
}

interface ApiResponse {
  status: number
  headers: Record<string, string>
  body: string
  time: number
}

const predefinedEndpoints = [
  {
    name: 'Get Network Info',
    method: 'GET',
    path: '/network/info',
    headers: { 'X-API-Key': 'your-api-key' },
    body: ''
  },
  {
    name: 'Send Transaction',
    method: 'POST', 
    path: '/transactions/send',
    headers: { 
      'X-API-Key': 'your-api-key',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: '0xYourAddress',
      to: '0xRecipientAddress',
      value: '1000000000000000000'
    }, null, 2)
  },
  {
    name: 'AI Inference',
    method: 'POST',
    path: '/ai/inference',
    headers: {
      'X-API-Key': 'your-api-key',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'price_prediction_v2',
      input: {
        historical_prices: [100, 105, 110, 108, 115]
      }
    }, null, 2)
  }
]

export function ApiExplorer() {
  const [request, setRequest] = useState<ApiRequest>(predefinedEndpoints[0])
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const executeRequest = async () => {
    setIsLoading(true)
    setResponse(null)

    // Simulate API call
    setTimeout(() => {
      const mockResponses: Record<string, ApiResponse> = {
        '/network/info': {
          status: 200,
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            network: 'aurlink-mainnet',
            version: '1.3.0',
            tps: 12500,
            aiPerformance: { tpsGain: 0.15 }
          }, null, 2),
          time: 120
        },
        '/transactions/send': {
          status: 200,
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            txHash: '0x5f9a7a8f4e6b1c3d8e2f4a9b6c8d3e1f7a2b5c9d4e6f8a3b1c7d9e2f4a6b8c5d',
            status: 'pending',
            aiOptimization: { gasSaved: 2100 }
          }, null, 2),
          time: 350
        },
        '/ai/inference': {
          status: 200,
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            prediction: 0.85,
            confidence: 0.92,
            explanation: 'Bullish trend predicted'
          }, null, 2),
          time: 250
        }
      }

      setResponse(mockResponses[request.path] || {
        status: 404,
        headers: {},
        body: 'Endpoint not found in mock data',
        time: 50
      })
      setIsLoading(false)
    }, 1000)
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

  const updateRequest = (updates: Partial<ApiRequest>) => {
    setRequest(prev => ({ ...prev, ...updates }))
  }

  const getCurlCommand = () => {
    return `curl -X ${request.method} \\
  ${Object.entries(request.headers).map(([key, value]) => `-H "${key}: ${value}"`).join(' \\\n  ')} \\
  ${request.body ? `-d '${request.body}' \\\n  ` : ''}https://api.aurlink.io/v1${request.path}`
  }

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-300 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-gray-700">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">API Explorer</h3>
          <p className="text-gray-600 dark:text-gray-400">Test API endpoints in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={executeRequest}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded-lg transition-colors"
          >
            {isLoading ? (
              <StopIcon className="w-4 h-4" />
            ) : (
              <PlayIcon className="w-4 h-4" />
            )}
            {isLoading ? 'Executing...' : 'Execute'}
          </button>
          <button
            onClick={() => copyToClipboard(getCurlCommand())}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            {copied ? (
              <CheckIcon className="w-4 h-4 text-green-400" />
            ) : (
              <ClipboardIcon className="w-4 h-4" />
            )}
            cURL
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 p-6">
        {/* Request Panel */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quick Examples
            </label>
            <select
              value={request.path}
              onChange={(e) => {
                const endpoint = predefinedEndpoints.find(ep => ep.path === e.target.value)
                if (endpoint) setRequest(endpoint as ApiRequest)
              }}
              className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {predefinedEndpoints.map(ep => (
                <option key={ep.path} value={ep.path}>
                  {ep.method} {ep.path}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Method
              </label>
              <select
                value={request.method}
                onChange={(e) => updateRequest({ method: e.target.value as ApiRequest['method'] })}
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Path
              </label>
              <input
                type="text"
                value={request.path}
                onChange={(e) => updateRequest({ path: e.target.value })}
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                placeholder="/endpoint/path"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Headers
            </label>
            <textarea
              value={Object.entries(request.headers).map(([k, v]) => `${k}: ${v}`).join('\n')}
              onChange={(e) => {
                const headers = e.target.value.split('\n').reduce((acc, line) => {
                  const [key, ...values] = line.split(':')
                  if (key && values.length) {
                    acc[key.trim()] = values.join(':').trim()
                  }
                  return acc
                }, {} as Record<string, string>)
                updateRequest({ headers })
              }}
              rows={4}
              className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Body
            </label>
            <textarea
              value={request.body}
              onChange={(e) => updateRequest({ body: e.target.value })}
              rows={8}
              className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
            />
          </div>
        </div>

        {/* Response Panel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Response {response && `(${response.time}ms)`}
          </label>
          <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-400">Executing request...</div>
              </div>
            ) : response ? (
              <div>
                <div className={`inline-flex items-center px-2 py-1 rounded text-sm mb-4 ${
                  response.status >= 200 && response.status < 300 
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  Status: {response.status}
                </div>
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                  {response.body}
                </pre>
              </div>
            ) : (
              <div className="text-gray-500 h-full flex items-center justify-center">
                Execute a request to see the response
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}