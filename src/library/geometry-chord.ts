import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { distanceSq } from './geometry-distance';

export const Point2: Term = prod(Nat, Nat);
export const chordLengthSq: Term = lambda(Point2, lambda(Point2,
  app(app(distanceSq, variable(1)), variable(0)), 'q'), 'p');
export const chordLengthSqType: Term = pi(Point2, pi(Point2, Nat, 'q'), 'p');
export const zeroChordType: Term = eq(Nat,
  app(app(chordLengthSq, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  { kind: 'Zero' });
export const zeroChordProof: Term = refl(Nat, { kind: 'Zero' });
