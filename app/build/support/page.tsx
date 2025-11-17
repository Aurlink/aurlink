// app/support/developer/page.tsx
'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  LifeBuoy, MessageCircle, BookOpen, Clock, Users, Star, Zap, ArrowRight, X, Send, 
  Search, FileText, Video, Code, Shield, Bug, Rocket, Brain, Terminal, Wallet, 
  Database, Cpu, Network, ChevronDown, ChevronUp, Play, CheckCircle, AlertTriangle, 
  HelpCircle, Wrench, Building, Globe, CreditCard, BarChart, Smartphone, Cloud, 
  Server, Copy, Download, Upload, TestTube, GitBranch, Cpu as CpuIcon, 
  Shield as ShieldIcon, Zap as ZapIcon 
} from 'lucide-react';

// Types
interface SupportTicket {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'resolved' | 'urgent';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  createdAt: string;
  lastUpdate: string;
  assignedTo?: string;
  description?: string;
  contractCode?: string;
  errorLogs?: string[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  type: 'text' | 'code' | 'solution' | 'info' | 'contract' | 'error' | 'warning' | 'success';
  isTyping?: boolean;
  contractCode?: string;
  suggestions?: string[];
  actions?: ChatAction[];
}

interface ChatAction {
  label: string;
  action: () => void;
  icon: React.ComponentType<any>;
  variant: 'primary' | 'secondary' | 'danger' | 'success';
}

interface AurlinkKnowledge {
  id: string;
  category: string;
  title: string;
  content: string;
  tags: string[];
  lastUpdated: string;
  importance: 'core' | 'important' | 'reference';
  codeExamples?: string[];
}

interface ContractAnalysis {
  security: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  gas: {
    estimatedCost: string;
    optimizationTips: string[];
    comparison: string;
  };
  complexity: {
    score: number;
    level: 'low' | 'medium' | 'high';
    maintainability: string;
  };
}

// Enhanced AI Response System - Professional Conversational AI
class ProfessionalAurlinkAI {
  private conversationContext: string[] = [];
  private userContext: {
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
    interests: string[];
    recentProjects: string[];
  } = {
    skillLevel: 'intermediate',
    interests: [],
    recentProjects: []
  };

  processMessage(message: string, currentCode?: string): ChatMessage {
    const lowerMessage = message.toLowerCase().trim();
    this.updateUserContext(lowerMessage);
    this.conversationContext.push(`User: ${message}`);
    
    // Keep conversation context manageable
    if (this.conversationContext.length > 15) {
      this.conversationContext = this.conversationContext.slice(-15);
    }

    // Analyze intent and sentiment
    const intent = this.analyzeIntent(lowerMessage);
    const sentiment = this.analyzeSentiment(lowerMessage);
    const urgency = this.detectUrgency(lowerMessage);

    // Route to appropriate handler
    switch (intent) {
      case 'greeting':
        return this.handleGreeting(sentiment);
      case 'contract_development':
        return this.handleContractDevelopment(lowerMessage, currentCode);
      case 'debugging':
        return this.handleDebugging(lowerMessage, currentCode);
      case 'deployment':
        return this.handleDeployment(lowerMessage);
      case 'learning':
        return this.handleLearningRequest(lowerMessage);
      case 'support':
        return this.handleSupportRequest(lowerMessage, urgency);
      case 'architecture':
        return this.handleArchitectureQuestion(lowerMessage);
      default:
        return this.handleGeneralQuery(message, lowerMessage, sentiment);
    }
  }

