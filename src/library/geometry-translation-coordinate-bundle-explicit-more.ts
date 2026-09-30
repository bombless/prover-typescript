import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { translate } from './geometry-transform';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** Translation's first projection is proved parametrically. */
export const translatedFstGeneralType: Term = pi(Point2, pi(Point2,
  eq(Nat, fst(app(app(translate, variable(1)), variable(0))),
    addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');
export const translatedFstGeneralProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');

/** Translation's second projection is proved parametrically. */
export const translatedSndGeneralType: Term = pi(Point2, pi(Point2,
  eq(Nat, snd(app(app(translate, variable(1)), variable(0))),
    addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p');
export const translatedSndGeneralProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p');
