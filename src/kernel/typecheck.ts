import { Term, Type, Nat, Zero, variable, pi, lambda, app, succ, natRec, eq, refl, eqRec } from '../syntax/ast';
import { definitionalEqual, substitute } from './reduction';

export type Context = readonly Term[];

export class TypeError extends Error {
  constructor(message: string) { super(message); this.name = 'TypeError'; }
}

function fail(message: string): never { throw new TypeError(message); }

export function infer(ctx: Context, term: Term): Term {
  switch (term.kind) {
    case 'Type': return Type;
    case 'Nat': return Type;
    case 'Zero': return Nat;
    case 'Var': {
      const type = ctx[ctx.length - 1 - term.index];
      if (!type) fail(`Unbound variable at de Bruijn index ${term.index}`);
      return type;
    }
    case 'Pi': {
      check(ctx, term.domain, Type);
      check([...ctx, term.domain], term.body, Type);
      return Type;
    }
    case 'Lambda': {
      check(ctx, term.domain, Type);
      const bodyType = infer([...ctx, term.domain], term.body);
      return pi(term.domain, bodyType, term.name);
    }
    case 'App': {
      const fnType = infer(ctx, term.fn);
      if (fnType.kind !== 'Pi') fail(`Expected a function type, found ${show(fnType)}`);
      check(ctx, term.arg, fnType.domain);
      return substitute(fnType.body, term.arg);
    }
    case 'Succ': { check(ctx, term.value, Nat); return Nat; }
    case 'NatRec': {
      check(ctx, term.motive, pi(Nat, Type, 'n'));
      const zeroType = app(term.motive, Zero);
      check(ctx, term.zeroCase, zeroType);
      // Under the inner binder, #0 is the induction hypothesis and #1 is n.
      const succExpected = pi(
        Nat,
        pi(app(term.motive, variable(0)), app(term.motive, succ(variable(1)))),
        'n'
      );
      check(ctx, term.succCase, succExpected);
      check(ctx, term.scrutinee, Nat);
      return app(term.motive, term.scrutinee);
    }
    case 'Eq': {
      check(ctx, term.type, Type);
      check(ctx, term.left, term.type);
      check(ctx, term.right, term.type);
      return Type;
    }
    case 'Refl': {
      check(ctx, term.type, Type);
      check(ctx, term.value, term.type);
      return eq(term.type, term.value, term.value);
    }
    case 'EqRec': {
      check(ctx, term.motive, pi(term.left, Type));
      check(ctx, term.left, infer(ctx, term.left));
      const valueType = infer(ctx, term.left);
      check(ctx, term.right, valueType);
      check(ctx, term.equality, eq(valueType, term.left, term.right));
      const motiveLeft = app(term.motive, term.left);
      check(ctx, term.reflCase, motiveLeft);
      return app(term.motive, term.right);
    }
  }
}

export function check(ctx: Context, term: Term, expected: Term): void {
  if (term.kind === 'Lambda' && expected.kind === 'Pi') {
    check(ctx, term.domain, Type);
    if (!definitionalEqual(term.domain, expected.domain)) fail(`Lambda domain mismatch: expected ${show(expected.domain)}, found ${show(term.domain)}`);
    check([...ctx, expected.domain], term.body, expected.body);
    return;
  }
  const actual = infer(ctx, term);
  if (!definitionalEqual(actual, expected)) {
    fail(`Type mismatch\nExpected: ${show(expected)}\nFound: ${show(actual)}\nTerm: ${show(term)}`);
  }
}

export function typeCheck(term: Term, expected?: Term): Term {
  if (expected) { check([], term, expected); return expected; }
  return infer([], term);
}

export function inferLambdaApplication(lambdaTerm: Term, arg: Term): Term {
  if (lambdaTerm.kind !== 'Lambda') fail('Expected a lambda');
  check([], arg, lambdaTerm.domain);
  return substitute(lambdaTerm.body, arg);
}

export function show(term: Term): string {
  switch (term.kind) {
    case 'Type': return 'Type';
    case 'Nat': return 'Nat';
    case 'Zero': return '0';
    case 'Var': return term.name ?? `#${term.index}`;
    case 'Pi': return `(x : ${show(term.domain)}) -> ${show(term.body)}`;
    case 'Lambda': return `(fun x : ${show(term.domain)} => ${show(term.body)})`;
    case 'App': return `(${show(term.fn)} ${show(term.arg)})`;
    case 'Succ': return `(Succ ${show(term.value)})`;
    case 'NatRec': return `(Nat.rec ${show(term.motive)} ${show(term.zeroCase)} ${show(term.succCase)} ${show(term.scrutinee)})`;
    case 'Eq': return `Eq ${show(term.type)} ${show(term.left)} ${show(term.right)}`;
    case 'Refl': return `refl ${show(term.value)}`;
    case 'EqRec': return `(Eq.rec ...)`;
  }
}

export { variable, pi, lambda, app, succ, natRec, eq, refl, eqRec };
