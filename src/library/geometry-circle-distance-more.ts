import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { onCircle, Circle2 } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** A zero-radius circle membership condition unfolds to zero distance. */
export const zeroRadiusMembershipType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const zeroRadiusMembershipProof: Term = refl(Nat, { kind: 'Zero' });

/** The origin is at zero discrete distance from itself. */
export const originDistanceCertificateType: Term = eq(Nat,
  app(app(distanceSq, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  { kind: 'Zero' });
export const originDistanceCertificateProof: Term = refl(Nat, { kind: 'Zero' });

/** A concrete center-radius structure has directly readable center and radius. */
export const concreteCircleProjectionType: Term = eq(Circle2,
  pair(fst(pair(pair(numeral(2), numeral(3)), numeral(5))), snd(pair(pair(numeral(2), numeral(3)), numeral(5)))),
  pair(pair(numeral(2), numeral(3)), numeral(5)));
export const concreteCircleProjectionProof: Term = refl(Circle2, pair(pair(numeral(2), numeral(3)), numeral(5)));
