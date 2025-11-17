"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FocusTrap } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Globe2,
  FlaskConical,
  Code2,
  Coins,
  LifeBuoy,
  Users2,
  Network,
  Menu as MenuIcon,
  X,
  Rocket,
  ChevronDown,
} from "lucide-react";

type Item = { title: string; desc: string; href: string };
type Category = { tag: string; icon: React.ReactNode; items: Item[] };

const LEARN_CATS: Category[] = [
  {
    tag: "Why Aurlink",
    icon: <Brain className="w-5 h-5" />,
    items: [
      { title: "For Investors", desc: "Discover Aurlink's market potential and investment opportunities.", href: "/learn/investors" },
      { title: "For Enterprises", desc: "Secure, scalable blockchain solutions for your business.", href: "/learn/enterprises" },
      { title: "For End-Users", desc: "Explore how Aurlink makes blockchain simple and accessible.", href: "/learn/end-users" },
    ],
  },
  {
    tag: "Use Cases",
    icon: <Globe2 className="w-5 h-5" />,
    items: [
      { title: "Decentralized Finance (DeFi)", desc: "Smarter trading and lending with AI-driven insights.", href: "/learn/use-cases/defi" },
      { title: "Supply Chain Transparency", desc: "Track assets securely with real-time verification.", href: "/learn/use-cases/supply-chain" },
      { title: "Digital Identity", desc: "Own your data with secure, user-friendly identity solutions.", href: "/learn/use-cases/digital-identity" },
      { title: "RWA Tokenization", desc: "Digitize real-world assets with AI-optimized security and compliance.", href: "/learn/use-cases/rwa-tokenization" },
      { title: "AURLINK CONNECT", desc: "Bridge to other networks for seamless interoperability.", href: "/learn/use-cases/aurlink-connect" },
    ],
  },
  {
    tag: "Technology",
    icon: <FlaskConical className="w-5 h-5" />,
    items: [
      { title: "AI-Powered Blockchain", desc: "Learn how AI enhances speed and security.", href: "/learn/technology/ai-blockchain" },
      { title: "Scalable Infrastructure", desc: "Handle high demand with dynamic resource allocation.", href: "/learn/technology/scalability" },
      { title: "Smart Contracts", desc: "Automate agreements with adaptive, secure contracts.", href: "/learn/technology/smart-contracts" },
    ],
  },
];

const BUILD_CATS: Category[] = [
  {
    tag: "Developer Tools",
    icon: <Code2 className="w-5 h-5" />,
    items: [
      { title: "Documentation", desc: "Guides to build on Aurlink's blockchain.", href: "/build/docs/quick-start" },
      { title: "APIs & SDKs", desc: "Tools to create powerful dApps quickly.", href: "/build/docs/api/rest" },
      { title: "Tutorials", desc: "Step-by-step lessons for all skill levels.", href: "/build/docs/tutorials" },
      { title: "Aurlink IDE", desc: "Integrated development environment for building on Aurlink.", href: "/build/ide" },
      { title: "Smart Contract Template", desc: "Prebuilt templates for creating adaptive smart contracts.", href: "/build/smart-contract-template" },
    ],
  },
  {
    tag: "Funding & Grants",
    icon: <Coins className="w-5 h-5" />,
    items: [
      { title: "Developer Grants", desc: "Funding to bring your ideas to life.", href: "/build/grants" },
      { title: "Request for Grant", desc: "Apply for funding and support for your project.", href: "/build/request-grant" },
      { title: "Hackathons", desc: "Join events to build and win prizes.", href: "/build/hackathons" },
    ],
  },
  {
    tag: "Support",
    icon: <LifeBuoy className="w-5 h-5" />,
    items: [
      { title: "Dev Support", desc: "Get help from Aurlink's engineering team.", href: "/build/support" },
      { title: "Community Forum", desc: "Connect with other developers for solutions.", href: "/build/forum" },
    ],
  },
];

