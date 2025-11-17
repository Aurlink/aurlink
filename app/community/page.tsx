// app/community/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Star, 
  MessageCircle, 
  Building, 
  Briefcase,
  Award,
  Share2,
  Twitter,
  MessageCircle as DiscordIcon,
  Linkedin,
  ExternalLink,
  Globe,
  Zap,
  Target,
  HeartHandshake
} from 'lucide-react'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'community' | 'ecosystem'>('community')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const ambassadorBenefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Exclusive Network",
      description: "Connect with core team and industry leaders"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Recognition",
      description: "Featured on our website and social media"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Early Access",
      description: "Get first look at new features and announcements"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Resources",
      description: "Access to exclusive tools and swag"
    }
  ]

  const ambassadorSteps = [
    {
      step: "01",
      title: "Apply",
      description: "Submit your application with your community experience"
    },
    {
      step: "02",
      title: "Interview",
      description: "Chat with our community team about your vision"
    },
    {
      step: "03",
      title: "Onboard",
      description: "Get trained and join the ambassador network"
    },
    {
      step: "04",
      title: "Impact",
      description: "Start building and representing AURLINK"
    }
  ]

  const socialChannels = [
    {
      platform: "Discord",
      icon: <DiscordIcon className="w-6 h-6" />,
      members: "15,000+",
      description: "Real-time community discussions and support",
      link: "#",
      color: "from-purple-500 to-blue-500",
      activity: "Very Active"
    },
    {
      platform: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      members: "45,000+",
      description: "Latest updates and announcements",
      link: "#",
      color: "from-blue-400 to-cyan-500",
      activity: "Active"
    },
    {
      platform: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      members: "12,000+",
      description: "Professional network and opportunities",
      link: "#",
      color: "from-blue-600 to-blue-700",
      activity: "Growing"
    }
  ]

  const partners = [
    {
      name: "Web3 Foundation",
      category: "Infrastructure",
      logo: "/partner-web3.jpg",
      description: "Building the decentralized web of the future",
      projects: 12,
      joined: "2022"
    },
    {
      name: "DeFi Alliance",
      category: "Finance",
      logo: "/partner-defi.jpg",
      description: "Pioneering decentralized finance protocols",
      projects: 8,
      joined: "2023"
    },
    {
      name: "NFT Studios",
      category: "Digital Assets",
      logo: "/partner-nft.jpg",
      description: "Leading digital art and collectibles platform",
      projects: 15,
      joined: "2022"
    },
    {
      name: "Chain Analytics",
      category: "Data",
      logo: "/partner-analytics.jpg",
      description: "Advanced blockchain data and insights",
      projects: 6,
      joined: "2023"
    }
  ]

  const jobs = [
    {
      title: "Senior Blockchain Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
      experience: "5+ years",
      salary: "$120k - $180k",
      urgent: true
    },
    {
      title: "Community Manager",
      department: "Marketing",
      type: "Full-time",
      location: "Hybrid",
      experience: "3+ years",
      salary: "$80k - $110k",
      urgent: false
    },
    {
      title: "Product Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
      experience: "4+ years",
      salary: "$90k - $130k",
      urgent: true
    },
    {
      title: "DevRel Engineer",
      department: "Developer Relations",
      type: "Contract",
      location: "Remote",
      experience: "3+ years",
      salary: "$100k - $140k",
      urgent: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg"></div>
            <span className="text-xl font-bold">AURLINK</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
            <a href="/build/hackathons" className="hover:text-purple-400 transition-colors">Hackathons</a>
            <a href="/community" className="text-purple-400 font-semibold">Community</a>
            <button className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2 rounded-full font-semibold hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-105">
              Join Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            AURLINK
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Community </span>
            & Ecosystem
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect with innovators, become an ambassador, and explore opportunities in the AURLINK ecosystem.
          </p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800 rounded-full p-2 flex">
              <button
                onClick={() => setActiveTab('community')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === 'community'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Community
              </button>
              <button
                onClick={() => setActiveTab('ecosystem')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === 'ecosystem'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Ecosystem
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      {activeTab === 'community' ? (
        <div className="container mx-auto max-w-6xl px-6 pb-20">
          {/* Ambassador Program Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-purple-500/20 px-4 py-2 rounded-full mb-4">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-semibold">Ambassador Program</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">Become an AURLINK Advocate</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Represent AURLINK in your community and help shape the future of decentralized technology.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Benefits */}
              <div>
                <h3 className="text-3xl font-bold mb-8">Why Join as an Ambassador?</h3>
                <div className="space-y-6">
                  {ambassadorBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-800/50 transition-all">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
                        <p className="text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button className="bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-105">
                    Apply to Program
                  </button>
                  <button className="border border-gray-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Process */}
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-8 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>
                <div className="space-y-6">
                  {ambassadorSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-800/50">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-white">{step.step}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
                        <p className="text-gray-400 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Community Channels Section */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
              <p className="text-gray-400 text-lg">Connect with like-minded innovators across our platforms</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {socialChannels.map((channel, index) => (
                <div key={index} className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all group">
                  <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${channel.color} flex items-center justify-center mb-4`}>
                    {channel.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center">{channel.platform}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-purple-400 font-semibold">{channel.members}</span>
                    <span className="text-green-400 text-sm font-semibold bg-green-400/20 px-2 py-1 rounded-full">
                      {channel.activity}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-6 text-center">{channel.description}</p>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-500">
                    <span>Join Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="container mx-auto max-w-6xl px-6 pb-20">
          {/* Partner Directory Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 px-4 py-2 rounded-full mb-4">
                <HeartHandshake className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-semibold">Partner Directory</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">Explore Our Ecosystem</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Discover projects and partners building the future with AURLINK technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {partners.map((partner, index) => (
                <div key={index} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                        <Building className="w-8 h-8 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                          {partner.name}
                        </h3>
                        <span className="text-blue-400 text-sm font-semibold">{partner.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-400">{partner.projects}</div>
                      <div className="text-gray-400 text-sm">Projects</div>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{partner.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Since {partner.joined}</span>
                    <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition-all group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 text-sm">
                      Explore Partnership
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="border border-gray-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all flex items-center space-x-2 mx-auto">
                <Globe className="w-5 h-5" />
                <span>View All Partners</span>
              </button>
            </div>
          </section>

          {/* Job Opportunities Section */}
          <section>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full mb-4">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Career Opportunities</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Find roles to contribute to AURLINK's growth and shape the future of technology.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
              {jobs.map((job, index) => (
                <div key={index} className={`p-6 hover:bg-gray-700/50 transition-all ${index !== jobs.length - 1 ? 'border-b border-gray-700' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        {job.urgent && (
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-semibold">
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center space-x-2">
                          <Building className="w-4 h-4" />
                          <span>{job.department}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.type}</span>
                        </span>
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400 mb-2">{job.salary}</div>
                      <button className="bg-gradient-to-r from-green-600 to-cyan-500 px-6 py-2 rounded-full font-semibold text-sm hover:from-green-700 hover:to-cyan-600 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto">
                <Briefcase className="w-5 h-5" />
                <span>View All Opportunities</span>
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg"></div>
                <span className="text-xl font-bold">AURLINK</span>
              </div>
              <p className="text-gray-400">
                Building the future through innovation and collaboration.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Ambassador Program</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Discord</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Events</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ecosystem</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Partners</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Developers</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Documentation</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Careers</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Open Positions</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Culture</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Benefits</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AURLINK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}