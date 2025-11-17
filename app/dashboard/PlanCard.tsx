import { CheckCircle2, Crown } from 'lucide-react'
import { motion } from 'framer-motion'

interface PlanCardProps {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  current: boolean
  popular: boolean
  buttonText: string
  onSelect: () => void
}

export default function PlanCard({
  name,
  price,
  period,
  description,
  features,
  current,
  popular,
  buttonText,
  onSelect
}: PlanCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white/5 rounded-xl p-6 border ${
        popular 
          ? 'border-[#00F5FF] ring-2 ring-[#00F5FF]/20' 
          : current 
          ? 'border-green-400' 
          : 'border-white/10'
      } relative transition-all duration-300`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#00F5FF] text-[#0A0F2C] px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className="text-3xl font-bold text-white">${price}</span>
          {price !== 'Custom' && (
            <span className="text-gray-400">/{period}</span>
          )}
        </div>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
          current
            ? 'bg-green-400/20 text-green-400 border border-green-400 cursor-default'
            : popular
            ? 'bg-[#00F5FF] text-[#0A0F2C] hover:bg-cyan-400'
            : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
        }`}
      >
        {buttonText}
      </button>
    </motion.div>
  )
}