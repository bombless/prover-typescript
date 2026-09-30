import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { Point2 } from './geometry-triangle';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';

const translated = (t: Term, d: Term): Term => pair(
  app(app(translate, fst(t)), d),
  pair(app(app(translate, fst(snd(t))), d), app(app(translate, snd(snd(t))), d)));
const rotated = (t: Term): Term => pair(
  app(rotate90, fst(t)),
  pair(app(rotate90, fst(snd(t))), app(rotate90, snd(snd(t)))));
const reflected = (t: Term): Term => pair(
  app(reflectX, fst(t)),
  pair(app(reflectX, fst(snd(t))), app(reflectX, snd(snd(t)))));

export const translatedTriangleType: Term = pi(Triangle2, pi(Point2,
  eq(Triangle2, translated(variable(1), variable(0)), translated(variable(1), variable(0))), 'd'), 't');
export const translatedTriangleProof: Term = lambda(Triangle2, lambda(Point2,
  refl(Triangle2, translated(variable(1), variable(0))), 'd'), 't');

export const rotatedTriangleType: Term = pi(Triangle2,
  eq(Triangle2, rotated(variable(0)), rotated(variable(0))), 't');
export const rotatedTriangleProof: Term = lambda(Triangle2, refl(Triangle2, rotated(variable(0))), 't');

export const reflectedTriangleType: Term = pi(Triangle2,
  eq(Triangle2, reflected(variable(0)), reflected(variable(0))), 't');
export const reflectedTriangleProof: Term = lambda(Triangle2, refl(Triangle2, reflected(variable(0))), 't');
