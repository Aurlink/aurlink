// app/docs/sdk/python/page.tsx
'use client'
import { motion } from 'framer-motion'
import { DocsLayout } from '@/components/docs/DocsLayout'
import { CodePlayground } from '@/components/docs/CodePlayground'

const installation = `pip install aurlink-sdk
# or
poetry add aurlink-sdk`

const quickStart = `from aurlink import AurlinkClient
import asyncio

async def main():
    # Initialize client
    client = AurlinkClient(
        api_key="your-api-key",
        network="mainnet"  # or "testnet"
    )
    
    # Get network info
    network_info = await client.network.get_info()
    print(f"Network TPS: {network_info['tps']}")
    print(f"AI Performance: {network_info['ai_performance']}")
    
    # Send transaction
    tx_result = await client.transactions.send(
        from_address="0xYourAddress",
        to_address="0xRecipientAddress",
        value="1000000000000000000"
    )
    print(f"Transaction hash: {tx_result['tx_hash']}")
    
    # AI Inference
    prediction = await client.ai.inference(
        model="price_prediction_v2",
        input_data={
            "historical_prices": [100, 105, 110, 108, 115],
            "market_indicators": {"volume": 5000000}
        }
    )
    print(f"Prediction: {prediction['prediction']}")

asyncio.run(main())`

const examples = [
  {
    title: "Data Analysis with Pandas",
    description: "Combine Aurlink data with pandas for advanced analysis",
    code: `import pandas as pd
from aurlink import AurlinkClient

client = AurlinkClient(api_key="your-api-key")

# Get recent blocks and convert to DataFrame
blocks = await client.blocks.get_recent(limit=1000)
df = pd.DataFrame(blocks)

# Analyze AI optimization impact
optimization_gain = df['ai_optimizations'].apply(lambda x: x['tps_gain'])
print(f"Average TPS gain: {optimization_gain.mean():.2%}")

# Plot gas savings over time
df['timestamp'] = pd.to_datetime(df['timestamp'])
df.set_index('timestamp')['gas_used'].plot(title='Gas Usage Over Time')`
  },
  {
    title: "WebSocket Real-time Data",
    description: "Stream real-time data for trading algorithms",
    code: `from aurlink import AurlinkWebSocketClient
import json

async def handle_block(block):
    print(f"New block: {block['number']}")
    print(f"AI Optimizations: {block['ai_optimizations']}")
    
    # Your trading logic here
    if block['ai_optimizations']['tps_gain'] > 0.1:
        print("High optimization detected - potential trading signal")

async def main():
    ws_client = AurlinkWebSocketClient(api_key="your-api-key")
    
    # Subscribe to blocks
    await ws_client.subscribe_blocks(handle_block)
    
    # Keep connection alive
    await ws_client.run_forever()

# Run in your event loop`
  },
  {
    title: "Batch Processing",
    description: "Process multiple transactions efficiently",
    code: `from aurlink import AurlinkClient
from concurrent.futures import ThreadPoolExecutor

client = AurlinkClient(api_key="your-api-key")

async def process_transactions(transactions):
    """Process transactions in batch with AI optimization"""
    
    # Use batch send for efficiency
    results = await client.transactions.batch_send(
        transactions,
        optimize_gas=True,  # Let AI optimize gas costs
        parallelize=True    # Process in parallel
    )
    
    # Analyze results
    successful = [r for r in results if r['status'] == 'success']
    print(f"Success rate: {len(successful)/len(transactions):.2%}")
    
    return results

# Example usage
transactions = [
    {"to": "0xAddress1", "value": "1000000000000000000"},
    {"to": "0xAddress2", "value": "2000000000000000000"},
    # ... more transactions
]

await process_transactions(transactions)`
  }
]

const features = [
  {
    title: "Async/Await Support",
    description: "Full asynchronous support for high-performance applications"
  },
  {
    title: "Type Annotations", 
    description: "Complete type hints for better development experience"
  },
  {
    title: "Pandas Integration",
    description: "Seamless integration with pandas for data analysis"
  },
  {
    title: "WebSocket Client",
    description: "Built-in WebSocket client for real-time data"
  }
]

export default function PythonSdkPage() {
  return (
    <DocsLayout>
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Python SDK
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Full-featured Python SDK for data scientists, researchers, and developers 
            building on the Aurlink network.
          </p>
        </motion.div>

        {/* Installation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Installation</h2>
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <pre className="text-sm text-gray-300">{installation}</pre>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div>
                  <div className="font-semibold text-white">{feature.title}</div>
                  <div className="text-sm text-gray-400">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
          <div className="bg-gray-900 rounded-lg p-6">
            <pre className="text-sm text-gray-300">{quickStart}</pre>
          </div>
        </motion.div>

        {/* Interactive Playground */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <CodePlayground />
        </motion.div>

        {/* Advanced Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Advanced Examples</h2>
          <div className="grid gap-8">
            {examples.map((example, index) => (
              <div key={example.title} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-2">{example.title}</h3>
                <p className="text-gray-300 mb-4">{example.description}</p>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-sm text-gray-300">{example.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DocsLayout>
  )
}