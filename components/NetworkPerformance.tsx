'use client';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect, useRef, useMemo, Component, ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';

// Type Definitions
interface DataPoint {
  x: number;
  y: number;
}

interface Stat {
  label: string;
  value: string | number;
  target: string;
}

// Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-400 text-center p-6">
          Something went wrong. Please try again later.
        </div>
      );
    }
    return this.props.children;
  }
}

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const barVariants: Variants = {
  hidden: { height: 0 },
  visible: (height: string) => ({
    height,
    transition: { duration: 0.5 },
  }),
};

const NetworkPerformance: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [simulateLoad, setSimulateLoad] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Mock Data Generators (Memoized)
  const generateTPSData = useMemo(
    () => () => {
      const base = simulateLoad ? 12000 : 8000;
      return Array.from({ length: 20 }, (_, i) => ({
        x: i,
        y: base + Math.random() * 4000 - 2000,
      }));
    },
    [simulateLoad]
  );

  const generateLatencyData = useMemo(
    () => () => {
      const base = simulateLoad ? 2.0 : 1.5;
      return Array.from({ length: 20 }, (_, i) => ({
        x: i,
        y: base + Math.random() * 0.5 - 0.25,
      }));
    },
    [simulateLoad]
  );

  const [tpsData, setTpsData] = useState<DataPoint[]>(generateTPSData());
  const [latencyData, setLatencyData] = useState<DataPoint[]>(generateLatencyData());
  const [activeValidators, setActiveValidators] = useState<number>(97);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Real-Time Data Fetching (with Mock Fallback)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Placeholder for real API
        const response = await fetch('/api/network-performance');
        if (!response.ok) throw new Error('Failed to fetch network data');
        const { tps, latency, validators } = await response.json();
        setTpsData(tps || generateTPSData());
        setLatencyData(latency || generateLatencyData());
        setActiveValidators(validators || 97);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Using mock data due to API failure');
        setTpsData(generateTPSData());
        setLatencyData(generateLatencyData());
        setActiveValidators((prev) =>
          Math.min(Math.max(prev + Math.floor(Math.random() * 3) - 1, 95), 105)
        );
      }
    };

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [generateTPSData, generateLatencyData, simulateLoad]);

  const stats: Stat[] = [
    {
      label: 'Transactions Per Second',
      value: `${Math.round(tpsData[tpsData.length - 1]?.y || 0).toLocaleString()} TPS`,
      target: '10,000+ TPS',
    },
    {
      label: 'Network Latency',
      value: `${(latencyData[latencyData.length - 1]?.y || 0).toFixed(1)}s`,
      target: '1.5s Finality',
    },
    {
      label: 'Active Validators',
      value: activeValidators,
      target: '100+ Nodes',
    },
  ];

  return (
    <ErrorBoundary>
      <section
        ref={sectionRef}
        id="network-performance"
        className="relative py-20 lg:py-32 bg-gradient-to-b from-[#0A0F2C] to-[#0A142E] overflow-hidden"
        aria-labelledby="network-performance-title"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              id="network-performance-title"
              className="text-4xl lg:text-6xl font-bold text-white mb-6"
            >
              Live Network
              <span className="block bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                Performance
              </span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Witness the power of the Cognitive Blockchain. The Neural Optimization Layer dynamically
              tunes the network in real-time to maintain high throughput and low latency.
            </p>
          </motion.div>

          {error && (
            <div className="text-yellow-400 text-center mb-4" role="alert">
              {error}
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Graphs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* TPS Graph */}
              <div
                className="bg-[#1A1F3C]/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
                role="img"
                aria-label="Transactions Per Second Graph"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Transactions Per Second</h3>
                  <div
                    className="text-cyan-300 font-mono text-sm"
                    aria-live="polite"
                  >
                    {Math.round(tpsData[tpsData.length - 1]?.y || 0).toLocaleString()} TPS
                  </div>
                </div>
                <div className="h-48 relative">
                  <motion.div
                    className="absolute inset-0 flex items-end space-x-1"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                  >
                    {tpsData.map((point, i) => (
                      <motion.div
                        key={i}
                        custom={`${(point.y / 15000) * 100}%`}
                        variants={barVariants}
                        className={`flex-1 rounded-t ${
                          point.y > 12000
                            ? 'bg-gradient-to-t from-cyan-400 to-cyan-300'
                            : 'bg-gradient-to-t from-cyan-300 to-cyan-400/60'
                        }`}
                        data-tooltip-id={`tps-${i}`}
                        data-tooltip-content={`${Math.round(point.y)} TPS`}
                      />
                    ))}
                  </motion.div>
                  {tpsData.map((point, i) => (
                    <Tooltip
                      key={i}
                      id={`tps-${i}`}
                      place="top"
                      className="bg-gray-800 text-white"
                    />
                  ))}
                  {/* Grid Lines with Labels */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 5000, 10000, 15000].map((value) => (
                      <div key={value} className="flex items-center">
                        <span className="text-xs text-gray-400 mr-2">{value}</span>
                        <div className="flex-1 border-t border-gray-600/30" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Latency Graph */}
              <div
                className="bg-[#1A1F3C]/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
                role="img"
                aria-label="Network Latency Graph"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Finality Time</h3>
                  <div
                    className="text-cyan-300 font-mono text-sm"
                    aria-live="polite"
                  >
                    {(latencyData[latencyData.length - 1]?.y || 0).toFixed(1)}s
                  </div>
                </div>
                <div className="h-32 relative">
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    <motion.path
                      d={`M 0,50 ${latencyData
                        .map((p, i) => `L ${(i / (latencyData.length - 1)) * 100},${50 - (p.y / 3) * 50}`)
                        .join(' ')}`}
                      fill="none"
                      stroke="url(#latencyGradient)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1 }}
                    />
                    <defs>
                      <linearGradient id="latencyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00F5FF" />
                        <stop offset="100%" stopColor="#00F5FF" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Y-Axis Labels */}
                  <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-400">
                    {[0, 1, 2, 3].map((value) => (
                      <div key={value} className="flex items-center">
                        <span>{value}s</span>
                        <div className="flex-1 border-t border-gray-600/30" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Stats & Control */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Stats Cards */}
              <div className="grid gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="bg-[#1A1F3C]/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
                    role="region"
                    aria-label={stat.label}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-2xl font-bold text-white" aria-live="polite">
                          {stat.value}
                        </div>
                        <div className="text-gray-300 text-sm">{stat.label}</div>
                      </div>
                      <div className="text-cyan-300 text-xs font-medium bg-cyan-300/10 px-2 py-1 rounded">
                        Target: {stat.target}
                      </div>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-1">
                      <motion.div
                        className="bg-gradient-to-r from-cyan-300 to-cyan-400 h-1 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Load Simulation Control */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-[#1A1F3C]/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Network Stress Test</h3>
                <p className="text-gray-300 text-sm mb-6">
                  Simulate high network load to see how the Neural Optimization Layer maintains performance.
                </p>
                <button
                  onClick={() => setSimulateLoad(!simulateLoad)}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    simulateLoad
                      ? 'bg-gradient-to-r from-cyan-400 to-cyan-300 text-[#0A0F2C] shadow-lg shadow-cyan-400/25'
                      : 'bg-cyan-300/10 text-cyan-300 border border-cyan-300 hover:bg-cyan-300 hover:text-[#0A0F2C]'
                  }`}
                  aria-pressed={simulateLoad}
                >
                  {simulateLoad ? '🔄 Load Test Active' : '⚡ Simulate Network Load'}
                </button>
                {simulateLoad && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/20"
                    aria-live="polite"
                  >
                    <div className="flex items-center text-cyan-300 text-sm">
                      <div className="w-2 h-2 bg-cyan-300 rounded-full mr-2 animate-pulse" />
                      NOL actively optimizing network parameters...
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default NetworkPerformance;
