// src/components/SmartContractWizard.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronRight, ChevronLeft, Rocket, Shield, Zap } from 'lucide-react'

interface ContractData {
  name: string
  type: 'ERC20' | 'ERC721' | 'ERC1155' | 'Staking' | 'Vesting' | 'custom'
  network: 'ethereum' | 'polygon' | 'avalanche' | 'bsc' | 'goerli' | 'mumbai'
  symbol: string
  supply: string
  features: string[]
  code: string
  parameters: { [key: string]: string }
}

export function SmartContractWizard() {
  const [step, setStep] = useState(1)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentResult, setDeploymentResult] = useState<any>(null)
  const [contractData, setContractData] = useState<ContractData>({
    name: '',
    type: 'ERC20',
    network: 'polygon',
    symbol: '',
    supply: '1000000',
    features: [],
    code: '',
    parameters: {}
  })

  const contractTypes = [
    { 
      id: 'ERC20' as const, 
      name: 'ERC20 Token', 
      description: 'Fungible token for currencies and shares',
      icon: '💰',
      features: ['Transfer tokens', 'Approve spending', 'Check balances', 'Total supply']
    },
    { 
      id: 'ERC721' as const, 
      name: 'ERC721 NFT', 
      description: 'Non-fungible token for unique assets',
      icon: '🖼️',
      features: ['Mint unique tokens', 'Transfer NFTs', 'Approve operators', 'Token metadata']
    },
    { 
      id: 'ERC1155' as const, 
      name: 'ERC1155 Multi-Token', 
      description: 'Hybrid token for multiple asset types',
      icon: '🎪',
      features: ['Multiple token types', 'Batch transfers', 'Gas efficient', 'Semi-fungible tokens']
    },
    { 
      id: 'Staking' as const, 
      name: 'Staking Contract', 
      description: 'Allow users to stake tokens and earn rewards',
      icon: '🏦',
      features: ['Stake tokens', 'Earn rewards', 'Withdraw stakes', 'APY calculation']
    },
    { 
      id: 'Vesting' as const, 
      name: 'Vesting Contract', 
      description: 'Gradually release tokens over time',
      icon: '📅',
      features: ['Time-locked releases', 'Cliff periods', 'Revocable vesting', 'Multiple beneficiaries']
    },
    { 
      id: 'custom' as const, 
      name: 'Custom Contract', 
      description: 'Write your own Solidity code',
      icon: '⚙️',
      features: ['Full customization', 'Advanced features', 'Gas optimization', 'Complete control']
    }
  ]

  const networks = [
    { 
      id: 'ethereum' as const, 
      name: 'Ethereum Mainnet', 
      gas: 'High', 
      color: 'text-blue-400',
      testnet: false
    },
    { 
      id: 'polygon' as const, 
      name: 'Polygon', 
      gas: 'Low', 
      color: 'text-purple-400',
      testnet: false
    },
    { 
      id: 'avalanche' as const, 
      name: 'Avalanche', 
      gas: 'Medium', 
      color: 'text-red-400',
      testnet: false
    },
    { 
      id: 'bsc' as const, 
      name: 'Binance Smart Chain', 
      gas: 'Low', 
      color: 'text-yellow-400',
      testnet: false
    },
    { 
      id: 'goerli' as const, 
      name: 'Goerli Testnet', 
      gas: 'Free', 
      color: 'text-gray-400',
      testnet: true
    },
    { 
      id: 'mumbai' as const, 
      name: 'Mumbai Testnet', 
      gas: 'Free', 
      color: 'text-gray-400',
      testnet: true
    }
  ]

  const getContractParameters = (type: string) => {
    const parameters: { [key: string]: { label: string; type: string; placeholder: string; required: boolean } } = {}
    
    switch (type) {
      case 'ERC20':
        parameters.name = { label: 'Token Name', type: 'text', placeholder: 'My Awesome Token', required: true }
        parameters.symbol = { label: 'Token Symbol', type: 'text', placeholder: 'MAT', required: true }
        parameters.supply = { label: 'Total Supply', type: 'number', placeholder: '1000000', required: true }
        parameters.decimals = { label: 'Decimals', type: 'number', placeholder: '18', required: false }
        break
      case 'ERC721':
        parameters.name = { label: 'Collection Name', type: 'text', placeholder: 'My NFT Collection', required: true }
        parameters.symbol = { label: 'Collection Symbol', type: 'text', placeholder: 'MNC', required: true }
        parameters.baseURI = { label: 'Base URI', type: 'text', placeholder: 'https://api.mycollection.com/tokens/', required: false }
        break
      case 'Staking':
        parameters.stakingToken = { label: 'Staking Token Address', type: 'text', placeholder: '0x...', required: true }
        parameters.rewardToken = { label: 'Reward Token Address', type: 'text', placeholder: '0x...', required: true }
        parameters.rewardRate = { label: 'Reward Rate', type: 'number', placeholder: '1000', required: true }
        parameters.lockPeriod = { label: 'Lock Period (days)', type: 'number', placeholder: '30', required: false }
        break
      case 'Vesting':
        parameters.token = { label: 'Token Address', type: 'text', placeholder: '0x...', required: true }
        parameters.startTime = { label: 'Start Time', type: 'datetime-local', placeholder: '', required: true }
        parameters.duration = { label: 'Duration (days)', type: 'number', placeholder: '365', required: true }
        parameters.cliff = { label: 'Cliff Period (days)', type: 'number', placeholder: '90', required: false }
        break
    }
    
    return parameters
  }

  const Step1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Rocket className="w-12 h-12 text-[#00F5FF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white">Choose Contract Type</h2>
        <p className="text-gray-400">Select the type of smart contract you want to deploy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contractTypes.map((type) => (
          <motion.button
            key={type.id}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setContractData({...contractData, type: type.id})}
            className={`p-6 rounded-xl border-2 text-left transition-all duration-300 group ${
              contractData.type === type.id 
                ? 'border-[#00F5FF] bg-gradient-to-br from-[#00F5FF]/20 to-cyan-400/10 shadow-lg shadow-[#00F5FF]/20' 
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-2xl mb-2">{type.icon}</div>
                <h3 className="font-semibold text-white group-hover:text-[#00F5FF] transition-colors">
                  {type.name}
                </h3>
              </div>
              {contractData.type === type.id && (
                <CheckCircle2 className="w-6 h-6 text-[#00F5FF] flex-shrink-0" />
              )}
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{type.description}</p>
            <div className="space-y-1">
              {type.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                  <Zap className="w-3 h-3 text-[#00F5FF]" />
                  {feature}
                </div>
              ))}
              {type.features.length > 3 && (
                <div className="text-xs text-gray-500">+{type.features.length - 3} more features</div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )

  const Step2 = () => {
    const parameters = getContractParameters(contractData.type)
    
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <Shield className="w-12 h-12 text-[#00F5FF] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Configure Contract</h2>
          <p className="text-gray-400">Set up your contract parameters</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(parameters).map(([key, param]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {param.label} {param.required && <span className="text-red-400">*</span>}
              </label>
              <input
                type={param.type}
                value={contractData.parameters[key] || ''}
                onChange={(e) => setContractData({
                  ...contractData,
                  parameters: { ...contractData.parameters, [key]: e.target.value }
                })}
                placeholder={param.placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00F5FF] transition-colors"
              />
            </div>
          ))}
        </div>

        {contractData.type === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Solidity Code
            </label>
            <textarea
              value={contractData.code}
              onChange={(e) => setContractData({...contractData, code: e.target.value})}
              placeholder="// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    // Your code here
}"
              rows={12}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00F5FF] transition-colors font-mono text-sm"
            />
          </div>
        )}
      </motion.div>
    )
  }

  const Step3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Zap className="w-12 h-12 text-[#00F5FF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white">Deployment Network</h2>
        <p className="text-gray-400">Choose where to deploy your smart contract</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {networks.map((network) => (
          <motion.button
            key={network.id}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setContractData({...contractData, network: network.id})}
            className={`p-6 rounded-xl border-2 text-left transition-all duration-300 group ${
              contractData.network === network.id 
                ? 'border-[#00F5FF] bg-gradient-to-br from-[#00F5FF]/20 to-cyan-400/10 shadow-lg shadow-[#00F5FF]/20' 
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className={`font-semibold ${network.color} group-hover:text-[#00F5FF] transition-colors`}>
                  {network.name}
                </h3>
                {network.testnet && (
                  <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full mt-1">
                    Testnet
                  </span>
                )}
              </div>
              {contractData.network === network.id && (
                <CheckCircle2 className="w-6 h-6 text-[#00F5FF] flex-shrink-0" />
              )}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Gas Fees:</span>
                <span className={`font-medium ${
                  network.gas === 'High' ? 'text-red-400' :
                  network.gas === 'Medium' ? 'text-yellow-400' : 
                  network.gas === 'Free' ? 'text-green-400' : 'text-green-400'
                }`}>
                  {network.gas}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Speed:</span>
                <span className="text-white">
                  {network.gas === 'High' ? 'Slow' : network.gas === 'Free' ? 'Fast' : 'Very Fast'}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Gas Estimate */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h4 className="font-semibold text-white mb-3">Deployment Estimate</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Network:</span>
            <p className="text-white font-medium">{networks.find(n => n.id === contractData.network)?.name}</p>
          </div>
          <div>
            <span className="text-gray-400">Gas Cost:</span>
            <p className="text-white font-medium">
              {contractData.network === 'ethereum' ? '~0.05 ETH' :
               contractData.network === 'polygon' ? '~0.1 MATIC' :
               contractData.network === 'avalanche' ? '~0.01 AVAX' :
               contractData.network === 'bsc' ? '~0.001 BNB' : 'Free'}
            </p>
          </div>
          <div>
            <span className="text-gray-400">Time:</span>
            <p className="text-white font-medium">
              {contractData.network === 'ethereum' ? '2-5 minutes' :
               contractData.network.includes('testnet') ? '15-30 seconds' : '10-30 seconds'}
            </p>
          </div>
          <div>
            <span className="text-gray-400">Security:</span>
            <p className="text-green-400 font-medium">High</p>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const Step4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Rocket className="w-12 h-12 text-[#00F5FF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white">Review & Deploy</h2>
        <p className="text-gray-400">Review your contract details before deployment</p>
      </div>

      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h4 className="font-semibold text-white mb-4">Contract Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <span className="text-gray-400 text-sm">Contract Type:</span>
              <p className="text-white font-medium">
                {contractTypes.find(t => t.id === contractData.type)?.name}
              </p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Network:</span>
              <p className="text-white font-medium">
                {networks.find(n => n.id === contractData.network)?.name}
              </p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Estimated Cost:</span>
              <p className="text-white font-medium">
                {contractData.network === 'ethereum' ? '~0.05 ETH' :
                 contractData.network === 'polygon' ? '~0.1 MATIC' :
                 contractData.network === 'avalanche' ? '~0.01 AVAX' :
                 contractData.network === 'bsc' ? '~0.001 BNB' : 'Free'}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {Object.entries(contractData.parameters).map(([key, value]) => (
              <div key={key}>
                <span className="text-gray-400 text-sm capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}:
                </span>
                <p className="text-white font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-semibold text-yellow-400 mb-1">Important Notice</h5>
            <p className="text-yellow-300 text-sm">
              Smart contract deployments are irreversible. Once deployed, you cannot modify the contract code. 
              Ensure all parameters are correct before proceeding.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const handleDeploy = async () => {
    setIsDeploying(true)
    try {
      const response = await fetch('/api/contracts/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractData),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setDeploymentResult(result)
        setStep(5) // Move to success step
      } else {
        throw new Error(result.error || 'Deployment failed')
      }
    } catch (error) {
      console.error('Deployment error:', error)
      alert('Deployment failed: ' + (error as Error).message)
    } finally {
      setIsDeploying(false)
    }
  }

  const Step5 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10 text-green-400" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Contract Deployed Successfully!</h2>
        <p className="text-gray-400">Your smart contract has been deployed to the blockchain</p>
      </div>

      {deploymentResult && (
        <div className="bg-white/5 rounded-xl p-6 border border-white/10 max-w-md mx-auto">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Contract Address:</span>
              <span className="text-white font-mono">{deploymentResult.contractAddress.slice(0, 8)}...{deploymentResult.contractAddress.slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Transaction Hash:</span>
              <span className="text-white font-mono">{deploymentResult.transactionHash.slice(0, 8)}...{deploymentResult.transactionHash.slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Network:</span>
              <span className="text-white">{networks.find(n => n.id === contractData.network)?.name}</span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <a
              href={deploymentResult.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#00F5FF] text-[#0A0F2C] font-semibold py-2 px-4 rounded-lg hover:bg-cyan-400 transition-colors text-center"
            >
              View on Explorer
            </a>
            <button
              onClick={() => {
                setStep(1)
                setDeploymentResult(null)
                setContractData({
                  name: '',
                  type: 'ERC20',
                  network: 'polygon',
                  symbol: '',
                  supply: '1000000',
                  features: [],
                  code: '',
                  parameters: {}
                })
              }}
              className="flex-1 border border-white/10 text-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-white/5 transition-colors"
            >
              Deploy Another
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )

  const canProceed = () => {
    switch (step) {
      case 1:
        return true // Always can proceed from type selection
      case 2:
        const parameters = getContractParameters(contractData.type)
        return Object.entries(parameters)
          .filter(([_, param]) => param.required)
          .every(([key]) => contractData.parameters[key]?.trim())
      case 3:
        return true // Always can proceed from network selection
      case 4:
        return true // Ready to deploy
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0F2C] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        {step < 5 && (
          <div className="flex justify-between items-center mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 -z-10" />
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  step >= stepNumber 
                    ? 'bg-[#00F5FF] border-[#00F5FF] text-[#0A0F2C] shadow-lg shadow-[#00F5FF]/30' 
                    : 'bg-[#0A0F2C] border-white/10 text-gray-400'
                }`}>
                  {step > stepNumber ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  step >= stepNumber ? 'text-[#00F5FF]' : 'text-gray-400'
                }`}>
                  {stepNumber === 1 && 'Type'}
                  {stepNumber === 2 && 'Configure'}
                  {stepNumber === 3 && 'Network'}
                  {stepNumber === 4 && 'Deploy'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step === 1 && <Step1 key="step1" />}
          {step === 2 && <Step2 key="step2" />}
          {step === 3 && <Step3 key="step3" />}
          {step === 4 && <Step4 key="step4" />}
          {step === 5 && <Step5 key="step5" />}
        </AnimatePresence>

        {/* Navigation */}
        {step < 5 && (
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-lg text-gray-300 disabled:opacity-50 hover:bg-white/5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-[#00F5FF] text-[#0A0F2C] font-semibold rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleDeploy}
                disabled={isDeploying || !canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeploying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    Deploy Contract
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}