import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Circle2 } from './geometry-circle-laws';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** A translated circle keeps its radius as its second component. */
export const translateCircleRadiusType: Term = pi(Point2, pi(Circle2,
  eq(Nat, snd(pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0)))), snd(variable(0))), 'c'), 'd');
export const translateCircleRadiusProof: Term = lambda(Point2, lambda(Circle2,
  refl(Nat, snd(variable(0))), 'c'), 'd');

/** A rotated circle keeps its radius as its second component. */
export const rotateCircleRadiusType: Term = pi(Circle2,
  eq(Nat, snd(pair(app(rotate90, fst(variable(0))), snd(variable(0)))), snd(variable(0))), 'c');
export const rotateCircleRadiusProof: Term = lambda(Circle2, refl(Nat, snd(variable(0))), 'c');

/** A reflected circle keeps its radius as its second component. */
export const reflectCircleRadiusType: Term = pi(Circle2,
  eq(Nat, snd(pair(app(reflectX, fst(variable(0))), snd(variable(0)))), snd(variable(0))), 'c');
export const reflectCircleRadiusProof: Term = lambda(Circle2, refl(Nat, snd(variable(0))), 'c');

/** The first coordinate of a translated circle center is the coordinate sum. */
export const translateCircleCenterFstGeneralType: Term = pi(Point2, pi(Circle2,
  eq(Nat, fst(app(app(translate, fst(variable(0))), variable(1))),
    addTerm(fst(fst(variable(0))), fst(variable(1)))), 'c'), 'd');
export const translateCircleCenterFstGeneralProof: Term = lambda(Point2, lambda(Circle2,
  refl(Nat, addTerm(fst(fst(variable(0))), fst(variable(1)))), 'c'), 'd');

/** The second coordinate of a rotated circle center is the original first coordinate. */
export const rotateCircleCenterSndGeneralType: Term = pi(Circle2,
  eq(Nat, snd(app(rotate90, fst(variable(0)))), fst(fst(variable(0)))), 'c');
export const rotateCircleCenterSndGeneralProof: Term = lambda(Circle2,
  refl(Nat, fst(fst(variable(0)))), 'c');
