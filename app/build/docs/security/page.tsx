// app/build/docs/security/page.tsx
'use client';
import { motion } from 'framer-motion';
import { DocsLayout } from '@/components/docs/DocsLayout';
import { ShieldCheckIcon, LockClosedIcon, ExclamationTriangleIcon, KeyIcon, DocumentCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const content = {
  title: 'Security Guidelines',
  description: 'Comprehensive security best practices, threat mitigation strategies, and security architecture for building secure applications on Aurlink.',
  sections: [
    {
      id: 'security-overview',
      title: 'Security Overview',
      level: 2,
      content: `Aurlink employs a multi-layered security architecture combining zero-knowledge proofs, AI-powered threat detection, and formal verification to provide enterprise-grade security for your applications.`
    },
    {
      id: 'architecture',
      title: 'Security Architecture',
      level: 2,
      content: `Our security model is built on five core pillars that work together to protect your applications and users.`
    },
    {
      id: 'smart-contract-security',
      title: 'Smart Contract Security',
      level: 2,
      content: `Follow these best practices to write secure, auditable smart contracts on the Aurlink platform.`
    },
    {
      id: 'key-management',
      title: 'Key Management',
      level: 2,
      content: `Secure key management practices for protecting user assets and application credentials.`
    },
    {
      id: 'api-security',
      title: 'API & Integration Security',
      level: 2,
      content: `Security considerations for integrating with Aurlink APIs and external services.`
    },
    {
      id: 'incident-response',
      title: 'Incident Response',
      level: 2,
      content: `Procedures and best practices for handling security incidents and vulnerabilities.`
    },
    {
      id: 'compliance',
      title: 'Compliance & Auditing',
      level: 2,
      content: `Meeting regulatory requirements and maintaining audit trails for enterprise applications.`
    }
  ]
};

const securityPillars = [
  {
    icon: <ShieldCheckIcon className="w-8 h-8" />,
    title: 'Cryptographic Security',
    description: 'Military-grade encryption with quantum-resistant algorithms',
    features: ['Zero-knowledge proofs', 'Multi-signature schemes', 'Threshold signatures']
  },
  {
    icon: <LockClosedIcon className="w-8 h-8" />,
    title: 'Formal Verification',
    description: 'Mathematically proven correctness for critical system components',
    features: ['Smart contract verification', 'Protocol correctness proofs', 'Automated theorem proving']
  },
  {
    icon: <ExclamationTriangleIcon className="w-8 h-8" />,
    title: 'AI Threat Detection',
    description: 'Real-time anomaly detection and predictive threat analysis',
    features: ['Behavioral analysis', 'Pattern recognition', 'Automated response']
  },
  {
    icon: <KeyIcon className="w-8 h-8" />,
    title: 'Access Control',
    description: 'Granular permission systems and identity management',
    features: ['Role-based access', 'Multi-factor authentication', 'Biometric verification']
  },
  {
    icon: <DocumentCheckIcon className="w-8 h-8" />,
    title: 'Audit & Compliance',
    description: 'Comprehensive logging and regulatory compliance',
    features: ['Immutable audit trails', 'Real-time monitoring', 'Compliance reporting']
  }
];

const securityChecklist = [
  {
    category: 'Smart Contract Development',
    items: [
      'Use Aurlink\'s formally verified contract templates',
      'Implement proper access control modifiers',
      'Validate all external inputs and parameters',
      'Use pull-over-push pattern for payments',
      'Implement emergency stop mechanisms',
      'Conduct third-party security audits'
    ]
  },
  {
    category: 'Key Management',
    items: [
      'Use hardware security modules (HSMs) for production',
      'Implement multi-signature schemes for treasury management',
      'Store private keys encrypted with strong passphrases',
      'Rotate API keys and access tokens regularly',
      'Use key derivation functions for user wallets'
    ]
  },
  {
    category: 'API Security',
    items: [
      'Validate and sanitize all API inputs',
      'Implement rate limiting and DDoS protection',
      'Use API keys with appropriate scope restrictions',
      'Encrypt sensitive data in transit and at rest',
      'Monitor API usage for anomalous patterns'
    ]
  }
];

const threatMitigation = [
  {
    threat: 'Reentrancy Attacks',
    risk: 'High',
    mitigation: 'Use checks-effects-interactions pattern and Aurlink\'s reentrancy guard',
    example: 'Implement withdraw patterns with state updates before external calls'
  },
  {
    threat: 'Front-running',
    risk: 'Medium',
    mitigation: 'Use commit-reveal schemes and Aurlink\'s fair ordering',
    example: 'Submit hashed bids first, then reveal after deadline'
  },
  {
    threat: 'Oracle Manipulation',
    risk: 'High',
    mitigation: 'Use multiple decentralized oracles with consensus',
    example: 'Aggregate price feeds from 3+ trusted oracle providers'
  },
  {
    threat: 'Access Control Bypass',
    risk: 'Critical',
    mitigation: 'Implement role-based access with proper modifiers',
    example: 'Use onlyOwner and specific role checkers for sensitive functions'
  }
];

export default function SecurityPage() {
  const headings = content.sections.map(section => ({
    id: section.id,
    title: section.title,
    level: section.level
  }));

  return (
    <DocsLayout headings={headings}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 bg-red-500/20 border border-red-400/30 rounded-full px-6 py-3 mb-8">
          <ShieldCheckIcon className="w-5 h-5 text-red-400" />
          <span className="text-red-400 font-semibold">Security First</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {content.title}
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {content.description}
        </p>
      </motion.div>

      {/* Security Pillars */}
      <motion.section
        id="architecture"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="scroll-mt-24 mb-16"
      >
        <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">
          Security Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-red-400 mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {pillar.title}
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {pillar.description}
              </p>
              <ul className="space-y-2">
                {pillar.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Security Checklist */}
      <motion.section
        id="smart-contract-security"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="scroll-mt-24 mb-16"
      >
        <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">
          Security Checklist
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {securityChecklist.map((category, index) => (
            <div
              key={category.category}
              className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-400/20 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {category.category}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500/20 border border-green-400/30 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Threat Mitigation Table */}
      <motion.section
        id="incident-response"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="scroll-mt-24 mb-16"
      >
        <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">
          Common Threats & Mitigation
        </h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Threat</th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Risk Level</th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Mitigation</th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Example</th>
              </tr>
            </thead>
            <tbody>
              {threatMitigation.map((threat, index) => (
                <tr key={threat.threat} className="border-b border-white/5 last:border-b-0">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-white">{threat.threat}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      threat.risk === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      threat.risk === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {threat.risk}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-300 text-sm">{threat.mitigation}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-400 text-sm font-mono">{threat.example}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Code Examples */}
      <motion.section
        id="key-management"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="scroll-mt-24 mb-16"
      >
        <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">
          Secure Code Examples
        </h2>
        
        <div className="space-y-8">
          {/* Example 1: Access Control */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Access Control Pattern</h3>
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Secure access control with role-based permissions
contract SecureContract {
    address public owner;
    mapping(address => bool) public admins;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }
    
    modifier onlyAdmin() {
        require(admins[msg.sender], "Not admin");
        _;
    }
    
    function addAdmin(address _admin) external onlyOwner {
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }
    
    function removeAdmin(address _admin) external onlyOwner {
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }
}`}
              </pre>
            </div>
          </div>

          {/* Example 2: Reentrancy Protection */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Reentrancy Guard</h3>
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Reentrancy protection using checks-effects-interactions
contract SecureWallet {
    mapping(address => uint256) public balances;
    bool private locked;
    
    modifier noReentrancy() {
        require(!locked, "Reentrancy detected");
        locked = true;
        _;
        locked = false;
    }
    
    function withdraw(uint256 amount) external noReentrancy {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // Checks
        require(amount > 0, "Amount must be positive");
        
        // Effects
        balances[msg.sender] -= amount;
        
        // Interactions
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(msg.sender, amount);
    }
}`}
              </pre>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Security Resources */}
      <motion.section
        id="compliance"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="scroll-mt-24"
      >
        <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">
          Security Resources
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-2xl p-6">
            <UserGroupIcon className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Security Audits</h3>
            <p className="text-gray-300 mb-4">
              Get your smart contracts professionally audited by our security partners.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Third-party security reviews</li>
              <li>• Formal verification services</li>
              <li>• Penetration testing</li>
              <li>• Bug bounty programs</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-2xl p-6">
            <DocumentCheckIcon className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Compliance Tools</h3>
            <p className="text-gray-300 mb-4">
              Tools and frameworks for meeting regulatory requirements.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• KYC/AML integration</li>
              <li>• Transaction monitoring</li>
              <li>• Compliance reporting</li>
              <li>• Audit trail preservation</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 p-6 bg-red-500/10 border border-red-400/20 rounded-2xl"
      >
        <h3 className="text-xl font-semibold text-white mb-2">Need Security Assistance?</h3>
        <p className="text-red-200 mb-4">
          Our security team is available to help you implement best practices and conduct security reviews.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold">
            Request Security Audit
          </button>
          <button className="px-6 py-3 border border-red-400 text-red-400 rounded-lg hover:bg-red-400/10 transition-colors">
            Join Security Discord
          </button>
        </div>
      </motion.div>
    </DocsLayout>
  );
}