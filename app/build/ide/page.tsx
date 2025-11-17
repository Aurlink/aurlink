'use client'
import React, { useState, useEffect } from 'react'
import { AurionIDE } from '@/ide/core'
import { RemoteLLMClient, DummyAIClient } from '@/ide/aiClient'

// Initialize IDE with AI client
const getAIClient = () => {
  if (process.env.NEXT_PUBLIC_AURION_AI_ENDPOINT) {
    return new RemoteLLMClient(
      process.env.NEXT_PUBLIC_AURION_AI_ENDPOINT,
      process.env.NEXT_PUBLIC_AURION_AI_KEY
    )
  }
  return new DummyAIClient()
}

const ide = new AurionIDE(getAIClient())

export default function AurlinkIDEPage() {
  const [code, setCode] = useState(`// Welcome to Aurlink IDE - Aurion Language Studio
contract SimpleVesting {
  owner: address
  recipient: address
  total_amount: u64
  start_time: u64
  cliff_duration: u64
  vesting_duration: u64
  claimed: u64
  
  init(recipient: address, total: u64, cliff: u64, duration: u64) {
    self.owner = msg.sender
    self.recipient = recipient
    self.total_amount = total
    self.start_time = block.timestamp
    self.cliff_duration = cliff
    self.vesting_duration = duration
    self.claimed = 0
  }
  
  claim(amount: u64) -> bool {
    require(msg.sender == self.recipient, "Unauthorized")
    require(amount > 0, "Amount must be positive")
    
    let available = self.calculate_vested() - self.claimed
    require(amount <= available, "Insufficient vested tokens")
    
    self.claimed += amount
    emit TokensClaimed(msg.sender, amount, block.timestamp)
    return true
  }
  
  calculate_vested() -> u64 {
    let current_time = block.timestamp
    let elapsed = current_time - self.start_time
    
    if elapsed < self.cliff_duration {
      return 0
    }
    
    if elapsed >= self.vesting_duration {
      return self.total_amount
    }
    
    return self.total_amount * elapsed / self.vesting_duration
  }
}`)

  const [suggestions, setSuggestions] = useState<any[]>([])
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [optimizationResult, setOptimizationResult] = useState<any>(null)
  const [securityIssues, setSecurityIssues] = useState<any[]>([])
  const [isCompiling, setIsCompiling] = useState(false)
  const [compilationOutput, setCompilationOutput] = useState('')

  // Load sample contract on mount
  useEffect(() => {
    // You could load from localStorage or fetch template
    const savedCode = localStorage.getItem('aurion-ide-code')
    if (savedCode) setCode(savedCode)
  }, [])

  // Save code on change
  useEffect(() => {
    localStorage.setItem('aurion-ide-code', code)
  }, [code])

  async function handleAISuggest() {
    const res = await ide.ai_code_completion({ 
      fileName: 'vesting.aur', 
      content: code 
    })
    setSuggestions(res)
  }

  async function handleVerify() {
    const result = await ide.formal_verifier(code)
    setVerificationResult(result)
    
    // Also run security scan
    const issues = await ide.vulnerability_scanner(code)
    setSecurityIssues(issues)
  }

  async function handleCompile() {
    setIsCompiling(true)
    setCompilationOutput('')
    
    try {
      // Simulate compilation process
      setCompilationOutput('Compiling Aurion contract...\n')
      
      // In real implementation, this would call the Aurion compiler
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCompilationOutput(prev => prev + '✓ Parsing Aurion syntax...\n')
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setCompilationOutput(prev => prev + '✓ Generating intermediate representation...\n')
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setCompilationOutput(prev => prev + '✓ Generating Solana Rust code...\n')
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setCompilationOutput(prev => prev + '✓ Generating AVM bytecode...\n')
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setCompilationOutput(prev => prev + '🎉 Compilation successful!\n\n')
      
      // Simulated output
      const simulatedOutput = `// Generated Solana Rust Code
use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, 
    pubkey::Pubkey, msg, program_error::ProgramError
};

entrypoint!(process_instruction);
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Vesting contract executed");
    Ok(())
}

// AVM Bytecode ready for Aurlink Virtual Machine
// Bytecode size: 2.4KB | Optimized: 2.1KB (12% reduction)`
      
      setCompilationOutput(prev => prev + simulatedOutput)
      
    } catch (error) {
      setCompilationOutput(`Compilation failed: ${error}`)
    } finally {
      setIsCompiling(false)
    }
  }

  async function handleOptimize() {
    // Simulate bytecode optimization
    const fakeBytecode = new Uint8Array(1024) // 1KB fake bytecode
    const result = await ide.gas_optimizer(fakeBytecode)
    setOptimizationResult(result)
  }

  async function handleGenerateTests() {
    const testSuite = await ide.ai_test_generator(code)
    alert(`Generated test suite: ${testSuite.name} with ${testSuite.tests?.length || 0} tests`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Aurlink IDE
          </h1>
          <p className="text-gray-400">Aurion Language Development Environment</p>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full">Aurion v0.1</span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">Multi-chain Ready</span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full">AI Powered</span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left Column - Code Editor */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3 className="font-semibold text-lg">vesting.aur</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={handleCompile}
                    disabled={isCompiling}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-800 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {isCompiling ? 'Compiling...' : 'Compile'}
                  </button>
                  <button 
                    onClick={handleAISuggest}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    AI Suggest
                  </button>
                </div>
              </div>
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 bg-gray-900/50 text-white font-mono text-sm focus:outline-none resize-none rounded-b-2xl"
                spellCheck="false"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button 
                onClick={handleVerify}
                className="px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
              >
                Verify Security
              </button>
              <button 
                onClick={handleOptimize}
                className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Optimize Gas
              </button>
              <button 
                onClick={handleGenerateTests}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Generate Tests
              </button>
              <button 
                onClick={() => ide.multi_chain_simulator([{ name: 'Solana', rpcUrl: '' }, { name: 'Aurlink VM', rpcUrl: '' }])}
                className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                Multi-chain Sim
              </button>
            </div>
          </div>

          {/* Right Column - Output & Results */}
          <div className="space-y-4">
            {/* Compilation Output */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-700">
              <h3 className="font-semibold text-lg mb-3">Compilation Output</h3>
              <pre className="bg-gray-900/50 rounded-lg p-4 text-sm font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
                {compilationOutput || 'Compile to see output...'}
              </pre>
            </div>

            {/* AI Suggestions */}
            {suggestions.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-700">
                <h3 className="font-semibold text-lg mb-3">AI Suggestions</h3>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                      <div className="font-medium text-cyan-400 mb-1">{suggestion.title}</div>
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap">{suggestion.snippet}</pre>
                      {suggestion.score && (
                        <div className="text-xs text-gray-500 mt-1">Confidence: {(suggestion.score * 100).toFixed(0)}%</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Issues */}
            {securityIssues.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-700">
                <h3 className="font-semibold text-lg mb-3 text-red-400">Security Issues</h3>
                <div className="space-y-2">
                  {securityIssues.map((issue, index) => (
                    <div key={index} className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          issue.severity === 'high' ? 'bg-red-500 text-white' :
                          issue.severity === 'medium' ? 'bg-yellow-500 text-black' :
                          'bg-blue-500 text-white'
                        }`}>
                          {issue.severity.toUpperCase()}
                        </span>
                        <span className="font-medium">{issue.id}</span>
                      </div>
                      <div className="text-sm text-gray-300">{issue.message}</div>
                      {issue.line && (
                        <div className="text-xs text-gray-500 mt-1">Line: {issue.line}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimization Results */}
            {optimizationResult && (
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-700">
                <h3 className="font-semibold text-lg mb-3 text-green-400">Optimization Results</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Original Size:</span>
                    <span className="font-mono">{optimizationResult.originalSize} bytes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Optimized Size:</span>
                    <span className="font-mono text-green-400">{optimizationResult.optimizedSize} bytes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Reduction:</span>
                    <span className="font-mono text-cyan-400">
                      {((1 - optimizationResult.optimizedSize / optimizationResult.originalSize) * 100).toFixed(1)}%
                    </span>
                  </div>
                  {optimizationResult.notes && (
                    <div className="mt-3">
                      <div className="text-sm font-medium mb-1">Optimizations Applied:</div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {optimizationResult.notes.map((note: string, index: number) => (
                          <li key={index}>• {note}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}