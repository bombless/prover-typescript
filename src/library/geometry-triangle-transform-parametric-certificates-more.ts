import { Term, Nat, prod, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { Point2 } from './geometry-triangle';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { addTerm } from './nat';

/** Translating the first triangle vertex acts coordinatewise for every triangle and displacement. */
export const translatedFirstVertexType: Term = pi(Triangle2, pi(Point2,
  eq(Point2, app(app(translate, fst(variable(1))), variable(0)),
    { kind: 'Pair', left: addTerm(fst(fst(variable(1))), fst(variable(0))), right: addTerm(snd(fst(variable(1))), snd(variable(0))) }), 'd'), 't');
export const translatedFirstVertexProof: Term = lambda(Triangle2, lambda(Point2,
  refl(Point2, { kind: 'Pair', left: addTerm(fst(fst(variable(1))), fst(variable(0))), right: addTerm(snd(fst(variable(1))), snd(variable(0))) }), 'd'), 't');

/** Rotating the second triangle vertex exchanges its two coordinates. */
export const rotatedSecondVertexType: Term = pi(Triangle2,
  eq(Point2, app(rotate90, fst(snd(variable(0)))),
    { kind: 'Pair', left: snd(fst(snd(variable(0)))), right: fst(fst(snd(variable(0)))) }), 't');
export const rotatedSecondVertexProof: Term = lambda(Triangle2,
  refl(Point2, { kind: 'Pair', left: snd(fst(snd(variable(0)))), right: fst(fst(snd(variable(0)))) }), 't');

/** Reflection exposes the third triangle vertex unchanged in this coordinate model. */
export const reflectedThirdVertexType: Term = pi(Triangle2,
  eq(Point2, app(reflectX, snd(snd(variable(0)))), snd(snd(variable(0)))), 't');
export const reflectedThirdVertexProof: Term = lambda(Triangle2,
  refl(Point2, snd(snd(variable(0)))), 't');
