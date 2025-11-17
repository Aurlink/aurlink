// components/docs/DocsLayout.tsx
'use client'
import { SidebarNav } from './SidebarNav'
import { TableOfContents } from './TableOfContents'

interface DocsLayoutProps {
  children: React.ReactNode
  headings?: Array<{
    id: string
    title: string
    level: number
  }>
  showToc?: boolean
}

export function DocsLayout({ 
  children, 
  headings = [],
  showToc = true 
}: DocsLayoutProps) {
  const hasHeadings = headings && headings.length > 0
  const shouldShowToc = showToc && hasHeadings

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="flex">
        {/* Sidebar */}
        <div className="flex-shrink-0">
          <SidebarNav />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-6">
              <div className={`grid gap-8 ${shouldShowToc ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
                {/* Documentation Content */}
                <div className={shouldShowToc ? 'lg:col-span-3' : 'lg:col-span-4'}>
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 lg:p-8">
                    {children}
                  </div>
                </div>

                {/* Table of Contents */}
                {shouldShowToc && (
                  <div className="lg:col-span-1">
                    <TableOfContents headings={headings} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}