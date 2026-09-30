import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';

export const Vec2: Term = prod(Nat, Nat);

/** Scaling by zero gives zero in both coordinate projections. */
export const zeroScaleCoordinateBundleType: Term = pi(Vec2,
  {
    kind: 'Prod',
    left: eq(Nat, fst(app(app(scaleVec, { kind: 'Zero' }), variable(0))), { kind: 'Zero' }),
    right: eq(Nat, snd(app(app(scaleVec, { kind: 'Zero' }), variable(0))), { kind: 'Zero' })
  }, 'v');

export const zeroScaleCoordinateBundleProof: Term = lambda(Vec2,
  {
    kind: 'Pair',
    left: refl(Nat, { kind: 'Zero' }),
    right: refl(Nat, { kind: 'Zero' })
  }, 'v');
