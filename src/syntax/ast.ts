export type Term =
  | { readonly kind: 'Type' }
  | { readonly kind: 'Var'; readonly index: number; readonly name?: string }
  | { readonly kind: 'Pi'; readonly domain: Term; readonly body: Term; readonly name?: string }
  | { readonly kind: 'Lambda'; readonly domain: Term; readonly body: Term; readonly name?: string }
  | { readonly kind: 'App'; readonly fn: Term; readonly arg: Term }
  | { readonly kind: 'Nat' }
  | { readonly kind: 'Zero' }
  | { readonly kind: 'Succ'; readonly value: Term }
  | { readonly kind: 'NatRec'; readonly motive: Term; readonly zeroCase: Term; readonly succCase: Term; readonly scrutinee: Term }
  | { readonly kind: 'Eq'; readonly type: Term; readonly left: Term; readonly right: Term }
  | { readonly kind: 'Refl'; readonly type: Term; readonly value: Term }
  | { readonly kind: 'EqRec'; readonly motive: Term; readonly reflCase: Term; readonly left: Term; readonly right: Term; readonly equality: Term };

export const Type: Term = { kind: 'Type' };
export const Nat: Term = { kind: 'Nat' };
export const Zero: Term = { kind: 'Zero' };

export function variable(index: number, name?: string): Term {
  if (!Number.isInteger(index) || index < 0) throw new Error('Variable index must be a non-negative integer');
  return { kind: 'Var', index, name };
}

export function pi(domain: Term, body: Term, name?: string): Term {
  return { kind: 'Pi', domain, body, name };
}

export function lambda(domain: Term, body: Term, name?: string): Term {
  return { kind: 'Lambda', domain, body, name };
}

export function app(fn: Term, arg: Term): Term {
  return { kind: 'App', fn, arg };
}

export function succ(value: Term): Term {
  return { kind: 'Succ', value };
}

export function natRec(motive: Term, zeroCase: Term, succCase: Term, scrutinee: Term): Term {
  return { kind: 'NatRec', motive, zeroCase, succCase, scrutinee };
}

export function eq(type: Term, left: Term, right: Term): Term {
  return { kind: 'Eq', type, left, right };
}

export function refl(type: Term, value: Term): Term {
  return { kind: 'Refl', type, value };
}

export function eqRec(motive: Term, reflCase: Term, left: Term, right: Term, equality: Term): Term {
  return { kind: 'EqRec', motive, reflCase, left, right, equality };
}

export function natLiteral(n: number): Term {
  if (!Number.isSafeInteger(n) || n < 0) throw new Error('Nat literal must be a non-negative safe integer');
  let result: Term = Zero;
  for (let i = 0; i < n; i++) result = succ(result);
  return result;
}

export function freeVar(name: string): Term {
  return { kind: 'Var', index: 0, name };
}
