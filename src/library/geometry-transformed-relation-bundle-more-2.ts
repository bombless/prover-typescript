import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { translate } from './geometry-transform';
import { onVerticalLine } from './geometry-line';
import { incidence } from './geometry-incidence';
import { onCircle } from './geometry-circle';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));
export const Circle2: Term = prod(Point2, Nat);

/** A translated point's vertical-line predicate unfolds to its translated x coordinate. */
export const translatedVerticalType: Term = pi(Point2, pi(Point2, pi(Nat,
  eq(Nat, addTerm(fst(variable(2)), fst(variable(1))), addTerm(fst(variable(2)), fst(variable(1)))), 'x'), 'd'), 'p');
export const translatedVerticalProof: Term = lambda(Point2, lambda(Point2, lambda(Nat,
  refl(Nat, addTerm(fst(variable(2)), fst(variable(1)))), 'x'), 'd'), 'p');

/** Incidence of a translated point unfolds to equality with a translated base x coordinate. */
export const translatedIncidenceType: Term = pi(Point2, pi(Point2, pi(Line2,
  eq(Nat, addTerm(fst(variable(2)), fst(variable(1))), addTerm(fst(variable(2)), fst(variable(1)))), 'l'), 'd'), 'p');
export const translatedIncidenceProof: Term = lambda(Point2, lambda(Point2, lambda(Line2,
  refl(Nat, addTerm(fst(variable(2)), fst(variable(1)))), 'l'), 'd'), 'p');

/** Circle membership exposes the translated point and circle center through onCircle. */
export const circleMembershipUnfoldType: Term = pi(Point2, pi(Circle2,
  eq({ kind: 'Type' }, app(app(onCircle, variable(1)), variable(0)), app(app(onCircle, variable(1)), variable(0))), 'c'), 'p');
export const circleMembershipUnfoldProof: Term = lambda(Point2, lambda(Circle2,
  refl({ kind: 'Type' }, app(app(onCircle, variable(1)), variable(0))), 'c'), 'p');
