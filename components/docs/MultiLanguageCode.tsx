// components/docs/MultiLanguageCode.tsx
'use client'
import { useState } from 'react'
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'

interface CodeExample {
  language: string
  label: string
  code: string
}

interface MultiLanguageCodeProps {
  examples: CodeExample[]
  title?: string
  description?: string
}

export function MultiLanguageCode({ examples, title, description }: MultiLanguageCodeProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(examples[0].language)
  const [copied, setCopied] = useState(false)

  const selectedExample = examples.find(ex => ex.language === selectedLanguage) || examples[0]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(selectedExample.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'javascript': return '🟨'
      case 'typescript': return '🔷' 
      case 'python': return '🐍'
      case 'curl': return '📡'
      case 'go': return '🐹'
      case 'rust': return '🦀'
      default: return '📝'
    }
  }

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-300 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 border-b border-gray-300 dark:border-gray-700">
        <div>
          {title && <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>}
          {description && <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>}
        </div>
        
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          {/* Language Selector */}
          <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
            {examples.map(example => (
              <button
                key={example.language}
                onClick={() => setSelectedLanguage(example.language)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedLanguage === example.language
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>{getLanguageIcon(example.language)}</span>
                {example.label}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
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

      {/* Code Display */}
      <div className="p-6">
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
            {selectedExample.code}
          </pre>
        </div>
      </div>
    </div>
  )
}

// Example usage component
export function NetworkInfoExamples() {
  const examples: CodeExample[] = [
    {
      language: 'javascript',
      label: 'JavaScript',
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
      language: 'python',
      label: 'Python',
      code: `import requests

response = requests.get(
    'https://api.aurlink.io/v1/network/info',
    headers={'X-API-Key': 'your-api-key'}
)

data = response.json()
print('Network TPS:', data['tps'])
print('AI Performance:', data['aiPerformance'])`
    },
    {
      language: 'curl',
      label: 'cURL',
      code: `curl -X GET \\
  -H "X-API-Key: your-api-key" \\
  https://api.aurlink.io/v1/network/info`
    },
    {
      language: 'go',
      label: 'Go',
      code: `package main

import (
  "fmt"
  "net/http"
)

func main() {
  client := &http.Client{}
  req, _ := http.NewRequest("GET", "https://api.aurlink.io/v1/network/info", nil)
  req.Header.Add("X-API-Key", "your-api-key")
  
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()
  
  // Process response
  fmt.Println("Network info retrieved")
}`
    }
  ]

  return (
    <MultiLanguageCode 
      examples={examples}
      title="Get Network Info"
      description="Example showing how to retrieve network information in different languages"
    />
  )
}

export function SendTransactionExamples() {
  const examples: CodeExample[] = [
    {
      language: 'javascript',
      label: 'JavaScript',
      code: `const transaction = {
  from: '0xYourAddress',
  to: '0xRecipientAddress', 
  value: '1000000000000000000'
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
console.log('Transaction hash:', result.txHash);`
    },
    {
      language: 'python', 
      label: 'Python',
      code: `import requests
import json

transaction = {
    'from': '0xYourAddress',
    'to': '0xRecipientAddress',
    'value': '1000000000000000000'
}

response = requests.post(
    'https://api.aurlink.io/v1/transactions/send',
    headers={
        'Content-Type': 'application/json',
        'X-API-Key': 'your-api-key'
    },
    data=json.dumps(transaction)
)

result = response.json()
print('Transaction hash:', result['txHash'])`
    },
    {
      language: 'curl',
      label: 'cURL', 
      code: `curl -X POST \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your-api-key" \\
  -d '{
    "from": "0xYourAddress",
    "to": "0xRecipientAddress",
    "value": "1000000000000000000"
  }' \\
  https://api.aurlink.io/v1/transactions/send`
    }
  ]

  return (
    <MultiLanguageCode
      examples={examples}
      title="Send Transaction"
      description="Example showing how to send transactions in different languages"
    />
  )
}