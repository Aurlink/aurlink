// app/hackathons/page.tsx
'use client'

import { useState, useEffect } from 'react'

export default function HackathonsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg"></div>
            <span className="text-xl font-bold">AURLINK</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#tracks" className="hover:text-purple-400 transition-colors">Tracks</a>
            <a href="#prizes" className="hover:text-purple-400 transition-colors">Prizes</a>
            <a href="#schedule" className="hover:text-purple-400 transition-colors">Schedule</a>
            <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
            <button className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2 rounded-full font-semibold hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-105">
              Register Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md absolute top-full left-0 w-full py-4 px-6">
            <div className="flex flex-col space-y-4">
              <a href="#about" className="py-2 border-b border-gray-700" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#tracks" className="py-2 border-b border-gray-700" onClick={() => setIsMenuOpen(false)}>Tracks</a>
              <a href="#prizes" className="py-2 border-b border-gray-700" onClick={() => setIsMenuOpen(false)}>Prizes</a>
              <a href="#schedule" className="py-2 border-b border-gray-700" onClick={() => setIsMenuOpen(false)}>Schedule</a>
              <a href="#faq" className="py-2 border-b border-gray-700" onClick={() => setIsMenuOpen(false)}>FAQ</a>
              <button className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 rounded-full font-semibold mt-4">
                Register Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              48-Hour Innovation Marathon
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Build Your
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Future </span>
              at AURLINK
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join developers, designers, and innovators worldwide to create groundbreaking solutions and compete for $50,000+ in prizes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-105 shadow-2xl">
                Register Now - It's Free!
              </button>
              <button className="border border-gray-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all">
                View Schedule
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">48</div>
                <div className="text-gray-400">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">$50K+</div>
                <div className="text-gray-400">In Prizes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">1000+</div>
                <div className="text-gray-400">Participants</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What is AURLINK Hackathon?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              AURLINK brings together the brightest minds to solve real-world challenges through technology, innovation, and collaboration.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Create Something Extraordinary</h3>
              <p className="text-gray-300 mb-6 text-lg">
                Over 48 intensive hours, you'll work in teams to design, build, and present innovative solutions to pressing challenges across multiple domains.
              </p>
              <div className="space-y-4">
                {['Blockchain & Web3', 'AI & Machine Learning', 'FinTech Innovation', 'Sustainable Tech'].map((track, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300">{track}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-8 rounded-2xl border border-gray-700">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                  <div className="text-gray-400">Mentor Support</div>
                </div>
                <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
                  <div className="text-gray-400">Industry Experts</div>
                </div>
                <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                  <div className="text-3xl font-bold text-green-400 mb-2">100+</div>
                  <div className="text-gray-400">Projects Expected</div>
                </div>
                <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">10+</div>
                  <div className="text-gray-400">Sponsor Companies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Amazing Prizes</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Compete for over $50,000 in cash prizes, mentorship opportunities, and exclusive rewards.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { place: '1st', prize: '$25,000', color: 'from-yellow-500 to-yellow-600', desc: 'Grand Prize' },
              { place: '2nd', prize: '$15,000', color: 'from-gray-400 to-gray-500', desc: 'Runner Up' },
              { place: '3rd', prize: '$10,000', color: 'from-orange-500 to-orange-600', desc: 'Second Runner Up' }
            ].map((prize, index) => (
              <div key={index} className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 text-center transform hover:scale-105 transition-all duration-300">
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${prize.color} flex items-center justify-center text-2xl font-bold mb-4`}>
                  {prize.place}
                </div>
                <h3 className="text-2xl font-bold mb-2">{prize.prize}</h3>
                <p className="text-gray-400 mb-4">{prize.desc}</p>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>• Cash Prize</li>
                  <li>• Mentorship Program</li>
                  <li>• Sponsor Swag</li>
                  <li>• Featured on AURLINK</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build the Future?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't miss your chance to join the most innovative hackathon of the year. Register now and start your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
              Register Now
            </button>
            <button className="border border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
              Join Discord
            </button>
          </div>
        </div>
      </section>

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
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#schedule" className="block text-gray-400 hover:text-white transition-colors">Schedule</a>
                <a href="#prizes" className="block text-gray-400 hover:text-white transition-colors">Prizes</a>
                <a href="#faq" className="block text-gray-400 hover:text-white transition-colors">FAQ</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Code of Conduct</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Judging Criteria</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Mentor Guide</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Discord</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AURLINK Hackathon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}