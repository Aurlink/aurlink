import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Aurlink | Cognitive Blockchain',
  description: 'Learn about Aurlink - the world\'s first AI-native Layer-1 blockchain and our mission to revolutionize decentralized intelligence.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-[#00F5FF]">Aurlink</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pioneering the future of decentralized artificial intelligence through 
            cognitive blockchain technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Aurlink is building the world's first AI-native Layer-1 blockchain, 
              designed from the ground up to support and enhance artificial intelligence 
              applications at scale.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We believe in a future where AI and blockchain work in harmony to create 
              more intelligent, efficient, and transparent decentralized systems.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#00F5FF]/10 to-cyan-400/10 rounded-2xl p-8 border border-[#00F5FF]/20">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">2024</div>
              <div className="text-[#00F5FF]">Founded</div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Innovation', desc: 'Pushing the boundaries of what\'s possible in AI and blockchain convergence.' },
              { title: 'Transparency', desc: 'Building open, verifiable, and trustworthy AI systems.' },
              { title: 'Accessibility', desc: 'Making advanced AI capabilities available to everyone.' },
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-white/5 rounded-xl">
                <h4 className="text-xl font-semibold text-[#00F5FF] mb-3">{value.title}</h4>
                <p className="text-gray-300">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}