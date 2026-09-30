import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(5));

export const rotateFstCoordinateType: Term = eq(Nat, fst(app(rotate90, p)), numeral(5));
export const rotateFstCoordinateProof: Term = refl(Nat, numeral(5));
export const rotateSndCoordinateType: Term = eq(Nat, snd(app(rotate90, p)), numeral(2));
export const rotateSndCoordinateProof: Term = refl(Nat, numeral(2));
export const rotateTwiceFstCoordinateType: Term = eq(Nat, fst(app(rotate90, app(rotate90, p))), numeral(2));
export const rotateTwiceFstCoordinateProof: Term = refl(Nat, numeral(2));
export const rotateTwiceSndCoordinateType: Term = eq(Nat, snd(app(rotate90, app(rotate90, p))), numeral(5));
export const rotateTwiceSndCoordinateProof: Term = refl(Nat, numeral(5));
