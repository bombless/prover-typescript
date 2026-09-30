import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { distanceSq } from './geometry-distance';

export const Point2: Term = prod(Nat, Nat);
export const Circle2: Term = prod(Point2, Nat);
export const chordOnOriginCircleType: Term = eq(Nat,
  app(app(distanceSq, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  { kind: 'Zero' });
export const chordOnOriginCircleProof: Term = refl(Nat, { kind: 'Zero' });