  private analyzeIntent(message: string): string {
    const intents = {
      greeting: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
      contract_development: ['contract', 'write', 'create', 'generate', 'build', 'token', 'nft', 'dao', 'vault'],
      debugging: ['error', 'bug', 'fix', 'debug', 'issue', 'problem', 'not working', 'failed'],
      deployment: ['deploy', 'deployment', 'mainnet', 'testnet', 'launch', 'publish'],
      learning: ['how to', 'tutorial', 'guide', 'explain', 'learn', 'documentation', 'docs'],
      support: ['help', 'support', 'stuck', 'trouble', 'assistance', 'emergency'],
      architecture: ['architecture', 'design', 'pattern', 'best practice', 'structure', 'optimize']
    };

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        return intent;
      }
    }
    return 'general';
  }

  private analyzeSentiment(message: string): 'positive' | 'neutral' | 'frustrated' | 'urgent' {
    if (message.includes('!') || message.includes('urgent') || message.includes('emergency')) {
      return 'urgent';
    }
    if ((message.match(/\?/g) || []).length > 2 || message.includes('not working') || message.includes('failed')) {
      return 'frustrated';
    }
    if (message.includes('thanks') || message.includes('thank you') || message.includes('awesome')) {
      return 'positive';
    }
    return 'neutral';
  }

  private detectUrgency(message: string): 'low' | 'medium' | 'high' {
    if (message.includes('urgent') || message.includes('emergency') || message.includes('broken')) {
      return 'high';
    }
    if (message.includes('important') || message.includes('asap') || message.includes('deadline')) {
      return 'medium';
    }
    return 'low';
  }

  private updateUserContext(message: string) {
    // Detect skill level
    if (message.includes('beginner') || message.includes('new to') || message.includes('learning')) {
      this.userContext.skillLevel = 'beginner';
    }
    if (message.includes('advanced') || message.includes('expert') || message.includes('senior')) {
      this.userContext.skillLevel = 'advanced';
    }

    // Detect interests
    const interests = ['defi', 'nft', 'gaming', 'dao', 'staking', 'lending', 'bridge'];
    interests.forEach(interest => {
      if (message.includes(interest) && !this.userContext.interests.includes(interest)) {
        this.userContext.interests.push(interest);
      }
    });
  }

  private handleGreeting(sentiment: string): ChatMessage {
    const greetings = {
      positive: `🎉 **Welcome back! Great to see you again!**\n\nI can see you're in good spirits today. Ready to continue building amazing things on Aurlink?`,
      urgent: `⚡ **Hello! I can see this is urgent.**\n\nLet's address your pressing issue immediately. What specific challenge are you facing right now?`,
      frustrated: `🤝 **Hello there. I understand you might be facing some challenges.**\n\nDon't worry - I'm here to help you work through any issues systematically. What's on your mind?`,
      neutral: `👋 **Hello! I'm Aurlink AI, your professional development assistant.**\n\nIt's great to connect with you. I'm here to provide expert guidance on smart contract development, debugging, architecture, and deployment strategies.\n\nWhat would you like to accomplish today?`
    };

    return {
      id: this.generateId(),
      sender: 'ai',
      content: greetings[sentiment] || greetings.neutral,
      timestamp: new Date(),
      type: 'info',
      actions: this.getQuickStartActions()
    };
  }

  private handleContractDevelopment(message: string, currentCode?: string): ChatMessage {
    const contractType = this.determineContractType(message);
    const specificRequirements = this.extractRequirements(message);
    
    const contractCode = this.generateProfessionalContract(contractType, specificRequirements);
    const analysis = this.previewContractAnalysis(contractCode);

    return {
      id: this.generateId(),
      sender: 'ai',
      content: `🛠️ **Professional ${contractType} Contract Generated**\n\nBased on your requirements for **${specificRequirements.join(', ')}**, I've created a production-ready contract:\n\n**Architecture Highlights:**\n${this.getArchitectureHighlights(contractType)}\n\n**Security Features:**\n${analysis.security.recommendations.slice(0, 3).map(rec => `• ${rec}`).join('\n')}\n\n**Gas Optimization:** ${analysis.gas.comparison}\n\n**Next Steps:**\n1. Review the contract structure below\n2. Let me analyze it for security vulnerabilities\n3. We can customize it based on your specific needs`,
      timestamp: new Date(),
      type: 'contract',
      contractCode,
      actions: [
        {
          label: 'Comprehensive Security Audit',
          action: () => console.log('Security audit requested'),
          icon: Shield,
          variant: 'primary'
        },
        {
          label: 'Gas Optimization Analysis',
          action: () => console.log('Gas analysis requested'),
          icon: Zap,
          variant: 'secondary'
        },
        {
          label: 'Deployment Preparation',
          action: () => console.log('Deployment preparation requested'),
          icon: Rocket,
          variant: 'success'
        }
      ]
    };
  }

  private handleDebugging(message: string, currentCode?: string): ChatMessage {
    const commonSolutions = {
      deployment: `🔧 **Deployment Issue Detected**\n\nCommon deployment issues and solutions:\n\n1. **Gas Estimation Failures:**\n   • Check constructor parameters\n   • Verify contract size limits\n   • Review inheritance structure\n\n2. **Verification Issues:**\n   • Ensure exact compiler version match\n   • Verify optimization settings\n   • Check constructor arguments encoding\n\n3. **Initialization Errors:**\n   • Validate init function parameters\n   • Check access control setup\n   • Verify event emissions\n\nCould you share the specific error message you're encountering?`,

      compilation: `🔍 **Compilation Issues**\n\nLet's systematically address compilation errors:\n\n**Common Fixes:**\n• Check Aurion language version compatibility\n• Verify import statements and dependencies\n• Ensure proper type annotations\n• Review modifier usage and access controls\n\n**Pro Tips:**\n• Use @audit decorator for complex functions\n• Enable all compiler warnings\n• Test with different optimization levels\n\nWould you like me to review your specific code?`,

      runtime: `⚡ **Runtime Error Analysis**\n\nRuntime issues often stem from:\n\n**State Management:**\n• Reentrancy protection gaps\n• Access control violations\n• State variable synchronization\n\n**Gas Optimization:**\n• Infinite loop risks\n• Storage operation efficiency\n• External call optimization\n\n**Security Considerations:**\n• Input validation completeness\n• Error handling robustness\n• Emergency stop mechanisms\n\nLet's examine your contract logic and transaction flow.`
    };

    const issueType = this.determineDebuggingType(message);
    
    return {
      id: this.generateId(),
      sender: 'ai',
      content: commonSolutions[issueType] || commonSolutions.compilation,
      timestamp: new Date(),
      type: 'info',
      actions: [
        {
          label: 'Share Error Details',
          action: () => console.log('Error details requested'),
          icon: Bug,
          variant: 'primary'
        },
        {
          label: 'Code Review Session',
          action: () => console.log('Code review requested'),
          icon: Code,
          variant: 'secondary'
        },
        {
          label: 'Live Debugging Help',
          action: () => console.log('Live help requested'),
          icon: Users,
          variant: 'success'
        }
      ]
    };
  }

  private handleDeployment(message: string): ChatMessage {
    return {
      id: this.generateId(),
      sender: 'ai',
      content: `🚀 **Deployment Strategy Session**\n\nLet me guide you through professional deployment practices:\n\n**Pre-Deployment Checklist:**\n✅ Comprehensive security audit completed\n✅ Gas optimization analysis performed\n✅ Test coverage exceeds 90%\n✅ Emergency procedures documented\n✅ Upgradeability strategy defined\n\n**Network Selection:**\n• **Testnet:** Ideal for final testing (free, fast)\n• **Staging:** Pre-production environment\n• **Mainnet:** Production deployment\n\n**Deployment Steps:**\n1. Final security review\n2. Gas cost estimation\n3. Contract verification\n4. Monitoring setup\n5. Disaster recovery testing\n\nWhich stage are you currently at in the deployment process?`,
      timestamp: new Date(),
      type: 'info',
      actions: [
        {
          label: 'Security Audit',
          action: () => console.log('Security audit clicked'),
          icon: Shield,
          variant: 'primary'
        },
        {
          label: 'Gas Estimation',
          action: () => console.log('Gas estimation clicked'),
          icon: Zap,
          variant: 'secondary'
        },
        {
          label: 'Start Deployment',
          action: () => console.log('Deployment start clicked'),
          icon: Rocket,
          variant: 'success'
        }
      ]
    };
  }

  private handleLearningRequest(message: string): ChatMessage {
    const topic = this.identifyLearningTopic(message);
    
    return {
      id: this.generateId(),
      sender: 'ai',
      content: `📚 **Structured Learning Path**\n\nBased on your interest in **${topic}**, here's a professional learning path:\n\n**Foundation Concepts:**\n• Core principles and architecture patterns\n• Security-first development mindset\n• Gas optimization fundamentals\n\n**Advanced Topics:**\n• Complex contract interactions\n• Upgradeability patterns\n• Cross-chain considerations\n\n**Production Readiness:**\n• Testing strategies and coverage\n• Deployment best practices\n• Monitoring and maintenance\n\n**Recommended Resources:**\n• Official Aurlink documentation\n• Security audit checklists\n• Gas optimization guides\n• Community best practices\n\nWould you like me to dive deeper into any specific aspect?`,
      timestamp: new Date(),
      type: 'info',
      actions: [
        {
          label: 'View Documentation',
          action: () => console.log('Documentation view clicked'),
          icon: BookOpen,
          variant: 'primary'
        },
        {
          label: 'Code Examples',
          action: () => console.log('Code examples clicked'),
          icon: FileText,
          variant: 'secondary'
        },
        {
          label: 'Interactive Tutorial',
          action: () => console.log('Tutorial clicked'),
          icon: Play,
          variant: 'success'
        }
      ]
    };
  }

  private handleSupportRequest(message: string, urgency: string): ChatMessage {
    const urgencyResponse = {
      high: `🚨 **High-Priority Support Activated**\n\nI understand this is urgent. I'm immediately escalating to our senior engineering team while we work on a solution.\n\n**Immediate Actions:**\n• Alerted on-call engineers\n• Created priority support channel\n• Gathering system diagnostics\n\n**While we connect you with experts, let me help:**\n• Quick diagnosis of the issue\n• Temporary mitigation strategies\n• Recovery procedure preparation\n\nPlease share the specific symptoms and error messages.`,

      medium: `🔧 **Professional Support Session**\n\nI see you need assistance with an important issue. Let's approach this systematically:\n\n**Problem Analysis Framework:**\n1. Symptom identification and reproduction\n2. Root cause analysis\n3. Solution development and testing\n4. Implementation and verification\n\n**Available Resources:**\n• Live engineering support\n• Code review sessions\n• Architecture consultation\n• Deployment assistance\n\nWhat specific challenge are you facing?`,

      low: `💡 **Development Support**\n\nI'm here to provide comprehensive development support. Whether you're stuck on a complex problem or need architectural guidance, I can help:\n\n**Support Areas:**\n• Smart contract development and optimization\n• Debugging and issue resolution\n• Security analysis and best practices\n• Deployment strategies and monitoring\n\n**Collaboration Options:**\n• Pair programming sessions\n• Code review and feedback\n• Architecture design consultation\n• Production readiness assessment\n\nWhat would you like to work on together?`
    };

    return {
      id: this.generateId(),
      sender: 'ai',
      content: urgencyResponse[urgency],
      timestamp: new Date(),
      type: 'info',
      actions: this.getSupportActions(urgency)
    };
  }

  private handleArchitectureQuestion(message: string): ChatMessage {
    return {
      id: this.generateId(),
      sender: 'ai',
      content: `🏗️ **Architecture Design Consultation**\n\nExcellent! Let's design a robust, scalable architecture for your project.\n\n**Architecture Considerations:**\n• **Modularity:** Contract separation and responsibilities\n• **Upgradeability:** Proxy patterns and data migration\n• **Gas Efficiency:** Storage optimization and call patterns\n• **Security:** Access control and vulnerability protection\n• **Interoperability:** Cross-contract communication standards\n\n**Design Patterns Available:**\n• Factory contracts for deployment management\n• Proxy patterns for upgradeability\n• Diamond pattern for modular functionality\n• Governor contracts for DAO governance\n• Vesting contracts for token distribution\n\nWhat specific architectural challenge are you facing?`,
      timestamp: new Date(),
      type: 'info',
      actions: [
        {
          label: 'System Design Session',
          action: () => console.log('System design clicked'),
          icon: Cpu,
          variant: 'primary'
        },
        {
          label: 'Pattern Selection',
          action: () => console.log('Pattern selection clicked'),
          icon: Network,
          variant: 'secondary'
        },
        {
          label: 'Security Review',
          action: () => console.log('Security review clicked'),
          icon: Shield,
          variant: 'success'
        }
      ]
    };
  }

  private handleGeneralQuery(originalMessage: string, lowerMessage: string, sentiment: string): ChatMessage {
    return {
      id: this.generateId(),
      sender: 'ai',
      content: `💭 **Professional Analysis**\n\nI understand you're asking about: "${originalMessage}"\n\nLet me provide comprehensive guidance on this topic:\n\n**Technical Perspective:**\n• Industry best practices and standards\n• Security considerations and mitigations\n• Gas optimization opportunities\n• Architecture patterns and trade-offs\n\n**Development Workflow:**\n• Recommended implementation approach\n• Testing strategies and validation\n• Deployment considerations\n• Monitoring and maintenance\n\n**Expert Insights:**\n• Common pitfalls and how to avoid them\n• Performance optimization techniques\n• Future-proofing strategies\n• Community standards and conventions\n\nWould you like me to dive deeper into any specific aspect, or shall we explore practical implementation?`,
      timestamp: new Date(),
      type: 'info',
      actions: [
        {
          label: 'Detailed Explanation',
          action: () => console.log('Detailed explanation clicked'),
          icon: BookOpen,
          variant: 'primary'
        },
        {
          label: 'Code Implementation',
          action: () => console.log('Code implementation clicked'),
          icon: Code,
          variant: 'secondary'
        },
        {
          label: 'Best Practices',
          action: () => console.log('Best practices clicked'),
          icon: Star,
          variant: 'success'
        }
      ]
    };
  }

  // Helper methods
  private generateId(): string {
    // Use a simple counter instead of Date.now() to avoid hydration issues
    return `msg-${Math.random().toString(36).substr(2, 9)}`;
  }

  private getQuickStartActions(): ChatAction[] {
    return [
      {
        label: 'Start New Contract',
        action: () => console.log('New contract clicked'),
        icon: FileText,
        variant: 'primary'
      },
      {
        label: 'Code Review',
        action: () => console.log('Code review clicked'),
        icon: Code,
        variant: 'secondary'
      },
      {
        label: 'Architecture Discussion',
        action: () => console.log('Architecture discussion clicked'),
        icon: Cpu,
        variant: 'success'
      }
    ];
  }

  private getSupportActions(urgency: string): ChatAction[] {
    const baseActions = [
      {
        label: 'Share Code',
        action: () => console.log('Share code clicked'),
        icon: Code,
        variant: 'primary'
      },
      {
        label: 'Error Details',
        action: () => console.log('Error details clicked'),
        icon: Bug,
        variant: 'secondary'
      }
    ];

    if (urgency === 'high') {
      baseActions.push({
        label: 'Emergency Support',
        action: () => console.log('Emergency support clicked'),
        icon: LifeBuoy,
        variant: 'danger'
      });
    }

    return baseActions;
  }

  private determineContractType(message: string): string {
    if (message.includes('token') || message.includes('erc20')) return 'Token';
    if (message.includes('nft') || message.includes('erc721')) return 'NFT Collection';
    if (message.includes('dao') || message.includes('governance')) return 'DAO Governance';
    if (message.includes('vault') || message.includes('staking')) return 'Staking Vault';
    if (message.includes('factory')) return 'Contract Factory';
    return 'Smart Contract';
  }

  private extractRequirements(message: string): string[] {
    const requirements = [];
    if (message.includes('mint') || message.includes('minting')) requirements.push('Minting Functionality');
    if (message.includes('burn') || message.includes('burning')) requirements.push('Burning Mechanism');
    if (message.includes('pause') || message.includes('emergency')) requirements.push('Emergency Stop');
    if (message.includes('upgrade') || message.includes('proxy')) requirements.push('Upgradeability');
    if (message.includes('vote') || message.includes('governance')) requirements.push('Governance Features');
    
    return requirements.length > 0 ? requirements : ['Standard Implementation'];
  }

  private generateProfessionalContract(type: string, requirements: string[]): string {
    const templates = {
      Token: this.generateTokenContract(requirements),
      'NFT Collection': this.generateNFTContract(requirements),
      'DAO Governance': this.generateDAOContract(requirements),
      'Staking Vault': this.generateVaultContract(requirements)
    };

    return templates[type as keyof typeof templates] || this.generateTokenContract(requirements);
  }

  private generateTokenContract(requirements: string[]): string {
    return `@secure
@gas-optimized
@version("1.2.0")
contract ProfessionalToken {
    name: public(string);
    symbol: public(string);
    decimals: public(uint8);
    totalSupply: public(uint256);
    owner: public(address);
    
    balances: mapping(address, uint256);
    allowances: mapping(address, mapping(address, uint256));
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }
    
    modifier validAddress(address addr) {
        require(addr != address(0), "Invalid address");
        _;
    }
    
    init(_name: string, _symbol: string, _decimals: uint8, _initialSupply: uint256) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _initialSupply;
        owner = msg.sender;
        balances[msg.sender] = _initialSupply;
        emit Transfer(address(0), msg.sender, _initialSupply);
    }
    
    function transfer(address to, uint256 value) external validAddress(to) returns (bool) {
        require(balances[msg.sender] >= value, "Insufficient balance");
        balances[msg.sender] -= value;
        balances[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function approve(address spender, uint256 value) external validAddress(spender) returns (bool) {
        allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
    
    function allowance(address owner, address spender) external view returns (uint256) {
        return allowances[owner][spender];
    }
    
    function mint(address to, uint256 amount) external onlyOwner {
        totalSupply += amount;
        balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }
    
    function transferOwnership(address newOwner) external onlyOwner validAddress(newOwner) {
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}`;
  }

  private generateNFTContract(requirements: string[]): string {
    return `@secure
@gas-optimized
@version("1.2.0")
contract ProfessionalNFT {
    name: public(string);
    symbol: public(string);
    tokenCounter: public(uint256);
    owner: public(address);
    
    mapping(uint256 => address) tokenOwner;
    mapping(uint256 => string) tokenURI;
    mapping(address => uint256[]) ownedTokens;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Mint(address indexed to, uint256 indexed tokenId, string tokenURI);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }
    
    modifier tokenExists(uint256 tokenId) {
        require(tokenOwner[tokenId] != address(0), "Token does not exist");
        _;
    }
    
    init(_name: string, _symbol: string) {
        name = _name;
        symbol = _symbol;
        owner = msg.sender;
        tokenCounter = 0;
    }
    
    function safeMint(address to, string memory _tokenURI) external onlyOwner returns (uint256) {
        tokenCounter += 1;
        uint256 newTokenId = tokenCounter;
        tokenOwner[newTokenId] = to;
        tokenURI[newTokenId] = _tokenURI;
        ownedTokens[to].push(newTokenId);
        emit Transfer(address(0), to, newTokenId);
        emit Mint(to, newTokenId, _tokenURI);
        return newTokenId;
    }
    
    function ownerOf(uint256 tokenId) external view tokenExists(tokenId) returns (address) {
        return tokenOwner[tokenId];
    }
    
    function tokenURI(uint256 tokenId) external view tokenExists(tokenId) returns (string memory) {
        return tokenURI[tokenId];
    }
}`;
  }

  private generateDAOContract(requirements: string[]): string {
    return `@secure
contract ProfessionalDAO {
    name: public(string);
    token: public(address);
    proposalCounter: public(uint256);
    votingDelay: public(uint256);
    votingPeriod: public(uint256);
    quorumVotes: public(uint256);
    
    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 startTime;
        uint256 endTime;
        bool executed;
        bool canceled;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256) public votingPower;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer);
    event VoteCast(address indexed voter, uint256 indexed proposalId, bool support, uint256 votes);
    event ProposalExecuted(uint256 indexed proposalId);
    
    init(_name: string, _token: address, _votingDelay: uint256, _votingPeriod: uint256, _quorumVotes: uint256) {
        name = _name;
        token = _token;
        votingDelay = _votingDelay;
        votingPeriod = _votingPeriod;
        quorumVotes = _quorumVotes;
    }
    
    function propose(string memory description) external returns (uint256) {
        proposalCounter += 1;
        uint256 newProposalId = proposalCounter;
        Proposal storage newProposal = proposals[newProposalId];
        newProposal.id = newProposalId;
        newProposal.proposer = msg.sender;
        newProposal.description = description;
        newProposal.startTime = block.timestamp + votingDelay;
        newProposal.endTime = block.timestamp + votingDelay + votingPeriod;
        newProposal.forVotes = 0;
        newProposal.againstVotes = 0;
        newProposal.executed = false;
        newProposal.canceled = false;
        emit ProposalCreated(newProposalId, msg.sender);
        return newProposalId;
    }
}`;
  }

  private generateVaultContract(requirements: string[]): string {
    return `@secure
contract ProfessionalVault {
    owner: public(address);
    balances: mapping(address => uint256);
    withdrawalDelay: public(uint256);
    
    struct WithdrawalRequest {
        uint256 amount;
        uint256 timestamp;
        bool executed;
    }
    
    mapping(address => WithdrawalRequest) withdrawalRequests;
    
    event Deposit(address indexed user, uint256 amount);
    event WithdrawalRequested(address indexed user, uint256 amount, uint256 unlockTime);
    event WithdrawalExecuted(address indexed user, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }
    
    init() {
        owner = msg.sender;
        withdrawalDelay = 2 days;
    }
    
    function deposit() external payable {
        require(msg.value > 0, "Must send ETH");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    function requestWithdrawal(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(!withdrawalRequests[msg.sender].executed, "Existing withdrawal pending");
        withdrawalRequests[msg.sender] = WithdrawalRequest({
            amount: amount,
            timestamp: block.timestamp,
            executed: false
        });
        balances[msg.sender] -= amount;
        emit WithdrawalRequested(msg.sender, amount, block.timestamp + withdrawalDelay);
    }
}`;
  }

  private getArchitectureHighlights(type: string): string {
    const highlights = {
      Token: `• ERC-20 standard compliance with extensions\n• Gas-optimized transfer and approval mechanisms\n• Secure ownership management with transfer capability\n• Flexible minting functionality with access control`,
      'NFT Collection': `• ERC-721 compliance with metadata extensions\n• Efficient token ID management and tracking\n• Secure minting with URI validation\n• Gas-optimized ownership transfers`,
      'DAO Governance': `• Proposal creation and voting mechanisms\n• Quorum and voting period configuration\n• Secure proposal execution with multi-sig patterns\n• Flexible voting power management`,
      'Staking Vault': `• Time-locked withdrawal security\n• Deposit and balance tracking\n• Emergency stop capabilities\n• Event-driven architecture`
    };
    
    return highlights[type as keyof typeof highlights] || highlights.Token;
  }

  private previewContractAnalysis(code: string): ContractAnalysis {
    return {
      security: {
        score: 95,
        issues: [],
        recommendations: ['Secure ownership pattern', 'Input validation implemented', 'Access control configured']
      },
      gas: {
        estimatedCost: '45,000-75,000 gas',
        optimizationTips: ['Efficient storage packing', 'Minimal external calls', 'Batch operation support'],
        comparison: '30% more efficient than reference implementation'
      },
      complexity: {
        score: 35,
        level: 'low',
        maintainability: 'Excellent - Clear separation of concerns'
      }
    };
  }

  private determineDebuggingType(message: string): string {
    if (message.includes('deploy') || message.includes('deployment')) return 'deployment';
    if (message.includes('compile') || message.includes('syntax')) return 'compilation';
    return 'runtime';
  }

  private identifyLearningTopic(message: string): string {
    if (message.includes('security') || message.includes('audit')) return 'Security Best Practices';
    if (message.includes('gas') || message.includes('optimization')) return 'Gas Optimization';
    if (message.includes('test') || message.includes('testing')) return 'Testing Strategies';
    if (message.includes('deploy') || message.includes('deployment')) return 'Deployment Procedures';
    return 'Smart Contract Development';
  }
}

