// components/docs/InteractiveCodeEditor.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Check, Copy, RotateCcw, Eye, EyeOff } from 'lucide-react'

interface InteractiveCodeEditorProps {
  initialCode: string
  solution: string
  language: string
  onComplete: () => void
}

export function InteractiveCodeEditor({ 
  initialCode, 
  solution, 
  language, 
  onComplete 
}: InteractiveCodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [showSolution, setShowSolution] = useState(false)
  const [output, setOutput] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)

  const runCode = async () => {
    // Simulate code execution
    setOutput('Compiling...\nRunning tests...\n')
    
    setTimeout(() => {
      const isCorrect = code.trim() === solution.trim()
      if (isCorrect) {
        setOutput(prev => prev + '✅ All tests passed! Code is correct.\n')
        setIsCompleted(true)
        onComplete()
      } else {
        setOutput(prev => prev + '❌ Tests failed. Check your implementation.\n')
      }
    }, 2000)
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput('')
    setIsCompleted(false)
  }

  const toggleSolution = () => {
    setShowSolution(!showSolution)
    if (!showSolution) {
      setCode(solution)
    } else {
      setCode(initialCode)
    }
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
  }

  return (
    <div className="space-y-4">
      {/* Editor Tabs */}
      <div className="flex border-b border-white/10">
        <button className="px-4 py-2 text-sm font-medium border-b-2 border-cyan-400 text-cyan-400">
          Editor
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
          Output
        </button>
      </div>

      {/* Code Editor */}
      <div className="relative">
        {/* Editor Actions */}
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button
            onClick={copyCode}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:border-cyan-400/30 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button
            onClick={resetCode}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:border-cyan-400/30 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={toggleSolution}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:border-cyan-400/30 transition-colors"
          >
            {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
        </div>

        {/* Code Textarea */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-96 bg-[#1A1F3C] border border-white/10 rounded-xl p-6 font-mono text-sm text-gray-300 focus:outline-none focus:border-cyan-400 resize-none"
          spellCheck="false"
        />
      </div>

      {/* Run Button */}
      <motion.button
        onClick={runCode}
        disabled={isCompleted}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
          isCompleted
            ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:shadow-lg hover:shadow-purple-500/30'
        }`}
        whileHover={!isCompleted ? { scale: 1.05 } : {}}
        whileTap={!isCompleted ? { scale: 0.95 } : {}}
      >
        {isCompleted ? (
          <Check className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
        {isCompleted ? 'Completed!' : 'Run Code'}
      </motion.button>

      {/* Output Panel */}
      {output && (
        <div className="bg-black/30 border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-semibold mb-2">Output</h4>
          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
            {output}
          </pre>
        </div>
      )}

      {/* Completion Badge */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-400/30 rounded-xl"
        >
          <Check className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-semibold">
            Step completed! You can proceed to the next step.
          </span>
        </motion.div>
      )}
    </div>
  )
}