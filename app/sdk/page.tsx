import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SDK & APIs | Aurlink Development Tools',
  description: 'Download Aurlink SDKs and explore our APIs for seamless integration with our AI-native blockchain platform.',
}

export default function SdkPage() {
  const sdks = [
    {
      language: 'JavaScript/TypeScript',
      version: '1.2.0',
      description: 'Full-featured SDK for web and Node.js applications',
      install: 'npm install @aurlink/sdk',
    },
    {
      language: 'Python',
      version: '1.1.0',
      description: 'Python client for AI model integration and smart contracts',
      install: 'pip install aurlink',
    },
    {
      language: 'Go',
      version: '1.0.0',
      description: 'High-performance Go client for backend services',
      install: 'go get github.com/aurlink/go-sdk',
    },
    {
      language: 'Rust',
      version: '0.9.0',
      description: 'Safe and fast Rust implementation for system programming',
      install: 'cargo add aurlink-sdk',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            SDK & <span className="text-[#00F5FF]">APIs</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powerful development tools and client libraries to build 
            on the Aurlink platform using your preferred programming language.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-16">
          {sdks.map((sdk, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#00F5FF]/30 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{sdk.language}</h3>
                    <span className="bg-[#00F5FF]/20 text-[#00F5FF] px-2 py-1 rounded text-sm">
                      v{sdk.version}
                    </span>
                  </div>
                  <p className="text-gray-300">{sdk.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="bg-black/50 rounded-lg p-3 border border-white/10">
                    <code className="text-[#00F5FF] font-mono text-sm">{sdk.install}</code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#00F5FF]/10 to-cyan-400/10 rounded-2xl p-8 border border-[#00F5FF]/20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">API Reference</h2>
            <p className="text-gray-300 mb-6">
              Explore our complete REST API documentation with interactive examples.
            </p>
            <a 
              href="/docs/api" 
              className="inline-block bg-[#00F5FF] text-[#0A0F2C] font-semibold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors"
            >
              View API Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}