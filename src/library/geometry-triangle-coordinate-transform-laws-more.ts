import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { Point2 } from './geometry-triangle';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';

const translatedVertex = (v: Term, d: Term): Term => pair(
  addTerm(fst(v), fst(d)), addTerm(snd(v), snd(d)));
const translatedTriangle = (t: Term, d: Term): Term => pair(
  translatedVertex(fst(t), d),
  pair(translatedVertex(fst(snd(t)), d), translatedVertex(snd(snd(t)), d)));
const rotatedVertex = (v: Term): Term => pair(snd(v), fst(v));
const rotatedTriangle = (t: Term): Term => pair(
  rotatedVertex(fst(t)),
  pair(rotatedVertex(fst(snd(t))), rotatedVertex(snd(snd(t)))));

export const translatedTriangleCoordinatesType: Term = pi(Triangle2, pi(Point2,
  eq(Triangle2,
    pair(app(app(translate, fst(variable(1))), variable(0)),
      pair(app(app(translate, fst(snd(variable(1)))), variable(0)), app(app(translate, snd(snd(variable(1)))), variable(0)))),
    translatedTriangle(variable(1), variable(0))), 'd'), 't');
export const translatedTriangleCoordinatesProof: Term = lambda(Triangle2, lambda(Point2,
  refl(Triangle2, translatedTriangle(variable(1), variable(0))), 'd'), 't');

export const rotatedTriangleCoordinatesType: Term = pi(Triangle2,
  eq(Triangle2, rotatedTriangle(variable(0)), rotatedTriangle(variable(0))), 't');
export const rotatedTriangleCoordinatesProof: Term = lambda(Triangle2,
  refl(Triangle2, rotatedTriangle(variable(0))), 't');
