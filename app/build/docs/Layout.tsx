// app/docs/layout.tsx - UPDATED
import { DocumentationNav } from '@/components/build/docs/DocumentationNav'
import { DocumentationSidebar } from '@/components/build/docs/DocumentationSidebar'

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0A0F2C]">
      <DocumentationNav />
      <div className="max-w-8xl mx-auto">
        <div className="flex">
          <DocumentationSidebar />
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}