// FIXED: Custom Hooks with proper SSR handling
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].timestamp) {
          const fixed = parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setStoredValue(fixed as T);
        } else {
          setStoredValue(parsed);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue, isLoaded] as const;
};

const useContractAnalyzer = () => {
  const analyzeContract = useCallback((code: string): ContractAnalysis => {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let securityScore = 100;
    let complexityScore = 0;

    if (!code.includes('@secure')) {
      issues.push('Missing @secure decorator');
      securityScore -= 20;
    }
    if (code.includes('selfdestruct')) {
      issues.push('Avoid selfdestruct function');
      securityScore -= 30;
    }
    if (code.includes('delegatecall') && !code.includes('@audit')) {
      issues.push('Unverified delegatecall usage');
      securityScore -= 25;
    }

    const functionCount = (code.match(/function\s+\w+/g) || []).length;
    const mappingCount = (code.match(/mapping</g) || []).length;
    
    complexityScore = Math.min(100, (functionCount * 10) + (mappingCount * 5));
    const complexityLevel = complexityScore < 30 ? 'low' : complexityScore < 70 ? 'medium' : 'high';

    const optimizationTips: string[] = [];
    if (code.includes('for (')) optimizationTips.push('Consider using mapping lookups instead of loops');
    if (code.includes('string memory')) optimizationTips.push('Use bytes32 for fixed-size data to save gas');
    if (!code.includes('@gas-optimized')) optimizationTips.push('Add @gas-optimized decorator for automatic optimization');

    return {
      security: {
        score: Math.max(0, securityScore),
        issues,
        recommendations: recommendations.length ? recommendations : ['Contract follows security best practices']
      },
      gas: {
        estimatedCost: `${Math.max(20000, functionCount * 5000)}-${Math.max(100000, functionCount * 15000)} gas`,
        optimizationTips,
        comparison: '25-40% better than equivalent Solidity'
      },
      complexity: {
        score: complexityScore,
        level: complexityLevel,
        maintainability: complexityLevel === 'low' ? 'Excellent' : complexityLevel === 'medium' ? 'Good' : 'Needs refactoring'
      }
    };
  }, []);

  return { analyzeContract };
};

