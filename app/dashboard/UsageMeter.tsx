interface UsageMeterProps {
  label: string
  used: number
  total: number
  unit?: string
}

export default function UsageMeter({ label, used, total, unit = '' }: UsageMeterProps) {
  const percentage = (used / total) * 100

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="text-white">
          {used.toLocaleString()} / {total.toLocaleString()} {unit}
        </span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${
            percentage > 90 ? 'bg-red-400' : 
            percentage > 75 ? 'bg-yellow-400' : 'bg-[#00F5FF]'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  )
}