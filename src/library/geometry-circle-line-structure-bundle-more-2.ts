import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Line2 } from './geometry-line';
import { Circle2 } from './geometry-circle-laws';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** A transformed line keeps its direction and expands the translated base. */
export const lineTransformBundleType: Term = pi(Point2, pi(Line2,
  eq(Line2,
    pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0))),
    pair(pair(addTerm(fst(fst(variable(0))), fst(variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1)))), snd(variable(0)))), 'l'), 'd');
export const lineTransformBundleProof: Term = lambda(Point2, lambda(Line2,
  refl(Line2, pair(pair(addTerm(fst(fst(variable(0))), fst(variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1)))), snd(variable(0)))), 'l'), 'd');

/** A rotated circle swaps center coordinates and preserves radius. */
export const circleRotateBundleType: Term = pi(Circle2,
  eq(Circle2,
    pair(app(rotate90, fst(variable(0))), snd(variable(0))),
    pair(pair(snd(fst(variable(0))), fst(fst(variable(0)))), snd(variable(0)))), 'c');
export const circleRotateBundleProof: Term = lambda(Circle2,
  refl(Circle2, pair(pair(snd(fst(variable(0))), fst(fst(variable(0)))), snd(variable(0)))), 'c');
