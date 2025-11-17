// src/components/NetworkChart.tsx
'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { time: '00:00', hashrate: 240, latency: 45 },
  { time: '04:00', hashrate: 245, latency: 42 },
  { time: '08:00', hashrate: 255, latency: 48 },
  { time: '12:00', hashrate: 260, latency: 50 },
  { time: '16:00', hashrate: 250, latency: 46 },
  { time: '20:00', hashrate: 245, latency: 44 },
]

export function NetworkChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="hashrate" stroke="#00F5FF" strokeWidth={2} />
        <Line type="monotone" dataKey="latency" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}