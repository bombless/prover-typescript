import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { perpendicularVec } from './geometry-relations';
import { rightAngle } from './geometry-angle';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const x: Term = pair(numeral(3), { kind: 'Zero' });
const y: Term = pair({ kind: 'Zero' }, numeral(4));

export const axisPerpendicularType: Term = app(app(perpendicularVec, x), y);
export const axisPerpendicularProof: Term = refl(Nat, { kind: 'Zero' });
export const axisRightAngleType: Term = app(app(rightAngle, x), y);
export const axisRightAngleProof: Term = refl(Nat, { kind: 'Zero' });
export const zeroPerpendicularType: Term = app(app(perpendicularVec, pair({ kind: 'Zero' }, { kind: 'Zero' })), x);
export const zeroPerpendicularProof: Term = refl(Nat, { kind: 'Zero' });
