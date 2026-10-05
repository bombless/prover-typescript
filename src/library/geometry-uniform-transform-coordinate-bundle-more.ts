import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** A translated point exposes both coordinate formulas in one certificate. */
export const translateCoordinatesType: Term = pi(Point2, pi(Point2,
  prod(
    eq(Nat, fst(app(app(translate, variable(1)), variable(0))),
      addTerm(fst(variable(1)), fst(variable(0)))),
    eq(Nat, snd(app(app(translate, variable(1)), variable(0))),
      addTerm(snd(variable(1)), snd(variable(0))))), 'd'), 'p');
export const translateCoordinatesProof: Term = lambda(Point2, lambda(Point2,
  pair(
    refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))),
    refl(Nat, addTerm(snd(variable(1)), snd(variable(0))))), 'd'), 'p');

/** A quarter-turn exchanges both projections simultaneously. */
export const rotateCoordinatesType: Term = pi(Point2,
  prod(
    eq(Nat, fst(app(rotate90, variable(0))), snd(variable(0))),
    eq(Nat, snd(app(rotate90, variable(0))), fst(variable(0)))), 'p');
export const rotateCoordinatesProof: Term = lambda(Point2,
  pair(
    refl(Nat, snd(variable(0))),
    refl(Nat, fst(variable(0)))), 'p');

/** The coordinate-copy reflection preserves both projections simultaneously. */
export const reflectCoordinatesType: Term = pi(Point2,
  prod(
    eq(Nat, fst(app(reflectX, variable(0))), fst(variable(0))),
    eq(Nat, snd(app(reflectX, variable(0))), snd(variable(0)))), 'p');
export const reflectCoordinatesProof: Term = lambda(Point2,
  pair(
    refl(Nat, fst(variable(0))),
    refl(Nat, snd(variable(0)))), 'p');

/** Rotation followed by a second rotation restores both coordinates. */
export const rotateTwiceCoordinatesType: Term = pi(Point2,
  prod(
    eq(Nat, fst(app(rotate90, app(rotate90, variable(0)))), fst(variable(0))),
    eq(Nat, snd(app(rotate90, app(rotate90, variable(0)))), snd(variable(0)))), 'p');
export const rotateTwiceCoordinatesProof: Term = lambda(Point2,
  pair(
    refl(Nat, fst(variable(0))),
    refl(Nat, snd(variable(0)))), 'p');
