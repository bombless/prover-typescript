import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));

/** Rotation and reflection both preserve the concrete norm-square. */
export const rotationReflectionInvariantType: Term = prod(
  eq(Nat, app(normSq, app(rotate90, p)), numeral(13)),
  eq(Nat, app(normSq, app(reflectX, p)), numeral(13)));
export const rotationReflectionInvariantProof: Term = pair(
  refl(Nat, numeral(13)),
  refl(Nat, numeral(13)));

/** Two successive rotations and a reflection preserve the same concrete norm-square. */
export const compositeInvariantType: Term = prod(
  eq(Nat, app(normSq, app(rotate90, app(rotate90, p))), numeral(13)),
  eq(Nat, app(normSq, app(reflectX, app(rotate90, p))), numeral(13)));
export const compositeInvariantProof: Term = pair(
  refl(Nat, numeral(13)),
  refl(Nat, numeral(13)));
