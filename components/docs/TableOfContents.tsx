// components/docs/TableOfContents.tsx
'use client'
import { useState, useEffect } from 'react'
import { BookmarkIcon } from '@heroicons/react/24/outline'

interface TableOfContentsProps {
  headings?: Array<{
    id: string
    title: string
    level: number
  }>
}

export function TableOfContents({ headings = [] }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !headings || headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { 
        rootMargin: '0% 0% -80% 0%',
        threshold: 0.1
      }
    )

    // Safely observe headings
    headings.forEach((heading) => {
      if (heading?.id) {
        const element = document.getElementById(heading.id)
        if (element) {
          observer.observe(element)
        }
      }
    })

    return () => observer.disconnect()
  }, [headings, isMounted])

  const scrollToHeading = (id: string) => {
    if (!id) return
    
    const element = document.getElementById(id)
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Safe checks for headings
  const hasHeadings = headings && headings.length > 0

  if (!hasHeadings || !isMounted) {
    return (
      <div className="sticky top-24">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookmarkIcon className="w-4 h-4 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">On this page</h3>
          </div>
          <div className="text-gray-400 text-sm">
            {!hasHeadings ? 'No headings available' : 'Loading...'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sticky top-24">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookmarkIcon className="w-4 h-4 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">On this page</h3>
        </div>
        
        <nav className="space-y-2">
          {headings.map((heading) => {
            // Safe check for each heading
            if (!heading?.id || !heading?.title) return null
            
            return (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left transition-all duration-200 group ${
                  activeId === heading.id
                    ? 'text-purple-400 font-medium'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                style={{ 
                  paddingLeft: `${((heading.level || 2) - 2) * 16}px`,
                  fontSize: (heading.level || 2) === 2 ? '0.95rem' : '0.875rem'
                }}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    activeId === heading.id 
                      ? 'bg-purple-400' 
                      : 'bg-gray-600 group-hover:bg-gray-400'
                  }`} />
                  <span className="truncate">{heading.title}</span>
                </div>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}