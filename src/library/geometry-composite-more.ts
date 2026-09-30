import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { distanceSq } from './geometry-distance';
import { midpoint } from './geometry-segment';
import { onCircle } from './geometry-circle';
import { chordLengthSq } from './geometry-chord';
import { incidence } from './geometry-incidence';

export const Point2: Term = prod(Nat, Nat);
export const Vec2: Term = Point2;
export const Circle2: Term = prod(Point2, Nat);
export const Line2: Term = prod(Point2, Vec2);

/** Scaling followed by a coordinate swap computes in one closed reduction. */
export const scaleRotateType: Term = eq(Point2,
  app(rotate90, app(app(scaleVec, numeral(2)), pair(numeral(3), numeral(4)))),
  pair(numeral(8), numeral(6)));
export const scaleRotateProof: Term = refl(Point2, pair(numeral(8), numeral(6)));

/** Translation after scaling is a closed affine computation. */
export const translateScaleType: Term = eq(Point2,
  app(app(translate, app(app(scaleVec, numeral(2)), pair(numeral(1), numeral(3)))),
    pair(numeral(4), numeral(5))),
  pair(numeral(6), numeral(11)));
export const translateScaleProof: Term = refl(Point2, pair(numeral(6), numeral(11)));

/** A rotated and translated point has the expected coordinates. */
export const translateRotateScaleType: Term = eq(Point2,
  app(app(translate, app(rotate90, app(app(scaleVec, numeral(2)), pair(numeral(1), numeral(3)))),),
    pair(numeral(4), numeral(5))),
  pair(numeral(10), numeral(7)));
export const translateRotateScaleProof: Term = refl(Point2, pair(numeral(10), numeral(7)));

/** Norm and dot product can be checked on the same concrete vector. */
export const scaledNormType: Term = eq(Nat,
  app(normSq, app(app(scaleVec, numeral(2)), pair(numeral(2), numeral(3)))), numeral(52));
export const scaledNormProof: Term = refl(Nat, numeral(52));

export const rotatedDotType: Term = eq(Nat,
  app(app(dot2, app(rotate90, pair(numeral(2), numeral(3)))), pair(numeral(3), numeral(2))), numeral(13));
export const rotatedDotProof: Term = refl(Nat, numeral(13));

/** Distance, midpoint and chord definitions all reduce on concrete points. */
export const distanceAfterTranslateType: Term = eq(Nat,
  app(app(distanceSq, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))),
    pair(numeral(4), numeral(6))), numeral(52));
export const distanceAfterTranslateProof: Term = refl(Nat, numeral(52));

export const midpointConcreteMoreType: Term = eq(Point2,
  app(app(midpoint, pair(numeral(7), numeral(2))), pair(numeral(3), numeral(9))),
  pair(numeral(7), numeral(9)));
export const midpointConcreteMoreProof: Term = refl(Point2, pair(numeral(7), numeral(9)));

export const chordConcreteType: Term = eq(Nat,
  app(app(chordLengthSq, pair(numeral(2), numeral(5))), pair(numeral(1), numeral(2))), numeral(12));
export const chordConcreteProof: Term = refl(Nat, numeral(12));

/** Membership and incidence reduce to their defining coordinate equalities. */
export const circleConcreteType: Term = app(app(onCircle, pair(numeral(3), numeral(4))),
  pair(pair(numeral(3), numeral(4)), numeral(25)));
export const circleConcreteProof: Term = refl(Nat, numeral(25));

export const incidenceConcreteType: Term = app(app(incidence, pair(numeral(5), numeral(8))),
  pair(pair(numeral(5), numeral(1)), pair(numeral(2), numeral(3))));
export const incidenceConcreteProof: Term = refl(Nat, numeral(5));
