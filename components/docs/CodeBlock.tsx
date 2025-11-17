// components/docs/CodeBlock.tsx
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = 'typescript', showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="absolute right-4 top-4 z-10">
        <button
          onClick={copyToClipboard}
          className="p-2 bg-slate-700 rounded-lg text-gray-300 hover:text-white hover:bg-slate-600 transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      
      <pre className="bg-slate-900 rounded-2xl p-6 overflow-x-auto border border-slate-700">
        <code className={`text-sm leading-relaxed ${showLineNumbers ? 'line-numbers' : ''}`}>
          {code}
        </code>
      </pre>
      
      {language && (
        <div className="absolute top-0 right-6 bg-slate-700 text-gray-300 px-3 py-1 rounded-b-lg text-xs font-mono">
          {language}
        </div>
      )}
    </motion.div>
  );
}