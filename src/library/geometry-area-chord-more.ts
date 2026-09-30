import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { twiceArea } from './geometry-area';
import { chordLengthSq } from './geometry-chord';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';

export const Point2: Term = prod(Nat, Nat);

/** The current discrete area operator computes for transformed concrete triples. */
export const rotatedAreaType: Term = eq(Nat,
  app(app(app(twiceArea, app(rotate90, pair(numeral(1), numeral(2)))),
    app(rotate90, pair(numeral(3), numeral(4)))), app(rotate90, pair(numeral(5), numeral(6)))),
  { kind: 'Zero' });
export const rotatedAreaProof: Term = refl(Nat, { kind: 'Zero' });
