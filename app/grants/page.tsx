import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grants Program | Aurlink Ecosystem Funding',
  description: 'Apply for grants to build on Aurlink. Funding and support for developers, researchers, and projects in the Aurlink ecosystem.',
}

export default function GrantsPage() {
  const grantCategories = [
    {
      title: 'Core Infrastructure',
      amount: 'Up to $100,000',
      description: 'Grants for protocol improvements, tooling, and core infrastructure development.',
    },
    {
      title: 'AI Research',
      amount: 'Up to $75,000',
      description: 'Funding for AI/ML research that advances the Aurlink ecosystem.',
    },
    {
      title: 'DApp Development',
      amount: 'Up to $50,000',
      description: 'Support for building innovative decentralized applications on Aurlink.',
    },
    {
      title: 'Community & Education',
      amount: 'Up to $25,000',
      description: 'Grants for content creation, tutorials, and community building.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Grants <span className="text-[#00F5FF]">Program</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Fueling innovation in the Aurlink ecosystem through funding, 
            resources, and support for builders and researchers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {grantCategories.map((category, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#00F5FF]/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                <span className="bg-[#00F5FF]/20 text-[#00F5FF] px-3 py-1 rounded-full text-sm font-medium">
                  {category.amount}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{category.description}</p>
              <button className="text-[#00F5FF] hover:text-cyan-400 transition-colors text-sm font-medium">
                Learn More →
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#00F5FF]/10 to-cyan-400/10 rounded-2xl p-8 border border-[#00F5FF]/20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Apply?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Submit your proposal and join the growing ecosystem of Aurlink builders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-[#00F5FF] text-[#0A0F2C] font-semibold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors"
              >
                Apply for Grant
              </a>
              <a 
                href="/docs/grants" 
                className="border border-[#00F5FF] text-[#00F5FF] font-semibold py-3 px-6 rounded-lg hover:bg-[#00F5FF]/10 transition-colors"
              >
                View Guidelines
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}