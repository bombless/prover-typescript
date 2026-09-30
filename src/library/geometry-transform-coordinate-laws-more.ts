import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** Reflection after rotation preserves the corresponding swapped projections. */
export const reflectRotateFstType: Term = pi(Point2,
  eq(Nat, fst(app(reflectX, app(rotate90, variable(0)))), snd(variable(0))), 'p');
export const reflectRotateFstProof: Term = lambda(Point2, refl(Nat, snd(variable(0))), 'p');
export const reflectRotateSndType: Term = pi(Point2,
  eq(Nat, snd(app(reflectX, app(rotate90, variable(0)))), fst(variable(0))), 'p');
export const reflectRotateSndProof: Term = lambda(Point2, refl(Nat, fst(variable(0))), 'p');

/** Translating a point and then projecting exposes the coordinate sum. */
export const translateThenRotateFstType: Term = pi(Point2, pi(Point2,
  eq(Nat, fst(app(rotate90, app(app(translate, variable(1)), variable(0)))),
    addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p');
export const translateThenRotateFstProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p');

export const translateThenRotateSndType: Term = pi(Point2, pi(Point2,
  eq(Nat, snd(app(rotate90, app(app(translate, variable(1)), variable(0)))),
    addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');
export const translateThenRotateSndProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');
