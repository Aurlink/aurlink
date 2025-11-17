// /lib/aurion/analyzer.ts - COMPLETE IMPLEMENTATION
import { SecurityAnalysis, SecurityIssue, ContractAnalysis, GasAnalysis } from './types';

export class AurionAnalyzer {
  /**
   * Comprehensive analysis of Aurion contract code
   */
  static fullAnalysis(code: string): ContractAnalysis {
    const securityAnalysis = VulnerabilityScanner.run(code);
    const gasAnalysis = GasEstimator.analyze(code);
    
    return {
      security: securityAnalysis,
      gas: gasAnalysis,
      overallScore: this.calculateOverallScore(securityAnalysis, gasAnalysis),
      timestamp: new Date().toISOString(),
      recommendations: this.generateOverallRecommendations(securityAnalysis, gasAnalysis),
      status: securityAnalysis.score >= 70 ? 'pass' : 'fail'
    };
  }

  /**
   * Quick analysis for development feedback
   */
  static quickAnalysis(code: string): ContractAnalysis {
    const securityAnalysis = VulnerabilityScanner.run(code);
    const gasAnalysis = GasEstimator.quickEstimate(code);
    
    return {
      security: securityAnalysis,
      gas: gasAnalysis,
      overallScore: this.calculateOverallScore(securityAnalysis, gasAnalysis),
      timestamp: new Date().toISOString(),
      recommendations: ['Quick analysis complete - run full analysis for detailed report'],
      status: 'quick'
    };
  }

  private static calculateOverallScore(security: SecurityAnalysis, gas: GasAnalysis): number {
    const securityWeight = 0.7; // Security is more important
    const gasWeight = 0.3;
    
    return Math.floor((security.score * securityWeight) + (gas.efficiency * gasWeight));
  }

  private static generateOverallRecommendations(security: SecurityAnalysis, gas: GasAnalysis): string[] {
    const recommendations: string[] = [];
    
    // Security recommendations
    if (security.score < 80) {
      recommendations.push('Address security issues before deployment');
    }
    
    if (security.issues.some(issue => issue.type === 'critical' || issue.type === 'high')) {
      recommendations.push('Fix critical and high severity security issues immediately');
    }

    // Gas recommendations
    if (gas.efficiency < 70) {
      recommendations.push('Consider gas optimization improvements for better performance');
    }

    if (gas.suggestions && gas.suggestions.length > 0) {
      recommendations.push(...gas.suggestions.slice(0, 2)); // Top 2 gas suggestions
    }

    if (recommendations.length === 0) {
      recommendations.push('Contract appears production-ready');
    }

    return recommendations;
  }
}

// Your existing VulnerabilityScanner implementation
export class VulnerabilityScanner {
  /**
   * Comprehensive security analysis of Aurion contract code
   */
  static run(code: string): SecurityAnalysis {
    const issues: SecurityIssue[] = [];
    const passedChecks: string[] = [];
    let score = 100;

    // Check for common vulnerabilities
    issues.push(...this.checkReentrancy(code));
    issues.push(...this.checkAccessControl(code));
    issues.push(...this.checkIntegerOverflow(code));
    issues.push(...this.checkUncheckedCalls(code));
    issues.push(...this.checkGasLimits(code));

    // Positive checks
    if (code.includes('@secure')) {
      passedChecks.push('Uses @secure decorator');
      score += 10;
    }
    
    if (code.includes('onlyOwner') || code.includes('modifier')) {
      passedChecks.push('Access control patterns detected');
      score += 15;
    }
    
    if (code.includes('require(') || code.includes('assert(')) {
      passedChecks.push('Input validation present');
      score += 10;
    }

    // Deduct points for issues
    issues.forEach(issue => {
      switch (issue.type) {
        case 'critical': score -= 30; break;
        case 'high': score -= 20; break;
        case 'medium': score -= 10; break;
        case 'low': score -= 5; break;
      }
    });

    return {
      score: Math.max(0, Math.min(100, score)),
      level: this.getSecurityLevel(score),
      issues,
      recommendations: this.generateRecommendations(issues, passedChecks),
      passedChecks
    };
  }

  private static checkReentrancy(code: string): SecurityIssue[] {
    const issues: SecurityIssue[] = [];
    
    if (code.includes('call.value') && !code.includes('@nonReentrant')) {
      issues.push({
        type: 'critical',
        title: 'Potential Reentrancy Vulnerability',
        description: 'External calls without reentrancy guard detected',
        line: this.findLineNumber(code, 'call.value'),
        codeSnippet: this.extractCodeSnippet(code, 'call.value'),
        fix: 'Add @nonReentrant decorator or use Checks-Effects-Interactions pattern'
      });
    }

    return issues;
  }

  private static checkAccessControl(code: string): SecurityIssue[] {
    const issues: SecurityIssue[] = [];
    
    const sensitiveFunctions = ['mint', 'burn', 'withdraw', 'transferOwnership'];
    sensitiveFunctions.forEach(func => {
      if (code.includes(`function ${func}`) && !code.includes('onlyOwner') && !code.includes('modifier')) {
        issues.push({
          type: 'high',
          title: 'Missing Access Control',
          description: `Sensitive function ${func} has no access restrictions`,
          line: this.findLineNumber(code, `function ${func}`),
          codeSnippet: this.extractCodeSnippet(code, `function ${func}`),
          fix: 'Add access control modifier like onlyOwner'
        });
      }
    });

    return issues;
  }

