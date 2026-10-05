import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { mulTerm } from './mul';
import { addTerm } from './nat';

export const Vec2: Term = prod(Nat, Nat);

/** Dot product after scaling is expressed by the two scaled coordinates. */
export const scaledDotFormulaType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat, app(app(dot2, app(app(scaleVec, variable(2)), variable(1))), variable(0)),
    addTerm(
      mulTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0))),
      mulTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0))))), 'u'), 'v'), 'k');
export const scaledDotFormulaProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, addTerm(
    mulTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0))),
    mulTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0))))), 'u'), 'v'), 'k');

/** Cross product after scaling is expressed by the two scaled coordinates. */
export const scaledCrossFormulaType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat, app(app(cross2, app(app(scaleVec, variable(2)), variable(1))), variable(0)),
    addTerm(
      mulTerm(mulTerm(variable(2), fst(variable(1))), snd(variable(0))),
      mulTerm(mulTerm(variable(2), snd(variable(1))), fst(variable(0))))), 'u'), 'v'), 'k');
export const scaledCrossFormulaProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, addTerm(
    mulTerm(mulTerm(variable(2), fst(variable(1))), snd(variable(0))),
    mulTerm(mulTerm(variable(2), snd(variable(1))), fst(variable(0))))), 'u'), 'v'), 'k');

/** Scaling by zero makes both product expressions definitionally zero. */
export const zeroScaledDotType: Term = pi(Vec2, pi(Vec2,
  eq(Nat, app(app(dot2, app(app(scaleVec, { kind: 'Zero' }), variable(1))), variable(0)), { kind: 'Zero' }), 'u'), 'v');
export const zeroScaledDotProof: Term = lambda(Vec2, lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'u'), 'v');
export const zeroScaledCrossType: Term = pi(Vec2, pi(Vec2,
  eq(Nat, app(app(cross2, app(app(scaleVec, { kind: 'Zero' }), variable(1))), variable(0)), { kind: 'Zero' }), 'u'), 'v');
export const zeroScaledCrossProof: Term = lambda(Vec2, lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'u'), 'v');
