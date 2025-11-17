import { ParseResult } from '../types';

export class AurionParser {
  /**
   * Parse Aurion contract code into AST
   */
  static parse(code: string): ParseResult {
    try {
      // In production, this would use a real parser (ANTLR, custom parser, etc.)
      // For now, we'll simulate parsing with basic structure analysis
      
      const ast = this.buildAST(code);
      const errors = this.validateSyntax(code);
      
      return {
        success: errors.length === 0,
        ast,
        errors,
        tokens: this.tokenize(code)
      };
    } catch (error) {
      return {
        success: false,
        ast: null,
        errors: [`Parse error: ${error.message}`],
        tokens: []
      };
    }
  }

  private static buildAST(code: string): any {
    const lines = code.split('\n');
    const ast = {
      type: 'Program',
      body: [],
      contracts: [],
      imports: [],
      decorators: this.extractDecorators(code)
    };

    // Extract contract definitions
    const contractMatches = code.match(/contract\s+(\w+)/g) || [];
    ast.contracts = contractMatches.map(match => {
      const name = match.replace('contract ', '').trim();
      return {
        type: 'Contract',
        name,
        functions: this.extractFunctions(code, name),
        variables: this.extractVariables(code, name),
        decorators: this.extractContractDecorators(code, name)
      };
    });

    // Extract functions
    ast.body = this.extractAllFunctions(code);

    return ast;
  }

  private static extractDecorators(code: string): string[] {
    const decoratorMatches = code.match(/@\w+/g) || [];
    return [...new Set(decoratorMatches)]; // Remove duplicates
  }

  private static extractContractDecorators(code: string, contractName: string): string[] {
    const contractStart = code.indexOf(`contract ${contractName}`);
    if (contractStart === -1) return [];
    
    const contractCode = code.substring(contractStart);
    const firstBrace = contractCode.indexOf('{');
    const contractHeader = contractCode.substring(0, firstBrace);
    
    return (contractHeader.match(/@\w+/g) || []);
  }

  private static extractFunctions(code: string, contractName?: string): any[] {
    const functionRegex = /function\s+(\w+)\s*\(([^)]*)\)/g;
    const functions: any[] = [];
    let match;

    while ((match = functionRegex.exec(code)) !== null) {
      const [fullMatch, name, params] = match;
      functions.push({
        type: 'Function',
        name,
        parameters: this.parseParameters(params),
        visibility: this.getVisibility(fullMatch),
        modifiers: this.getModifiers(code, name),
        line: this.getLineNumber(code, fullMatch)
      });
    }

    return functions;
  }

  private static extractAllFunctions(code: string): any[] {
    return this.extractFunctions(code);
  }

  private static extractVariables(code: string, contractName: string): any[] {
    const variableRegex = /(\w+):\s*(public|private|internal)\s*(\w+)/g;
    const variables: any[] = [];
    let match;

    while ((match = variableRegex.exec(code)) !== null) {
      const [_, name, visibility, type] = match;
      variables.push({
        type: 'Variable',
        name,
        visibility,
        dataType: type,
        line: this.getLineNumber(code, match[0])
      });
    }

    return variables;
  }

  private static parseParameters(paramString: string): any[] {
    if (!paramString.trim()) return [];
    
    return paramString.split(',')
      .map(param => param.trim())
      .filter(param => param)
      .map(param => {
        const [type, name] = param.split(' ').filter(Boolean);
        return { name, type };
      });
  }

  private static getVisibility(functionString: string): string {
    if (functionString.includes('public')) return 'public';
    if (functionString.includes('private')) return 'private';
    if (functionString.includes('internal')) return 'internal';
    return 'public';
  }

  private static getModifiers(code: string, functionName: string): string[] {
    const modifiers: string[] = [];
    const functionStart = code.indexOf(`function ${functionName}`);
    
    if (functionStart === -1) return modifiers;
    
    const functionCode = code.substring(functionStart);
    const firstBrace = functionCode.indexOf('{');
    const functionHeader = functionCode.substring(0, firstBrace);

    // Extract modifiers like onlyOwner, nonReentrant, etc.
    const modifierMatches = functionHeader.match(/\w+(?=\s*\([^)]*\)\s*{)/g) || [];
    return modifierMatches.filter(mod => !['function', 'public', 'private', 'internal', 'view', 'pure'].includes(mod));
  }

  private static validateSyntax(code: string): string[] {
    const errors: string[] = [];

    // Basic syntax validation
    if (!code.includes('contract ')) {
      errors.push('No contract definition found');
    }

    // Check brace balance
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push('Unbalanced braces in contract');
    }

    // Check for required init function in contracts with state variables
    const hasStateVars = (code.match(/(\w+):\s*(public|private|internal)/g) || []).length > 0;
    const hasInit = code.includes('init(');
    if (hasStateVars && !hasInit) {
      errors.push('Contracts with state variables should have an init function');
    }

    return errors;
  }

  private static tokenize(code: string): any[] {
    // Simple tokenization for demonstration
    const tokens = [];
    const words = code.split(/\s+/);
    
    for (const word of words) {
      if (word.match(/^@\w+/)) {
        tokens.push({ type: 'DECORATOR', value: word });
      } else if (word.match(/^contract$/)) {
        tokens.push({ type: 'KEYWORD', value: 'contract' });
      } else if (word.match(/^function$/)) {
        tokens.push({ type: 'KEYWORD', value: 'function' });
      } else if (word.match(/^\w+$/)) {
        tokens.push({ type: 'IDENTIFIER', value: word });
      }
    }

    return tokens;
  }

  private static getLineNumber(code: string, search: string): number {
    const lines = code.split('\n');
    return lines.findIndex(line => line.includes(search)) + 1;
  }
}