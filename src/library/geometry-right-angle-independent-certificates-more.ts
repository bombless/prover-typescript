import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rightAngle } from './geometry-angle';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const x: Term = pair(numeral(5), { kind: 'Zero' });
const y: Term = pair({ kind: 'Zero' }, numeral(2));

export const concreteRightAngleType: Term = app(app(rightAngle, x), y);
export const concreteRightAngleProof: Term = refl(Nat, { kind: 'Zero' });
export const swappedRightAngleType: Term = app(app(rightAngle, y), x);
export const swappedRightAngleProof: Term = refl(Nat, { kind: 'Zero' });
export const originRightAngleType: Term = app(app(rightAngle, pair({ kind: 'Zero' }, { kind: 'Zero' })), y);
export const originRightAngleProof: Term = refl(Nat, { kind: 'Zero' });
