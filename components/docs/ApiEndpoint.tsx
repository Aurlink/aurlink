// components/docs/ApiEndpoint.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon, ClipboardIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface Parameter {
  name: string
  type: string
  required: boolean
  description: string
}

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  description: string
  parameters: Parameter[]
  response: {
    code: number
    example: string
  }
}

interface ApiEndpointProps {
  endpoint: Endpoint
}

export function ApiEndpoint({ endpoint }: ApiEndpointProps) {
  const [copied, setCopied] = useState(false)
  const [showParameters, setShowParameters] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'POST': return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
      case 'PUT': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'DELETE': return 'bg-red-500/20 text-red-400 border-red-500/50'
      case 'PATCH': return 'bg-purple-500/20 text-purple-400 border-purple-500/50'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getMethodColor(endpoint.method)}`}>
            {endpoint.method}
          </span>
          <code className="text-lg font-mono text-white bg-gray-900/50 px-3 py-1 rounded-lg">
            {endpoint.path}
          </code>
        </div>
        <button
          onClick={() => copyToClipboard(`curl -X ${endpoint.method} https://api.aurlink.io/v1${endpoint.path} \\\n  -H "X-API-Key: your-api-key"`)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors"
        >
          {copied ? (
            <CheckIcon className="w-4 h-4 text-green-400" />
          ) : (
            <ClipboardIcon className="w-4 h-4" />
          )}
          {copied ? 'Copied!' : 'Copy cURL'}
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-6">{endpoint.description}</p>

      {/* Parameters Section */}
      {endpoint.parameters.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => setShowParameters(!showParameters)}
            className="flex items-center gap-2 text-lg font-semibold text-white mb-4 hover:text-gray-300 transition-colors"
          >
            Parameters
            {showParameters ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>

          {showParameters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-gray-900/50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 text-gray-400 font-semibold">Name</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Type</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Required</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.parameters.map((param, index) => (
                      <tr key={param.name} className={index < endpoint.parameters.length - 1 ? 'border-b border-gray-700' : ''}>
                        <td className="p-4 font-mono text-white">{param.name}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                            {param.type}
                          </span>
                        </td>
                        <td className="p-4">
                          {param.required ? (
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">
                              Required
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-sm">
                              Optional
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-gray-300">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Response Section */}
      <div>
        <button
          onClick={() => setShowResponse(!showResponse)}
          className="flex items-center gap-2 text-lg font-semibold text-white mb-4 hover:text-gray-300 transition-colors"
        >
          Response
          <span className={`px-2 py-1 text-xs rounded ${
            endpoint.response.code === 200 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {endpoint.response.code}
          </span>
          {showResponse ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>

        {showResponse && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button
                onClick={() => copyToClipboard(endpoint.response.example)}
                className="absolute top-3 right-3 p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors"
              >
                {copied ? (
                  <CheckIcon className="w-4 h-4 text-green-400" />
                ) : (
                  <ClipboardIcon className="w-4 h-4" />
                )}
              </button>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {endpoint.response.example}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}