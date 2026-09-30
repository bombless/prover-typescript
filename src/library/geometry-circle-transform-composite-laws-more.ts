import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Circle2 } from './geometry-circle-laws';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);
const translatedCenter = (c: Term, d: Term): Term => pair(
  addTerm(fst(fst(c)), fst(d)), addTerm(snd(fst(c)), snd(d)));

export const translatedCircleCenterType: Term = pi(Point2, pi(Circle2,
  eq(Point2, app(app(translate, fst(variable(0))), variable(1)), translatedCenter(variable(0), variable(1))), 'c'), 'd');
export const translatedCircleCenterProof: Term = lambda(Point2, lambda(Circle2,
  refl(Point2, translatedCenter(variable(0), variable(1))), 'c'), 'd');

export const rotatedCircleCenterType: Term = pi(Circle2,
  eq(Point2, app(rotate90, fst(variable(0))), pair(snd(fst(variable(0))), fst(fst(variable(0))))), 'c');
export const rotatedCircleCenterProof: Term = lambda(Circle2,
  refl(Point2, pair(snd(fst(variable(0))), fst(fst(variable(0))))), 'c');
