import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Circle2: Term = prod(Point2, Nat);
export const originCircle: Term = pair(pair({ kind: 'Zero' }, { kind: 'Zero' }), { kind: 'Zero' });
export const originOnOriginCircleType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const originOnOriginCircleProof: Term = refl(Nat, { kind: 'Zero' });

/** A radius-one point certificate for the x-axis unit point. */
export const unitCircle: Term = pair(pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' }), { kind: 'Succ', value: { kind: 'Zero' } });
export const unitCircleType: Term = eq(Nat, { kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Succ', value: { kind: 'Zero' } });
export const unitCircleProof: Term = refl(Nat, { kind: 'Succ', value: { kind: 'Zero' } });

/** A concrete point on a radius-four circle in the coordinate model. */
export const radiusFourCircleType: Term = eq(Nat,
  { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } } },
  { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } } });
export const radiusFourCircleProof: Term = refl(Nat,
  { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } } });
export const concreteCircleType: Term = eq(Circle2,
  pair(pair(numeral(3), numeral(4)), numeral(5)),
  pair(pair(numeral(3), numeral(4)), numeral(5)));
export const concreteCircleProof: Term = refl(Circle2, pair(pair(numeral(3), numeral(4)), numeral(5)));
export const concreteCircleCenterType: Term = eq(Point2,
  fst(pair(pair(numeral(3), numeral(4)), numeral(5))), pair(numeral(3), numeral(4)));
export const concreteCircleCenterProof: Term = refl(Point2, pair(numeral(3), numeral(4)));
export const concreteCircleRadiusType: Term = eq(Nat,
  snd(pair(pair(numeral(3), numeral(4)), numeral(5))), numeral(5));
export const concreteCircleRadiusProof: Term = refl(Nat, numeral(5));
export const concreteCircleEtaType: Term = eq(Circle2,
  pair(fst(pair(pair(numeral(3), numeral(4)), numeral(5))), snd(pair(pair(numeral(3), numeral(4)), numeral(5)))),
  pair(pair(numeral(3), numeral(4)), numeral(5)));
export const concreteCircleEtaProof: Term = refl(Circle2, pair(pair(numeral(3), numeral(4)), numeral(5)));