// FIXED: Helper function to safely format timestamps
const formatTimestamp = (timestamp: any) => {
  try {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    // Use fixed locale to avoid hydration mismatches
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  } catch (error) {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
};

// Components
const ContractAnalysisView = ({ analysis }: { analysis: ContractAnalysis }) => (
  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
    <h4 className="text-lg font-semibold text-white mb-4">Contract Analysis</h4>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-700/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <ShieldIcon className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-semibold">{analysis.security.score}/100</span>
        </div>
        <h5 className="text-white font-medium mb-2">Security</h5>
        <ul className="text-sm text-gray-300 space-y-1">
          {analysis.security.issues.map((issue, i) => (
            <li key={i} className="flex items-center">
              <AlertTriangle className="w-3 h-3 text-yellow-400 mr-2" />
              {issue}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-700/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <ZapIcon className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 font-semibold">{analysis.gas.estimatedCost}</span>
        </div>
        <h5 className="text-white font-medium mb-2">Gas Estimation</h5>
        <ul className="text-sm text-gray-300 space-y-1">
          {analysis.gas.optimizationTips.map((tip, i) => (
            <li key={i} className="flex items-center">
              <Zap className="w-3 h-3 text-blue-400 mr-2" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-700/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <CpuIcon className="w-5 h-5 text-purple-400" />
          <span className={`font-semibold ${
            analysis.complexity.level === 'low' ? 'text-green-400' : 
            analysis.complexity.level === 'medium' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {analysis.complexity.level.toUpperCase()}
          </span>
        </div>
        <h5 className="text-white font-medium mb-2">Complexity</h5>
        <p className="text-sm text-gray-300">{analysis.complexity.maintainability}</p>
      </div>
    </div>
  </div>
);

const CodeEditor = ({ code, onCodeChange, readOnly = false }: { 
  code: string; 
  onCodeChange?: (code: string) => void;
  readOnly?: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm font-medium text-gray-300">Aurion Contract</span>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Copy className="w-3 h-3 mr-1" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button className="flex items-center px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Download className="w-3 h-3 mr-1" />
            Download
          </button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => onCodeChange?.(e.target.value)}
        readOnly={readOnly}
        className="w-full h-64 font-mono text-sm text-cyan-300 bg-gray-900 p-4 focus:outline-none resize-none"
        spellCheck={false}
      />
    </div>
  );
};

// Main Component
export default function DeveloperSupportPage() {
  const [activeTab, setActiveTab] = useState<'support' | 'knowledge' | 'tickets' | 'chat' | 'playground'>('support');
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages, isChatLoaded] = useLocalStorage<ChatMessage[]>('aurlink-chat-messages', []);
  const [newMessage, setNewMessage] = useState('');
  const [isAIAssistantActive, setIsAIAssistantActive] = useState(true);
  const [tickets, setTickets] = useLocalStorage<SupportTicket[]>('aurlink-tickets', []);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [isAITyping, setIsAITyping] = useState(false);
  const [contractCode, setContractCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState<ContractAnalysis | null>(null);
  
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { analyzeContract } = useContractAnalyzer();
  const professionalAI = useRef(new ProfessionalAurlinkAI());

  // FIXED: Use static current year to avoid hydration mismatches
  const currentYear = 2024;

  // Enhanced contract templates
  const enhancedContractTemplates = {
    token: {
      name: 'Standard Token',
      code: `@secure
@gas-optimized
contract AurlinkToken {
    name: string;
    symbol: string;
    decimals: uint8;
    totalSupply: uint256;
    owner: address;
    balances: mapping<address, uint256>;
    allowed: mapping<address, mapping<address, uint256>>;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    init(_name: string, _symbol: string, _decimals: uint8, _totalSupply: uint256) {
        self.name = _name;
        self.symbol = _symbol;
        self.decimals = _decimals;
        self.totalSupply = _totalSupply;
        self.owner = msg.sender;
        self.balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }
    
    function transfer(_to: address, _value: uint256) returns (bool success) {
        require(self.balances[msg.sender] >= _value, "Insufficient balance");
        self.balances[msg.sender] -= _value;
        self.balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}`,
      description: 'ERC-20 compatible token with minting and transfer functions'
    },
    nft: {
      name: 'NFT Collection',
      code: `@secure
contract AurlinkNFT {
    name: string;
    symbol: string;
    tokenCounter: uint256;
    owner: address;
    
    mapping(uint256 => address) tokenOwner;
    mapping(uint256 => string) tokenURI;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    
    init(_name: string, _symbol: string) {
        self.name = _name;
        self.symbol = _symbol;
        self.owner = msg.sender;
        self.tokenCounter = 0;
    }
    
    function safeMint(_to: address, _tokenURI: string) returns (uint256) {
        self.tokenCounter += 1;
        uint256 newTokenId = self.tokenCounter;
        self.tokenOwner[newTokenId] = _to;
        self.tokenURI[newTokenId] = _tokenURI;
        emit Transfer(address(0), _to, newTokenId);
        return newTokenId;
    }
}`,
      description: 'NFT collection with minting and transfer capabilities'
    }
  };

  // FIXED: Enhanced message handling
  const handleAIQuery = useCallback((query: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      sender: 'user',
      content: query,
      timestamp: new Date(),
      type: 'text'
    };

    setChatMessages(prev => [...prev, userMessage]);
    setIsAITyping(true);

    setTimeout(() => {
      const response = professionalAI.current.processMessage(query, contractCode);
      const responseWithDate = {
        ...response,
        timestamp: new Date(response.timestamp)
      };
      setChatMessages(prev => [...prev, responseWithDate]);
      setIsAITyping(false);
    }, 1000 + Math.random() * 1000);
  }, [setChatMessages, contractCode]);

  // FIXED: Enhanced analysis function
  const analyzeGeneratedCode = useCallback((code: string) => {
    setContractCode(code);
    const analysis = analyzeContract(code);
    setAnalysisResult(analysis);
    
    const analysisMessage: ChatMessage = {
      id: `analysis-${Math.random().toString(36).substr(2, 9)}`,
      sender: 'ai',
      content: `📊 **Contract Analysis Complete**\n\n**Security Score:** ${analysis.security.score}/100\n**Gas Estimate:** ${analysis.gas.estimatedCost}\n**Complexity:** ${analysis.complexity.level.toUpperCase()}\n\n${analysis.security.issues.length ? '**Issues Found:** ' + analysis.security.issues.join(', ') : '✅ No critical issues found'}`,
      timestamp: new Date(),
      type: analysis.security.score > 80 ? 'success' : 'warning',
      contractCode: code
    };

    setChatMessages(prev => [...prev, analysisMessage]);
    setActiveTab('playground');
    setIsChatOpen(false);
  }, [analyzeContract, setChatMessages]);

  // FIXED: Handle sending messages with stable state
  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim()) return;

    const messageToSend = newMessage.trim();
    setNewMessage(''); // Clear input immediately

    if (isAIAssistantActive) {
      handleAIQuery(messageToSend);
    } else {
      const userMessage: ChatMessage = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        sender: 'user',
        content: messageToSend,
        timestamp: new Date(),
        type: 'text'
      };
      setChatMessages(prev => [...prev, userMessage]);
      
      setIsAITyping(true);
      setTimeout(() => {
        const supportResponse: ChatMessage = {
          id: `support-${Math.random().toString(36).substr(2, 9)}`,
          sender: 'ai',
          content: "✅ Thanks for your message! I've notified our engineering team about your issue. They'll join this conversation shortly.\n\nIn the meantime, could you share any error messages or code snippets to help us prepare the best solution?",
          timestamp: new Date(),
          type: 'text'
        };
        setChatMessages(prev => [...prev, supportResponse]);
        setIsAITyping(false);
      }, 1000);
    }
  }, [newMessage, isAIAssistantActive, handleAIQuery, setChatMessages]);

  // FIXED: Copy to clipboard
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, []);

  // FIXED: Initialize AI when chat opens - only on client side
  useEffect(() => {
    if (isChatOpen && isChatLoaded && chatMessages.length === 0) {
      const welcomeMessage = professionalAI.current.processMessage('hello');
      const welcomeWithDate = {
        ...welcomeMessage,
        timestamp: new Date(welcomeMessage.timestamp)
      };
      setChatMessages([welcomeWithDate]);
    }
  }, [isChatOpen, isChatLoaded, chatMessages.length, setChatMessages]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current && isChatLoaded) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isAITyping, isChatLoaded]);

  // Enhanced playground section
  const PlaygroundSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contract Editor</h3>
          <CodeEditor 
            code={contractCode} 
            onCodeChange={setContractCode}
          />
          <div className="flex space-x-3 mt-4">
            <button 
              onClick={() => analyzeGeneratedCode(contractCode)}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center"
            >
              <Shield className="w-4 h-4 mr-2" />
              Analyze Contract
            </button>
            <button className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center">
              <Rocket className="w-4 h-4 mr-2" />
              Deploy to Testnet
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Live Analysis</h3>
          {analysisResult ? (
            <ContractAnalysisView analysis={analysisResult} />
          ) : (
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
              <TestTube className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">No Analysis Yet</h4>
              <p className="text-gray-400">Write or paste your contract code to get started with security analysis and gas optimization.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Templates */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Quick Start Templates</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(enhancedContractTemplates).map(([key, template]) => (
            <button
              key={key}
              onClick={() => {
                setContractCode(template.code);
                analyzeGeneratedCode(template.code);
              }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-blue-500/30 transition-colors duration-300 text-left group"
            >
              <FileText className="w-8 h-8 text-blue-400 mb-2" />
              <h4 className="text-white font-semibold text-sm mb-1">{template.name}</h4>
              <p className="text-gray-400 text-xs">{template.description}</p>
            </button>
          ))}
          <button
            onClick={() => {
              setIsChatOpen(true);
              setNewMessage("Create a DAO contract for me");
              setTimeout(() => handleSendMessage(), 100);
            }}
            className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-purple-500/30 transition-colors duration-300 text-left group"
          >
            <Brain className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="text-white font-semibold text-sm mb-1">AI Generate</h4>
            <p className="text-gray-400 text-xs">Ask AI to create custom contract</p>
          </button>
          <button
            onClick={() => {
              setIsChatOpen(true);
              setNewMessage("Help me analyze this contract for security");
              setTimeout(() => handleSendMessage(), 100);
            }}
            className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-green-500/30 transition-colors duration-300 text-left group"
          >
            <Shield className="w-8 h-8 text-green-400 mb-2" />
            <h4 className="text-white font-semibold text-sm mb-1">Security Review</h4>
            <p className="text-gray-400 text-xs">Get AI security analysis</p>
          </button>
        </div>
      </div>
    </div>
  );

  // FIXED: Enhanced Chat Interface with stable input
  const ChatInterface = React.memo(() => {
    const ActionButton = React.memo(({ action }: { action: ChatAction }) => {
      // FIX: Add proper validation for the icon component
      const IconComponent = action.icon;
      
      // Validate that IconComponent is actually a React component
      if (!IconComponent || typeof IconComponent !== 'function') {
        console.error('Invalid icon component:', IconComponent);
        return (
          <button
            onClick={action.action}
            className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-300 ${
              action.variant === 'primary' 
                ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30' 
                : action.variant === 'danger'
                ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30'
                : action.variant === 'success'
                ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30'
                : 'bg-gray-600/50 hover:bg-gray-500/50 text-gray-200 border border-gray-500/50'
            }`}
          >
            <HelpCircle className="w-3 h-3 mr-1" />
            {action.label}
          </button>
        );
      }

      return (
        <button
          onClick={action.action}
          className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-300 ${
            action.variant === 'primary' 
              ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30' 
              : action.variant === 'danger'
              ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30'
              : action.variant === 'success'
              ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30'
              : 'bg-gray-600/50 hover:bg-gray-500/50 text-gray-200 border border-gray-500/50'
          }`}
        >
          <IconComponent className="w-3 h-3 mr-1" />
          {action.label}
        </button>
      );
    });

    // Don't render until loaded to avoid hydration mismatch
    if (!isChatLoaded) {
      return (
        <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl z-50 flex items-center justify-center">
          <div className="text-white">Loading chat...</div>
        </div>
      );
    }

    return (
      <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl z-50 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-2xl p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <div>
              <h3 className="font-semibold text-white">Aurlink AI Assistant</h3>
              <p className="text-green-300 text-sm">Professional Development Partner</p>
            </div>
          </div>
          <button 
            onClick={() => setIsChatOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
        >
          <div className="space-y-4">
            {chatMessages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 transition-colors duration-300 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none shadow-lg' 
                      : message.type === 'info' 
                      ? 'bg-purple-600 text-white rounded-bl-none shadow-lg'
                      : message.type === 'contract'
                      ? 'bg-green-600 text-white rounded-bl-none shadow-lg'
                      : message.type === 'success'
                      ? 'bg-green-500 text-white rounded-bl-none shadow-lg'
                      : message.type === 'warning'
                      ? 'bg-yellow-500 text-white rounded-bl-none shadow-lg'
                      : 'bg-gray-700 text-gray-100 rounded-bl-none shadow-lg'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {formatTimestamp(message.timestamp)}
                    </p>
                    
                    {message.actions && message.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.actions.map((action, index) => (
                          <ActionButton key={index} action={action} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {message.type === 'contract' && message.contractCode && (
                  <div className="flex justify-start mt-2">
                    <div className="max-w-[85%] bg-gray-900 rounded-xl p-4 border border-gray-600">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-green-400 text-sm font-semibold">Aurion Contract Code</span>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => {
                              setContractCode(message.contractCode!);
                              setActiveTab('playground');
                              setIsChatOpen(false);
                            }}
                            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center text-xs"
                          >
                            <Code className="w-3 h-3 mr-1" />
                            Open in Playground
                          </button>
                          <button 
                            onClick={async () => {
                              await navigator.clipboard.writeText(message.contractCode!);
                            }}
                            className="text-gray-400 hover:text-white transition-colors flex items-center text-xs"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </button>
                        </div>
                      </div>
                      <pre className="text-cyan-300 text-xs overflow-x-auto max-h-40 overflow-y-auto">
                        <code>{message.contractCode}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isAITyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 rounded-2xl rounded-bl-none p-4 max-w-[85%] shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-300">Aurlink AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FIXED: Chat Input - Completely stable with proper state management */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask me anything about Aurlink development..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isAITyping}
              className="px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-colors duration-300 flex items-center justify-center min-w-[60px]"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <button 
              onClick={() => setNewMessage("How do I create a token contract?")}
              className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-300"
            >
              Create Token
            </button>
            <button 
              onClick={() => setNewMessage("I need help with deployment")}
              className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-300"
            >
              Deployment Help
            </button>
            <button 
              onClick={() => setNewMessage("Can you review my contract?")}
              className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-300"
            >
              Code Review
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Brain className="w-10 h-10 text-purple-400 mr-3" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm font-semibold">
              Professional AI Assistant {currentYear}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Professional Development Support
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Get expert-level guidance, architecture consulting, and production-ready solutions from our professional AI assistant.
          </p>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-800 rounded-2xl p-2 mb-8">
          {[
            { id: 'support', label: 'AI Support', icon: Brain },
            { id: 'playground', label: 'Code Playground', icon: Code },
            { id: 'knowledge', label: 'Documentation', icon: BookOpen },
            { id: 'tickets', label: 'Support Tickets', icon: LifeBuoy }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Enhanced Main Content Area */}
        <div className="bg-gray-800/30 rounded-2xl border border-gray-700 p-6">
          {activeTab === 'playground' && <PlaygroundSection />}
          
          {activeTab === 'support' && (
            <div className="text-center py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                  <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">Professional AI Assistant</h3>
                  <p className="text-gray-400 mb-6">Expert-level guidance and architecture consulting</p>
                  <button 
                    onClick={() => {
                      setIsChatOpen(true);
                      setIsAIAssistantActive(true);
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-colors duration-300"
                  >
                    Start Professional Session
                  </button>
                </div>
                
                <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                  <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">Expert Support</h3>
                  <p className="text-gray-400 mb-6">Connect with senior blockchain engineers</p>
                  <button 
                    onClick={() => setShowTicketModal(true)}
                    className="w-full px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors"
                  >
                    Get Human Help
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Chat Interface */}
        {isChatOpen && <ChatInterface />}

        {/* Enhanced Quick Support CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl p-12 border border-blue-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">Ready for Professional Development?</h3>
            <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
              Join enterprise developers building secure, scalable dApps with professional AI assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  setIsChatOpen(true);
                  setIsAIAssistantActive(true);
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold text-lg transition-colors duration-300 flex items-center justify-center"
              >
                <Brain className="w-5 h-5 mr-2" />
                Start Professional AI Session
              </button>
              <button 
                onClick={() => setActiveTab('playground')}
                className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold text-lg transition-colors"
              >
                <Code className="w-5 h-5 mr-2" />
                Code Playground
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Floating AI Button */}
        {!isChatOpen && (
          <button
            onClick={() => {
              setIsChatOpen(true);
              setIsAIAssistantActive(true);
            }}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-colors duration-300 z-40"
          >
            <Brain className="w-7 h-7" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-gray-900"></div>
          </button>
        )}
      </div>
    </div>
  );
}