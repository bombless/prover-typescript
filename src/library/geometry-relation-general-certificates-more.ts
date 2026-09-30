import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const xAxis = (x: Term): Term => pair(x, { kind: 'Zero' });
const yAxis = (y: Term): Term => pair({ kind: 'Zero' }, y);

/** Concrete x-axis vectors satisfy the model's parallel predicate. */
export const xAxisParallelMoreType: Term = app(app(parallelVec, xAxis(numeral(7))), xAxis(numeral(2)));
export const xAxisParallelMoreProof: Term = refl(Nat, { kind: 'Zero' });

/** Concrete y-axis vectors satisfy the model's parallel predicate. */
export const yAxisParallelMoreType: Term = app(app(parallelVec, yAxis(numeral(8))), yAxis(numeral(3)));
export const yAxisParallelMoreProof: Term = refl(Nat, { kind: 'Zero' });

/** Concrete axis vectors satisfy the model's perpendicular predicate. */
export const axisPerpendicularMoreType: Term = app(app(perpendicularVec, xAxis(numeral(7))), yAxis(numeral(3)));
export const axisPerpendicularMoreProof: Term = refl(Nat, { kind: 'Zero' });
