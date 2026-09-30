import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { Triangle2 } from './geometry-triangle';
import { Circle2 } from './geometry-circle-laws';

export const Point2: Term = prod(Nat, Nat);

/** Rotating any triangle's first vertex exposes swapped coordinates. */
export const rotateTriangleFirstFstType: Term = pi(Triangle2,
  eq(Nat, fst(app(rotate90, fst(variable(0)))), snd(fst(variable(0)))), 't');
export const rotateTriangleFirstFstProof: Term = lambda(Triangle2, refl(Nat, snd(fst(variable(0)))), 't');

export const rotateTriangleFirstSndType: Term = pi(Triangle2,
  eq(Nat, snd(app(rotate90, fst(variable(0)))), fst(fst(variable(0)))), 't');
export const rotateTriangleFirstSndProof: Term = lambda(Triangle2, refl(Nat, fst(fst(variable(0)))), 't');

/** Translating any triangle's third vertex remains a point expression. */
export const translateTriangleThirdType: Term = pi(Point2, pi(Triangle2,
  eq(Point2, app(app(translate, snd(snd(variable(0)))), variable(1)),
    app(app(translate, snd(snd(variable(0)))), variable(1))), 't'), 'd');
export const translateTriangleThirdProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Point2, app(app(translate, snd(snd(variable(0)))), variable(1))), 't'), 'd');

/** Circle center and radius projections are parameterized over every circle. */
export const circleCenterProjectionType: Term = pi(Circle2,
  eq(Point2, fst(variable(0)), fst(variable(0))), 'c');
export const circleCenterProjectionProof: Term = lambda(Circle2, refl(Point2, fst(variable(0))), 'c');
export const circleRadiusProjectionType: Term = pi(Circle2,
  eq(Nat, snd(variable(0)), snd(variable(0))), 'c');
export const circleRadiusProjectionProof: Term = lambda(Circle2, refl(Nat, snd(variable(0))), 'c');
