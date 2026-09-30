import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { distanceSq } from './geometry-distance';

export const Point2: Term = prod(Nat, Nat);
export const Circle2: Term = prod(Point2, Nat);
export const onCircle: Term = lambda(Point2, lambda(Circle2,
  eq(Nat, app(app(distanceSq, variable(1)), fst(variable(0))), snd(variable(0))), 'c'), 'p');
export const onCircleType: Term = pi(Point2, pi(Circle2, { kind: 'Type' }, 'c'), 'p');
export const originCircle: Term = pair(pair({ kind: 'Zero' }, { kind: 'Zero' }), { kind: 'Zero' });
export const originCircleType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const originCircleProof: Term = refl(Nat, { kind: 'Zero' });

/** The origin lies on the zero-radius origin circle in the coordinate model. */
export const originCircleMembershipType: Term = app(app(onCircle,
  pair({ kind: 'Zero' }, { kind: 'Zero' })), originCircle);
export const originCircleMembershipProof: Term = refl(Nat, { kind: 'Zero' });

/** A circle's center is its first component. */
export const circleCenterType: Term = pi(Circle2, eq(Point2, fst(variable(0)), fst(variable(0))), 'c');
export const circleCenterProof: Term = lambda(Circle2, refl(Point2, fst(variable(0))), 'c');

/** A circle's radius is its second component. */
export const circleRadiusType: Term = pi(Circle2, eq(Nat, snd(variable(0)), snd(variable(0))), 'c');
export const circleRadiusProof: Term = lambda(Circle2, refl(Nat, snd(variable(0))), 'c');

/** A circle is reconstructed from its center and radius. */
export const circleEtaType: Term = pi(Circle2,
  eq(Circle2, pair(fst(variable(0)), snd(variable(0))), variable(0)), 'c');
export const circleEtaProof: Term = lambda(Circle2, refl(Circle2, variable(0)), 'c');
