import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, Point2);
const line: Term = pair(pair(numeral(2), numeral(1)), pair(numeral(3), { kind: 'Zero' }));
const shift: Term = pair(numeral(4), numeral(5));

/** A concrete line keeps its direction relations while its base is translated and direction rotated. */
export const lineTransformRelationBundleType: Term = prod(
  eq(Point2, app(app(translate, fst(line)), shift), pair(numeral(6), numeral(6))),
  prod(
    eq(Point2, app(rotate90, snd(line)), pair({ kind: 'Zero' }, numeral(3))),
    prod(
      app(app(parallelVec, snd(line)), pair(numeral(8), { kind: 'Zero' })),
      app(app(perpendicularVec, snd(line)), pair({ kind: 'Zero' }, numeral(7))))));

export const lineTransformRelationBundleProof: Term = pair(
  refl(Point2, pair(numeral(6), numeral(6))),
  pair(
    refl(Point2, pair({ kind: 'Zero' }, numeral(3))),
    pair(refl(Nat, { kind: 'Zero' }), refl(Nat, { kind: 'Zero' }))));
