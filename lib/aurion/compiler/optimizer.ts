import { CompilationResult } from '../types';

export class AurionOptimizer {
  /**
   * Optimize Aurion code for gas and performance
   */
  static optimize(code: string, level: 'low' | 'medium' | 'high' = 'medium'): string {
    let optimized = code;

    // Apply optimizations based on level
    if (level === 'medium' || level === 'high') {
      optimized = this.optimizeStorage(optimized);
      optimized = this.optimizeFunctions(optimized);
      optimized = this.addGasOptimizationHints(optimized);
    }

    if (level === 'high') {
      optimized = this.optimizeMemory(optimized);
      optimized = this.optimizeLoops(optimized);
      optimized = this.addSecurityDecorators(optimized);
    }

    return optimized;
  }

  private static optimizeStorage(code: string): string {
    // Pack storage variables
    return code.replace(/uint8\s+(\w+)/g, 'uint8 $1 // Consider packing with other small uints');
  }

  private static optimizeFunctions(code: string): string {
    // Suggest external for public functions that don't call other internal functions
    return code.replace(/function\s+(\w+)\s*\([^)]*\)\s*public/g, 
      'function $1($2) external // Consider external for gas savings');
  }

  private static optimizeMemory(code: string): string {
    // Use memory appropriately
    return code.replace(/string\s+memory\s+(\w+)/g, 
      'string memory $1 // Consider bytes32 for fixed-size strings');
  }

  private static optimizeLoops(code: string): string {
    // Warn about gas-intensive loops
    if (code.includes('for (')) {
      return code + '\n// ⚠️ Loops can be gas-intensive; consider alternative patterns';
    }
    return code;
  }

  private static addGasOptimizationHints(code: string): string {
    if (!code.includes('@gas-optimized')) {
      return '@gas-optimized\n' + code;
    }
    return code;
  }

  private static addSecurityDecorators(code: string): string {
    if (!code.includes('@secure') && !code.includes('@audit')) {
      return '@secure\n' + code;
    }
    return code;
  }

  /**
   * Analyze and suggest optimizations
   */
  static analyzeOptimizations(code: string): string[] {
    const suggestions: string[] = [];

    if (code.includes('string memory') && code.includes('public')) {
      suggestions.push('Use bytes32 for fixed-size strings to save storage costs');
    }

    if (code.includes('for (') && code.includes('.length')) {
      suggestions.push('Consider caching array length to save gas in loops');
    }

    if (code.includes('public') && !code.includes('external')) {
      suggestions.push('Consider using external instead of public for gas savings');
    }

    if (!code.includes('@gas-optimized')) {
      suggestions.push('Add @gas-optimized decorator for automatic optimizations');
    }

    return suggestions;
  }
}