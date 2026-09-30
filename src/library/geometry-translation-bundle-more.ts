import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { translate } from './geometry-transform';
import { addTerm } from './nat';

export const Vec2: Term = prod(Nat, Nat);

/** Both coordinate formulas for translation are carried in one dependent pair. */
export const translationCoordinateBundleType: Term = pi(Vec2, pi(Vec2,
  prod(
    eq(Nat,
      fst(app(app(translate, variable(1)), variable(0))),
      addTerm(fst(variable(1)), fst(variable(0)))),
    eq(Nat,
      snd(app(app(translate, variable(1)), variable(0))),
      addTerm(snd(variable(1)), snd(variable(0))))), 'd'), 'p');

export const translationCoordinateBundleProof: Term = lambda(Vec2, lambda(Vec2,
  pair(
    refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))),
    refl(Nat, addTerm(snd(variable(1)), snd(variable(0))))), 'd'), 'p');
