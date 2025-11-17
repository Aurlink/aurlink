// src/hooks/useWebSocket.ts
import { useEffect, useRef, useState } from 'react'

export function useWebSocket(url: string) {
  const [data, setData] = useState<any>(null)
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    ws.current = new WebSocket(url)
    
    ws.current.onmessage = (event) => {
      const newData = JSON.parse(event.data)
      setData(newData)
    }

    return () => {
      ws.current?.close()
    }
  }, [url])

  return data
}