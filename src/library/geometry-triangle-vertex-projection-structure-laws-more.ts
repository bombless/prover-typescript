import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

export const translatedSecondVertexType: Term = pi(Point2, pi(Triangle2,
  eq(Point2, app(app(translate, fst(snd(variable(0)))), variable(1)),
    pair(addTerm(fst(fst(snd(variable(0)))), fst(variable(1))), addTerm(snd(fst(snd(variable(0)))), snd(variable(1))))), 'd'), 't');
export const translatedSecondVertexProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Point2, pair(addTerm(fst(fst(snd(variable(0)))), fst(variable(1))), addTerm(snd(fst(snd(variable(0)))), snd(variable(1))))), 'd'), 't');

export const rotatedThirdVertexType: Term = pi(Triangle2,
  eq(Point2, app(rotate90, snd(snd(variable(0)))),
    pair(snd(snd(snd(variable(0)))), fst(snd(snd(variable(0)))))), 't');
export const rotatedThirdVertexProof: Term = lambda(Triangle2,
  refl(Point2, pair(snd(snd(snd(variable(0)))), fst(snd(snd(variable(0)))))));
