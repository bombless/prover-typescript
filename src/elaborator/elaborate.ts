import {
  Term,
  Type,
  Nat,
  Zero,
  variable,
  pi,
  lambda,
  app,
  succ,
  natRec,
  eq,
  refl,
  eqRec,
} from '../syntax/ast';
import { SurfaceTerm } from '../syntax/surface';
import { Environment } from '../environment/environment';

export class ElaborationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ElaborationError';
  }
}

export type LocalContext = readonly string[];

function resolveLocal(name: string, context: LocalContext): Term | undefined {
  for (let position = context.length - 1; position >= 0; position -= 1) {
    if (context[position] === name) return variable(context.length - 1 - position, name);
  }
  return undefined;
}

function resolveVariable(name: string, context: LocalContext, environment?: Environment): Term {
  const local = resolveLocal(name, context);
  if (local) return local;
  const global = environment?.lookup(name);
  if (global) return global;
  throw new ElaborationError(`Unknown variable: ${name}`);
}

export function elaborate(term: SurfaceTerm, context: LocalContext = [], environment?: Environment): Term {
  switch (term.kind) {
    case 'Var': return resolveVariable(term.name, context, environment);
    case 'Sort': return Type;
    case 'Pi': {
      const domain = elaborate(term.domain, context, environment);
      const body = elaborate(term.body, [...context, term.name], environment);
      return pi(domain, body, term.name);
    }
    case 'Lambda': {
      const domain = elaborate(term.domain, context, environment);
      const body = elaborate(term.body, [...context, term.name], environment);
      return lambda(domain, body, term.name);
    }
    case 'App': return app(elaborate(term.fn, context, environment), elaborate(term.arg, context, environment));
    case 'Nat': return Nat;
    case 'Zero': return Zero;
    case 'Succ': return succ(elaborate(term.value, context, environment));
    case 'NatRec': return natRec(
      elaborate(term.motive, context, environment),
      elaborate(term.zeroCase, context, environment),
      elaborate(term.succCase, context, environment),
      elaborate(term.scrutinee, context, environment),
    );
    case 'Eq': return eq(
      elaborate(term.type, context, environment),
      elaborate(term.left, context, environment),
      elaborate(term.right, context, environment),
    );
    case 'Refl': return refl(elaborate(term.type, context, environment), elaborate(term.value, context, environment));
    case 'EqRec': return eqRec(
      elaborate(term.motive, context, environment),
      elaborate(term.reflCase, context, environment),
      elaborate(term.left, context, environment),
      elaborate(term.right, context, environment),
      elaborate(term.equality, context, environment),
    );
  }
}
