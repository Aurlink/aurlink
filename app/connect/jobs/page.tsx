import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers | Join Aurlink',
  description: 'Join the Aurlink team and help build the future of AI-native blockchain technology. Explore open positions and career opportunities.',
}

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior Blockchain Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'AI Research Scientist',
      department: 'Research',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'DevRel Engineer',
      department: 'Community',
      location: 'Remote',
      type: 'Full-time',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Join Our <span className="text-[#00F5FF]">Team</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Help us build the future of decentralized artificial intelligence. 
            Work on cutting-edge technology with a passionate team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Why Aurlink?</h2>
            <div className="space-y-4">
              {[
                'Competitive salary and equity packages',
                'Fully remote work environment',
                'Cutting-edge technology stack',
                'Collaborative and inclusive culture',
                'Continuous learning and development',
                'Impactful work in emerging tech',
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#00F5FF] rounded-full"></div>
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#00F5FF]/10 to-cyan-400/10 rounded-2xl p-8 border border-[#00F5FF]/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Apply?</h3>
            <p className="text-gray-300 mb-6">
              Send your resume and cover letter to{' '}
              <a href="mailto:careers@aurlink.io" className="text-[#00F5FF] hover:underline">
                careers@aurlink.io
              </a>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {openPositions.map((position, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#00F5FF]/30 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-2">{position.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#00F5FF]/10 text-[#00F5FF] rounded-full text-sm">
                    {position.department}
                  </span>
                  <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm">
                    {position.location}
                  </span>
                  <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm">
                    {position.type}
                  </span>
                </div>
                <button className="w-full bg-[#00F5FF] text-[#0A0F2C] font-semibold py-2 px-4 rounded-lg hover:bg-cyan-400 transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}