import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { Point2 } from './geometry-circle';
import { Circle2 } from './geometry-circle';
import { Line2 } from './geometry-line';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';

/** Structural projections for circles, lines, and vertical-line predicates. */
export const circleCenterProjectionType: Term = pi(Circle2, eq(Point2, fst(variable(0)), fst(variable(0))), 'c');
export const circleCenterProjectionProof: Term = lambda(Circle2, refl(Point2, fst(variable(0))), 'c');
export const circleRadiusProjectionType: Term = pi(Circle2, eq(Nat, snd(variable(0)), snd(variable(0))), 'c');
export const circleRadiusProjectionProof: Term = lambda(Circle2, refl(Nat, snd(variable(0))), 'c');

export const incidenceBaseProjectionType: Term = pi(Point2, pi(Line2,
  eq(Nat, fst(variable(1)), fst(variable(1))), 'l'), 'p');
export const incidenceBaseProjectionProof: Term = lambda(Point2, lambda(Line2,
  refl(Nat, fst(variable(1))), 'l'), 'p');

export const verticalProjectionType: Term = pi(Point2, pi(Nat,
  eq(Nat, fst(variable(1)), fst(variable(1))), 'a'), 'p');
export const verticalProjectionProof: Term = lambda(Point2, lambda(Nat, refl(Nat, fst(variable(1))), 'a'), 'p');
