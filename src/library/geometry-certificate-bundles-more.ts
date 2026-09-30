import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { Line2 } from './geometry-line';
import { Triangle2 } from './geometry-triangle';

export const Point2: Term = prod(Nat, Nat);

/** Both coordinate projections of a rotated point are available as one certificate. */
export const rotatedCoordinateBundleType: Term = pi(Point2,
  prod(
    eq(Nat, fst(app(rotate90, variable(0))), snd(variable(0))),
    eq(Nat, snd(app(rotate90, variable(0))), fst(variable(0)))), 'p');
export const rotatedCoordinateBundleProof: Term = lambda(Point2,
  pair(
    refl(Nat, snd(variable(0))),
    refl(Nat, fst(variable(0)))), 'p');

/** Both projections of a line are available as one structural certificate. */
export const lineProjectionBundleType: Term = pi(Line2,
  prod(
    eq(Point2, fst(variable(0)), fst(variable(0))),
    eq(Point2, snd(variable(0)), snd(variable(0)))), 'l');
export const lineProjectionBundleProof: Term = lambda(Line2,
  pair(
    refl(Point2, fst(variable(0))),
    refl(Point2, snd(variable(0)))), 'l');

/** All three projections of a triangle are bundled into one certificate. */
export const triangleProjectionBundleType: Term = pi(Triangle2,
  prod(
    eq(Point2, fst(variable(0)), fst(variable(0))),
    prod(
      eq(Point2, fst(snd(variable(0))), fst(snd(variable(0)))),
      eq(Point2, snd(snd(variable(0))), snd(snd(variable(0)))))), 't');
export const triangleProjectionBundleProof: Term = lambda(Triangle2,
  pair(
    refl(Point2, fst(variable(0))),
    pair(
      refl(Point2, fst(snd(variable(0)))),
      refl(Point2, snd(snd(variable(0)))))), 't');
