import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Use Cases | Aurlink Applications',
  description: 'Discover the practical applications and use cases of Aurlink\'s AI-native blockchain technology across various industries.',
}

export default function UseCasesPage() {
  const useCases = [
    {
      title: 'Decentralized AI Marketplaces',
      description: 'Create open markets for AI models and data where creators are fairly compensated.',
      icon: '🤖',
    },
    {
      title: 'Autonomous Organizations',
      description: 'DAOs with built-in AI for decision making and resource allocation.',
      icon: '🏛️',
    },
    {
      title: 'Intelligent DeFi',
      description: 'AI-powered decentralized finance protocols with adaptive risk management.',
      icon: '💸',
    },
    {
      title: 'Supply Chain Optimization',
      description: 'Real-time AI analysis of supply chain data for efficiency and transparency.',
      icon: '📦',
    },
    {
      title: 'Healthcare AI',
      description: 'Privacy-preserving medical AI models trained on decentralized data.',
      icon: '🏥',
    },
    {
      title: 'Gaming & Metaverse',
      description: 'AI-driven NPCs and dynamic game worlds powered by blockchain.',
      icon: '🎮',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Use <span className="text-[#00F5FF]">Cases</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the transformative applications of AI-native blockchain technology 
            across industries and use cases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#00F5FF]/30 transition-all duration-300 group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {useCase.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{useCase.title}</h3>
              <p className="text-gray-300">{useCase.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#00F5FF]/10 to-cyan-400/10 rounded-2xl p-8 border border-[#00F5FF]/20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Have a Use Case?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We're always interested in exploring new applications for our technology. 
              If you have an idea or project that could benefit from AI-native blockchain, 
              let's talk.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-[#00F5FF] text-[#0A0F2C] font-semibold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Discuss Your Idea
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}