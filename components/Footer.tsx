'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from "next/image";
import { 
  Twitter, 
  MessageCircle, 
  Youtube, 
  Github, 
  Mail,
  ArrowUp,
  Brain,
  Globe,
  Code2,
  Users,
  Facebook
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navigation = {
    learn: [
      { name: 'Technology', href: '/technology' },
      { name: 'Whitepaper', href: '/whitepaper' },
      { name: 'Roadmap', href: '/roadmap' },
      { name: 'Use Cases', href: '/use-cases' },
    ],
    build: [
      { name: 'Developer Portal', href: '/developers' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Grants Program', href: '/grants' },
      { name: 'SDK & APIs', href: '/sdk' },
    ],
    connect: [
      { name: 'Community', href: '/community' },
      { name: 'Twitter', href: 'https://x.com/Aurlinkio' },
      { name: 'Facebook', href: 'https://facebook.com/Aurlink' },
      { name: 'Discord', href: 'https://discord.gg/aurlink' },
      { name: 'Telegram', href: 'https://t.me/aurlinkupdates' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Partners', href: '/partners' },
      { name: 'Contact', href: '/contact' },
    ]
  }

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: 'https://x.com/Aurlink', label: 'Twitter' },
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/Aurlink', label: 'Facebook' },
    { icon: <MessageCircle className="w-5 h-5" />, href: 'https://discord.gg/aurlink', label: 'Discord' },
    { icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com/@Aurlinkio', label: 'YouTube' },
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/aurlink', label: 'GitHub' },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:info@aurlink.io', label: 'Email' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#071226] border-t border-white/10">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00F5FF]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Brand Section */}
            <div className="space-y-6">
               <Link href="/home" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Aurlink Logo" width={70} height={70} />

                    <div className="flex flex-col leading-none">
                      <span className="text-white font-bold text-2xl m-0 p-0">AURLINK</span>
                       <span className="text-[#00F5FF] text-sm font-semibold m-0 p-0">
                         The Cognitive Blockchain
                        </span>
                       </div>
                    </Link>

                <p className="text-gray-300 text-lg max-w-md leading-relaxed">
                Building the world's first AI-native Layer-1 blockchain. 
                Experience unmatched scalability, self-optimizing infrastructure, 
                and a developer-ready platform.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00F5FF] hover:border-[#00F5FF]/30 hover:bg-[#00F5FF]/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Learn Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-4 h-4 text-[#00F5FF]" />
                  <h3 className="text-white font-semibold">Learn</h3>
                </div>
                <ul className="space-y-3">
                  {navigation.learn.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className="text-gray-400 hover:text-[#00F5FF] transition-colors duration-300 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Build Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="w-4 h-4 text-[#00F5FF]" />
                  <h3 className="text-white font-semibold">Build</h3>
                </div>
                <ul className="space-y-3">
                  {navigation.build.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className="text-gray-400 hover:text-[#00F5FF] transition-colors duration-300 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-[#00F5FF]" />
                  <h3 className="text-white font-semibold">Connect</h3>
                </div>
                <ul className="space-y-3">
                  {navigation.connect.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className="text-gray-400 hover:text-[#00F5FF] transition-colors duration-300 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-[#00F5FF]" />
                  <h3 className="text-white font-semibold">Company</h3>
                </div>
                <ul className="space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className="text-gray-400 hover:text-[#00F5FF] transition-colors duration-300 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            © {currentYear} Aurlink Foundation. All rights reserved.
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-[#00F5FF] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-[#00F5FF] transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-[#00F5FF] transition-colors">
              Cookie Policy
            </Link>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#00F5FF] hover:border-[#00F5FF]/30 hover:bg-[#00F5FF]/10 transition-all duration-300 flex items-center justify-center group"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00F5FF] rounded-full opacity-30"
            style={{
              left: `${10 + i * 30}%`,
              bottom: '20%',
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
            }}
          />
        ))}
      </div>
    </footer>
  )
}