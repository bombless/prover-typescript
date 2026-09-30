import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const u: Term = pair(numeral(2), numeral(5));
const v: Term = pair(numeral(1), numeral(3));
const z: Term = pair({ kind: 'Zero' }, { kind: 'Zero' });

export const uvSumType: Term = eq(Vec2, app(app(addVec2, u), v), pair(numeral(3), numeral(8)));
export const uvSumProof: Term = refl(Vec2, pair(numeral(3), numeral(8)));
export const vuSumType: Term = eq(Vec2, app(app(addVec2, v), u), pair(numeral(3), numeral(8)));
export const vuSumProof: Term = refl(Vec2, pair(numeral(3), numeral(8)));
export const zeroLeftSumType: Term = eq(Vec2, app(app(addVec2, z), u), u);
export const zeroLeftSumProof: Term = refl(Vec2, u);
export const zeroRightSumType: Term = eq(Vec2, app(app(addVec2, u), z), u);
export const zeroRightSumProof: Term = refl(Vec2, u);