const CONNECT_CATS: Category[] = [
  {
    tag: "Community",
    icon: <Users2 className="w-5 h-5" />,
    items: [
      { title: "Events & Meetups", desc: "Join global Aurlink events, virtual or in-person.", href: "/connect/events" },
      { title: "Ambassador Program", desc: "Become an Aurlink advocate in your community.", href: "/connect/ambassadors" },
      { title: "Social Channels", desc: "Stay connected on Discord, X, and more.", href: "/connect/socials" },
    ],
  },
  {
    tag: "Ecosystem",
    icon: <Network className="w-5 h-5" />,
    items: [
      { title: "Partner Directory", desc: "Explore projects and partners in the Aurlink ecosystem.", href: "/connect/partners" },
      { title: "Job Opportunities", desc: "Find roles to contribute to Aurlink's growth.", href: "/connect/jobs" },
       { title: "Blog", desc: "Stay updated with insights from the Aurlink ecosystem — explore news & project updates.", href: "/connect/blog" },
    ],
  },
  {
    tag: "Get Started",
    icon: <Rocket className="w-5 h-5" />,
    items: [
      { title: "Beginner's Guide", desc: "Learn Aurlink basics in minutes.", href: "/build/docs/quick-start" },
      { title: "Whitepaper", desc: "Comprehensive technical and economic documentation.", href: "/connect/whitepaper" },
      { title: "Pitch Deck", desc: "Executive summary for investors and partners.", href: "/connect/pitch-deck" },
      { title: "FAQ", desc: "Answers to common questions about Aurlink.", href: "/connect/faq" },
    ],
  },
  {
    tag: "$AUR Token",
    icon: <Coins className="w-5 h-5" />,
    items: [
      { title: "Buy $AUR", desc: "Purchase $AUR directly from supported exchanges.", href: "/connect/ido" },
      { title: "Overview", desc: "Overview including tokenomics and use cases for $AUR.", href: "/connect/aur-token-overview" },
      { title: "Vesting", desc: "Securely track and manage your $AUR token allocations in real time,.", href: "/connect/vestdashboard" },
    ],
  },
];

