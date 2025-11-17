// components/docs/DocPage.tsx
'use client'
import { motion } from 'framer-motion'
import { CodeBlock } from './CodeBlock'
import { TableOfContents } from './TableOfContents'

interface DocSection {
  title: string
  content: string | string[]
  type: 'text' | 'list' | 'code' | 'warning' | 'info'
  code?: string
  language?: string
}

interface DocContent {
  title: string
  description: string
  sections: DocSection[]
}

export function DocPage({ content }: { content: DocContent }) {
  const sections = content.sections

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">{content.title}</h1>
          <p className="text-xl text-gray-300">{content.description}</p>
        </motion.div>

        <div className="flex gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="prose prose-invert prose-cyan max-w-none">
              {sections.map((section, index) => (
                <motion.section
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-12"
                  id={section.title.toLowerCase().replace(/\s+/g, '-')}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">{section.title}</h2>
                  
                  {section.type === 'text' && (
                    <p className="text-gray-300 leading-relaxed">{section.content as string}</p>
                  )}
                  
                  {section.type === 'list' && (
                    <ul className="text-gray-300 space-y-2">
                      {(section.content as string[]).map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {section.type === 'code' && section.code && (
                    <CodeBlock code={section.code} language={section.language || 'javascript'} />
                  )}
                </motion.section>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8 mt-12 border-t border-white/10">
              <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                ← Previous
              </button>
              <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                Next →
              </button>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="hidden xl:block w-64 flex-shrink-0">
            <TableOfContents sections={sections} />
          </div>
        </div>
      </div>
    </div>
  )
}