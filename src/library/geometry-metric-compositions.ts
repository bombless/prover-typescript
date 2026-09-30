import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { normSq, dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';

export const Vec2: Term = prod(Nat, Nat);

/** Concrete norm of the scaled (3,4) vector. */
export const scaledNormConcreteType: Term = eq(Nat,
  app(normSq, app(app(scaleVec, numeral(2)), pair(numeral(3), numeral(4)))), numeral(100));
export const scaledNormConcreteProof: Term = refl(Nat, numeral(100));

/** Dot product of a rotated point and an axis vector. */
export const rotatedAxisDotConcreteType: Term = eq(Nat,
  app(app(dot2, app(rotate90, pair(numeral(3), numeral(4)))), pair(numeral(2), numeral(1))), numeral(11));
export const rotatedAxisDotConcreteProof: Term = refl(Nat, numeral(11));

/** Cross expression for two concrete nonzero coordinate vectors. */
export const crossConcreteMoreType: Term = eq(Nat,
  app(app(cross2, pair(numeral(3), numeral(4))), pair(numeral(2), numeral(1))), numeral(11));
export const crossConcreteMoreProof: Term = refl(Nat, numeral(11));

/** Norm and dot product of the same concrete vector are independently computable. */
export const sameVectorDotType: Term = eq(Nat,
  app(app(dot2, pair(numeral(3), numeral(4))), pair(numeral(3), numeral(4))), numeral(25));
export const sameVectorDotProof: Term = refl(Nat, numeral(25));

/** A zero-scaled vector has a zero norm. */
export const zeroScaledNormType: Term = eq(Nat,
  app(normSq, app(app(scaleVec, { kind: 'Zero' }), pair(numeral(8), numeral(9)))), { kind: 'Zero' });
export const zeroScaledNormProof: Term = refl(Nat, { kind: 'Zero' });
