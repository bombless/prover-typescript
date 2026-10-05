import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { mulTerm } from './mul';
import { addTerm } from './nat';

export const Vec2: Term = prod(Nat, Nat);

/** Full coordinate formula for scaling and then rotating a vector. */
export const scaleRotateType: Term = pi(Nat, pi(Vec2,
  eq(Vec2, app(rotate90, app(app(scaleVec, variable(1)), variable(0))),
    pair(mulTerm(variable(1), snd(variable(0))), mulTerm(variable(1), fst(variable(0))))), 'v'), 'k');
export const scaleRotateProof: Term = lambda(Nat, lambda(Vec2,
  refl(Vec2, pair(mulTerm(variable(1), snd(variable(0))), mulTerm(variable(1), fst(variable(0))))), 'v'), 'k');

/** Full coordinate formula for scaling, rotating, and reflecting a vector. */
export const scaleRotateReflectType: Term = pi(Nat, pi(Vec2,
  eq(Vec2, app(reflectX, app(rotate90, app(app(scaleVec, variable(1)), variable(0)))),
    pair(mulTerm(variable(1), snd(variable(0))), mulTerm(variable(1), fst(variable(0))))), 'v'), 'k');
export const scaleRotateReflectProof: Term = lambda(Nat, lambda(Vec2,
  refl(Vec2, pair(mulTerm(variable(1), snd(variable(0))), mulTerm(variable(1), fst(variable(0))))), 'v'), 'k');

/** A translate-then-rotate point has both transformed coordinates exposed. */
export const translateRotateType: Term = pi(Vec2, pi(Vec2,
  eq(Vec2, app(rotate90, app(app(translate, variable(1)), variable(0))),
    pair(addTerm(snd(variable(1)), snd(variable(0))), addTerm(fst(variable(1)), fst(variable(0))))), 'd'), 'p');
export const translateRotateProof: Term = lambda(Vec2, lambda(Vec2,
  refl(Vec2, pair(addTerm(snd(variable(1)), snd(variable(0))), addTerm(fst(variable(1)), fst(variable(0))))), 'd'), 'p');

/** The two projections of the scaled rotated vector are independently recoverable. */
export const scaleRotateFstType: Term = pi(Nat, pi(Vec2,
  eq(Nat, fst(app(rotate90, app(app(scaleVec, variable(1)), variable(0)))), mulTerm(variable(1), snd(variable(0)))), 'v'), 'k');
export const scaleRotateFstProof: Term = lambda(Nat, lambda(Vec2,
  refl(Nat, mulTerm(variable(1), snd(variable(0)))), 'v'), 'k');

export const scaleRotateSndType: Term = pi(Nat, pi(Vec2,
  eq(Nat, snd(app(rotate90, app(app(scaleVec, variable(1)), variable(0)))), mulTerm(variable(1), fst(variable(0)))), 'v'), 'k');
export const scaleRotateSndProof: Term = lambda(Nat, lambda(Vec2,
  refl(Nat, mulTerm(variable(1), fst(variable(0)))), 'v'), 'k');
