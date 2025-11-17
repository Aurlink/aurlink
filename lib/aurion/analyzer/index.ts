import { VulnerabilityScanner } from './vulnerabilityScanner';
import { GasEstimator } from './gasEstimator';
import { ContractAnalysis } from '../types';

export class AurionAnalyzer {
  /**
   * Complete contract analysis
   */
  static fullAnalysis(code: string): ContractAnalysis {
    const security = VulnerabilityScanner.run(code);
    const gas = GasEstimator.analyze(code);
    
    const complexityScore = Math.min(100, 
      (code.match(/function\s+\w+/g) || []).length * 10 +
      (code.match(/mapping</g) || []).length * 5 +
      (code.match(/for\s*\(/g) || []).length * 15
    );

    return {
      security,
      gas,
      complexity: {
        score: complexityScore,
        level: complexityScore < 30 ? 'low' : complexityScore < 70 ? 'medium' : 'high',
        maintainability: complexityScore < 30 ? 'Excellent' : 
                        complexityScore < 70 ? 'Good' : 'Needs refactoring'
      }
    };
  }

  /**
   * Format analysis for AI responses
   */
  static formatAnalysisForAI(analysis: ContractAnalysis, code: string): string {
    const { security, gas, complexity } = analysis;
    
    return `🔍 **Contract Analysis Complete**

**Security Score:** ${security.score}/100 (${security.level})
${security.issues.length > 0 ? 
  `**Issues Found:** ${security.issues.length} (${security.issues.filter(i => i.type === 'critical' || i.type === 'high').length} critical/high)` :
  '✅ No critical issues found'
}

**Gas Estimation:** ${gas.estimatedCost}
**Complexity:** ${complexity.level.toUpperCase()} (${complexity.score}/100)

${security.issues.slice(0, 3).map(issue => 
  `• ${issue.type.toUpperCase()}: ${issue.title}`
).join('\n')}

${security.recommendations.slice(0, 2).map(rec => 
  `💡 ${rec}`
).join('\n')}`;
  }
}

export { VulnerabilityScanner, GasEstimator };