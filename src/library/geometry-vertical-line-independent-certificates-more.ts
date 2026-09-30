import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { onVerticalLine } from './geometry-line';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(4), numeral(7));

export const pointOnVerticalFourType: Term = app(app(onVerticalLine, p), numeral(4));
export const pointOnVerticalFourProof: Term = refl(Nat, numeral(4));
export const pointOnVerticalSevenType: Term = app(app(onVerticalLine, pair(numeral(7), numeral(2))), numeral(7));
export const pointOnVerticalSevenProof: Term = refl(Nat, numeral(7));
export const originOnVerticalZeroType: Term = app(app(onVerticalLine, pair({ kind: 'Zero' }, { kind: 'Zero' })), { kind: 'Zero' });
export const originOnVerticalZeroProof: Term = refl(Nat, { kind: 'Zero' });
