import React from 'react'

interface StatsCardProps {
  label: string
  value: string
  unit: string
  color: string
  className?: string
}

export default function StatsCard({ 
  label, 
  value, 
  unit, 
  color, 
  className = '' 
}: StatsCardProps) {
  return (
    <div className={`bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-4 border border-gray-700 ${className}`}>
      <div className="text-gray-400 text-sm mb-1">{label}</div>
      <div className={`text-lg font-bold ${color}`}>
        {value} {unit}
      </div>
    </div>
  )
}