// components/docs/CodeBlock.tsx
'use client'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <div className="absolute right-4 top-4 z-10">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:border-cyan-400/30 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      
      <pre className="bg-[#1A1F3C] border border-white/10 rounded-xl p-6 overflow-x-auto">
        <code className={`language-${language} text-sm`}>
          {code}
        </code>
      </pre>
    </div>
  )
}