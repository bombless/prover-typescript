import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(3), numeral(4));
const q: Term = pair(numeral(2), numeral(3));

export const pOnOwnCircleType: Term = app(app(onCircle, p), pair(p, numeral(25)));
export const pOnOwnCircleProof: Term = refl(Nat, numeral(25));
export const qOnOwnCircleType: Term = app(app(onCircle, q), pair(q, numeral(13)));
export const qOnOwnCircleProof: Term = refl(Nat, numeral(13));
export const zeroOnZeroCircleType: Term = app(app(onCircle, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair(pair({ kind: 'Zero' }, { kind: 'Zero' }), { kind: 'Zero' }));
export const zeroOnZeroCircleProof: Term = refl(Nat, { kind: 'Zero' });
