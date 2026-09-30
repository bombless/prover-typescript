import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const u: Term = pair(numeral(2), numeral(5));

export const scaleTwoType: Term = eq(Vec2, app(app(scaleVec, numeral(2)), u), pair(numeral(4), numeral(10)));
export const scaleTwoProof: Term = refl(Vec2, pair(numeral(4), numeral(10)));
export const scaleThreeType: Term = eq(Vec2, app(app(scaleVec, numeral(3)), u), pair(numeral(6), numeral(15)));
export const scaleThreeProof: Term = refl(Vec2, pair(numeral(6), numeral(15)));
export const scaleZeroType: Term = eq(Vec2, app(app(scaleVec, { kind: 'Zero' }), u), pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const scaleZeroProof: Term = refl(Vec2, pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const scaleOneType: Term = eq(Vec2, app(app(scaleVec, { kind: 'Succ', value: { kind: 'Zero' } }), u), u);
export const scaleOneProof: Term = refl(Vec2, u);
