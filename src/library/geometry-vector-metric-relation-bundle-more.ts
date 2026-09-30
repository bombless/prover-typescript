import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { normSq } from './geometry-metrics';
import { mulTerm } from './mul';
import { addTerm } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const square = (x: Term): Term => mulTerm(x, x);
const dotFormula = (u: Term, v: Term): Term => addTerm(
  mulTerm(fst(u), fst(v)),
  mulTerm(snd(u), snd(v)),
);
const crossFormula = (u: Term, v: Term): Term => addTerm(
  mulTerm(fst(u), snd(v)),
  mulTerm(snd(u), fst(v)),
);

/** Self-dot is definitionally the squared norm in this coordinate model. */
export const selfDotNormType: Term = pi(Vec2,
  eq(Nat, app(app(dot2, variable(0)), variable(0)), app(normSq, variable(0))), 'v');
export const selfDotNormProof: Term = lambda(Vec2,
  refl(Nat, dotFormula(variable(0), variable(0))), 'v');

/** The norm formula is the diagonal dot formula. */
export const normCoordinateType: Term = pi(Vec2,
  eq(Nat, app(normSq, variable(0)),
    addTerm(square(fst(variable(0))), square(snd(variable(0))))), 'v');
export const normCoordinateProof: Term = lambda(Vec2,
  refl(Nat, addTerm(square(fst(variable(0))), square(snd(variable(0))))), 'v');

/** The cross formula is exposed for arbitrary vectors as a reusable relation. */
export const crossCoordinateType: Term = pi(Vec2, pi(Vec2,
  eq(Nat, app(app(cross2, variable(1)), variable(0)), crossFormula(variable(1), variable(0))), 'v'), 'u');
export const crossCoordinateProof: Term = lambda(Vec2,
  lambda(Vec2, refl(Nat, crossFormula(variable(1), variable(0))), 'v'), 'u');

/** A zero vector has zero norm, dot product, and cross expression against every vector. */
export const zeroMetricBundleType: Term = pi(Vec2,
  { kind: 'Prod', left: eq(Nat, app(normSq, pair({ kind: 'Zero' }, { kind: 'Zero' })), { kind: 'Zero' }),
    right: { kind: 'Prod', left: eq(Nat, app(app(dot2, pair({ kind: 'Zero' }, { kind: 'Zero' })), variable(0)), { kind: 'Zero' }),
      right: eq(Nat, app(app(cross2, pair({ kind: 'Zero' }, { kind: 'Zero' })), variable(0)), { kind: 'Zero' }) } }, 'v');
export const zeroMetricBundleProof: Term = lambda(Vec2,
  pair(refl(Nat, { kind: 'Zero' }), pair(refl(Nat, { kind: 'Zero' }), refl(Nat, { kind: 'Zero' }))), 'v');
