import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const reflectRotatePointFstType: Term = pi(Point2,
  eq(Nat, fst(app(reflectX, app(rotate90, variable(0)))), snd(variable(0))), 'p');
export const reflectRotatePointFstProof: Term = lambda(Point2, refl(Nat, snd(variable(0))), 'p');
export const rotateTranslateFirstType: Term = pi(Point2, pi(Point2,
  eq(Nat, fst(app(rotate90, app(app(translate, variable(1)), variable(0)))),
    addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p');
export const rotateTranslateFirstProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p');
