import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technology | Aurlink Cognitive Blockchain',
  description: 'Discover the groundbreaking technology behind Aurlink - the AI-native Layer-1 blockchain with self-optimizing infrastructure.',
}

export default function TechnologyPage() {
  const features = [
    {
      title: 'AI-Native Architecture',
      description: 'Built from the ground up to support AI workloads with specialized consensus mechanisms.',
    },
    {
      title: 'Self-Optimizing Network',
      description: 'Adaptive infrastructure that learns and improves based on network demands.',
    },
    {
      title: 'Cognitive Smart Contracts',
      description: 'Smart contracts with built-in AI capabilities for intelligent automation.',
    },
    {
      title: 'Scalable Infrastructure',
      description: 'Horizontal scaling solutions designed for AI model training and inference.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-[#00F5FF]">Technology</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The world's first AI-native Layer-1 blockchain, designed to revolutionize 
            how artificial intelligence and decentralized systems work together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#00F5FF]/30 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#00F5FF]/10 to-cyan-400/10 rounded-2xl p-8 border border-[#00F5FF]/20">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { label: 'Transactions per Second', value: '10,000+' },
              { label: 'Block Time', value: '2 Seconds' },
              { label: 'Consensus', value: 'Proof of Intelligence' },
            ].map((spec, index) => (
              <div key={index}>
                <div className="text-2xl font-bold text-[#00F5FF] mb-2">{spec.value}</div>
                <div className="text-gray-300">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}