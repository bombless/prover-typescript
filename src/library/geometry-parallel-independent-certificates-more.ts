import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { parallelVec } from './geometry-parallel';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const x1: Term = pair(numeral(2), { kind: 'Zero' });
const x2: Term = pair(numeral(5), { kind: 'Zero' });
const y1: Term = pair({ kind: 'Zero' }, numeral(3));
const y2: Term = pair({ kind: 'Zero' }, numeral(7));

export const xAxisParallelType: Term = app(app(parallelVec, x1), x2);
export const xAxisParallelProof: Term = refl(Nat, { kind: 'Zero' });
export const yAxisParallelType: Term = app(app(parallelVec, y1), y2);
export const yAxisParallelProof: Term = refl(Nat, { kind: 'Zero' });
export const zeroParallelType: Term = app(app(parallelVec, pair({ kind: 'Zero' }, { kind: 'Zero' })), x1);
export const zeroParallelProof: Term = refl(Nat, { kind: 'Zero' });
