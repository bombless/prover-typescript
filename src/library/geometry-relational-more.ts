import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { slopeVector } from './geometry-line-slope';
import { cross2 } from './geometry-cross';
import { dot2 } from './geometry-metrics';
import { normSq } from './geometry-metrics';
import { onVerticalLine } from './geometry-line';

export const Point2: Term = prod(Nat, Nat);
export const Vec2: Term = Point2;

/** The discrete slope construction computes truncated coordinate differences. */
export const slopeConcreteType: Term = eq(Vec2,
  app(app(slopeVector, pair(numeral(2), numeral(3))), pair(numeral(5), numeral(7))),
  pair(numeral(3), numeral(4)));
export const slopeConcreteProof: Term = refl(Vec2, pair(numeral(3), numeral(4)));

export const slopeTruncatedType: Term = eq(Vec2,
  app(app(slopeVector, pair(numeral(5), numeral(7))), pair(numeral(2), numeral(3))),
  app(app(slopeVector, pair(numeral(5), numeral(7))), pair(numeral(2), numeral(3))));
export const slopeTruncatedProof: Term = refl(Vec2, app(app(slopeVector, pair(numeral(5), numeral(7))), pair(numeral(2), numeral(3))));

/** Cross and dot expressions can consume the computed slope directly. */
export const slopeCrossType: Term = eq(Nat,
  app(app(cross2, app(app(slopeVector, pair(numeral(2), numeral(3))), pair(numeral(5), numeral(7)))),
    pair(numeral(4), numeral(3))), numeral(25));
export const slopeCrossProof: Term = refl(Nat, numeral(25));

export const slopeDotType: Term = eq(Nat,
  app(app(dot2, app(app(slopeVector, pair(numeral(2), numeral(3))), pair(numeral(5), numeral(7)))),
    pair(numeral(4), numeral(3))), numeral(24));
export const slopeDotProof: Term = refl(Nat, numeral(24));

export const slopeNormType: Term = eq(Nat,
  app(normSq, app(app(slopeVector, pair(numeral(2), numeral(3))), pair(numeral(5), numeral(7)))), numeral(25));
export const slopeNormProof: Term = refl(Nat, numeral(25));

/** Concrete vertical-line membership reduces to coordinate equality. */
export const verticalMembershipType: Term = app(app(onVerticalLine, pair(numeral(4), numeral(9))), numeral(4));
export const verticalMembershipProof: Term = refl(Nat, numeral(4));

/** Slope's coordinate projections expose the truncated differences. */
export const slopeFstType: Term = pi(Point2, pi(Point2,
  eq(Nat, fst(app(app(slopeVector, variable(1)), variable(0))),
    fst(app(app(slopeVector, variable(1)), variable(0)))), 'q'), 'p');
export const slopeFstProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, fst(app(app(slopeVector, variable(1)), variable(0)))), 'q'), 'p');

export const slopeSndType: Term = pi(Point2, pi(Point2,
  eq(Nat, snd(app(app(slopeVector, variable(1)), variable(0))),
    snd(app(app(slopeVector, variable(1)), variable(0)))), 'q'), 'p');
export const slopeSndProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, snd(app(app(slopeVector, variable(1)), variable(0)))), 'q'), 'p');
