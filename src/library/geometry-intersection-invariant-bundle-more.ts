import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { incidence } from './geometry-incidence';
import { onCircle } from './geometry-circle';
import { rotate90 } from './geometry-rotations';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));
const q: Term = app(rotate90, p);
const line: Term = pair(pair(numeral(3), numeral(0)), pair(numeral(1), numeral(0)));
const circle: Term = pair(q, numeral(13));

/** An intersection candidate carries incidence, membership, and a norm certificate. */
export const intersectionInvariantType: Term = prod(
  app(app(incidence, q), line),
  prod(
    app(app(onCircle, q), circle),
    eq(Nat, app(normSq, q), numeral(13))));
export const intersectionInvariantProof: Term = pair(
  refl(Nat, numeral(3)),
  pair(refl(Nat, numeral(13)), refl(Nat, numeral(13))));
