import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p = pair(numeral(2), numeral(3));
const q = app(app(translate, app(rotate90, p)), pair(numeral(1), numeral(2)));
const line = pair(pair(numeral(4), numeral(0)), pair(numeral(1), numeral(0)));

/** One transformed point carries coordinates, metrics, circle, line, and relation certificates. */
const bundle = (xs: Term[]): Term => xs.slice(0, -1).reduceRight((acc, x) => prod(x, acc), xs[xs.length - 1]);
const proofs = (xs: Term[]): Term => xs.slice(0, -1).reduceRight((acc, x) => pair(x, acc), xs[xs.length - 1]);
export const bundleType: Term = bundle([
  eq(Point2, q, pair(numeral(4), numeral(4))),
  eq(Nat, app(normSq, q), numeral(32)),
  eq(Nat, app(app(dot2, q), pair(numeral(1), numeral(1))), numeral(8)),
  eq(Nat, app(app(cross2, q), pair(numeral(1), numeral(1))), numeral(8)),
  app(app(onCircle, q), pair(q, numeral(32))),
  app(app(incidence, q), line),
  app(app(onVerticalLine, q), numeral(4)),
  app(app(parallelVec, pair(numeral(2), numeral(0))), pair(numeral(7), numeral(0))),
  app(app(perpendicularVec, pair(numeral(2), numeral(0))), pair(numeral(0), numeral(7))),
]);
export const bundleProof: Term = proofs([
  refl(Point2, pair(numeral(4), numeral(4))), refl(Nat, numeral(32)), refl(Nat, numeral(8)),
  refl(Nat, numeral(8)), refl(Nat, numeral(32)), refl(Nat, numeral(4)), refl(Nat, numeral(4)),
  refl(Nat, numeral(0)), refl(Nat, numeral(0)),
]);
