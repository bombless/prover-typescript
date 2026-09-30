import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Circle2 } from './geometry-circle-laws';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { normSq } from './geometry-metrics';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

const translatedCircle = (d: Term, c: Term): Term => pair(app(app(translate, fst(c)), d), snd(c));
const rotatedCircle = (c: Term): Term => pair(app(rotate90, fst(c)), snd(c));
const reflectedCircle = (c: Term): Term => pair(app(reflectX, fst(c)), snd(c));

/** Every rigid transform preserves the circle radius component. */
export const translateRadiusType: Term = pi(Point2, pi(Circle2,
  eq(Nat, snd(translatedCircle(variable(1), variable(0))), snd(variable(0))), 'c'), 'd');
export const translateRadiusProof: Term = lambda(Point2, lambda(Circle2,
  refl(Nat, snd(variable(0))), 'c'), 'd');
export const rotateRadiusType: Term = pi(Circle2,
  eq(Nat, snd(rotatedCircle(variable(0))), snd(variable(0))), 'c');
export const rotateRadiusProof: Term = lambda(Circle2,
  refl(Nat, snd(variable(0))), 'c');
export const reflectRadiusType: Term = pi(Circle2,
  eq(Nat, snd(reflectedCircle(variable(0))), snd(variable(0))), 'c');
export const reflectRadiusProof: Term = lambda(Circle2,
  refl(Nat, snd(variable(0))), 'c');

/** The center of a transformed circle is the transformed original center. */
export const translateCenterType: Term = pi(Point2, pi(Circle2,
  eq(Point2, fst(translatedCircle(variable(1), variable(0))),
    app(app(translate, fst(variable(0))), variable(1))), 'c'), 'd');
export const translateCenterProof: Term = lambda(Point2, lambda(Circle2,
  refl(Point2, app(app(translate, fst(variable(0))), variable(1))), 'c'), 'd');
export const rotateCenterType: Term = pi(Circle2,
  eq(Point2, fst(rotatedCircle(variable(0))), app(rotate90, fst(variable(0)))), 'c');
export const rotateCenterProof: Term = lambda(Circle2,
  refl(Point2, app(rotate90, fst(variable(0)))), 'c');
export const reflectCenterType: Term = pi(Circle2,
  eq(Point2, fst(reflectedCircle(variable(0))), app(reflectX, fst(variable(0)))), 'c');
export const reflectCenterProof: Term = lambda(Circle2,
  refl(Point2, app(reflectX, fst(variable(0)))), 'c');

/** A self-centered circle has a radius equal to the center's norm. */
export const selfRadiusType: Term = pi(Point2,
  eq(Nat, snd(pair(variable(0), app(normSq, variable(0)))), app(normSq, variable(0))), 'p');
export const selfRadiusProof: Term = lambda(Point2,
  refl(Nat, app(normSq, variable(0))), 'p');
