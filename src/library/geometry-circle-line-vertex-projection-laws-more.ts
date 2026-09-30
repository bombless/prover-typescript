import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Circle2 } from './geometry-circle-laws';
import { Line2 } from './geometry-line';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

export const translatedCircleCenterType: Term = pi(Point2, pi(Circle2,
  eq(Point2, app(app(translate, fst(variable(0))), variable(1)),
    pair(addTerm(fst(fst(variable(0))), fst(variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1))))), 'c'), 'd');
export const translatedCircleCenterProof: Term = lambda(Point2, lambda(Circle2,
  refl(Point2, pair(addTerm(fst(fst(variable(0))), fst(variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1))))), 'c'), 'd');

export const rotatedLineBaseType: Term = pi(Line2,
  eq(Point2, app(rotate90, fst(variable(0))), pair(snd(fst(variable(0))), fst(fst(variable(0))))), 'l');
export const rotatedLineBaseProof: Term = lambda(Line2,
  refl(Point2, pair(snd(fst(variable(0))), fst(fst(variable(0))))));