export default function Navbar() {
  const [openPanel, setOpenPanel] = useState<"Learn" | "Build" | "Connect" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<"Learn" | "Build" | "Connect" | null>(null);

  const open = (panel: "Learn" | "Build" | "Connect") => {
    setOpenPanel((cur) => (cur === panel ? null : panel));
  };

  const toggleMobileDropdown = (panel: "Learn" | "Build" | "Connect") => {
    setMobileDropdown((cur) => (cur === panel ? null : panel));
  };

  const renderCategoriesFor = useCallback((panel: "Learn" | "Build" | "Connect") => {
    const cats = panel === "Learn" ? LEARN_CATS : panel === "Build" ? BUILD_CATS : CONNECT_CATS;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {cats.map((cat) => (
          <div key={cat.tag} className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#1E2A4D] border border-[#00F5FF]/20 flex items-center justify-center">
                <div className="text-[#00F5FF]">{cat.icon}</div>
              </div>
              <span className="text-white text-base font-semibold">{cat.tag}</span>
            </div>
            <ul className="space-y-1">
              {cat.items.map((it) => (
                <li key={it.title}>
                  <Link
                    href={it.href}
                    onClick={() => setOpenPanel(null)}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#1E2A4D] hover:bg-[#00F5FF]/20 border border-[#2D3B5F] hover:border-[#00F5FF]/40 transition-all duration-300 group"
                  >
                    <div className="flex-1 min-w-0">
                      <h5 className="text-white font-medium text-sm group-hover:text-[#00F5FF] transition-colors truncate">{it.title}</h5>
                      <p className="text-gray-300 text-xs mt-0.5 group-hover:text-gray-200 transition-colors line-clamp-2">{it.desc}</p>
                    </div>
                    <ChevronDown className="w-3 h-3 text-[#00F5FF] transform rotate-270 group-hover:scale-110 transition-transform flex-shrink-0 ml-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <header className="hidden md:block fixed inset-x-0 top-0 z-50 bg-[#0A0F2C] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Only AURLINK Text */}
          <Link href="/home" className="flex items-center">
            <span className="text-white font-bold text-2xl">AURLINK</span>
          </Link>

          <nav className="flex items-center gap-4">
            {(["Learn", "Build", "Connect"] as const).map((label) => (
              <button
                key={label}
                onClick={() => open(label)}
                className={`relative text-white text-lg font-semibold px-2 py-2 transition flex items-center gap-1 ${openPanel === label ? "text-[#00F5FF]" : "hover:text-[#00F5FF]"}`}
              >
                {label}
                <ChevronDown className={`w-4 h-4 transition-transform ${openPanel === label ? "rotate-180" : ""}`} />
                {openPanel === label && (
                  <motion.span layoutId="menu-underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-[#00F5FF] rounded-lg" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/build/docs/quick-start" className="rounded-full px-6 py-2.5 bg-gradient-to-r from-[#00F5FF] to-cyan-400 text-[#0A0F2C] font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">Get Started</Link>
          </div>
        </div>

        {/* FIXED: Desktop Dropdown Panels - WORKING VERSION */}
        <AnimatePresence>
          {openPanel && (
            <FocusTrap>
              <motion.div
                key={openPanel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 top-[5rem] z-40 bg-[#0A0F2C] border-b border-white/10"
              >
                <motion.div 
                  initial={{ y: -8 }} 
                  animate={{ y: 0 }} 
                  exit={{ y: -8 }} 
                  transition={{ duration: 0.25 }}
                  className="max-w-7xl mx-auto px-6 py-8"
                >
                  {renderCategoriesFor(openPanel)}
                </motion.div>
              </motion.div>
            </FocusTrap>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMobileOpen((s) => !s)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="rounded-lg p-3 bg-[#1E2A4D] border border-[#00F5FF]/20 text-white hover:bg-[#00F5FF]/10 transition-all duration-300"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-50 bg-[#0A0F2C] md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header with Only AURLINK Text */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0A0F2C]">
                <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
                  <span className="text-white font-bold text-xl">AURLINK</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-2 bg-[#1E2A4D] border border-[#00F5FF]/20 text-white hover:bg-[#00F5FF]/10 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#0A0F2C]">
                {(["Learn", "Build", "Connect"] as const).map((section) => (
                  <div key={section} className="space-y-2">
                    <button
                      onClick={() => toggleMobileDropdown(section)}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-[#1E2A4D] border border-[#2D3B5F] hover:border-[#00F5FF]/40 transition-all duration-300"
                    >
                      <span className="text-white font-semibold text-sm">{section}</span>
                      <ChevronDown 
                        className={`w-4 h-4 text-[#00F5FF] transition-transform duration-300 ${
                          mobileDropdown === section ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileDropdown === section && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pl-3 border-l-2 border-[#00F5FF]/30 mt-2">
                            {(section === "Learn" ? LEARN_CATS : section === "Build" ? BUILD_CATS : CONNECT_CATS)
                              .flatMap(cat => cat.items)
                              .map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => {
                                    setMobileOpen(false);
                                    setMobileDropdown(null);
                                  }}
                                  className="block p-2 rounded-lg bg-[#1E2A4D] hover:bg-[#00F5FF]/20 border border-[#2D3B5F] hover:border-[#00F5FF]/40 transition-all duration-300 group"
                                >
                                  <div>
                                    <h5 className="text-white font-medium text-xs group-hover:text-[#00F5FF] transition-colors">{item.title}</h5>
                                    <p className="text-gray-300 text-xs mt-1 group-hover:text-gray-200 transition-colors line-clamp-2">{item.desc}</p>
                                  </div>
                                </Link>
                              ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-white/10 bg-[#0A0F2C]">
                <Link
                  href="/build/docs/quick-start"
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileDropdown(null);
                  }}
                  className="w-full text-center block rounded-full px-4 py-2 bg-gradient-to-r from-[#00F5FF] to-cyan-400 text-[#0A0F2C] font-semibold text-xs hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}