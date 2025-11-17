import { SecurityIssue } from '../types';

export class AurionVerifier {
  /**
   * Formal verification and security validation
   */
  static verify(code: string, ast?: any): SecurityIssue[] {
    const issues: SecurityIssue[] = [];

    // Run all verification checks
    issues.push(...this.checkReentrancy(code));
    issues.push(...this.checkAccessControl(code));
    issues.push(...this.checkIntegerOverflow(code));
    issues.push(...this.checkUncheckedCalls(code));
    issues.push(...this.checkGasLimits(code));
    issues.push(...this.checkInitialization(code));

    return issues;
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

  private static checkInitialization(code: string): SecurityIssue[] {
    const issues: SecurityIssue[] = [];
    
    if (code.includes('init(') && code.includes('public') && !code.includes('initializer')) {
      issues.push({
        type: 'medium',
        title: 'Unprotected Initialization',
        description: 'Init function is public without protection',
        line: this.findLineNumber(code, 'init('),
        codeSnippet: this.extractCodeSnippet(code, 'init('),
        fix: 'Add initializer modifier or make constructor'
      });
    }

    return issues;
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