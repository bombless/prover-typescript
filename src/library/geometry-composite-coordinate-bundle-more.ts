import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

const translated: Term = app(app(translate, variable(1)), variable(0));
const rotated: Term = app(rotate90, translated);
const reflected: Term = app(reflectX, rotated);

/** A coordinatewise certificate for translate → rotate → reflect. */
export const compositeCoordinateBundleType: Term = pi(Point2, pi(Point2,
  prod(
    eq(Nat, fst(reflected), addTerm(snd(variable(1)), snd(variable(0)))),
    eq(Nat, snd(reflected), addTerm(fst(variable(1)), fst(variable(0))))), 'd'), 'p');

export const compositeCoordinateBundleProof: Term = lambda(Point2, lambda(Point2,
  pair(
    refl(Nat, addTerm(snd(variable(1)), snd(variable(0)))),
    refl(Nat, addTerm(fst(variable(1)), fst(variable(0))))), 'd'), 'p');
