import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { Circle2 } from './geometry-circle-laws';
import { Line2 } from './geometry-line';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** A translation parameter and triangle form a complete translated-vertex coordinate law. */
export const translatedFirstVertexType: Term = pi(Point2, pi(Triangle2,
  eq(Point2, app(app(translate, fst(variable(0))), variable(1)),
    pair(addTerm(fst(fst(variable(0))), fst(variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1))))), 't'), 'd');
export const translatedFirstVertexProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Point2, pair(addTerm(fst(fst(variable(0))), fst(variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1))))), 't'), 'd');

/** A circle and a line expose their transformed structural projections independently. */
export const rotatedCircleCenterType: Term = pi(Circle2,
  eq(Point2, app(rotate90, fst(variable(0))), pair(snd(fst(variable(0))), fst(fst(variable(0))))), 'c');
export const rotatedCircleCenterProof: Term = lambda(Circle2,
  refl(Point2, pair(snd(fst(variable(0))), fst(fst(variable(0))))), 'c');

export const translatedLineDirectionType: Term = pi(Point2, pi(Line2,
  eq(Point2, snd(pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0)))), snd(variable(0))), 'l'), 'd');
export const translatedLineDirectionProof: Term = lambda(Point2, lambda(Line2,
  refl(Point2, snd(variable(0))), 'l'), 'd');
