import { Term, Type, Nat, Bool, Empty, True, False, Zero, variable, pi, prod, pair, fst, snd, lambda, app, succ, natRec, boolRec, emptyRec, eq, refl, eqRec } from '../syntax/ast';
import { definitionalEqual, substitute, shift, whnf } from './reduction';

export type Context = readonly Term[];

export class TypeError extends Error {
  constructor(message: string) { super(message); this.name = 'TypeError'; }
}

function fail(message: string): never { throw new TypeError(message); }

export function infer(ctx: Context, term: Term): Term {
  switch (term.kind) {
    case 'Type': return Type;
    case 'Nat': return Type;
    case 'Bool': return Type;
    case 'Empty': return Type;
    case 'Zero': return Nat;
    case 'True': case 'False': return Bool;
    case 'Var': {
      const type = ctx[ctx.length - 1 - term.index];
      if (!type) fail(`Unbound variable at de Bruijn index ${term.index}`);
      // Context entries are stored relative to the context in which their
      // binder was introduced. Looking up #i crosses i+1 inner binders, so
      // shift the stored type back into the current context.
      return shift(type, term.index + 1);
    }
    case 'Pi': {
      check(ctx, term.domain, Type);
      check([...ctx, term.domain], term.body, Type);
      return Type;
    }
    case 'Prod': { check(ctx, term.left, Type); check(ctx, term.right, Type); return Type; }
    case 'Pair': { const leftType = infer(ctx, term.left); const rightType = infer(ctx, term.right); return prod(leftType, rightType); }
    case 'Fst': { const pairType = whnf(infer(ctx, term.pair)); if (pairType.kind !== 'Prod') fail('Expected a product'); return pairType.left; }
    case 'Snd': { const pairType = whnf(infer(ctx, term.pair)); if (pairType.kind !== 'Prod') fail('Expected a product'); return pairType.right; }
    case 'Lambda': {
      check(ctx, term.domain, Type);
      const bodyType = infer([...ctx, term.domain], term.body);
      return pi(term.domain, bodyType, term.name);
    }
    case 'App': {
      const fnType = whnf(infer(ctx, term.fn));
      if (fnType.kind !== 'Pi') fail(`Expected a function type, found ${show(fnType)}`);
      check(ctx, term.arg, fnType.domain);
      return substitute(fnType.body, term.arg);
    }
    case 'Succ': { check(ctx, term.value, Nat); return Nat; }
    case 'NatRec': {
      check(ctx, term.motive, pi(Nat, Type, 'n'));
      const zeroType = app(term.motive, Zero);
      check(ctx, term.zeroCase, zeroType);
      // Under the successor binder, the motive crosses one new binder before
      // it is applied to #0. Shift it into that extended context first.
      // Then, under the inner induction-hypothesis binder, #0 is the
      // induction hypothesis and #1 is n.
      const motiveUnderSucc = shift(term.motive, 1);
      const succExpected = pi(
        Nat,
        pi(app(motiveUnderSucc, variable(0)), app(motiveUnderSucc, succ(variable(1)))),
        'n'
      );
      check(ctx, term.succCase, succExpected);
      check(ctx, term.scrutinee, Nat);
      return app(term.motive, term.scrutinee);
    }
    case 'BoolRec': {
      check(ctx, term.motive, pi(Bool, Type, 'b'));
      check(ctx, term.trueCase, app(term.motive, True));
      check(ctx, term.falseCase, app(term.motive, False));
      check(ctx, term.scrutinee, Bool);
      return app(term.motive, term.scrutinee);
    }
    case 'EmptyRec': {
      check(ctx, term.motive, pi(Empty, Type, 'e'));
      check(ctx, term.scrutinee, Empty);
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
      const valueType = infer(ctx, term.left);
      check(ctx, term.motive, pi(valueType, Type));
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
    case 'Bool': return 'Bool';
    case 'Empty': return 'Empty';
    case 'Zero': return '0';
    case 'True': return 'true';
    case 'False': return 'false';
    case 'Var': return term.name ?? `#${term.index}`;
    case 'Pi': return `(x : ${show(term.domain)}) -> ${show(term.body)}`;
    case 'Prod': return `(${show(term.left)} x ${show(term.right)})`;
    case 'Pair': return `(${show(term.left)}, ${show(term.right)})`;
    case 'Fst': return `(fst ${show(term.pair)})`;
    case 'Snd': return `(snd ${show(term.pair)})`;
    case 'Lambda': return `(fun x : ${show(term.domain)} => ${show(term.body)})`;
    case 'App': return `(${show(term.fn)} ${show(term.arg)})`;
    case 'Succ': return `(Succ ${show(term.value)})`;
    case 'NatRec': return `(Nat.rec ${show(term.motive)} ${show(term.zeroCase)} ${show(term.succCase)} ${show(term.scrutinee)})`;
    case 'BoolRec': return `(Bool.rec ${show(term.motive)} ${show(term.trueCase)} ${show(term.falseCase)} ${show(term.scrutinee)})`;
    case 'EmptyRec': return `(Empty.rec ${show(term.motive)} ${show(term.scrutinee)})`;
    case 'Eq': return `Eq ${show(term.type)} ${show(term.left)} ${show(term.right)}`;
    case 'Refl': return `refl ${show(term.value)}`;
    case 'EqRec': return `(Eq.rec ...)`;
  }
}

export { variable, pi, lambda, app, succ, natRec, eq, refl, eqRec };
