import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';
import { mulTerm } from './mul';

export const Vec2: Term = prod(Nat, Nat);

/** First coordinate after rotating a scaled vector. */
export const rotateScaleFstType: Term = pi(Nat, pi(Vec2,
  eq(Nat, fst(app(rotate90, app(app(scaleVec, variable(1)), variable(0)))),
    mulTerm(variable(1), snd(variable(0)))), 'v'), 'k');
export const rotateScaleFstProof: Term = lambda(Nat, lambda(Vec2,
  refl(Nat, mulTerm(variable(1), snd(variable(0)))), 'v'), 'k');

/** Second coordinate after rotating a scaled vector. */
export const rotateScaleSndType: Term = pi(Nat, pi(Vec2,
  eq(Nat, snd(app(rotate90, app(app(scaleVec, variable(1)), variable(0)))),
    mulTerm(variable(1), fst(variable(0)))), 'v'), 'k');
export const rotateScaleSndProof: Term = lambda(Nat, lambda(Vec2,
  refl(Nat, mulTerm(variable(1), fst(variable(0)))), 'v'), 'k');

/** A concrete scale-then-rotate pipeline computes. */
export const scaleRotateConcreteType: Term = eq(Vec2,
  app(rotate90, app(app(scaleVec, numeral(2)), pair(numeral(3), numeral(4)))),
  pair(numeral(8), numeral(6)));
export const scaleRotateConcreteProof: Term = refl(Vec2, pair(numeral(8), numeral(6)));

export const scaleRotateNormType: Term = eq(Nat,
  app(normSq, app(rotate90, app(app(scaleVec, numeral(2)), pair(numeral(3), numeral(4))))), numeral(100));
export const scaleRotateNormProof: Term = refl(Nat, numeral(100));
