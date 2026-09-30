import { Term, Nat, prod, pair, app, refl } from '../syntax/ast';
import { perpendicularVec } from './geometry-relations';
import { parallelVec } from './geometry-parallel';
import { rightAngle } from './geometry-angle';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const x1: Term = pair(numeral(3), { kind: 'Zero' });
const x2: Term = pair(numeral(5), { kind: 'Zero' });
const y1: Term = pair({ kind: 'Zero' }, numeral(2));
const y2: Term = pair({ kind: 'Zero' }, numeral(4));

export const horizontalParallelType: Term = app(app(parallelVec, x1), x2);
export const horizontalParallelProof: Term = refl(Nat, { kind: 'Zero' });
export const verticalParallelType: Term = app(app(parallelVec, y1), y2);
export const verticalParallelProof: Term = refl(Nat, { kind: 'Zero' });
export const axesPerpendicularType: Term = app(app(perpendicularVec, x1), y1);
export const axesPerpendicularProof: Term = refl(Nat, { kind: 'Zero' });
export const swappedAxesPerpendicularType: Term = app(app(perpendicularVec, y2), x2);
export const swappedAxesPerpendicularProof: Term = refl(Nat, { kind: 'Zero' });
export const axesRightAngleType: Term = app(app(rightAngle, x1), y2);
export const axesRightAngleProof: Term = refl(Nat, { kind: 'Zero' });
export const zeroParallelType: Term = app(app(parallelVec, pair({ kind: 'Zero' }, { kind: 'Zero' })), x1);
export const zeroParallelProof: Term = refl(Nat, { kind: 'Zero' });
