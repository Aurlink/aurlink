// src/app/dashboard/page.tsx
'use client'
import { useState } from 'react'
import { SmartContractWizard } from '@/components/SmartContractWizard'
import { 
  Rocket, 
  Wallet, 
  FileCode, 
  BarChart3,
  Zap,
  Users,
  Settings,
  Shield,
  Globe,
  Code,
  Bot,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Cpu,
  CreditCard,
  Play,
  Database,
  Key,
  Bell,
  Search,
  Filter,
  Download,
  Share2,
  Eye,
  Edit,
  Trash2,
  Plus,
  Crown,
  Sparkles,
  Server,
  Network,
  Lock,
  Unlock,
  Activity,
  TrendingUp,
  DollarSign,
  MessageSquare,
  HelpCircle,
  BookOpen,
  Video
} from 'lucide-react'

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<'main' | 'contract-wizard' | 'dapp-deploy' | 'analytics' | 'subscription'>('main')
  const [walletConnected, setWalletConnected] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for dashboard
  const stats = [
    { 
      label: 'Total Contracts', 
      value: '12', 
      icon: FileCode, 
      color: 'text-blue-400',
      change: '+2 this month',
      trend: 'up'
    },
    { 
      label: 'Active dApps', 
      value: '8', 
      icon: Rocket, 
      color: 'text-green-400',
      change: '+3 this week',
      trend: 'up'
    },
    { 
      label: 'Gas Saved', 
      value: '0.42 ETH', 
      icon: BarChart3, 
      color: 'text-purple-400',
      change: '~$1,200 USD',
      trend: 'up'
    },
    { 
      label: 'API Calls', 
      value: '24.5K', 
      icon: Activity, 
      color: 'text-orange-400',
      change: '+5.2K today',
      trend: 'up'
    },
  ]

  const recentContracts = [
    { 
      name: 'MyToken', 
      type: 'ERC20', 
      network: 'Polygon', 
      status: 'Deployed', 
      date: '2024-12-01',
      address: '0x742...d81a',
      icon: FileCode,
      gasUsed: '0.0021 ETH'
    },
    { 
      name: 'NFTCollection', 
      type: 'ERC721', 
      network: 'Ethereum', 
      status: 'Deployed', 
      date: '2024-11-28',
      address: '0x8f3...c92b',
      icon: FileCode,
      gasUsed: '0.015 ETH'
    },
    { 
      name: 'StakingPool', 
      type: 'Staking', 
      network: 'Avalanche', 
      status: 'Pending', 
      date: '2024-11-25',
      address: '0x1a9...e74c',
      icon: FileCode,
      gasUsed: '0.0034 ETH'
    },
  ]

  const dApps = [
    {
      name: 'DeFi Exchange',
      description: 'Decentralized trading platform',
      users: '1.2K',
      transactions: '45K',
      status: 'Live',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'NFT Marketplace',
      description: 'Digital art marketplace',
      users: '3.4K',
      transactions: '12K',
      status: 'Live',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'DAO Platform',
      description: 'Community governance system',
      users: '567',
      transactions: '2.3K',
      status: 'Testing',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
  ]

  const subscriptionPlans = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      features: [
        'Up to 5 contracts',
        'Basic analytics',
        'Email support',
        '1 team member'
      ],
      current: false,
      icon: FileCode,
      color: 'border-gray-600'
    },
    {
      name: 'Professional',
      price: '$149',
      period: '/month',
      features: [
        'Up to 50 contracts',
        'Advanced analytics',
        'Priority support',
        '5 team members',
        'Custom templates'
      ],
      current: true,
      icon: Crown,
      color: 'border-purple-500'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Unlimited contracts',
        'Enterprise analytics',
        '24/7 dedicated support',
        'Unlimited team members',
        'Custom development',
        'SLA guarantee'
      ],
      current: false,
      icon: Server,
      color: 'border-yellow-500'
    },
  ]

  const features = [
    {
      icon: Cpu,
      title: 'AI-Powered Deployment',
      description: 'Smart contract optimization using neural networks',
      color: 'from-purple-500 to-pink-500',
      status: 'active'
    },
    {
      icon: Globe,
      title: 'Multi-Chain Support',
      description: 'Deploy across Ethereum, Polygon, Avalanche and more',
      color: 'from-blue-500 to-cyan-500',
      status: 'active'
    },
    {
      icon: Shield,
      title: 'Enhanced Security',
      description: 'Automated security audits and best practices',
      color: 'from-green-500 to-emerald-500',
      status: 'active'
    },
    {
      icon: Bot,
      title: 'Smart Analytics',
      description: 'Real-time monitoring and performance insights',
      color: 'from-orange-500 to-red-500',
      status: 'active'
    },
    {
      icon: Code,
      title: 'Advanced Templates',
      description: 'Pre-built templates for common use cases',
      color: 'from-indigo-500 to-purple-500',
      status: 'active'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Multi-user access and permission management',
      color: 'from-yellow-500 to-amber-500',
      status: 'active'
    },
  ]

  const quickActions = [
    {
      title: 'Deploy Contract',
      description: 'Launch a new smart contract',
      icon: FileCode,
      action: () => setActiveView('contract-wizard'),
      color: 'bg-gradient-to-r from-purple-500 to-blue-500'
    },
    {
      title: 'Deploy dApp',
      description: 'Launch full dApp frontend',
      icon: Rocket,
      action: () => setActiveView('dapp-deploy'),
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Analytics',
      description: 'Performance insights',
      icon: BarChart3,
      action: () => setActiveView('analytics'),
      color: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      title: 'Subscription',
      description: 'Manage your plan',
      icon: Crown,
      action: () => setActiveView('subscription'),
      color: 'bg-gradient-to-r from-yellow-500 to-amber-500'
    },
  ]

  const teamMembers = [
    { name: 'You', role: 'Admin', status: 'active', avatar: '👤' },
    { name: 'Sarah Chen', role: 'Developer', status: 'active', avatar: '👩‍💻' },
    { name: 'Mike Ross', role: 'Designer', status: 'away', avatar: '👨‍🎨' },
    { name: 'Alex Kim', role: 'Viewer', status: 'active', avatar: '👀' },
  ]

  if (activeView === 'contract-wizard') {
    return <SmartContractWizard onClose={() => setActiveView('main')} />
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      Deployed: 'bg-green-500/20 text-green-400 border-green-500/30',
      Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Failed: 'bg-red-500/20 text-red-400 border-red-500/30',
      Live: 'bg-green-500/20 text-green-400 border-green-500/30',
      Testing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      away: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
    
    const icons = {
      Deployed: <CheckCircle className="w-3 h-3" />,
      Pending: <Clock className="w-3 h-3" />,
      Failed: <AlertCircle className="w-3 h-3" />,
      Live: <CheckCircle className="w-3 h-3" />,
      Testing: <Clock className="w-3 h-3" />,
      active: <CheckCircle className="w-3 h-3" />,
      away: <Clock className="w-3 h-3" />
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {status}
      </span>
    )
  }

  const renderMainView = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome back, Builder! 👋
            </h2>
            <p className="text-gray-400 text-lg">Ready to deploy your next smart contract or dApp?</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            System Online • All Services Operational
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-700/50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className={`text-xs ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'} mt-1`}>
                    {stat.change}
                  </div>
                </div>
              </div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white rounded-xl p-4 text-left transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg group`}
            >
              <Icon className="w-6 h-6 mb-2" />
              <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
              <p className="text-white/70 text-xs">{action.description}</p>
              <ArrowRight className="w-4 h-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Deploy Contract Card */}
        <div className="bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-blue-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Deploy Smart Contract
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Use our AI-powered wizard to deploy ERC20, ERC721, staking contracts and more. 
                Get optimized gas usage and enhanced security automatically.
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <FileCode className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <button
            onClick={() => setActiveView('contract-wizard')}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <FileCode className="w-5 h-5" />
            Launch Contract Wizard
          </button>
        </div>

        {/* Deploy dApp Card */}
        <div className="bg-gradient-to-br from-green-500/10 via-green-500/5 to-emerald-500/10 rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Deploy Full dApp
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Launch complete decentralized applications with frontend, 
                backend, and smart contracts. One-click deployment to IPFS and CDN.
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Rocket className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <button
            onClick={() => setActiveView('dapp-deploy')}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <Rocket className="w-5 h-5" />
            Deploy dApp
          </button>
        </div>
      </div>

      {/* Recent Activity & Team Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Contracts */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Contracts</h3>
            <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentContracts.map((contract, index) => {
              const Icon = contract.icon
              return (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-600/50 rounded-lg">
                      <Icon className="w-4 h-4 text-gray-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{contract.name}</div>
                      <div className="text-sm text-gray-400 flex items-center gap-2">
                        {contract.type} • {contract.network}
                      </div>
                      <div className="text-xs text-gray-500 font-mono mt-1">
                        {contract.address}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={contract.status} />
                    <div className="text-xs text-gray-400 mt-2">{contract.date}</div>
                    <div className="text-xs text-gray-500">{contract.gasUsed}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Team Members</h3>
            <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              Manage <Settings className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg">
                    {member.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-white">{member.name}</div>
                    <div className="text-sm text-gray-400">{member.role}</div>
                  </div>
                </div>
                <StatusBadge status={member.status} />
              </div>
            ))}
            <button className="w-full p-4 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add Team Member
            </button>
          </div>
        </div>
      </div>

      {/* Active dApps Section */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Active dApps</h3>
          <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dApps.map((dApp, index) => {
            const Icon = dApp.icon
            return (
              <div 
                key={index}
                className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${dApp.color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1">{dApp.name}</h4>
                <p className="text-gray-400 text-sm mb-3">{dApp.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{dApp.users} users</span>
                  <span>{dApp.transactions} tx</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <StatusBadge status={dApp.status} />
                  <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Platform Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2 text-lg">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <StatusBadge status={feature.status} />
                  <span className="text-xs text-gray-500">Included</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderSubscriptionView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Subscription Plans</h2>
          <p className="text-gray-400">Choose the plan that fits your needs</p>
        </div>
        <button 
          onClick={() => setActiveView('main')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan, index) => {
          const Icon = plan.icon
          return (
            <div 
              key={index}
              className={`bg-gray-800/50 rounded-xl p-6 border-2 ${plan.color} ${plan.current ? 'ring-2 ring-purple-500/50' : ''} transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-gray-400" />
                {plan.current && (
                  <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">Current Plan</span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  plan.current 
                    ? 'bg-gray-700 text-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white hover:scale-105'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Upgrade Now'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Billing History */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-6">Billing History</h3>
        <div className="space-y-4">
          {[
            { date: 'Dec 1, 2024', amount: '$149.00', status: 'Paid', plan: 'Professional' },
            { date: 'Nov 1, 2024', amount: '$149.00', status: 'Paid', plan: 'Professional' },
            { date: 'Oct 1, 2024', amount: '$49.00', status: 'Paid', plan: 'Starter' },
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <div>
                <div className="font-medium text-white">{invoice.date}</div>
                <div className="text-sm text-gray-400">{invoice.plan}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-white">{invoice.amount}</div>
                <StatusBadge status={invoice.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderDappDeployView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Deploy dApp</h2>
          <p className="text-gray-400">Launch your complete decentralized application</p>
        </div>
        <button 
          onClick={() => setActiveView('main')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* dApp Templates */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4">Choose Template</h3>
          <div className="space-y-4">
            {[
              { name: 'DeFi Dashboard', description: 'Trading and liquidity management', icon: TrendingUp },
              { name: 'NFT Marketplace', description: 'Digital asset trading platform', icon: Sparkles },
              { name: 'DAO Platform', description: 'Community governance system', icon: Users },
              { name: 'GameFi App', description: 'Blockchain gaming platform', icon: Play },
            ].map((template, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 cursor-pointer">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <template.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{template.name}</h4>
                  <p className="text-gray-400 text-sm">{template.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Deployment Settings */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4">Deployment Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">dApp Name</label>
              <input 
                type="text" 
                placeholder="My Awesome dApp"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea 
                placeholder="Describe your dApp..."
                rows={3}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Network</label>
              <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500">
                <option>Ethereum Mainnet</option>
                <option>Polygon</option>
                <option>Avalanche</option>
                <option>Binance Smart Chain</option>
              </select>
            </div>
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
              Deploy dApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAnalyticsView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Analytics</h2>
          <p className="text-gray-400">Monitor your contracts and dApps performance</p>
        </div>
        <button 
          onClick={() => setActiveView('main')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Dashboard
        </button>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '45.2K', change: '+12%', icon: Users },
          { label: 'Transactions', value: '1.2M', change: '+8%', icon: TrendingUp },
          { label: 'Gas Used', value: '42.5 ETH', change: '-5%', icon: Zap },
          { label: 'Revenue', value: '$24.5K', change: '+15%', icon: DollarSign },
        ].map((metric, index) => (
          <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <metric.icon className="w-8 h-8 text-purple-400" />
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-sm text-green-400">{metric.change}</div>
              </div>
            </div>
            <div className="text-gray-400 text-sm mt-2">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-bold text-white mb-4">Usage Trends</h3>
          <div className="h-64 bg-gray-700/30 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Chart: Usage trends over time</p>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-bold text-white mb-4">Network Distribution</h3>
          <div className="h-64 bg-gray-700/30 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Chart: Network usage distribution</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Aurlink Dashboard
                </h1>
                <p className="text-xs text-gray-400">Smart Contract Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setWalletConnected(!walletConnected)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  walletConnected 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                }`}
              >
                <Wallet className="w-4 h-4" />
                {walletConnected ? 'Connected' : 'Connect Wallet'}
              </button>
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeView === 'main' && renderMainView()}
        {activeView === 'subscription' && renderSubscriptionView()}
        {activeView === 'dapp-deploy' && renderDappDeployView()}
        {activeView === 'analytics' && renderAnalyticsView()}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span>© 2024 Aurlink. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                System Status: Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}