import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { perpendicularVec, } from './geometry-relations';
import { parallelVec } from './geometry-parallel';
import { rightAngle } from './geometry-angle';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const p = pair(numeral(2), numeral(1));
const q = app(app(translate, app(rotate90, app(app(scaleVec, numeral(2)), p))), pair(numeral(1), numeral(1)));
const xAxis = pair(numeral(5), { kind: 'Zero' });
const yAxis = pair({ kind: 'Zero' }, numeral(7));

export const transformedType: Term = eq(Vec2, q, pair(numeral(3), numeral(5)));
export const transformedProof: Term = refl(Vec2, pair(numeral(3), numeral(5)));
export const parallelType: Term = app(app(parallelVec, xAxis), pair(numeral(9), { kind: 'Zero' }));
export const parallelProof: Term = refl(Nat, { kind: 'Zero' });
export const perpendicularType: Term = app(app(perpendicularVec, xAxis), yAxis);
export const perpendicularProof: Term = refl(Nat, { kind: 'Zero' });
export const rightAngleType: Term = app(app(rightAngle, xAxis), yAxis);
export const rightAngleProof: Term = refl(Nat, { kind: 'Zero' });
