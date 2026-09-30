import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { dot2, normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const x: Term = pair(numeral(4), { kind: 'Zero' });
const y: Term = pair({ kind: 'Zero' }, numeral(6));

export const xAxisSelfDotType: Term = eq(Nat, app(app(dot2, x), x), numeral(16));
export const xAxisSelfDotProof: Term = refl(Nat, numeral(16));
export const yAxisSelfDotType: Term = eq(Nat, app(app(dot2, y), y), numeral(36));
export const yAxisSelfDotProof: Term = refl(Nat, numeral(36));
export const xAxisNormType: Term = eq(Nat, app(normSq, x), numeral(16));
export const xAxisNormProof: Term = refl(Nat, numeral(16));
export const yAxisNormType: Term = eq(Nat, app(normSq, y), numeral(36));
export const yAxisNormProof: Term = refl(Nat, numeral(36));
