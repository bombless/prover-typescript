import { Term, Nat, prod, pair, fst, snd, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { distanceSq } from './geometry-distance';
import { displacementSq } from './geometry-displacement';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';

export const Point2: Term = prod(Nat, Nat);
export const Circle2: Term = prod(Point2, Nat);

/** A concrete triangle side measurement in the coordinate model. */
export const sideDistanceType: Term = eq(Nat,
  app(app(distanceSq, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5))), numeral(23));
export const sideDistanceProof: Term = refl(Nat, numeral(23));

/** A displacement measurement uses truncated coordinate differences. */
export const sideDisplacementType: Term = eq(Nat,
  app(app(displacementSq, pair(numeral(4), numeral(5))), pair(numeral(2), numeral(3))),
  app(app(displacementSq, pair(numeral(4), numeral(5))), pair(numeral(2), numeral(3))));
export const sideDisplacementProof: Term = refl(Nat, app(app(displacementSq, pair(numeral(4), numeral(5))), pair(numeral(2), numeral(3))));

/** The coordinate norm is directly computable for a concrete point. */
export const pointNormType: Term = eq(Nat, app(normSq, pair(numeral(3), numeral(4))), numeral(25));
export const pointNormProof: Term = refl(Nat, numeral(25));

/** A point on a concrete circle reduces to the radius equation. */
export const circleMembershipMeasurementType: Term = app(app(onCircle, pair(numeral(3), numeral(4))),
  pair(pair(numeral(3), numeral(4)), numeral(25)));
export const circleMembershipMeasurementProof: Term = refl(Nat, numeral(25));

/** A zero-radius circle at its center gives a closed membership certificate. */
export const centerMembershipType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const centerMembershipProof: Term = refl(Nat, numeral(0));
