import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { normSq, dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { mulTerm } from './mul';
import { addTerm } from './nat';

export const Vec2: Term = prod(Nat, Nat);

const scaled = (k: Term, v: Term): Term => app(app(scaleVec, k), v);
const dotFormula = (u: Term, v: Term): Term => addTerm(
  mulTerm(fst(u), fst(v)), mulTerm(snd(u), snd(v)));
const crossFormula = (u: Term, v: Term): Term => addTerm(
  mulTerm(fst(u), snd(v)), mulTerm(snd(u), fst(v)));
const scaledNorm = (k: Term, v: Term): Term => addTerm(
  mulTerm(mulTerm(k, fst(v)), mulTerm(k, fst(v))),
  mulTerm(mulTerm(k, snd(v)), mulTerm(k, snd(v))));

/** Scaling expands the squared norm into scaled coordinates. */
export const scaledNormType: Term = pi(Nat, pi(Vec2,
  eq(Nat, app(normSq, scaled(variable(1), variable(0))), scaledNorm(variable(1), variable(0))), 'v'), 'k');
export const scaledNormProof: Term = lambda(Nat, lambda(Vec2,
  refl(Nat, scaledNorm(variable(1), variable(0))), 'v'), 'k');

/** Scaling both vectors expands the dot product into scaled coordinates. */
export const scaledDotType: Term = pi(Nat, pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat, app(app(dot2, scaled(variable(3), variable(1))), scaled(variable(2), variable(0))),
    dotFormula(scaled(variable(3), variable(1)), scaled(variable(2), variable(0)))), 'v'), 'u'), 'l'), 'k');
export const scaledDotProof: Term = lambda(Nat, lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, dotFormula(scaled(variable(3), variable(1)), scaled(variable(2), variable(0)))), 'v'), 'u'), 'l'), 'k');

/** Scaling both vectors expands the simplified cross expression into scaled coordinates. */
export const scaledCrossType: Term = pi(Nat, pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat, app(app(cross2, scaled(variable(3), variable(1))), scaled(variable(2), variable(0))),
    crossFormula(scaled(variable(3), variable(1)), scaled(variable(2), variable(0)))), 'v'), 'u'), 'l'), 'k');
export const scaledCrossProof: Term = lambda(Nat, lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, crossFormula(scaled(variable(3), variable(1)), scaled(variable(2), variable(0)))), 'v'), 'u'), 'l'), 'k');
