import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const origin: Term = pair({ kind: 'Zero' }, { kind: 'Zero' });

/** The origin is a member of two concrete zero-radius circle constructions. */
export const originCircleBundleType: Term = prod(
  app(app(onCircle, origin), pair(origin, { kind: 'Zero' })),
  app(app(onCircle, origin), pair(origin, numeral(0))));
export const originCircleBundleProof: Term = pair(
  refl(Nat, { kind: 'Zero' }),
  refl(Nat, { kind: 'Zero' }));
