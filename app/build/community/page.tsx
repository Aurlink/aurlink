// app/community/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Calendar, 
  Star, 
  MessageCircle, 
  Building, 
  Briefcase,
  MapPin,
  Globe,
  Video,
  Award,
  Share2,
  Twitter,
  MessageCircle as DiscordIcon,
  Linkedin,
  ExternalLink
} from 'lucide-react'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'connect' | 'ecosystem'>('connect')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const events = [
    {
      id: 1,
      title: "AURLINK Global Summit 2024",
      date: "March 15-16, 2024",
      type: "In-Person",
      location: "San Francisco, CA",
      image: "/event-summit.jpg",
      attendees: "500+",
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Web3 Developers Workshop",
      date: "February 28, 2024",
      type: "Virtual",
      location: "Online",
      image: "/event-workshop.jpg",
      attendees: "200+",
      status: "Upcoming"
    },
    {
      id: 3,
      title: "AURLINK Community Meetup",
      date: "January 20, 2024",
      type: "In-Person",
      location: "Berlin, Germany",
      image: "/event-meetup.jpg",
      attendees: "150+",
      status: "Past"
    }
  ]

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
      icon: <Briefcase className="w-6 h-6" />,
      title: "Career Growth",
      description: "Professional development opportunities"
    }
  ]

  const socialChannels = [
    {
      platform: "Discord",
      icon: <DiscordIcon className="w-6 h-6" />,
      members: "15,000+",
      description: "Real-time community discussions and support",
      link: "#",
      color: "from-purple-500 to-blue-500"
    },
    {
      platform: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      members: "45,000+",
      description: "Latest updates and announcements",
      link: "#",
      color: "from-blue-400 to-cyan-500"
    },
    {
      platform: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      members: "12,000+",
      description: "Professional network and opportunities",
      link: "#",
      color: "from-blue-600 to-blue-700"
    }
  ]

  const partners = [
    {
      name: "Web3 Foundation",
      category: "Infrastructure",
      logo: "/partner-web3.jpg",
      description: "Building the decentralized web",
      projects: 12
    },
    {
      name: "DeFi Alliance",
      category: "Finance",
      logo: "/partner-defi.jpg",
      description: "Decentralized finance protocols",
      projects: 8
    },
    {
      name: "NFT Studios",
      category: "Digital Assets",
      logo: "/partner-nft.jpg",
      description: "Digital art and collectibles platform",
      projects: 15
    },
    {
      name: "Chain Analytics",
      category: "Data",
      logo: "/partner-analytics.jpg",
      description: "Blockchain data and insights",
      projects: 6
    }
  ]

  const jobs = [
    {
      title: "Senior Blockchain Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
      experience: "5+ years",
      salary: "$120k - $180k"
    },
    {
      title: "Community Manager",
      department: "Marketing",
      type: "Full-time",
      location: "Hybrid",
      experience: "3+ years",
      salary: "$80k - $110k"
    },
    {
      title: "Product Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
      experience: "4+ years",
      salary: "$90k - $130k"
    },
    {
      title: "DevRel Engineer",
      department: "Developer Relations",
      type: "Contract",
      location: "Remote",
      experience: "3+ years",
      salary: "$100k - $140k"
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
            <a href="/build/forum" className="text-purple-400 font-semibold">Community</a>
            <button className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2 rounded-full font-semibold hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-105">
              Join Community
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Join the
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> AURLINK </span>
            Community
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect, collaborate, and grow with innovators worldwide. Be part of something bigger.
          </p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800 rounded-full p-2 flex">
              <button
                onClick={() => setActiveTab('connect')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === 'connect'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Connect & Community
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
      {activeTab === 'connect' ? (
        <div className="container mx-auto max-w-6xl px-6 pb-20">
          {/* Events & Meetups Section */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">Events & Meetups</h2>
                <p className="text-gray-400 text-lg">Join global AURLINK events, virtual or in-person</p>
              </div>
              <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>View All Events</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all group">
                  <div className="h-40 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-xl mb-4 flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-purple-400" />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.status === 'Upcoming' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-600 text-gray-400'
                    }`}>
                      {event.status}
                    </span>
                    <span className="text-gray-400 text-sm">{event.attendees} attendees</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span>{event.type}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-semibold transition-all">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Ambassador Program Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Ambassador Program</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Become an AURLINK advocate in your community and help shape the future of decentralized technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Why Become an Ambassador?</h3>
                <div className="space-y-6">
                  {ambassadorBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
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
                <button className="mt-8 bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-105">
                  Apply Now
                </button>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-8 rounded-2xl border border-gray-700">
                <div className="text-center">
                  <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold mb-4">Program Requirements</h4>
                  <ul className="space-y-3 text-gray-300 text-left">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Active community member for 3+ months</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Strong understanding of AURLINK ecosystem</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Experience in community building</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Passion for decentralized technology</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Social Channels Section */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Social Channels</h2>
              <p className="text-gray-400 text-lg">Stay connected on Discord, X, and more</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {socialChannels.map((channel, index) => (
                <div key={index} className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 text-center hover:border-purple-500 transition-all group">
                  <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${channel.color} flex items-center justify-center mb-4`}>
                    {channel.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{channel.platform}</h3>
                  <div className="text-purple-400 font-semibold mb-4">{channel.members} members</div>
                  <p className="text-gray-400 mb-6">{channel.description}</p>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-500">
                    <span>Join Community</span>
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
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">Partner Directory</h2>
                <p className="text-gray-400 text-lg">Explore projects and partners in the AURLINK ecosystem</p>
              </div>
              <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2">
                <Building className="w-5 h-5" />
                <span>Become a Partner</span>
              </button>
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
                  <button className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-semibold transition-all group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500">
                    Explore Partnership
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Job Opportunities Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">Job Opportunities</h2>
                <p className="text-gray-400 text-lg">Find roles to contribute to AURLINK's growth</p>
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>View All Jobs</span>
              </button>
            </div>

            <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
              {jobs.map((job, index) => (
                <div key={index} className={`p-6 hover:bg-gray-700/50 transition-all ${index !== jobs.length - 1 ? 'border-b border-gray-700' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center space-x-2">
                          <Building className="w-4 h-4" />
                          <span>{job.department}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </span>
                        <span>{job.type}</span>
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400 mb-1">{job.salary}</div>
                      <button className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2 rounded-full font-semibold text-sm hover:from-purple-700 hover:to-blue-600 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Events</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Ambassador Program</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Discord</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Twitter</a>
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
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Internships</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Culture</a>
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