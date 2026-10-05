import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Vec2: Term = prod(Nat, Nat);

/** Scaling followed by translation expands coordinatewise. */
export const scaleTranslateFstType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat, fst(app(app(translate, app(app(scaleVec, variable(2)), variable(1))), variable(0))),
    addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0)))), 'd'), 'v'), 'k');
export const scaleTranslateFstProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0)))), 'd'), 'v'), 'k');

export const scaleTranslateSndType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat, snd(app(app(translate, app(app(scaleVec, variable(2)), variable(1))), variable(0))),
    addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0)))), 'd'), 'v'), 'k');
export const scaleTranslateSndProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0)))), 'd'), 'v'), 'k');
