import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface QuickActionCardProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
  onClick: () => void
}

export default function QuickActionCard({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  onClick 
}: QuickActionCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#00F5FF]/30 transition-all duration-300 group text-left w-full"
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-white font-semibold mb-2 group-hover:text-[#00F5FF] transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
      <div className="mt-3 flex items-center gap-1">
        <span className="text-[#00F5FF] text-xs font-medium">Get Started</span>
        <svg className="w-3 h-3 text-[#00F5FF]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </motion.button>
  )
}