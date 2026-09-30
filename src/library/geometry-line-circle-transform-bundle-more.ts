import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { incidence } from './geometry-incidence';
import { onCircle } from './geometry-circle';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, Point2);
const point: Term = pair(numeral(2), numeral(3));
const line: Term = pair(pair(numeral(2), numeral(0)), pair(numeral(3), { kind: 'Zero' }));
const moved: Term = app(app(translate, point), pair(numeral(1), numeral(2)));
const turned: Term = app(rotate90, point);

/** A line/point configuration combines incidence, direction relations, transformed points, and metrics. */
export const lineCircleTransformBundleType: Term = prod(
  app(app(incidence, point), line),
  prod(
    app(app(parallelVec, snd(line)), pair(numeral(8), { kind: 'Zero' })),
    prod(
      app(app(perpendicularVec, snd(line)), pair({ kind: 'Zero' }, numeral(7))),
      prod(
        eq(Point2, moved, pair(numeral(3), numeral(5))),
        prod(
          eq(Point2, turned, pair(numeral(3), numeral(2))),
          prod(
            app(app(onCircle, turned), pair(turned, numeral(13))),
            eq(Nat, app(normSq, moved), numeral(34))))))));

export const lineCircleTransformBundleProof: Term = pair(
  refl(Nat, numeral(2)),
  pair(
    refl(Nat, { kind: 'Zero' }),
    pair(
      refl(Nat, { kind: 'Zero' }),
      pair(
        refl(Point2, pair(numeral(3), numeral(5))),
        pair(
          refl(Point2, pair(numeral(3), numeral(2))),
          pair(refl(Nat, numeral(13)), refl(Nat, numeral(34))))))));
