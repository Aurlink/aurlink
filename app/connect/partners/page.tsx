import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partners | Aurlink Ecosystem',
  description: 'Explore our strategic partnerships and join the growing Aurlink ecosystem of AI and blockchain innovators.',
}

export default function PartnersPage() {
  const partners = [
    {
      name: 'AI Research Lab',
      category: 'Research',
      description: 'Leading AI research institution collaborating on neural network optimization.',
    },
    {
      name: 'Blockchain Foundation',
      category: 'Infrastructure',
      description: 'Strategic partner for blockchain infrastructure and node operations.',
    },
    {
      name: 'Tech University',
      category: 'Education',
      description: 'Academic partnership for research and talent development.',
    },
    {
      name: 'DeFi Protocol',
      category: 'Finance',
      description: 'Collaboration on AI-powered decentralized finance applications.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-[#00F5FF]">Partners</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Building the future of AI and blockchain through strategic partnerships 
            and collaborative innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Partner With Us</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              We're always looking for innovative organizations to join our ecosystem. 
              Whether you're a research institution, technology company, or blockchain project, 
              let's explore how we can work together.
            </p>
            <div className="space-y-3">
              {[
                'Technology Integration',
                'Research Collaboration',
                'Ecosystem Development',
                'Joint Ventures',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#00F5FF] rounded-full"></div>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#00F5FF]/10 to-cyan-400/10 rounded-2xl p-8 border border-[#00F5FF]/20">
            <h3 className="text-2xl font-bold text-white mb-4">Become a Partner</h3>
            <p className="text-gray-300 mb-6">
              Interested in partnering with Aurlink? Reach out to discuss potential collaborations.
            </p>
            <a 
              href="mailto:partners@aurlink.io" 
              className="inline-block bg-[#00F5FF] text-[#0A0F2C] font-semibold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Contact Partnerships
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Strategic Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#00F5FF]/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00F5FF] to-cyan-400 flex items-center justify-center text-white font-bold">
                    {partner.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{partner.name}</h3>
                    <span className="text-[#00F5FF] text-sm">{partner.category}</span>
                  </div>
                </div>
                <p className="text-gray-300">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}