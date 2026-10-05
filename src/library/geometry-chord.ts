import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const chordLengthSq: Term = lambda(Point2, lambda(Point2,
  app(app(distanceSq, variable(1)), variable(0)), 'q'), 'p');
export const chordLengthSqType: Term = pi(Point2, pi(Point2, Nat, 'q'), 'p');
export const zeroChordType: Term = eq(Nat,
  app(app(chordLengthSq, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  { kind: 'Zero' });
export const zeroChordProof: Term = refl(Nat, { kind: 'Zero' });

export const chordConcreteType: Term = eq(Nat,
  app(app(chordLengthSq, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5))), numeral(23));
export const chordConcreteProof: Term = refl(Nat, numeral(23));

/** Chord length square exposes the distance operator for arbitrary endpoints. */
export const chordFormulaType: Term = pi(Point2, pi(Point2,
  eq(Nat, app(app(chordLengthSq, variable(1)), variable(0)),
    app(app(distanceSq, variable(1)), variable(0))), 'q'), 'p');
export const chordFormulaProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, app(app(distanceSq, variable(1)), variable(0))), 'q'), 'p');

export const chordAxisConcreteType: Term = eq(Nat,
  app(app(chordLengthSq, pair(numeral(5), { kind: 'Zero' })), pair(numeral(2), numeral(3))), numeral(10));
export const chordAxisConcreteProof: Term = refl(Nat, numeral(10));
