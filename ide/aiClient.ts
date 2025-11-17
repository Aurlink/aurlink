export interface AIClient {
  suggest(ctx: any): Promise<any[]>
  generateTests(source: string): Promise<any>
  analyzeSecurity(source: string): Promise<any[]>
}

export class DummyAIClient implements AIClient {
  async suggest(ctx: any) {
    return [{ title: 'Dummy suggestion', snippet: '// AI suggestion placeholder', score: 0.5 }]
  }
  async generateTests(source: string) {
    return { name: 'dummy-suite', tests: [] }
  }
  async analyzeSecurity(source: string) { return [] }
}

export class RemoteLLMClient implements AIClient {
  endpoint: string
  apiKey?: string
  
  constructor(endpoint: string, apiKey?: string) { 
    this.endpoint = endpoint; 
    this.apiKey = apiKey 
  }

  async suggest(ctx: any) {
    // Implementation for remote AI
    return []
  }
  async generateTests(source: string) {
    return { name: 'remote-suite', tests: [] }
  }
  async analyzeSecurity(source: string) { return [] }
}