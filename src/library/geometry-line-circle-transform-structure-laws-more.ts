import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Line2 } from './geometry-line';
import { Circle2 } from './geometry-circle-laws';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

export const translatedLineBaseType: Term = pi(Point2, pi(Line2,
  eq(Point2, app(app(translate, fst(variable(0))), variable(1)),
    pair(addTerm(fst(fst(variable(0))), fst(variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1))))), 'l'), 'd');
export const translatedLineBaseProof: Term = lambda(Point2, lambda(Line2,
  refl(Point2, pair(addTerm(fst(fst(variable(0))), fst(variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1))))), 'l'), 'd');

export const rotatedCircleCenterType: Term = pi(Circle2,
  eq(Point2, app(rotate90, fst(variable(0))), pair(snd(fst(variable(0))), fst(fst(variable(0))))), 'c');
export const rotatedCircleCenterProof: Term = lambda(Circle2,
  refl(Point2, pair(snd(fst(variable(0))), fst(fst(variable(0))))), 'c');
