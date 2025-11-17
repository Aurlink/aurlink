// app/support/community/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { MessageCircle, Users, Plus, Search, Filter, Clock, MessageSquare, Zap, Code, Rocket, Shield, Brain, Award, TrendingUp, ExternalLink, X, Send, ThumbsUp, Bookmark, Share, ChevronDown, ChevronUp, User, Heart, Flag } from 'lucide-react';

// Types
interface Discussion {
  id: string;
  title: string;
  author: { name: string; role: string; verified?: boolean; avatar?: string };
  category: string;
  replies: number;
  views: string;
  activity: string;
  tags: string[];
  featured?: boolean;
  pinned?: boolean;
  engagement?: string;
  solved?: boolean;
  content: string;
  likes: number;
  bookmarks: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface Comment {
  id: string;
  author: { name: string; role: string; verified?: boolean; avatar?: string };
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  isSolution?: boolean;
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon: any;
  threadCount: string;
  color: string;
  experts: string[];
}

interface TeamMember {
  name: string;
  role: string;
  online: boolean;
}

export default function AurlinkForum() {
  const [activeTab, setActiveTab] = useState('discussions');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedDiscussion, setExpandedDiscussion] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    category: '',
    content: '',
    tags: ''
  });

  // Sample comments data
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});

  // Premium Aurlink-specific categories
  const aurlinkCategories: Category[] = [
    {
      id: 1,
      name: "Aurion Language",
      description: "Discuss the Aurion smart contract language and compiler",
      icon: Code,
      threadCount: "3.2K",
      color: "from-cyan-500 to-blue-500",
      experts: ["LangDev", "CompilerExpert", "SyntaxMaster"]
    },
    {
      id: 2,
      name: "Aurlink IDE",
      description: "IDE features, debugging, and development tools",
      icon: Zap,
      threadCount: "2.8K",
      color: "from-purple-500 to-pink-500",
      experts: ["IDEMaster", "DebugPro", "ToolingExpert"]
    },
    {
      id: 3,
      name: "AI Optimization",
      description: "AI-powered gas optimization and security analysis",
      icon: Brain,
      threadCount: "1.9K",
      color: "from-green-500 to-emerald-500",
      experts: ["AISpecialist", "GasOptimizer", "SecurityAI"]
    },
    {
      id: 4,
      name: "AVM & Runtime",
      description: "Aurlink Virtual Machine and execution environment",
      icon: Rocket,
      threadCount: "1.5K",
      color: "from-orange-500 to-red-500",
      experts: ["VMExpert", "RuntimeDev", "ExecutionPro"]
    }
  ];

  // Premium featured discussions with full content
  const featuredDiscussions: Discussion[] = [
    {
      id: '1',
      title: "Aurion v0.1 Release - Complete Language Guide",
      author: { name: "CoreDev", role: "Aurlink Team", verified: true, avatar: "👨‍💻" },
      category: "Aurion Language",
      replies: 287,
      views: "12.4K",
      activity: "2 hours ago",
      tags: ["release", "documentation", "tutorial"],
      featured: true,
      pinned: true,
      engagement: "very-high",
      content: `# Aurion v0.1 Release Notes

We're excited to announce Aurion v0.1, our next-generation smart contract language designed for security and performance.

## Key Features:
- **Type Safety**: Advanced type system preventing common vulnerabilities
- **Gas Optimization**: Built-in optimization reducing gas costs by 40-60%
- **AI Integration**: AI-powered code analysis and suggestions
- **Formal Verification**: Built-in verification tools for critical contracts

## Getting Started:
\`\`\`aurion
contract HelloWorld {
    message: string;
    
    init(message: string) {
        self.message = message;
    }
    
    function updateMessage(newMessage: string) {
        require(msg.sender == self.owner, "Unauthorized");
        self.message = newMessage;
    }
}
\`\`\`

## Migration Guide:
Existing Solidity developers can use our migration tool to convert contracts automatically. The tool handles 85% of common patterns.

**Next Steps**: Check our documentation and join the beta testing program!`,
      likes: 89,
      bookmarks: 45,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: '2',
      title: "AI-Powered Gas Optimization Results - 63% Average Reduction",
      author: { name: "AIOptimizer", role: "AI Research", verified: true, avatar: "🤖" },
      category: "AI Optimization",
      replies: 156,
      views: "8.7K",
      activity: "5 hours ago",
      tags: ["ai", "gas-optimization", "performance"],
      featured: true,
      pinned: false,
      engagement: "high",
      content: `# AI Gas Optimization Breakthrough

Our latest AI model has achieved remarkable results in gas optimization across various contract patterns.

## Performance Metrics:
- **Average Reduction**: 63% gas cost reduction
- **Best Case**: 82% reduction in complex DeFi contracts
- **Worst Case**: 41% reduction in simple token contracts

## How It Works:
The AI analyzes your contract bytecode and identifies optimization opportunities through:
1. **Pattern Recognition**: Identifies inefficient code patterns
2. **Memory Optimization**: Optimizes storage and memory usage
3. **Opcode Replacement**: Suggests more efficient opcode sequences

## Example Optimization:
\`\`\`solidity
// Before AI Optimization
function processBatch(address[] memory users) public {
    for(uint i = 0; i < users.length; i++) {
        processUser(users[i]);
    }
}

// After AI Optimization  
function processBatch(address[] memory users) public {
    uint length = users.length;
    for(uint i = 0; i < length; ) {
        processUser(users[i]);
        unchecked { i++; }
    }
}
\`\`\`

Try the optimizer in Aurlink IDE today!`,
      likes: 64,
      bookmarks: 32,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: '3',
      title: "Building Your First dApp with Aurlink IDE - Step by Step",
      author: { name: "DevEducator", role: "Community Expert", verified: true, avatar: "👩‍🏫" },
      category: "Aurlink IDE",
      replies: 89,
      views: "5.2K",
      activity: "1 day ago",
      tags: ["tutorial", "ide", "beginner"],
      featured: true,
      pinned: false,
      engagement: "medium",
      content: `# Building Your First dApp with Aurlink IDE

Welcome to the complete beginner's guide for building decentralized applications with Aurlink IDE!

## Step 1: Project Setup
Create a new project in Aurlink IDE and select the "Basic dApp" template. The IDE will automatically set up:
- Contract structure
- Frontend components
- Testing environment

## Step 2: Write Your Contract
\`\`\`aurion
contract SimpleStorage {
    data: string;
    
    init() {
        self.data = "Hello, Aurlink!";
    }
    
    function getData() -> string {
        return self.data;
    }
    
    function setData(newData: string) {
        self.data = newData;
    }
}
\`\`\`

## Step 3: Connect Frontend
Use our React hooks to connect your frontend:
\`\`\`typescript
import { useAurlinkContract } from '@aurlink/sdk';

function App() {
  const { data, setData } = useAurlinkContract('SimpleStorage');
  
  return (
    <div>
      <h1>{data}</h1>
      <button onClick={() => setData('New Value')}>
        Update Data
      </button>
    </div>
  );
}
\`\`\`

## Step 4: Deploy and Test
Use the one-click deployment and our built-in testing tools to verify everything works perfectly!`,
      likes: 42,
      bookmarks: 28,
      isLiked: false,
      isBookmarked: false
    }
  ];

  // Active discussions with full content
  const activeDiscussions: Discussion[] = [
    {
      id: '4',
      title: "Custom AVM Opcode Implementation Guide",
      author: { name: "VMArchitect", role: "Core Contributor", avatar: "👨‍🔧" },
      category: "AVM & Runtime",
      replies: 42,
      views: "2.1K",
      activity: "30 minutes ago",
      tags: ["avm", "opcodes", "advanced"],
      solved: false,
      content: `# Custom AVM Opcode Implementation

I'm working on implementing custom opcodes for the Aurlink Virtual Machine and could use some community input.

## Current Challenge:
I need to add a new cryptographic opcode for BLS signature verification. The opcode should:
- Verify BLS12-381 signatures
- Handle gas costs appropriately
- Maintain VM security guarantees

## Proposed Implementation:
\`\`\`
OP_BLS_VERIFY:
    // Stack: [pubkey, message, signature]
    // Returns: [1 if valid, 0 if invalid]
    GAS_COST = 5000
    require(gas >= GAS_COST)
    
    pubkey = pop()
    message = pop() 
    signature = pop()
    
    result = bls_verify(pubkey, message, signature)
    push(result)
\`\`\`

## Questions:
1. Is the gas cost appropriate?
2. Should we include aggregate verification?
3. Any security concerns with this approach?

Looking forward to your feedback!`,
      likes: 23,
      bookmarks: 12,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: '5',
      title: "Security Audit Patterns for Aurion Contracts",
      author: { name: "SecurityExpert", role: "Auditor", avatar: "👨‍💼" },
      category: "AI Optimization",
      replies: 34,
      views: "1.8K",
      activity: "1 hour ago",
      tags: ["security", "audit", "best-practices"],
      solved: true,
      content: `# Security Audit Patterns for Aurion

After auditing 50+ Aurion contracts, I've identified common security patterns and anti-patterns.

## Critical Findings:

### 1. Access Control Issues
**Anti-pattern**: Missing owner checks in critical functions
**Solution**: Use the built-in \`@onlyOwner\` decorator

### 2. Reentrancy Vulnerabilities  
**Anti-pattern**: External calls before state updates
**Solution**: Use Aurion's automatic reentrancy protection

### 3. Integer Overflow
**Anti-pattern**: Manual arithmetic operations
**Solution**: Use safe math libraries provided by Aurion

## Recommended Tools:
- Aurion Security Scanner (built into IDE)
- Formal Verification Assistant
- Gas Optimization Analyzer

## Example Secure Contract:
\`\`\`aurion
@secure
contract Vault {
    balances: mapping<address, uint256>;
    owner: address;
    
    init() {
        self.owner = msg.sender;
    }
    
    @onlyOwner
    function withdraw(uint256 amount) {
        require(self.balances[msg.sender] >= amount, "Insufficient balance");
        self.balances[msg.sender] -= amount;
        msg.sender.transfer(amount);
    }
}
\`\`\``,
      likes: 31,
      bookmarks: 18,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: '6',
      title: "Real-time Debugging in Aurlink IDE - Feature Request",
      author: { name: "DebugPro", role: "Community Expert", avatar: "👩‍💻" },
      category: "Aurlink IDE",
      replies: 67,
      views: "3.4K",
      activity: "2 hours ago",
      tags: ["ide", "feature-request", "debugging"],
      solved: false,
      content: `# Real-time Debugging Feature Request

I'm proposing a real-time debugging feature for Aurlink IDE that would revolutionize development workflows.

## Proposed Features:

### 1. Live Variable Inspection
- Watch variables change in real-time during execution
- Visualize contract state transitions
- Track gas consumption per operation

### 2. Breakpoint System
- Set breakpoints in Aurion code
- Step through execution line by line
- Inspect stack and memory at each step

### 3. Transaction Replay
- Replay any transaction with full debugging info
- Identify exactly where gas is being spent
- Debug failed transactions easily

## Example Debug Interface:
\`\`\`
Breakpoint hit at: SimpleStorage.setData()
Variables:
  - self.data: "Hello, Aurlink!" -> "New Value"
  - newData: "New Value"
  - msg.sender: 0x7423...
  
Stack:
  [0]: SimpleStorage.setData()
  [1]: Transaction entry point
  
Gas used: 42,159 / 100,000
\`\`\`

This would save developers hours of debugging time! Who else would find this useful?`,
      likes: 45,
      bookmarks: 22,
      isLiked: false,
      isBookmarked: false
    }
  ];

  // Core team members
  const coreTeam: TeamMember[] = [
    { name: "LangDev", role: "Aurion Language Lead", online: true },
    { name: "VMExpert", role: "AVM Architecture", online: true },
    { name: "AISpecialist", role: "AI Research Lead", online: false },
    { name: "IDEMaster", role: "IDE Development", online: true }
  ];

  // Initialize comments
  useEffect(() => {
    const initialComments: { [key: string]: Comment[] } = {
      '1': [
        {
          id: 'c1',
          author: { name: "BlockchainPro", role: "Community Expert", avatar: "👨‍🎓" },
          content: "Great release! The type system looks much more robust than Solidity. When can we expect the formal verification tools?",
          timestamp: "1 hour ago",
          likes: 12,
          isLiked: false,
          isSolution: false
        },
        {
          id: 'c2', 
          author: { name: "CoreDev", role: "Aurlink Team", verified: true, avatar: "👨‍💻" },
          content: "Formal verification tools are in beta testing now. We expect to release them in v0.2 next month. You can join the beta program through our Discord!",
          timestamp: "45 minutes ago", 
          likes: 8,
          isLiked: false,
          isSolution: true
        }
      ],
      '2': [
        {
          id: 'c3',
          author: { name: "GasSaver", role: "DeFi Developer", avatar: "👩‍💻" },
          content: "These results are impressive! I tested on my yield farming contract and got 68% reduction. The AI suggestions were very insightful.",
          timestamp: "3 hours ago",
          likes: 15,
          isLiked: false,
          isSolution: false
        }
      ],
      '4': [
        {
          id: 'c4',
          author: { name: "CryptoResearcher", role: "Cryptography Expert", avatar: "👨‍🔬" },
          content: "For BLS verification, 5000 gas might be low. Ethereum's precompile costs 45,000 gas. Consider benchmarking against existing implementations.",
          timestamp: "25 minutes ago",
          likes: 7,
          isLiked: false,
          isSolution: false
        }
      ]
    };
    setComments(initialComments);
  }, []);

  // Handle new discussion submission
  const handleNewDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDiscussionObj: Discussion = {
      id: Date.now().toString(),
      title: newDiscussion.title,
      author: { name: "You", role: "Developer", avatar: "👤" },
      category: newDiscussion.category,
      replies: 0,
      views: "0",
      activity: "just now",
      tags: newDiscussion.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      solved: false,
      content: newDiscussion.content,
      likes: 0,
      bookmarks: 0,
      isLiked: false,
      isBookmarked: false
    };

    setDiscussions(prev => [newDiscussionObj, ...prev]);
    setNewDiscussion({ title: '', category: '', content: '', tags: '' });
    setShowNewDiscussion(false);
    alert('Discussion created successfully!');
  };

  // Handle AI search
  const handleAISearch = () => {
    if (searchQuery.trim()) {
      console.log('AI searching for:', searchQuery);
      alert(`🤖 AI is searching for solutions related to: "${searchQuery}"\n\nI found 15 relevant discussions and 3 code examples that might help!`);
    }
  };

  // Handle like discussion
  const handleLikeDiscussion = (discussionId: string) => {
    setDiscussions(prev => prev.map(disc => 
      disc.id === discussionId 
        ? { ...disc, likes: disc.isLiked ? disc.likes - 1 : disc.likes + 1, isLiked: !disc.isLiked }
        : disc
    ));
  };

  // Handle bookmark discussion
  const handleBookmarkDiscussion = (discussionId: string) => {
    setDiscussions(prev => prev.map(disc => 
      disc.id === discussionId 
        ? { ...disc, bookmarks: disc.isBookmarked ? disc.bookmarks - 1 : disc.bookmarks + 1, isBookmarked: !disc.isBookmarked }
        : disc
    ));
  };

  // Handle like comment
  const handleLikeComment = (discussionId: string, commentId: string) => {
    setComments(prev => ({
      ...prev,
      [discussionId]: prev[discussionId]?.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1, isLiked: !comment.isLiked }
          : comment
      ) || []
    }));
  };

  // Handle add comment
  const handleAddComment = (discussionId: string) => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: { name: "You", role: "Developer", avatar: "👤" },
      content: commentText,
      timestamp: "just now",
      likes: 0,
      isLiked: false,
      isSolution: false
    };

    setComments(prev => ({
      ...prev,
      [discussionId]: [...(prev[discussionId] || []), newComment]
    }));

    // Update discussion reply count
    setDiscussions(prev => prev.map(disc =>
      disc.id === discussionId
        ? { ...disc, replies: disc.replies + 1 }
        : disc
    ));

    setCommentText('');
  };

  // Toggle discussion expansion
  const toggleDiscussionExpansion = (discussionId: string) => {
    setExpandedDiscussion(expandedDiscussion === discussionId ? null : discussionId);
  };

  // Format content with basic markdown
  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold text-white mt-6 mb-4">{paragraph.replace('# ', '')}</h1>;
      } else if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold text-white mt-5 mb-3">{paragraph.replace('## ', '')}</h2>;
      } else if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-bold text-white mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
      } else if (paragraph.startsWith('- **')) {
        const text = paragraph.replace('- **', '').replace('**', '');
        return (
          <li key={index} className="flex items-start mt-2">
            <span className="text-cyan-400 mr-2">•</span>
            <span className="text-gray-300"><strong className="text-cyan-300">{text.split(':')[0]}:</strong>{text.split(':').slice(1).join(':')}</span>
          </li>
        );
      } else if (paragraph.startsWith('```')) {
        const codeContent = paragraph.replace(/```\w*/, '').replace(/```$/, '');
        return (
          <pre key={index} className="bg-gray-800 rounded-lg p-4 my-3 overflow-x-auto border border-gray-600">
            <code className="text-cyan-300 font-mono text-sm">{codeContent}</code>
          </pre>
        );
      } else if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
        return (
          <div key={index} className="flex items-start mt-2">
            <span className="text-cyan-400 mr-3 font-semibold">{paragraph.split('.')[0]}.</span>
            <span className="text-gray-300 flex-1">{paragraph.split('.').slice(1).join('.').trim()}</span>
          </div>
        );
      } else if (paragraph.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="text-gray-300 mb-3 leading-relaxed">{paragraph}</p>;
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setDiscussions([...featuredDiscussions, ...activeDiscussions]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <h3 className="text-2xl font-bold text-white mb-2">Loading Aurlink Community</h3>
            <p className="text-gray-400">Initializing premium forum experience...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Aurlink Community
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Connect with other developers for solutions. Get direct access to Aurlink's engineering team and AI-powered assistance.
          </p>
          
          {/* Premium Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700">
              <div className="text-2xl font-bold text-cyan-400 mb-1">45.2K</div>
              <div className="text-gray-400 text-sm">Developers</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700">
              <div className="text-2xl font-bold text-green-400 mb-1">12.4K</div>
              <div className="text-gray-400 text-sm">Solutions</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700">
              <div className="text-2xl font-bold text-purple-400 mb-1">63%</div>
              <div className="text-gray-400 text-sm">AI Optimization</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700">
              <div className="text-2xl font-bold text-amber-400 mb-1">2.3K</div>
              <div className="text-gray-400 text-sm">Active Now</div>
            </div>
          </div>
        </div>

        {/* Search Bar - WITH AI FUNCTIONALITY */}
        <div className="bg-gray-800/30 rounded-2xl p-3 border border-gray-700 flex items-center mb-8">
          <Search className="w-5 h-5 text-gray-400 ml-4 mr-3" />
          <input 
            type="text" 
            placeholder="Ask AI or search discussions... (e.g., 'How to optimize gas in Aurion?')"
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none py-3 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAISearch()}
          />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors flex items-center text-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <button 
              onClick={handleAISearch}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center text-sm"
            >
              <Brain className="w-4 h-4 mr-2" />
              Ask AI
            </button>
          </div>
        </div>

        {/* Premium Navigation - WITH FUNCTIONAL NEW DISCUSSION BUTTON */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            {['discussions', 'categories', 'experts', 'resources'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* NEW DISCUSSION BUTTON - FUNCTIONAL */}
          <button 
            onClick={() => setShowNewDiscussion(true)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center shadow-lg shadow-cyan-500/20 hover:scale-105 transform"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Discussion
          </button>
        </div>

        {/* Featured Discussions with Expandable Cards */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Award className="w-6 h-6 text-amber-400 mr-3" />
              Featured Discussions
            </h2>
            <div className="flex items-center text-cyan-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending in Aurlink Ecosystem
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredDiscussions.map((discussion) => (
              <div key={discussion.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group">
                {/* Discussion Header - Always Visible */}
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleDiscussionExpansion(discussion.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        {discussion.pinned && (
                          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium flex items-center">
                            <Zap className="w-3 h-3 mr-1" />
                            Pinned
                          </span>
                        )}
                        {discussion.featured && (
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium flex items-center">
                            <Award className="w-3 h-3 mr-1" />
                            Featured
                          </span>
                        )}
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs">
                          {discussion.category}
                        </span>
                      </div>
                      
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-white text-xl mb-3 group-hover:text-cyan-400 transition-colors flex-1">
                          {discussion.title}
                        </h3>
                        <button className="text-gray-400 hover:text-white ml-4">
                          {expandedDiscussion === discussion.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{discussion.author.avatar}</span>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            discussion.engagement === 'very-high' ? 'bg-green-400' :
                            discussion.engagement === 'high' ? 'bg-cyan-400' : 'bg-amber-400'
                          }`}></div>
                          <span className="font-medium text-white">{discussion.author.name}</span>
                          {discussion.author.verified && (
                            <Shield className="w-4 h-4 text-blue-400 ml-1" />
                          )}
                          <span className="mx-2 text-gray-600">•</span>
                          <span className="text-cyan-400">{discussion.author.role}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {discussion.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-semibold text-white">{discussion.replies}</span>
                        <span>replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold text-white">{discussion.views}</span>
                        <span>views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{discussion.activity}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLikeDiscussion(discussion.id);
                        }}
                        className={`p-2 rounded-lg transition-colors flex items-center text-sm ${
                          discussion.isLiked 
                            ? 'bg-cyan-500/20 text-cyan-400' 
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }`}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${discussion.isLiked ? 'fill-current' : ''}`} />
                        {discussion.likes}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmarkDiscussion(discussion.id);
                        }}
                        className={`p-2 rounded-lg transition-colors flex items-center text-sm ${
                          discussion.isBookmarked 
                            ? 'bg-amber-500/20 text-amber-400' 
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 mr-1 ${discussion.isBookmarked ? 'fill-current' : ''}`} />
                        {discussion.bookmarks}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Content - Shows when discussion is expanded */}
                {expandedDiscussion === discussion.id && (
                  <div className="border-t border-gray-700 p-6 bg-gray-900/50">
                    {/* Discussion Content */}
                    <div className="mb-6">
                      {formatContent(discussion.content)}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-6">
                      <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center text-sm">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Helpful
                      </button>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center text-sm">
                        <Flag className="w-4 h-4 mr-2" />
                        Report
                      </button>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center text-sm">
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </button>
                    </div>

                    {/* Comments Section */}
                    <div className="border-t border-gray-700 pt-6">
                      <h4 className="text-white font-semibold mb-4 flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2 text-cyan-400" />
                        {comments[discussion.id]?.length || 0} Responses
                      </h4>

                      {/* Comments List */}
                      <div className="space-y-4 mb-6">
                        {comments[discussion.id]?.map((comment) => (
                          <div key={comment.id} className={`bg-gray-800/30 rounded-xl p-4 border ${
                            comment.isSolution ? 'border-green-500/20' : 'border-gray-600'
                          }`}>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center">
                                <span className="text-xl mr-3">{comment.author.avatar}</span>
                                <div>
                                  <div className="flex items-center">
                                    <span className="font-semibold text-white">{comment.author.name}</span>
                                    {comment.author.verified && (
                                      <Shield className="w-4 h-4 text-blue-400 ml-1" />
                                    )}
                                    <span className="mx-2 text-gray-600">•</span>
                                    <span className="text-cyan-400 text-sm">{comment.author.role}</span>
                                  </div>
                                  <div className="text-gray-400 text-sm">{comment.timestamp}</div>
                                </div>
                              </div>
                              {comment.isSolution && (
                                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium flex items-center">
                                  <Award className="w-3 h-3 mr-1" />
                                  Solution
                                </span>
                              )}
                            </div>
                            <p className="text-gray-300 mb-3">{comment.content}</p>
                            <div className="flex items-center justify-between">
                              <button 
                                onClick={() => handleLikeComment(discussion.id, comment.id)}
                                className={`flex items-center gap-1 text-sm ${
                                  comment.isLiked ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                                {comment.likes}
                              </button>
                              <button className="text-gray-400 hover:text-white text-sm">
                                Reply
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Comment Form */}
                      <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-600">
                        <h5 className="text-white font-semibold mb-3">Add your response</h5>
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Share your thoughts, suggestions, or solutions..."
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 resize-none mb-3"
                          rows={4}
                        />
                        <div className="flex justify-between items-center">
                          <div className="text-gray-400 text-sm">
                            Markdown is supported
                          </div>
                          <button
                            onClick={() => handleAddComment(discussion.id)}
                            disabled={!commentText.trim()}
                            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center text-sm"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Post Response
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Aurlink Topics */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h3 className="font-bold text-white text-lg mb-4 flex items-center">
                <Code className="w-5 h-5 text-cyan-400 mr-2" />
                Aurlink Topics
              </h3>
              
              <div className="space-y-3">
                {aurlinkCategories.map((category) => (
                  <div 
                    key={category.id} 
                    className="bg-gray-700/30 rounded-xl p-4 border border-gray-600 hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-3`}>
                        <category.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          {category.name}
                        </h4>
                        <div className="text-cyan-400 text-sm">{category.threadCount} discussions</div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {category.experts.slice(0, 2).map((expert, index) => (
                        <span key={index} className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs">
                          {expert}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Team Online */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h3 className="font-bold text-white text-lg mb-4 flex items-center">
                <Shield className="w-5 h-5 text-green-400 mr-2" />
                Core Team Online
              </h3>
              <div className="space-y-3">
                {coreTeam.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${member.online ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                      <span className="text-white text-sm">{member.name}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Discussions List */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-white text-lg">Active Discussions</h3>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm">
                    Latest
                  </button>
                  <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors text-sm">
                    Unanswered
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm">
                    Most Viewed
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {activeDiscussions.map((discussion) => (
                  <div key={discussion.id} className="bg-gray-700/20 rounded-xl border border-gray-600 hover:border-cyan-500/20 transition-all duration-300 group">
                    {/* Discussion Header */}
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => toggleDiscussionExpansion(discussion.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                              {discussion.category}
                            </span>
                            {discussion.solved && (
                              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs flex items-center">
                                <Shield className="w-3 h-3 mr-1" />
                                Solved
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold text-white text-lg mb-2 group-hover:text-cyan-400">
                              {discussion.title}
                            </h4>
                            <button className="text-gray-400 hover:text-white ml-4">
                              {expandedDiscussion === discussion.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-400 mb-3">
                            <span className="text-xl mr-2">{discussion.author.avatar}</span>
                            <span>By {discussion.author.name}</span>
                            <span className="mx-2">•</span>
                            <span className="text-cyan-400">{discussion.author.role}</span>
                            <span className="mx-2">•</span>
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{discussion.activity}</span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {discussion.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-600/50 text-gray-300 rounded text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-400 ml-6">
                          <div className="text-center">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              <span className="font-semibold text-white">{discussion.replies}</span>
                            </div>
                            <div>replies</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span className="font-semibold text-white">{discussion.views}</span>
                            </div>
                            <div>views</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content for Active Discussions */}
                    {expandedDiscussion === discussion.id && (
                      <div className="border-t border-gray-700 p-6 bg-gray-900/50">
                        <div className="mb-6">
                          {formatContent(discussion.content)}
                        </div>
                        
                        {/* Comments section for active discussions */}
                        <div className="border-t border-gray-700 pt-6">
                          <h4 className="text-white font-semibold mb-4 flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2 text-cyan-400" />
                            {comments[discussion.id]?.length || 0} Responses
                          </h4>

                          {comments[discussion.id]?.length > 0 ? (
                            <div className="space-y-4 mb-6">
                              {comments[discussion.id]?.map((comment) => (
                                <div key={comment.id} className="bg-gray-800/30 rounded-xl p-4 border border-gray-600">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center">
                                      <span className="text-xl mr-3">{comment.author.avatar}</span>
                                      <div>
                                        <div className="flex items-center">
                                          <span className="font-semibold text-white">{comment.author.name}</span>
                                          {comment.author.verified && (
                                            <Shield className="w-4 h-4 text-blue-400 ml-1" />
                                          )}
                                          <span className="mx-2 text-gray-600">•</span>
                                          <span className="text-cyan-400 text-sm">{comment.author.role}</span>
                                        </div>
                                        <div className="text-gray-400 text-sm">{comment.timestamp}</div>
                                      </div>
                                    </div>
                                  </div>
                                  <p className="text-gray-300 mb-3">{comment.content}</p>
                                  <div className="flex items-center justify-between">
                                    <button 
                                      onClick={() => handleLikeComment(discussion.id, comment.id)}
                                      className={`flex items-center gap-1 text-sm ${
                                        comment.isLiked ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
                                      }`}
                                    >
                                      <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                                      {comment.likes}
                                    </button>
                                    <button className="text-gray-400 hover:text-white text-sm">
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-400">
                              <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                              <p>No responses yet. Be the first to contribute!</p>
                            </div>
                          )}

                          {/* Add Comment Form */}
                          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-600">
                            <h5 className="text-white font-semibold mb-3">Add your response</h5>
                            <textarea
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Share your thoughts, suggestions, or solutions..."
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 resize-none mb-3"
                              rows={4}
                            />
                            <div className="flex justify-between items-center">
                              <div className="text-gray-400 text-sm">
                                Markdown is supported
                              </div>
                              <button
                                onClick={() => handleAddComment(discussion.id)}
                                disabled={!commentText.trim()}
                                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center text-sm"
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Post Response
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* NEW DISCUSSION MODAL */}
        {showNewDiscussion && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl border border-cyan-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white">Start New Discussion</h2>
                <button 
                  onClick={() => setShowNewDiscussion(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleNewDiscussion} className="p-6 space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Discussion Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., How to optimize Aurion contracts for gas efficiency?"
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Category</label>
                  <select
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                    value={newDiscussion.category}
                    onChange={(e) => setNewDiscussion({...newDiscussion, category: e.target.value})}
                  >
                    <option value="">Select a category</option>
                    {aurlinkCategories.map((category) => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Discussion Content</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Describe your question, issue, or topic in detail..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 resize-none"
                    value={newDiscussion.content}
                    onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g., aurion, gas-optimization, beginner"
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                    value={newDiscussion.tags}
                    onChange={(e) => setNewDiscussion({...newDiscussion, tags: e.target.value})}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewDiscussion(false)}
                    className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Create Discussion
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}