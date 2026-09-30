import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { addTerm } from './nat';

export const Vec2: Term = prod(Nat, Nat);

/** Both coordinate formulas for vector addition are available together. */
export const vectorAddCoordinateBundleType: Term = pi(Vec2, pi(Vec2,
  prod(
    eq(Nat, fst(app(app(addVec2, variable(1)), variable(0))),
      addTerm(fst(variable(1)), fst(variable(0)))),
    eq(Nat, snd(app(app(addVec2, variable(1)), variable(0))),
      addTerm(snd(variable(1)), snd(variable(0))))), 'v'), 'u');

export const vectorAddCoordinateBundleProof: Term = lambda(Vec2, lambda(Vec2,
  pair(
    refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))),
    refl(Nat, addTerm(snd(variable(1)), snd(variable(0))))), 'v'), 'u');
