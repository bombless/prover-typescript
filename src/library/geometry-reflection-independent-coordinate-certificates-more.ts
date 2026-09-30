import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { reflectX } from './geometry-reflections';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(5));

export const reflectFstCoordinateType: Term = eq(Nat, fst(app(reflectX, p)), numeral(2));
export const reflectFstCoordinateProof: Term = refl(Nat, numeral(2));
export const reflectSndCoordinateType: Term = eq(Nat, snd(app(reflectX, p)), numeral(5));
export const reflectSndCoordinateProof: Term = refl(Nat, numeral(5));
export const reflectTwiceFstCoordinateType: Term = eq(Nat, fst(app(reflectX, app(reflectX, p))), numeral(2));
export const reflectTwiceFstCoordinateProof: Term = refl(Nat, numeral(2));
export const reflectTwiceSndCoordinateType: Term = eq(Nat, snd(app(reflectX, app(reflectX, p))), numeral(5));
export const reflectTwiceSndCoordinateProof: Term = refl(Nat, numeral(5));
