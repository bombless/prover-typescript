import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, Point2);
const base: Term = pair(numeral(1), numeral(2));
const direction: Term = pair(numeral(3), { kind: 'Zero' });
const displacement: Term = pair(numeral(2), numeral(4));
const line: Term = pair(base, direction);

/** A concrete line's translated base and rotated direction are certified together. */
export const transformedLineCertificateType: Term = prod(
  eq(Point2, app(app(translate, fst(line)), displacement), pair(numeral(3), numeral(6))),
  prod(
    eq(Point2, app(rotate90, snd(line)), pair({ kind: 'Zero' }, numeral(3))),
    prod(
      app(app(parallelVec, snd(line)), pair(numeral(7), { kind: 'Zero' })),
      app(app(perpendicularVec, snd(line)), pair({ kind: 'Zero' }, numeral(5))))));

export const transformedLineCertificateProof: Term = pair(
  refl(Point2, pair(numeral(3), numeral(6))),
  pair(
    refl(Point2, pair({ kind: 'Zero' }, numeral(3))),
    pair(refl(Nat, { kind: 'Zero' }), refl(Nat, { kind: 'Zero' }))));
