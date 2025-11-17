// app/build/docs/introduction/page.tsx
import { DocsLayout } from '@/components/docs/DocsLayout'

// Static content with safe headings
const content = {
  title: 'Introduction to Aurlink',
  description: 'Get started with the next generation of blockchain interoperability powered by artificial intelligence.',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      level: 2,
      content: `Aurlink is a revolutionary blockchain interoperability protocol that combines artificial intelligence with cross-chain communication to create a seamless, secure, and scalable multi-chain ecosystem.`
    },
    {
      id: 'key-features',
      title: 'Key Features',
      level: 2,
      content: `Our platform offers enterprise-grade solutions for cross-chain operations with AI-powered optimization.`
    },
    {
      id: 'quick-start',
      title: 'Quick Start',
      level: 2,
      content: `Get started with Aurlink in under 5 minutes with our comprehensive SDK and API documentation.`
    }
  ]
}

// Safe headings extraction
function getSafeHeadings() {
  if (!content?.sections) return []
  
  return content.sections
    .filter(section => section?.id && section?.title)
    .map(section => ({
      id: section.id,
      title: section.title,
      level: section.level || 2
    }))
}

export default function IntroductionPage() {
  const headings = getSafeHeadings()

  return (
    <DocsLayout headings={headings}>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {content.title}
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {content.description}
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        {content.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24"
          >
            {section.level === 2 ? (
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                {section.title}
              </h2>
            ) : (
              <h3 className="text-2xl font-semibold text-white mb-4">
                {section.title}
              </h3>
            )}
            
            {section.content && (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {section.content}
                </p>
              </div>
            )}
          </section>
        ))}
      </div>
    </DocsLayout>
  )
}