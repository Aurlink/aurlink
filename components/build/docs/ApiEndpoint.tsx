// components/docs/ApiEndpoint.tsx
'use client'
import { useState } from 'react'
import { Copy, Check, Play } from 'lucide-react'

interface Parameter {
  name: string
  type: string
  required: boolean
  description: string
}

interface Endpoint {
  method: string
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
  const [activeTab, setActiveTab] = useState('curl')

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateCurlCommand = () => {
    const baseUrl = 'https://api.aurlink.io/v1'
    return `curl -X ${endpoint.method} \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your-api-key" \\
  ${endpoint.method !== 'GET' ? `-d '${JSON.stringify({ example: 'data' }, null, 2)}' \\` : ''}
  ${baseUrl}${endpoint.path}`
  }

  const generateJavaScriptExample = () => {
    return `const response = await fetch('https://api.aurlink.io/v1${endpoint.path}', {
  method: '${endpoint.method}',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  }${endpoint.method !== 'GET' ? `,
  body: JSON.stringify({
    // Request parameters
  })` : ''}
});

const data = await response.json();
console.log(data);`
  }

  return (
    <section 
      id={endpoint.path.replace(/\//g, '-').replace('{', '').replace('}', '')}
      className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
    >
      {/* Endpoint Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' :
              endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
              endpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {endpoint.method}
            </span>
            <code className="text-white font-mono text-lg">{endpoint.path}</code>
          </div>
          <p className="text-gray-300">{endpoint.description}</p>
        </div>
      </div>

      {/* Parameters */}
      {endpoint.parameters.length > 0 && (
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">Parameters</h4>
          <div className="bg-black/20 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Type</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Required</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {endpoint.parameters.map((param, index) => (
                  <tr key={param.name}>
                    <td className="px-4 py-3 font-mono text-cyan-400">{param.name}</td>
                    <td className="px-4 py-3 text-gray-300">{param.type}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        param.required 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {param.required ? 'Required' : 'Optional'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Code Examples */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-3">Examples</h4>
        
        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-4">
          {['curl', 'javascript', 'response'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'curl' ? 'cURL' : tab === 'javascript' ? 'JavaScript' : 'Response'}
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="relative">
          <button
            onClick={() => copyToClipboard(
              activeTab === 'curl' ? generateCurlCommand() :
              activeTab === 'javascript' ? generateJavaScriptExample() :
              endpoint.response.example
            )}
            className="absolute right-4 top-4 z-10 flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:border-cyan-400/30 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <pre className="bg-[#1A1F3C] border border-white/10 rounded-xl p-6 overflow-x-auto">
            <code className="text-sm text-gray-300">
              {activeTab === 'curl' && generateCurlCommand()}
              {activeTab === 'javascript' && generateJavaScriptExample()}
              {activeTab === 'response' && endpoint.response.example}
            </code>
          </pre>
        </div>
      </div>

      {/* Response Info */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        Returns: <code className="text-green-400">{endpoint.response.code} OK</code>
      </div>
    </section>
  )
}