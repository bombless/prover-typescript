import { Term } from '../syntax/ast';

export class EnvironmentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnvironmentError';
  }
}

export interface Environment {
  lookup(name: string): Term | undefined;
  define(name: string, term: Term): void;
  /** A snapshot in declaration order, when enumeration is supported. */
  names?(): readonly string[];
}

export class GlobalEnvironment implements Environment {
  private readonly definitions = new Map<string, Term>();

  lookup(name: string): Term | undefined {
    return this.definitions.get(name);
  }

  names(): readonly string[] {
    return [...this.definitions.keys()];
  }

  define(name: string, term: Term): void {
    if (this.definitions.has(name)) throw new EnvironmentError(`already defined: ${name}`);
    this.definitions.set(name, term);
  }
}
