import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation | Aurlink Developer Docs',
  description: 'Complete technical documentation for Aurlink - guides, API references, and tutorials for developers.',
}

export default function DocsPage() {
  const docSections = [
    {
      title: 'Getting Started',
      items: [
        'Introduction to Aurlink',
        'Quick Start Guide',
        'Setting Up Your Environment',
        'Your First AI Smart Contract',
      ],
    },
    {
      title: 'Core Concepts',
      items: [
        'AI-Native Architecture',
        'Cognitive Smart Contracts',
        'Proof of Intelligence Consensus',
        'Tokenomics & Economics',
      ],
    },
    {
      title: 'API Reference',
      items: [
        'REST API Guide',
        'WebSocket API',
        'Authentication',
        'Rate Limits',
      ],
    },
    {
      title: 'Tutorials',
      items: [
        'Building a Simple DApp',
        'AI Model Integration',
        'Cross-Chain Interoperability',
        'Advanced Smart Contracts',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Documentation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive guides and references to help you build 
            on the Aurlink platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {docSections.map((section, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-[#00F5FF] transition-colors block py-1"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#00F5FF]/10 to-cyan-400/10 rounded-2xl p-8 border border-[#00F5FF]/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need Help?</h2>
          <p className="text-gray-300 mb-6">
            Our developer community is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://discord.gg/aurlink" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#00F5FF] text-[#0A0F2C] font-semibold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Join Discord
            </a>
            <a 
              href="https://github.com/aurlink/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-[#00F5FF] text-[#00F5FF] font-semibold py-3 px-6 rounded-lg hover:bg-[#00F5FF]/10 transition-colors"
            >
              Contribute to Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}