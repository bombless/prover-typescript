import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Circle2 } from './geometry-circle-laws';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** Translating a circle center exposes coordinate sums. */
export const translateCircleCenterFstType: Term = pi(Point2, pi(Circle2,
  eq(Nat, fst(app(app(translate, fst(variable(0))), variable(1))), addTerm(fst(fst(variable(0))), fst(variable(1)))), 'c'), 'd');
export const translateCircleCenterFstProof: Term = lambda(Point2, lambda(Circle2, refl(Nat, addTerm(fst(fst(variable(0))), fst(variable(1)))), 'c'), 'd');

export const translateCircleCenterSndType: Term = pi(Point2, pi(Circle2,
  eq(Nat, snd(app(app(translate, fst(variable(0))), variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1)))), 'c'), 'd');
export const translateCircleCenterSndProof: Term = lambda(Point2, lambda(Circle2, refl(Nat, addTerm(snd(fst(variable(0))), snd(variable(1)))), 'c'), 'd');

/** Rotating a circle center exposes swapped coordinates while preserving radius separately. */
export const rotateCircleCenterFstType: Term = pi(Circle2, eq(Nat, fst(app(rotate90, fst(variable(0)))), snd(fst(variable(0)))), 'c');
export const rotateCircleCenterFstProof: Term = lambda(Circle2, refl(Nat, snd(fst(variable(0)))), 'c');
export const rotateCircleCenterSndType: Term = pi(Circle2, eq(Nat, snd(app(rotate90, fst(variable(0)))), fst(fst(variable(0)))), 'c');
export const rotateCircleCenterSndProof: Term = lambda(Circle2, refl(Nat, fst(fst(variable(0)))), 'c');
