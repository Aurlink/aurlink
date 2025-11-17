// app/docs/tutorials/first-ai-dapp/page.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Check, ArrowRight, ArrowLeft, Code, Terminal, Settings } from 'lucide-react'
import { InteractiveCodeEditor } from '@/components/docs/InteractiveCodeEditor'

const tutorialSteps = [
  {
    id: 1,
    title: 'Project Setup',
    description: 'Set up your development environment and initialize a new Aurlink dApp project.',
    duration: '5 min',
    completed: false,
    content: {
      type: 'code',
      code: `// Initialize new project
npx create-aurlink-dapp my-ai-dapp
cd my-ai-dapp

// Install dependencies
npm install @aurlink/sdk @aurlink/ai

// Start development server
npm run dev`
    },
    check: 'Project runs on http://localhost:3000'
  },
  {
    id: 2,
    title: 'Smart Contract Development',
    description: 'Create an AI-enhanced smart contract for price predictions.',
    duration: '10 min',
    completed: false,
    content: {
      type: 'editor',
      initialCode: `// contracts/PredictiveMarket.sol
pragma solidity ^0.8.0;

import "@aurlink/ai/AIOracle.sol";

contract PredictiveMarket {
    AIOracle public aiOracle;
    
    struct Prediction {
        uint256 value;
        uint256 confidence;
        uint256 timestamp;
    }
    
    mapping(address => Prediction[]) public predictions;
    
    constructor(address _aiOracle) {
        aiOracle = AIOracle(_aiOracle);
    }
    
    function predictPrice(bytes memory input) public returns (Prediction memory) {
        // TODO: Implement AI prediction call
    }
}`,
      solution: `// contracts/PredictiveMarket.sol
pragma solidity ^0.8.0;

import "@aurlink/ai/AIOracle.sol";

contract PredictiveMarket {
    AIOracle public aiOracle;
    
    struct Prediction {
        uint256 value;
        uint256 confidence;
        uint256 timestamp;
    }
    
    mapping(address => Prediction[]) public predictions;
    
    constructor(address _aiOracle) {
        aiOracle = AIOracle(_aiOracle);
    }
    
    function predictPrice(bytes memory input) public returns (Prediction memory) {
        (bool success, bytes memory result) = address(aiOracle).delegatecall(
            abi.encodeWithSignature("predict(bytes)", input)
        );
        require(success, "AI prediction failed");
        
        (uint256 value, uint256 confidence) = abi.decode(result, (uint256, uint256));
        require(confidence > 80, "Low prediction confidence");
        
        Prediction memory prediction = Prediction(value, confidence, block.timestamp);
        predictions[msg.sender].push(prediction);
        
        return prediction;
    }
    
    function getUserPredictions(address user) public view returns (Prediction[] memory) {
        return predictions[user];
    }
}`
    },
    check: 'Contract compiles without errors'
  },
  {
    id: 3,
    title: 'Frontend Integration',
    description: 'Build a React frontend to interact with your AI smart contract.',
    duration: '15 min',
    completed: false,
    content: {
      type: 'editor',
      initialCode: `// components/PredictionInterface.jsx
import { useState } from 'react';
import { useAurlink } from '@aurlink/sdk';

export function PredictionInterface() {
  const { contract, account } = useAurlink();
  const [prediction, setPrediction] = useState(null);
  
  const handlePredict = async (inputData) => {
    // TODO: Implement prediction call
  };
  
  return (
    <div className="prediction-interface">
      <h2>AI Price Prediction</h2>
      <button onClick={handlePredict}>
        Get Prediction
      </button>
    </div>
  );
}`,
      solution: `// components/PredictionInterface.jsx
import { useState } from 'react';
import { useAurlink, useAIOracle } from '@aurlink/sdk';

export function PredictionInterface() {
  const { contract, account } = useAurlink();
  const { predict } = useAIOracle();
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handlePredict = async () => {
    setLoading(true);
    try {
      // Prepare input data for AI model
      const inputData = ethers.utils.defaultAbiCoder.encode(
        ['uint256[]'],
        [[/* feature data */]]
      );
      
      // Call the smart contract
      const tx = await contract.predictPrice(inputData);
      const receipt = await tx.wait();
      
      // Get the prediction result from events
      const event = receipt.events?.find(e => e.event === 'PredictionCreated');
      if (event) {
        setPrediction({
          value: event.args.value.toString(),
          confidence: event.args.confidence.toString(),
          timestamp: new Date().toLocaleString()
        });
      }
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="prediction-interface">
      <h2>AI Price Prediction</h2>
      <button 
        onClick={handlePredict} 
        disabled={loading}
        className="predict-button"
      >
        {loading ? 'Predicting...' : 'Get Prediction'}
      </button>
      
      {prediction && (
        <div className="prediction-result">
          <h3>Prediction Result</h3>
          <p>Value: {prediction.value}</p>
          <p>Confidence: {prediction.confidence}%</p>
          <p>Time: {prediction.timestamp}</p>
        </div>
      )}
    </div>
  );
}`
    },
    check: 'Frontend displays predictions correctly'
  }
]

