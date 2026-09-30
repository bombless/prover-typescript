import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Circle2 } from './geometry-circle-laws';
import { Line2 } from './geometry-line';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';

export const Point2: Term = prod(Nat, Nat);

export const rotatedCircleRadiusType: Term = pi(Circle2,
  eq(Nat, snd(pair(app(rotate90, fst(variable(0))), snd(variable(0)))), snd(variable(0))), 'c');
export const rotatedCircleRadiusProof: Term = lambda(Circle2, refl(Nat, snd(variable(0))), 'c');

export const reflectedCircleRadiusType: Term = pi(Circle2,
  eq(Nat, snd(pair(app(reflectX, fst(variable(0))), snd(variable(0)))), snd(variable(0))), 'c');
export const reflectedCircleRadiusProof: Term = lambda(Circle2, refl(Nat, snd(variable(0))), 'c');

export const translatedLineDirectionType: Term = pi(Point2, pi(Line2,
  eq(Point2, snd(pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0)))), snd(variable(0))), 'l'), 'd');
export const translatedLineDirectionProof: Term = lambda(Point2, lambda(Line2,
  refl(Point2, snd(variable(0))), 'l'), 'd');

export const rotatedLineDirectionType: Term = pi(Line2,
  eq(Point2, snd(pair(app(rotate90, fst(variable(0))), snd(variable(0)))), snd(variable(0))), 'l');
export const rotatedLineDirectionProof: Term = lambda(Line2, refl(Point2, snd(variable(0))), 'l');