  private static checkIntegerOverflow(code: string): SecurityIssue[] {
    const issues: SecurityIssue[] = [];
    
    if ((code.includes('+') || code.includes('-') || code.includes('*')) && 
        !code.includes('SafeMath') && !code.includes('@safe')) {
      issues.push({
        type: 'high',
        title: 'Potential Integer Overflow',
        description: 'Arithmetic operations without overflow checks',
        line: this.findLineNumber(code, '+') || this.findLineNumber(code, '-'),
        codeSnippet: this.extractCodeSnippet(code, '+') || this.extractCodeSnippet(code, '-'),
        fix: 'Use SafeMath library or add overflow checks'
      });
    }

    return issues;
  }

  private static checkUncheckedCalls(code: string): SecurityIssue[] {
    const issues: SecurityIssue[] = [];
    
    if (code.includes('call(') && !code.includes('require(')) {
      issues.push({
        type: 'medium',
        title: 'Unchecked Low-level Call',
        description: 'Low-level calls without success checks',
        line: this.findLineNumber(code, 'call('),
        codeSnippet: this.extractCodeSnippet(code, 'call('),
        fix: 'Always check the return value of low-level calls'
      });
    }

    return issues;
  }

  private static checkGasLimits(code: string): SecurityIssue[] {
    const issues: SecurityIssue[] = [];
    
    if (code.includes('for (') && code.includes('.length')) {
      issues.push({
        type: 'medium',
        title: 'Potential Gas Limit Issues',
        description: 'Loops that may exceed block gas limit with large arrays',
        line: this.findLineNumber(code, 'for ('),
        codeSnippet: this.extractCodeSnippet(code, 'for ('),
        fix: 'Consider pagination or alternative data structures'
      });
    }

    return issues;
  }

  private static getSecurityLevel(score: number): SecurityAnalysis['level'] {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'moderate';
    if (score >= 40) return 'poor';
    return 'critical';
  }

  private static generateRecommendations(issues: SecurityIssue[], passedChecks: string[]): string[] {
    const recommendations: string[] = [];
    
    if (issues.some(i => i.type === 'critical' || i.type === 'high')) {
      recommendations.push('Fix critical/high issues before deployment');
    }
    
    if (!passedChecks.some(check => check.includes('@secure'))) {
      recommendations.push('Add @secure decorator for automated security checks');
    }
    
    if (issues.some(i => i.title.includes('Access Control'))) {
      recommendations.push('Implement proper access control using modifiers');
    }

    return recommendations.length > 0 ? recommendations : ['Contract follows security best practices'];
  }

  private static findLineNumber(code: string, search: string): number {
    const lines = code.split('\n');
    return lines.findIndex(line => line.includes(search)) + 1;
  }

  private static extractCodeSnippet(code: string, search: string): string {
    const lines = code.split('\n');
    const lineIndex = lines.findIndex(line => line.includes(search));
    const start = Math.max(0, lineIndex - 1);
    const end = Math.min(lines.length, lineIndex + 2);
    return lines.slice(start, end).join('\n');
  }
}

export class GasEstimator {
  /**
   * Comprehensive gas analysis
   */
  static analyze(code: string): GasAnalysis {
    const estimates = this.estimateGasUsage(code);
    
    return {
      deployment: estimates.deployment,
      average: estimates.average,
      max: estimates.max,
      efficiency: this.calculateEfficiency(estimates),
      suggestions: this.generateGasSuggestions(code),
      complexity: estimates.complexity
    };
  }

  /**
   * Quick gas estimation for development
   */
  static quickEstimate(code: string): GasAnalysis {
    const basicEstimate = this.estimateGasUsage(code);
    
    return {
      deployment: basicEstimate.deployment,
      average: basicEstimate.average,
      max: basicEstimate.max,
      efficiency: this.calculateEfficiency(basicEstimate),
      suggestions: ['Run full analysis for detailed gas optimization tips'],
      complexity: 'quick'
    };
  }

  private static estimateGasUsage(code: string): any {
    // Base gas costs
    const baseDeployment = 1000000;
    const baseAverage = 50000;
    
    let deployment = baseDeployment;
    let average = baseAverage;
    let complexity = 'low';

    // Adjust based on code characteristics
    if (code.includes('mapping')) deployment += 20000;
    if (code.includes('for(')) {
      average += 10000;
      complexity = 'medium';
    }
    if (code.includes('while(')) {
      average += 15000;
      complexity = 'medium';
    }
    if (code.includes('external call')) {
      average += 30000;
      complexity = 'high';
    }
    if (code.includes('storage')) average += 5000;
    
    // Multiple complex operations increase complexity
    const complexOps = (code.match(/(for|while|external call|mapping)/g) || []).length;
    if (complexOps > 3) complexity = 'high';

    return {
      deployment,
      average,
      max: average * 2,
      complexity
    };
  }

  private static calculateEfficiency(estimates: any): number {
    // Calculate efficiency as percentage (higher is better)
    const baseEfficiency = 1000000;
    const efficiency = Math.max(0, Math.min(100, (baseEfficiency / estimates.average) * 100));
    return Math.floor(efficiency);
  }

  private static generateGasSuggestions(code: string): string[] {
    const suggestions: string[] = [];
    
    if (code.includes('for(') && code.includes('.length')) {
      suggestions.push('Cache array length outside loops to save gas');
    }
    
    if (code.includes('memory') && code.includes('external')) {
      suggestions.push('Use calldata instead of memory for external function parameters');
    }
    
    if (code.includes('public') && code.includes('view')) {
      suggestions.push('Mark constant view functions as external to save gas');
    }
    
    if (code.includes('++i') || code.includes('i++')) {
      suggestions.push('Use ++i instead of i++ in loops for gas efficiency');
    }

    if (code.includes('bool')) {
      suggestions.push('Use uint256(1) and uint256(2) instead of bool for gas savings');
    }

    return suggestions.length > 0 ? suggestions : ['Gas usage appears optimized'];
  }
}