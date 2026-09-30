import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { dot2 } from './geometry-metrics';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
export const rightAngle: Term = lambda(Vec2, lambda(Vec2,
  eq(Nat, app(app(dot2, variable(1)), variable(0)), { kind: 'Zero' }), 'v'), 'u');
export const rightAngleType: Term = pi(Vec2, pi(Vec2, { kind: 'Type' }, 'v'), 'u');
export const axisRightAngleType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const axisRightAngleProof: Term = refl(Nat, { kind: 'Zero' });

/** The zero vector is right-angle-compatible with every vector. */
export const zeroRightAngleType: Term = pi(Vec2,
  eq(Nat, app(app(dot2, pair({ kind: 'Zero' }, { kind: 'Zero' })), variable(0)), { kind: 'Zero' }), 'v');
export const zeroRightAngleProof: Term = lambda(Vec2,
  refl(Nat, { kind: 'Zero' }), 'v');
export const axisRightAngleConcreteType: Term = eq(Nat,
  app(app(dot2, pair(numeral(3), { kind: 'Zero' })), pair({ kind: 'Zero' }, numeral(4))), { kind: 'Zero' });
export const axisRightAngleConcreteProof: Term = refl(Nat, { kind: 'Zero' });