export default function FirstAIDAppTutorial() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const step = tutorialSteps[currentStep]
  const progress = (completedSteps.length / tutorialSteps.length) * 100

  const markStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Build Your First AI-Enhanced dApp
              </h1>
              <p className="text-gray-300">
                Step {currentStep + 1} of {tutorialSteps.length} • {step.duration}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-cyan-400 mb-1">
                {Math.round(progress)}% Complete
              </div>
              <div className="w-32 bg-white/10 rounded-full h-2">
                <motion.div
                  className="bg-cyan-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-6"
            >
              {/* Step Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  completedSteps.includes(step.id) 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {completedSteps.includes(step.id) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>

              {/* Step Content */}
              <div className="mb-6">
                {step.content.type === 'code' && (
                  <pre className="bg-[#1A1F3C] border border-white/10 rounded-xl p-6 overflow-x-auto">
                    <code className="text-sm text-gray-300">{step.content.code}</code>
                  </pre>
                )}
                
                {step.content.type === 'editor' && (
                  <InteractiveCodeEditor
                    initialCode={step.content.initialCode}
                    solution={step.content.solution}
                    language="solidity"
                    onComplete={() => markStepComplete(step.id)}
                  />
                )}
              </div>

              {/* Check Requirement */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Check: {step.check}</span>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <motion.button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentStep === 0
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
                whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </motion.button>

              <motion.button
                onClick={nextStep}
                disabled={currentStep === tutorialSteps.length - 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentStep === tutorialSteps.length - 1
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:shadow-lg hover:shadow-purple-500/30'
                }`}
                whileHover={currentStep < tutorialSteps.length - 1 ? { scale: 1.05 } : {}}
                whileTap={currentStep < tutorialSteps.length - 1 ? { scale: 0.95 } : {}}
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Steps Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Tutorial Steps</h3>
                <div className="space-y-3">
                  {tutorialSteps.map((tutorialStep, index) => (
                    <button
                      key={tutorialStep.id}
                      onClick={() => setCurrentStep(index)}
                      className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all ${
                        currentStep === index
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
                          : completedSteps.includes(tutorialStep.id)
                          ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        currentStep === index
                          ? 'bg-cyan-400 text-white'
                          : completedSteps.includes(tutorialStep.id)
                          ? 'bg-green-400 text-white'
                          : 'bg-white/10 text-gray-400'
                      }`}>
                        {completedSteps.includes(tutorialStep.id) ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{tutorialStep.title}</div>
                        <div className="text-xs text-gray-400">{tutorialStep.duration}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Completion Status */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-cyan-400">{completedSteps.length}/{tutorialSteps.length}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-cyan-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}