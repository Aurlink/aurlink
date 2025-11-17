import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roadmap | Aurlink Development Timeline',
  description: 'Explore Aurlink\'s development roadmap and upcoming features for our AI-native blockchain platform.',
}

export default function RoadmapPage() {
  const phases = [
    {
      title: 'Phase 1: Foundation',
      status: 'completed',
      items: [
        'Core protocol development',
        'Testnet launch',
        'Whitepaper release',
        'Initial team formation',
      ],
    },
    {
      title: 'Phase 2: Expansion',
      status: 'current',
      items: [
        'Mainnet launch',
        'Developer SDK release',
        'Ecosystem grants program',
        'Partner integrations',
      ],
    },
    {
      title: 'Phase 3: Growth',
      status: 'upcoming',
      items: [
        'Advanced AI features',
        'Cross-chain interoperability',
        'Enterprise solutions',
        'Global expansion',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Development <span className="text-[#00F5FF]">Roadmap</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our strategic plan for building and scaling the world's first 
            AI-native blockchain platform.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00F5FF] to-cyan-400 transform -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {phases.map((phase, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-[#0A0F2C] z-10 transform -translate-x-1/2 ${
                  phase.status === 'completed' ? 'bg-green-400' :
                  phase.status === 'current' ? 'bg-[#00F5FF] animate-pulse' : 'bg-gray-400'
                }`}></div>
                
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#00F5FF]/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-semibold text-white">{phase.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        phase.status === 'completed' ? 'bg-green-400/20 text-green-400' :
                        phase.status === 'current' ? 'bg-[#00F5FF]/20 text-[#00F5FF]' : 'bg-gray-400/20 text-gray-400'
                      }`}>
                        {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2 text-gray-300">
                          <div className="w-1.5 h-1.5 bg-[#00F5FF] rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-[#00F5FF]/10 to-cyan-400/10 rounded-2xl p-8 border border-[#00F5FF]/20 inline-block">
            <h3 className="text-2xl font-bold text-white mb-4">Want to contribute?</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Join our community and help shape the future of Aurlink.
            </p>
            <a 
              href="https://github.com/aurlink" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#00F5FF] text-[#0A0F2C] font-semibold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Join GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}