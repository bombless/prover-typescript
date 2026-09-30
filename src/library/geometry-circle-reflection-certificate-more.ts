import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { reflectX } from './geometry-reflections';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const center: Term = pair(numeral(2), numeral(3));
const reflected: Term = app(reflectX, center);

/** A reflected center keeps its concrete circle membership certificate. */
export const reflectedCircleCertificateType: Term = prod(
  eq(Point2, reflected, pair(numeral(2), numeral(3))),
  app(app(onCircle, reflected), pair(reflected, numeral(13))));

export const reflectedCircleCertificateProof: Term = pair(
  refl(Point2, pair(numeral(2), numeral(3))),
  refl(Nat, numeral(13)));
