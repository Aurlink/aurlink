// components/whitepaper/InteractiveWhitePaper.tsx
'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FileText, Brain, Zap, Cpu, Network, Shield, GitBranch, 
  Database, Users, Target, ArrowRight, BookOpen, ChevronRight,
  Building, BarChart3, Globe, Code, Wallet, AlertTriangle,
  CheckCircle, Clock, PieChart, Calendar, Settings, CpuIcon,
  Code2, Book, List, Contact
} from 'lucide-react'

export default function InteractiveWhitePaper() {
  const [activeSection, setActiveSection] = useState('executive-summary')

  const sections = [
    { id: 'executive-summary', title: 'Executive Summary', icon: FileText },
    { id: 'vision-mission', title: 'Vision & Mission', icon: Target },
    { id: 'problems-solutions', title: 'Problems & Solutions', icon: Zap },
    { id: 'architecture', title: 'Architecture & Technology', icon: Cpu },
    { id: 'tokenomics', title: 'Tokenomics', icon: Network },
    { id: 'governance', title: 'Governance & Treasury', icon: Users },
    { id: 'roadmap', title: 'Roadmap', icon: GitBranch },
    { id: 'funding', title: 'Funding & Investment', icon: Database },
    { id: 'ecosystem', title: 'Ecosystem & Use Cases', icon: Brain },
    { id: 'risk', title: 'Risk & Compliance', icon: Shield },
    { id: 'appendix-a', title: 'Appendix A: NeuraLink & NOL Feasibility', icon: Settings },
    { id: 'appendix-b', title: 'Appendix B: Simulation Specification', icon: CpuIcon },
    { id: 'appendix-c', title: 'Appendix C: Technical Parameters', icon: Code2 },
    { id: 'appendix-d', title: 'Appendix D: Consensus & AI Pseudocode', icon: Code },
    { id: 'appendix-e', title: 'Appendix E: Glossary', icon: Book },
    { id: 'appendix-f', title: 'Appendix F: Contributors & Contacts', icon: Contact },
  ]

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-[#1A1F3C]/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Contents</h2>
              <nav className="space-y-2">
                {sections.slice(0, 10).map((section) => {
                  const IconComponent = section.icon
                  const isActive = activeSection === section.id
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-purple-500/20 to-cyan-400/20 text-white border border-purple-500/30' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm font-medium">{section.title}</span>
                      <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                        isActive ? 'rotate-90' : ''
                      }`} />
                    </button>
                  )
                })}

                {/* Appendices Section */}
                <div className="pt-4 mt-4 border-t border-white/10">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Appendices</h3>
                  {sections.slice(10).map((section) => {
                    const IconComponent = section.icon
                    const isActive = activeSection === section.id
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all ${
                          isActive 
                            ? 'bg-gradient-to-r from-purple-500/20 to-cyan-400/20 text-white border border-purple-500/30' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm font-medium">{section.title.replace('Appendix A: ', 'A: ').replace('Appendix B: ', 'B: ').replace('Appendix C: ', 'C: ').replace('Appendix D: ', 'D: ').replace('Appendix E: ', 'E: ').replace('Appendix F: ', 'F: ')}</span>
                        <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                          isActive ? 'rotate-90' : ''
                        }`} />
                      </button>
                    )
                  })}
                </div>
              </nav>
              
              {/* Document Info */}
              <div className="mt-8 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <h3 className="font-semibold text-cyan-400 text-sm mb-2">Document Info</h3>
                <div className="text-xs text-cyan-300 space-y-1">
                  <p><strong>Version:</strong> v1.3.0</p>
                  <p><strong>Release:</strong> October 2025</p>
                  <p><strong>Status:</strong> Approved</p>
                  <p><strong>Network:</strong> NeuraLink</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-[#1A1F3C]/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              
              {/* Header */}
              <div className="border-b border-white/10 pb-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center text-white">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">Aurlink White Paper</h1>
                    <p className="text-gray-300">Version 1.3 • Investor Release Candidate</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full">Approved for Presentation</span>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full">MiCA & FINMA Compliant</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full">NeuraLink Consensus</span>
                </div>
              </div>

              {/* Content Sections */}
              <div className="prose prose-invert max-w-none">
                
                {/* Previous sections remain the same... */}

                {/* Appendix A: Technical Feasibility of NeuraLink & NOL */}
                {activeSection === 'appendix-a' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">11. Appendix A: Technical Feasibility of NeuraLink & NOL</h2>
                    
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
                      <p className="text-gray-300">
                        NeuraLink and NOL integrate AI to enhance scalability and reliability, surpassing the pitch deck's high-level summary with detailed model architectures and data flows (Nature 2023, Fetch.ai 2024).
                      </p>
                    </div>

                    <div className="grid gap-6">
                      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-4">Architecture</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-cyan-400 mb-2">Telemetry Layer</h4>
                            <p className="text-gray-300 mb-2">Collects validator metrics, mempool stats, bridge telemetry</p>
                            <ul className="text-gray-300 text-sm space-y-1">
                              <li>• <strong>Specs:</strong> 1TB/day, 100ms sampling, Kafka pipeline, &lt;5% node overhead</li>
                              <li>• <strong>Data:</strong> Latency (ms), CPU (%), stake churn (%), TPS</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-purple-400 mb-2">Feature Store</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                              <li>• Anonymized data, differential privacy (epsilon=0.1)</li>
                              <li>• Federated learning (10–100 nodes)</li>
                              <li>• <strong>Specs:</strong> 1GB feature vectors, AES-256 encryption, 10ms access</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-green-400 mb-2">Off-Chain AI Models</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-black/20 rounded-xl p-4">
                                <h5 className="font-semibold text-cyan-400 text-sm mb-2">Supervised Learning</h5>
                                <ul className="text-gray-300 text-xs space-y-1">
                                  <li>• XGBoost (10,000 samples, 50 features)</li>
                                  <li>• 90% accuracy, 0.85 F1-score</li>
                                  <li>• Predicts validator faults</li>
                                </ul>
                              </div>
                              <div className="bg-black/20 rounded-xl p-4">
                                <h5 className="font-semibold text-purple-400 text-sm mb-2">Reinforcement Learning</h5>
                                <ul className="text-gray-300 text-xs space-y-1">
                                  <li>• Deep Q-Network (3-layer, 1M samples/epoch)</li>
                                  <li>• 15% TPS gains</li>
                                  <li>• Optimizes block parameters</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-cyan-400/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-4">Experiment Plan</h3>
                        <div className="space-y-4">
                          <div className="bg-black/20 rounded-xl p-4">
                            <h4 className="font-semibold text-cyan-400 text-sm mb-2">Q4 2025: Simulation</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                              <li>• Environment: Cosmos SDK simulator</li>
                              <li>• Network: 100–1,000 nodes (4-core CPUs, 16GB RAM, 1Gbps)</li>
                              <li>• Workload: 10,000 TPS bursts, 10% fault rate</li>
                              <li>• <strong>Target Metrics:</strong> 15% TPS increase, 90% fault accuracy, 20% finality reduction</li>
                            </ul>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-black/20 rounded-xl p-4">
                              <h4 className="font-semibold text-green-400 text-sm mb-2">Q1 2026: Testnet</h4>
                              <p className="text-gray-300 text-sm">Shadow mode, 100 validators</p>
                            </div>
                            <div className="bg-black/20 rounded-xl p-4">
                              <h4 className="font-semibold text-blue-400 text-sm mb-2">Q2 2026: Pilot</h4>
                              <p className="text-gray-300 text-sm">AI actions, 80% DAO approval target</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Appendix B: Simulation Specification */}
                {activeSection === 'appendix-b' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">12. Appendix B: Simulation Specification</h2>
                    
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
                      <p className="text-gray-300">
                        Validates NeuraLink and NOL, targeting 15% TPS gains, 90% fault accuracy, 20% finality reduction.
                      </p>
                    </div>

                    <div className="grid gap-6">
                      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-4">Setup</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-cyan-400 text-sm mb-2">Environment</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                              <li>• Cosmos SDK simulator</li>
                              <li>• 100–1,000 nodes</li>
                              <li>• 4-core CPUs, 16GB RAM, 1Gbps</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-purple-400 text-sm mb-2">Workload</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                              <li>• 10,000 TPS bursts</li>
                              <li>• 10% fault rate injection</li>
                              <li>• 1TB/day telemetry simulation</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-cyan-400/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-4">AI Models Configuration</h3>
                        <div className="space-y-4">
                          <div className="bg-black/20 rounded-xl p-4">
                            <h4 className="font-semibold text-green-400 text-sm mb-2">Supervised Learning</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                              <li>• Model: XGBoost</li>
                              <li>• Features: 50 features (latency, CPU, uptime, etc.)</li>
                              <li>• Samples: 10,000 training samples</li>
                              <li>• Target: 90% fault prediction accuracy</li>
                            </ul>
                          </div>
                          
                          <div className="bg-black/20 rounded-xl p-4">
                            <h4 className="font-semibold text-blue-400 text-sm mb-2">Reinforcement Learning</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                              <li>• Model: Deep Q-Network (DQN)</li>
                              <li>• Architecture: 3-layer network</li>
                              <li>• Training: 1M samples/epoch</li>
                              <li>• Reward: TPS - latency optimization</li>
                              <li>• Target: 15% TPS gains</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-4">Code Snippet</h3>
                        <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                          <pre className="text-cyan-300 text-sm overflow-x-auto">
{`from xgboost import XGBClassifier
from tensorflow.keras import DQN
from sklearn.ensemble import IsolationForest

def generate_policy(telemetry):
    features = preprocess(telemetry, differential_privacy=True)
    faults = XGBClassifier().predict(features)  # 90% accuracy
    params = DQN.optimize(features, reward="max_tps")  # Block time, gas
    anomalies = IsolationForest().detect(features)  # Byzantine flags
    
    proposal = {
        "faults": faults.tolist(),
        "params": params,  # e.g., { "block_time": 0.4 }
        "anomalies": anomalies.tolist()
    }
    return sign_proposal(proposal, private_key)
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Appendix C: Technical Parameters */}
                {activeSection === 'appendix-c' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">13. Appendix C: Technical Parameters</h2>
                    
                    <div className="grid gap-6">
                      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-4">Core Network Parameters</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Block Time:</span>
                              <span className="text-cyan-400">400 ms (0.3–0.5s)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Finality:</span>
                              <span className="text-green-400">1.5s optimistic</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Validators:</span>
                              <span className="text-purple-400">100 total</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Committee Size:</span>
                              <span className="text-blue-400">20–50 per block</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Gas Schedule:</span>
                              <span className="text-cyan-400">EVM-compatible</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Gas Units:</span>
                              <span className="text-green-400">10M–50M</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Sharding:</span>
                              <span className="text-purple-400">4–16 shards</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Shard Size:</span>
                              <span className="text-blue-400">256MB each</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-cyan-400/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-4">Performance Targets</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-black/20 rounded-xl">
                            <div className="text-2xl font-bold text-cyan-400">5K-20K</div>
                            <div className="text-sm text-gray-400">TPS</div>
                          </div>
                          <div className="text-center p-4 bg-black/20 rounded-xl">
                            <div className="text-2xl font-bold text-green-400">1.5s</div>
                            <div className="text-sm text-gray-400">Finality</div>
                          </div>
                          <div className="text-center p-4 bg-black/20 rounded-xl">
                            <div className="text-2xl font-bold text-purple-400">15%</div>
                            <div className="text-sm text-gray-400">Throughput Gain</div>
                          </div>
                          <div className="text-center p-4 bg-black/20 rounded-xl">
                            <div className="text-2xl font-bold text-blue-400">20%</div>
                            <div className="text-sm text-gray-400">Downtime Reduction</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Appendix D: Consensus & AI Pseudocode */}
                {activeSection === 'appendix-d' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">14. Appendix D: Consensus & AI Pseudocode</h2>
                    
                    <div className="grid gap-6">
                      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-4">Consensus Algorithm</h3>
                        <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                          <pre className="text-cyan-300 text-sm overflow-x-auto">
{`1. Epoch: Elect validators via stake delegations (24-hour cycle)
2. AI Analytics: NOL suggests committee adjustments (off-chain)
3. Block Proposal: Leader constructs block, broadcasts (400ms)
4. Validation: Committee verifies, signs attestations (ECDSA)
5. Finalization: Threshold signatures (2/3) append block
6. Slashing: Penalize equivocation via on-chain module`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-cyan-400/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-4">AI Policy Generation</h3>
                        <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                          <pre className="text-purple-300 text-sm overflow-x-auto">
{`function generatePolicy(telemetry):
    features = preprocess(telemetry, differential_privacy=True)
    faults = xgboost_predict(features) // 90% accuracy
    params = dqn_optimize(features) // Block time, gas limits
    anomalies = isolation_forest(features) // Byzantine detection
    
    proposal = {
        "faults": faults, // e.g., { "validator_id": 42, "confidence": 0.95 }
        "params": params, // e.g., { "block_time": 0.4s, "gas_limit": 20M }
        "anomalies": anomalies
    }
    return sign(proposal, private_key)
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Appendix E: Glossary */}
                {activeSection === 'appendix-e' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">15. Appendix E: Glossary</h2>
                    
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-cyan-400">AurlinkVM</h4>
                            <p className="text-gray-300 text-sm">EVM-compatible execution environment with AI extensions</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-purple-400">NeuraLink</h4>
                            <p className="text-gray-300 text-sm">AI-enhanced DPoS consensus mechanism</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-green-400">NOL</h4>
                            <p className="text-gray-300 text-sm">Neural Optimization Layer for AI services</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-blue-400">RWA</h4>
                            <p className="text-gray-300 text-sm">Real-World Asset tokenization</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-yellow-400">ZKP</h4>
                            <p className="text-gray-300 text-sm">Zero-Knowledge Proof for privacy and compliance</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-400">DPoS</h4>
                            <p className="text-gray-300 text-sm">Delegated Proof of Stake consensus</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Appendix F: Contributors & Contacts */}
                {activeSection === 'appendix-f' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">16. Appendix F: Contributors & Contacts</h2>
                    
                    <div className="grid gap-6">
                      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 border border-purple-500/20 rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-4">Core Team</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-black/20 rounded-xl p-4">
                            <h4 className="font-semibold text-cyan-400">Protocol Lead</h4>
                            <p className="text-gray-300 text-sm">[Placeholder] — Architecture and consensus</p>
                          </div>
                          <div className="bg-black/20 rounded-xl p-4">
                            <h4 className="font-semibold text-purple-400">Head of Engineering</h4>
                            <p className="text-gray-300 text-sm">[Placeholder] — Implementation and tooling</p>
                          </div>
                          <div className="bg-black/20 rounded-xl p-4">
                            <h4 className="font-semibold text-green-400">Head of AI Research</h4>
                            <p className="text-gray-300 text-sm">[Placeholder] — AI model integration</p>
                          </div>
                          <div className="bg-black/20 rounded-xl p-4">
                            <h4 className="font-semibold text-blue-400">Head of Partnerships</h4>
                            <p className="text-gray-300 text-sm">[Placeholder] — Ecosystem and enterprise</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-cyan-400/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-4">Contact Information</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                              <Contact className="w-4 h-4 text-cyan-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">Email</p>
                              <p className="text-gray-300 text-sm">team@aurlink.io</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                              <Globe className="w-4 h-4 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">Twitter / X</p>
                              <p className="text-gray-300 text-sm">https://x.com/aurlink</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                              <MessageCircle className="w-4 h-4 text-purple-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">Telegram</p>
                              <p className="text-gray-300 text-sm">https://t.me/aurlinkchat</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}