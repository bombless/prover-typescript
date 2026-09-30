import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { translate } from './geometry-transform';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** Translation preserves the point shape and exposes both coordinate sums. */
export const translateShapeType: Term = pi(Point2, pi(Point2,
  eq(Point2, app(app(translate, variable(1)), variable(0)),
    { kind: 'Pair', left: addTerm(fst(variable(1)), fst(variable(0))), right: addTerm(snd(variable(1)), snd(variable(0))) }), 'd'), 'p');
export const translateShapeProof: Term = lambda(Point2, lambda(Point2,
  refl(Point2, { kind: 'Pair', left: addTerm(fst(variable(1)), fst(variable(0))), right: addTerm(snd(variable(1)), snd(variable(0))) }), 'd'), 'p');

export const translateFstGeneralType: Term = pi(Point2, pi(Point2,
  eq(Nat, fst(app(app(translate, variable(1)), variable(0))), addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');
export const translateFstGeneralProof: Term = lambda(Point2, lambda(Point2, refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');

export const translateSndGeneralType: Term = pi(Point2, pi(Point2,
  eq(Nat, snd(app(app(translate, variable(1)), variable(0))), addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p');
export const translateSndGeneralProof: Term = lambda(Point2, lambda(Point2, refl(Nat, addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p');
