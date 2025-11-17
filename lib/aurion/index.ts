// /lib/aurion/index.ts - NOW COMPLETE
// Main Aurion module exports
export { AurionCompiler } from './compiler';
export { AurionAnalyzer, VulnerabilityScanner, GasEstimator } from './analyzer';
export { AurionUtils } from './utils';

// Type exports
export type { 
  CompilationResult, 
  SecurityAnalysis, 
  SecurityIssue, 
  GasAnalysis, 
  ContractAnalysis,
  ParseResult
} from './types';

// Convenience functions - NOW ALL CLASSES EXIST
export const analyzeContract = AurionAnalyzer.fullAnalysis;
export const compileContract = AurionCompiler.compile;
export const scanSecurity = VulnerabilityScanner.run;
export const estimateGas = GasEstimator.analyze;

// Utility exports
export { 
  generateEnterpriseToken,
  generateNFTCollection, 
  generateDeFiProtocol,
  generateGovernanceDAO,
  formatAnalysisReport,
  generateDevReport,
  getOptimizationTips
} from './utils';