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

export class ElaborationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ElaborationError';
  }
}

export type LocalContext = readonly string[];

function resolveLocal(name: string, context: LocalContext): Term {
  for (let position = context.length - 1; position >= 0; position -= 1) {
    if (context[position] === name) return variable(context.length - 1 - position, name);
  }
  throw new ElaborationError(`Unknown variable: ${name}`);
}

export function elaborate(term: SurfaceTerm, context: LocalContext = []): Term {
  switch (term.kind) {
    case 'Var': return resolveLocal(term.name, context);
    case 'Sort': return Type;
    case 'Pi': {
      const domain = elaborate(term.domain, context);
      const body = elaborate(term.body, [...context, term.name]);
      return pi(domain, body, term.name);
    }
    case 'Lambda': {
      const domain = elaborate(term.domain, context);
      const body = elaborate(term.body, [...context, term.name]);
      return lambda(domain, body, term.name);
    }
    case 'App': return app(elaborate(term.fn, context), elaborate(term.arg, context));
    case 'Nat': return Nat;
    case 'Zero': return Zero;
    case 'Succ': return succ(elaborate(term.value, context));
    case 'NatRec': return natRec(
      elaborate(term.motive, context),
      elaborate(term.zeroCase, context),
      elaborate(term.succCase, context),
      elaborate(term.scrutinee, context),
    );
    case 'Eq': return eq(
      elaborate(term.type, context),
      elaborate(term.left, context),
      elaborate(term.right, context),
    );
    case 'Refl': return refl(elaborate(term.type, context), elaborate(term.value, context));
    case 'EqRec': return eqRec(
      elaborate(term.motive, context),
      elaborate(term.reflCase, context),
      elaborate(term.left, context),
      elaborate(term.right, context),
      elaborate(term.equality, context),
    );
  }
}
