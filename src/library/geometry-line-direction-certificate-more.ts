import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { Line2 } from './geometry-line';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const line: Term = pair(pair(numeral(2), numeral(3)), pair(numeral(4), { kind: 'Zero' }));
const xAxis: Term = pair(numeral(7), { kind: 'Zero' });
const yAxis: Term = pair({ kind: 'Zero' }, numeral(5));

/** A concrete line carries its base, direction, parallel, and perpendicular certificates. */
export const lineDirectionCertificateType: Term = prod(
  eq(Point2, fst(line), pair(numeral(2), numeral(3))),
  prod(
    eq(Point2, snd(line), pair(numeral(4), { kind: 'Zero' })),
    prod(
      app(app(parallelVec, snd(line)), xAxis),
      app(app(perpendicularVec, snd(line)), yAxis))));

export const lineDirectionCertificateProof: Term = pair(
  refl(Point2, pair(numeral(2), numeral(3))),
  pair(
    refl(Point2, pair(numeral(4), { kind: 'Zero' })),
    pair(refl(Nat, { kind: 'Zero' }), refl(Nat, { kind: 'Zero' }))));
