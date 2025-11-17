// components/docs/AuthManager.tsx
'use client'
import { useState } from 'react'
import { KeyIcon, EyeIcon, EyeSlashIcon, ClipboardIcon, CheckIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
  permissions: string[]
  rateLimit: number
  environment: 'testnet' | 'mainnet'
}

const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Development Key',
    key: 'auk_live_abc123def456ghi789jkl012mno345pqr678stu901',
    created: '2024-01-15',
    lastUsed: '2024-01-20',
    permissions: ['read:network', 'write:transactions', 'read:ai'],
    rateLimit: 1000,
    environment: 'testnet'
  },
  {
    id: '2',
    name: 'Production Key',
    key: 'auk_live_xyz789abc456def123ghi890jkl567mno234pqr901',
    created: '2024-01-10',
    lastUsed: '2024-01-20',
    permissions: ['read:network', 'write:transactions', 'read:ai', 'write:ai', 'cross-chain'],
    rateLimit: 10000,
    environment: 'mainnet'
  }
]

export function AuthManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys)
  const [showKey, setShowKey] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>(['read:network'])
  const [newKeyEnvironment, setNewKeyEnvironment] = useState<'testnet' | 'mainnet'>('testnet')

  const copyToClipboard = async (text: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(keyId)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const createApiKey = () => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName || 'Unnamed Key',
      key: `auk_live_${Math.random().toString(36).substr(2, 24)}${Math.random().toString(36).substr(2, 24)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions: newKeyPermissions,
      rateLimit: newKeyEnvironment === 'testnet' ? 1000 : 10000,
      environment: newKeyEnvironment
    }

    setApiKeys(prev => [newKey, ...prev])
    setIsCreating(false)
    setNewKeyName('')
    setNewKeyPermissions(['read:network'])
    setShowKey(newKey.id)
  }

  const deleteApiKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId))
  }

  const togglePermission = (permission: string) => {
    setNewKeyPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    )
  }

  const availablePermissions = [
    { id: 'read:network', name: 'Read Network Data', description: 'Access network info and metrics' },
    { id: 'write:transactions', name: 'Send Transactions', description: 'Create and send transactions' },
    { id: 'read:ai', name: 'AI Inference (Read)', description: 'Use AI models for predictions' },
    { id: 'write:ai', name: 'AI Model Management', description: 'Manage and train AI models' },
    { id: 'cross-chain', name: 'Cross-Chain Operations', description: 'Execute cross-chain transfers' },
    { id: 'admin', name: 'Administrative Access', description: 'Full platform access' }
  ]

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-300 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-gray-700">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">API Key Management</h3>
          <p className="text-gray-600 dark:text-gray-400">Manage your authentication keys and permissions</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Create New Key
        </button>
      </div>

      {/* Create New Key Modal */}
      {isCreating && (
        <div className="p-6 border-b border-gray-300 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New API Key</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Key Name
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Production Backend"
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Environment
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={newKeyEnvironment === 'testnet'}
                    onChange={() => setNewKeyEnvironment('testnet')}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Testnet (1,000 req/hour)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={newKeyEnvironment === 'mainnet'}
                    onChange={() => setNewKeyEnvironment('mainnet')}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Mainnet (10,000 req/hour)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Permissions
              </label>
              <div className="grid gap-2">
                {availablePermissions.map(permission => (
                  <label key={permission.id} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg">
                    <input
                      type="checkbox"
                      checked={newKeyPermissions.includes(permission.id)}
                      onChange={() => togglePermission(permission.id)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{permission.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{permission.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={createApiKey}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Create API Key
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Keys List */}
      <div className="p-6">
        <div className="space-y-4">
          {apiKeys.map(apiKey => (
            <div key={apiKey.id} className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <KeyIcon className="w-5 h-5 text-purple-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{apiKey.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>Created {apiKey.created}</span>
                      <span>•</span>
                      <span>Last used {apiKey.lastUsed}</span>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        apiKey.environment === 'mainnet' 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {apiKey.environment}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteApiKey(apiKey.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>

              {/* API Key Value */}
              <div className="flex items-center gap-3 mb-3">
                <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded text-sm font-mono">
                  {showKey === apiKey.id ? apiKey.key : '•'.repeat(40)}
                </code>
                <button
                  onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showKey === apiKey.id ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {copiedKey === apiKey.id ? (
                    <CheckIcon className="w-4 h-4 text-green-500" />
                  ) : (
                    <ClipboardIcon className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Permissions and Limits */}
              <div className="flex flex-wrap gap-2">
                {apiKey.permissions.map(permission => (
                  <span
                    key={permission}
                    className="px-2 py-1 bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded text-xs"
                  >
                    {permission}
                  </span>
                ))}
                <span className="px-2 py-1 bg-gray-500/10 text-gray-700 dark:text-gray-300 rounded text-xs">
                  {apiKey.rateLimit.toLocaleString()}/hour
                </span>
              </div>
            </div>
          ))}

          {apiKeys.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <KeyIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No API keys found. Create your first key to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}