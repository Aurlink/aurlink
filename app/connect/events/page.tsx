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
  Award,
  Share2,
  Twitter,
  MessageCircle as DiscordIcon,
  Linkedin,
  ExternalLink,
  Globe,
  Zap,
  Target,
  HeartHandshake,
  BookOpen,
  Play,
  ArrowRight,
  CheckCircle,
  MapPin,
  Clock
} from 'lucide-react'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'community' | 'ecosystem' | 'get-started'>('community')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Events Data
  const events = [
    {
      id: 1,
      title: "AURLINK Global Summit 2024",
      date: "March 15-16, 2024",
      time: "9:00 AM - 6:00 PM PST",
      type: "In-Person",
      location: "San Francisco, CA",
      image: "/event-summit.jpg",
      attendees: "500+",
      status: "Upcoming",
      category: "Conference"
    },
    {
      id: 2,
      title: "Web3 Developers Workshop",
      date: "February 28, 2024",
      time: "2:00 PM - 5:00 PM UTC",
      type: "Virtual",
      location: "Online",
      image: "/event-workshop.jpg",
      attendees: "200+",
      status: "Upcoming",
      category: "Workshop"
    },
    {
      id: 3,
      title: "Community Town Hall",
      date: "February 15, 2024",
      time: "10:00 AM - 11:30 AM PST",
      type: "Virtual",
      location: "Zoom",
      image: "/event-townhall.jpg",
      attendees: "300+",
      status: "Upcoming",
      category: "Community"
    }
  ]

  // Ambassador Program Data
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

  // Social Channels Data
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

  // Partners Data
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

  // Jobs Data
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
    }
  ]

  // Case Studies Data
  const caseStudies = [
    {
      company: "FinTech Corp",
      industry: "Financial Services",
      challenge: "Slow cross-border payments and high fees",
      solution: "Implemented AURLINK for instant settlements",
      results: "90% faster transactions, 70% cost reduction",
      logo: "/case-fintech.jpg"
    },
    {
      company: "SupplyChain Inc",
      industry: "Logistics",
      challenge: "Lack of transparency in supply chain",
      solution: "AURLINK-powered tracking system",
      results: "Real-time visibility, reduced losses by 45%",
      logo: "/case-supplychain.jpg"
    },
    {
      company: "ArtGallery NFT",
      industry: "Digital Art",
      challenge: "Provenance and authenticity issues",
      solution: "AURLINK digital certificates",
      results: "100% verified authenticity, 3x sales growth",
      logo: "/case-artgallery.jpg"
    }
  ]

  // Beginner's Guide Data
  const beginnerSteps = [
    {
      step: 1,
      title: "Understand Basics",
      description: "Learn what AURLINK is and how it works",
      duration: "5 min",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Set Up Wallet",
      description: "Create your first digital wallet",
      duration: "10 min",
      icon: <Zap className="w-6 h-6" />
    },
    {
      step: 3,
      title: "First Transaction",
      description: "Make your first secure transaction",
      duration: "8 min",
      icon: <Share2 className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Explore Features",
      description: "Discover advanced AURLINK capabilities",
      duration: "15 min",
      icon: <Globe className="w-6 h-6" />
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
              Get Started
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
            Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect with innovators, explore our ecosystem, and start your journey with AURLINK.
          </p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800 rounded-full p-2 flex flex-wrap justify-center gap-2">
              {[
                { id: 'community', label: 'Community' },
                { id: 'ecosystem', label: 'Ecosystem' },
                { id: 'get-started', label: 'Get Started' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      {activeTab === 'community' && (
        <div className="container mx-auto max-w-6xl px-6 pb-20">
          {/* Events & Meetups Section */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  <h2 className="text-4xl font-bold">Events & Meetups</h2>
                </div>
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
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.status === 'Upcoming' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-600 text-gray-400'
                    }`}>
                      {event.status}
                    </span>
                    <span className="text-gray-400 text-sm">{event.attendees}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">{event.type}</span>
                    </div>
                  </div>

                  <button className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-semibold transition-all group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-500">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </section>

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

              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-8 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-bold mb-6 text-center">Ambassador Impact</h3>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="bg-gray-800/50 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-purple-400 mb-2">150+</div>
                    <div className="text-gray-400 text-sm">Active Ambassadors</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
                    <div className="text-gray-400 text-sm">Countries</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
                    <div className="text-gray-400 text-sm">Events Hosted</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">10K+</div>
                    <div className="text-gray-400 text-sm">Community Members</div>
                  </div>
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
      )}

      {activeTab === 'ecosystem' && (
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
          </section>

          {/* Job Opportunities Section */}
          <section className="mb-20">
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
          </section>

          {/* Case Studies Section */}
          <section>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-purple-500/20 px-4 py-2 rounded-full mb-4">
                <Award className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-semibold">Success Stories</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">Case Studies</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                See how businesses use AURLINK successfully to transform their operations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl flex items-center justify-center mb-4">
                    <Building className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {study.company}
                  </h3>
                  <span className="text-purple-400 text-sm font-semibold mb-4 block">{study.industry}</span>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500">Challenge: </span>
                      <span className="text-gray-300">{study.challenge}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Solution: </span>
                      <span className="text-gray-300">{study.solution}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Results: </span>
                      <span className="text-green-400 font-semibold">{study.results}</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-semibold transition-all group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-500">
                    Read Full Study
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'get-started' && (
        <div className="container mx-auto max-w-4xl px-6 pb-20">
          {/* Beginner's Guide Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full mb-4">
                <BookOpen className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Beginner's Guide</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">Learn AURLINK Basics in Minutes</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Start your journey with our step-by-step guide designed for beginners.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {beginnerSteps.map((step) => (
                <div key={step.step} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition-all group">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-cyan-500 rounded-xl flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-green-400 text-sm font-semibold">Step {step.step}</div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{step.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{step.duration} read</span>
                    <button className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors">
                      <span>Start</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Start CTA */}
            <div className="mt-12 bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-2xl p-8 border border-green-500/20 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Dive In?</h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Join thousands of developers already building with AURLINK
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-green-600 to-cyan-500 px-8 py-4 rounded-full font-semibold hover:from-green-700 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Tutorial</span>
                </button>
                <button className="border border-gray-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all">
                  Download Docs
                </button>
              </div>
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
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Events & Meetups</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Ambassador Program</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Social Channels</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ecosystem</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Partner Directory</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Job Opportunities</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Case Studies</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get Started</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Beginner's Guide</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Support</a>
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