import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { addTerm } from './nat';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));

/** Coordinate laws for the second vertex of a translated triangle. */
export const translatedSecondVertexFstType: Term = pi(Point2, pi(Triangle2,
  eq(Nat, fst(app(app(translate, fst(snd(variable(0)))), variable(1))),
    addTerm(fst(fst(snd(variable(0)))), fst(variable(1)))), 'd'), 't');
export const translatedSecondVertexFstProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Nat, addTerm(fst(fst(snd(variable(0)))), fst(variable(1)))), 'd'), 't');

export const translatedSecondVertexSndType: Term = pi(Point2, pi(Triangle2,
  eq(Nat, snd(app(app(translate, fst(snd(variable(0)))), variable(1))),
    addTerm(snd(fst(snd(variable(0)))), snd(variable(1)))), 'd'), 't');
export const translatedSecondVertexSndProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Nat, addTerm(snd(fst(snd(variable(0)))), snd(variable(1)))), 'd'), 't');

/** Coordinate laws for the third vertex of a translated triangle. */
export const translatedThirdVertexFstType: Term = pi(Point2, pi(Triangle2,
  eq(Nat, fst(app(app(translate, snd(snd(variable(0)))), variable(1))),
    addTerm(fst(snd(snd(variable(0)))), fst(variable(1)))), 'd'), 't');
export const translatedThirdVertexFstProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Nat, addTerm(fst(snd(snd(variable(0)))), fst(variable(1)))), 'd'), 't');

export const translatedThirdVertexSndType: Term = pi(Point2, pi(Triangle2,
  eq(Nat, snd(app(app(translate, snd(snd(variable(0)))), variable(1))),
    addTerm(snd(snd(snd(variable(0)))), snd(variable(1)))), 'd'), 't');
export const translatedThirdVertexSndProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Nat, addTerm(snd(snd(snd(variable(0)))), snd(variable(1)))), 'd'), 't');

/** A quarter-turn swaps the first triangle vertex coordinates. */
export const rotatedFirstVertexFstType: Term = pi(Triangle2,
  eq(Nat, fst(app(rotate90, fst(variable(0)))), snd(fst(variable(0)))), 't');
export const rotatedFirstVertexFstProof: Term = lambda(Triangle2,
  refl(Nat, snd(fst(variable(0)))), 't');
export const rotatedFirstVertexSndType: Term = pi(Triangle2,
  eq(Nat, snd(app(rotate90, fst(variable(0)))), fst(fst(variable(0)))), 't');
export const rotatedFirstVertexSndProof: Term = lambda(Triangle2,
  refl(Nat, fst(fst(variable(0)))), 't');
