// /lib/aurion/types.ts - TYPE DEFINITIONS
export interface CompilationResult {
  success: boolean;
  bytecode: string;
  abi: any[];
  warnings: string[];
  optimizedCode: string;
  size: number;
  optimizationReport: string[];
  metadata: any;
  securityScore: number;
  gasEstimates: any;
  timestamp: string;
  version: string;
}

export interface SecurityIssue {
  type: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  line?: number;
  codeSnippet?: string;
  fix: string;
}

export interface SecurityAnalysis {
  score: number;
  level: 'excellent' | 'good' | 'moderate' | 'poor' | 'critical';
  issues: SecurityIssue[];
  recommendations: string[];
  passedChecks?: string[];
}

export interface GasAnalysis {
  estimatedCost: string;
  optimizationTips: string[];
  comparison?: string;
  efficiency?: number;
  deployment?: number;
  average?: number;
  max?: number;
  suggestions?: string[];
  complexity?: string;
}

export interface ComplexityAnalysis {
  score: number;
  level: 'low' | 'medium' | 'high';
  maintainability: string;
}

export interface ContractAnalysis {
  security: SecurityAnalysis;
  gas: GasAnalysis;
  complexity: ComplexityAnalysis;
  overallScore?: number;
  timestamp?: string;
  recommendations?: string[];
  status?: string;
}

export interface ParseResult {
  success: boolean;
  ast: any;
  errors: string[];
  warnings: string[];
}