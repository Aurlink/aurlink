// components/docs/TableOfContents.tsx
'use client'
import { useState, useEffect } from 'react'

interface Section {
  title: string
  type: string
}

interface TableOfContentsProps {
  sections: Section[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.title.toLowerCase().replace(/\s+/g, '-'))
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <div className="sticky top-24">
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">On this page</h3>
        <nav className="space-y-2">
          {sections.map((section) => {
            const id = section.title.toLowerCase().replace(/\s+/g, '-')
            const isActive = activeSection === id
            
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {section.title}
              </a>
            )
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="space-y-2">
            <button className="w-full text-left py-2 px-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              Edit this page
            </button>
            <button className="w-full text-left py-2 px-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              Report issue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}