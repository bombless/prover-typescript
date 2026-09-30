import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { mulTerm } from './mul';

export const Vec2: Term = prod(Nat, Nat);

/** Both coordinate formulas for scalar multiplication are bundled. */
export const scaleCoordinateBundleType: Term = pi(Nat, pi(Vec2,
  prod(
    eq(Nat,
      fst(app(app(scaleVec, variable(1)), variable(0))),
      mulTerm(variable(1), fst(variable(0)))),
    eq(Nat,
      snd(app(app(scaleVec, variable(1)), variable(0))),
      mulTerm(variable(1), snd(variable(0))))), 'v'), 'k');

export const scaleCoordinateBundleProof: Term = lambda(Nat, lambda(Vec2,
  pair(
    refl(Nat, mulTerm(variable(1), fst(variable(0)))),
    refl(Nat, mulTerm(variable(1), snd(variable(0))))), 'v'), 'k');
