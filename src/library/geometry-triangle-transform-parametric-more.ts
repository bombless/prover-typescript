import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** Rotating the second triangle vertex exposes swapped coordinates. */
export const rotateTriangleSecondFstType: Term = pi(Triangle2,
  eq(Nat, fst(app(rotate90, fst(snd(variable(0))))), snd(fst(snd(variable(0))))), 't');
export const rotateTriangleSecondFstProof: Term = lambda(Triangle2, refl(Nat, snd(fst(snd(variable(0))))), 't');

export const rotateTriangleSecondSndType: Term = pi(Triangle2,
  eq(Nat, snd(app(rotate90, fst(snd(variable(0))))), fst(fst(snd(variable(0))))), 't');
export const rotateTriangleSecondSndProof: Term = lambda(Triangle2, refl(Nat, fst(fst(snd(variable(0))))), 't');

/** Translating the third triangle vertex exposes coordinate sums. */
export const translateTriangleThirdFstType: Term = pi(Point2, pi(Triangle2,
  eq(Nat, fst(app(app(translate, snd(snd(variable(0)))), variable(1))), addTerm(fst(snd(snd(variable(0)))), fst(variable(1)))), 't'), 'd');
export const translateTriangleThirdFstProof: Term = lambda(Point2, lambda(Triangle2, refl(Nat, addTerm(fst(snd(snd(variable(0)))), fst(variable(1)))), 't'), 'd');

export const translateTriangleThirdSndType: Term = pi(Point2, pi(Triangle2,
  eq(Nat, snd(app(app(translate, snd(snd(variable(0)))), variable(1))), addTerm(snd(snd(snd(variable(0)))), snd(variable(1)))), 't'), 'd');
export const translateTriangleThirdSndProof: Term = lambda(Point2, lambda(Triangle2, refl(Nat, addTerm(snd(snd(snd(variable(0)))), snd(variable(1)))), 't'), 'd');
