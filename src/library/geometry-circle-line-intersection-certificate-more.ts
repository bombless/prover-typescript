import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { incidence } from './geometry-incidence';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));
const line: Term = pair(pair(numeral(2), numeral(0)), pair(numeral(1), numeral(0)));
const circle: Term = pair(pair(numeral(1), numeral(1)), numeral(5));

/** A concrete point carries both line incidence and circle membership certificates. */
export const intersectionCertificateType: Term = prod(
  app(app(incidence, p), line),
  app(app(onCircle, p), circle));
export const intersectionCertificateProof: Term = pair(
  refl(Nat, numeral(2)),
  refl(Nat, numeral(5)));
