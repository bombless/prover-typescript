import { SurfaceTerm } from '../syntax/surface';
import { ParseError, parse } from './parser';

export type Command =
  | { readonly kind: 'term'; readonly term: SurfaceTerm }
  | { readonly kind: 'def'; readonly name: string; readonly term: SurfaceTerm };

const identifierPattern = /^[A-Za-z_][A-Za-z0-9_']*$/;

export function parseCommand(input: string): Command {
  const source = input.trim();
  if (/^def(?:\s|$)/.test(source)) {
    const match = /^def\s+([^\s:=]+)\s*:=\s*([\s\S]*)$/.exec(source);
    if (!match) throw new ParseError("Expected 'def name := term'");
    const [, name, termSource] = match;
    if (!identifierPattern.test(name)) throw new ParseError(`Invalid definition name: ${name}`);
    if (termSource.trim() === '') throw new ParseError('Expected a term after :=');
    return { kind: 'def', name, term: parse(termSource) };
  }
  return { kind: 'term', term: parse(source) };
}
