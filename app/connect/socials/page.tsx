import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community | Aurlink Ecosystem',
  description: 'Join the Aurlink community of developers, researchers, and enthusiasts building the future of AI-native blockchain.',
}

export default function CommunityPage() {
  const communityPlatforms = [
    {
      name: 'Twitter/X',
      description: 'Latest updates, announcements, and news',
      members: '',
      link: 'https://x.com/Aurlinkio',
      icon: '🐦',
    },
    {
      name: 'YouTube',
      description: 'Tutorials, demos, and project updates',
      members: '',
      link: 'https://youtube.com/@Aurlinkio',
      icon: '📺',
    },
    {
      name: 'Telegram',
      description: 'Community discussions and support',
      members: '',
      link: 'https://t.me/aurlinkupdates',
      icon: '💬',
    },
    {
      name: 'Facebook',
      description: 'Community events and announcements',
      members: '',
      link: 'https://facebook.com/Aurlink',
      icon: '👥',
    },
    {
      name: 'GitHub',
      description: 'Open source code, issues, and contributions',
      members: '',
      link: 'https://github.com/aurlink',
      icon: '💻',
    },
    {
      name: 'Discord',
      description: 'Developer community and technical support',
      members: '',
      link: 'https://discord.gg/aurlink',
      icon: '🎮',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-[#00F5FF]">Community</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of developers, researchers, and enthusiasts 
            building the future of AI and blockchain together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {communityPlatforms.map((platform, index) => (
            <a
              key={index}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#00F5FF]/30 hover:bg-white/10 transition-all duration-300 group hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {platform.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#00F5FF] transition-colors">
                    {platform.name}
                  </h3>
                  <p className="text-[#00F5FF] text-sm">{platform.members} members</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{platform.description}</p>
            </a>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#00F5FF]/10 to-cyan-400/10 rounded-2xl p-8 border border-[#00F5FF]/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Community Events</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our regular community calls, hackathons, and workshops to learn, 
            build, and connect with other community members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://t.me/aurlinkupdates" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#00F5FF] text-[#0A0F2C] font-semibold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Join Telegram Community
            </a>
            <a 
              href="/contact" 
              className="border border-[#00F5FF] text-[#00F5FF] font-semibold py-3 px-6 rounded-lg hover:bg-[#00F5FF]/10 transition-colors"
            >
              Host an Event
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}