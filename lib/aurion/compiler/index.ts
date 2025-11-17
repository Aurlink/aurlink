import { AurionParser } from './parser';
import { AurionTranspiler } from './transpiler';
import { AurionOptimizer } from './optimizer';
import { AurionVerifier } from './verifier';
import { CompilationResult, ParseResult } from '../types';

export class AurionCompiler {
  /**
   * Complete compilation pipeline for Aurion code
   */
  static compile(
    code: string, 
    target: 'evm' | 'avm' = 'evm',
    optimizeLevel: 'low' | 'medium' | 'high' = 'medium'
  ): CompilationResult {
    try {
      // Step 1: Parse
      const parseResult = AurionParser.parse(code);
      if (!parseResult.success) {
        return {
          success: false,
          optimizedCode: '',
          abi: [],
          bytecode: '',
          warnings: [],
          errors: parseResult.errors,
          gasEstimate: '0',
          size: 0
        };
      }

      // Step 2: Optimize
      const optimizedCode = AurionOptimizer.optimize(code, optimizeLevel);

      // Step 3: Transpile
      const transpileResult = AurionTranspiler.transpile(parseResult.ast, target);

      // Step 4: Add verification warnings
      const verificationIssues = AurionVerifier.verify(code, parseResult.ast);
      const verificationWarnings = verificationIssues
        .filter(issue => issue.type !== 'critical')
        .map(issue => `${issue.type.toUpperCase()}: ${issue.title}`);

      return {
        ...transpileResult,
        optimizedCode,
        warnings: [...transpileResult.warnings, ...verificationWarnings],
        ast: parseResult.ast
      };
    } catch (error) {
      return {
        success: false,
        optimizedCode: '',
        abi: [],
        bytecode: '',
        warnings: [],
        errors: [`Compilation error: ${error.message}`],
        gasEstimate: '0',
        size: 0
      };
    }
  }

  /**
   * Parse only - for syntax analysis
   */
  static parse(code: string): ParseResult {
    return AurionParser.parse(code);
  }

  /**
   * Optimize only - for code improvements
   */
  static optimize(code: string, level: 'low' | 'medium' | 'high' = 'medium'): string {
    return AurionOptimizer.optimize(code, level);
  }

  /**
   * Verify only - for security analysis
   */
  static verify(code: string) {
    return AurionVerifier.verify(code);
  }
}

export { AurionParser, AurionTranspiler, AurionOptimizer, AurionVerifier };