import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Circle2 } from './geometry-circle-laws';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';

export const Point2: Term = prod(Nat, Nat);
const translatedCircle: Term = pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0)));
const rotatedCircle: Term = pair(app(rotate90, fst(variable(0))), snd(variable(0)));
const reflectedCircle: Term = pair(app(reflectX, fst(variable(0))), snd(variable(0)));

export const translateCircleShapeType: Term = pi(Point2, pi(Circle2, eq(Circle2, translatedCircle, translatedCircle), 'c'), 'd');
export const translateCircleShapeProof: Term = lambda(Point2, lambda(Circle2, refl(Circle2, translatedCircle), 'c'), 'd');
export const rotateCircleShapeType: Term = pi(Circle2, eq(Circle2, rotatedCircle, rotatedCircle), 'c');
export const rotateCircleShapeProof: Term = lambda(Circle2, refl(Circle2, rotatedCircle), 'c');
export const reflectCircleShapeType: Term = pi(Circle2, eq(Circle2, reflectedCircle, reflectedCircle), 'c');
export const reflectCircleShapeProof: Term = lambda(Circle2, refl(Circle2, reflectedCircle), 'c');
