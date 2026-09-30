import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { rightAngle } from './geometry-angle';
import { collinear2 } from './geometry-collinear';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';
import { slopeVector } from './geometry-line-slope';

export const Vec2: Term = prod(Nat, Nat);

/** Relations consume transformed concrete vectors. */
export const rotatedParallelType: Term = app(app(parallelVec,
  app(rotate90, pair({ kind: 'Zero' }, { kind: 'Zero' }))),
  pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const rotatedParallelProof: Term = refl(Nat, { kind: 'Zero' });

export const scaledPerpendicularType: Term = app(app(perpendicularVec,
  app(app(scaleVec, numeral(2)), pair(numeral(3), { kind: 'Zero' }))),
  pair({ kind: 'Zero' }, numeral(5)));
export const scaledPerpendicularProof: Term = refl(Nat, { kind: 'Zero' });

export const rightAngleAfterRotationType: Term = app(app(rightAngle,
  app(rotate90, pair({ kind: 'Zero' }, { kind: 'Zero' }))), pair({ kind: 'Zero' }, numeral(4)));
export const rightAngleAfterRotationProof: Term = refl(Nat, { kind: 'Zero' });

export const collinearConcreteTripleType: Term = app(app(app(collinear2, pair(numeral(1), numeral(2))),
  pair(numeral(3), numeral(4))), pair(numeral(5), numeral(6)));
export const collinearConcreteTripleProof: Term = refl(Nat, { kind: 'Zero' });

/** A slope vector can be used directly as a relation input. */
const slopeValue: Term = app(app(slopeVector, pair(numeral(1), numeral(1))), pair(numeral(1), numeral(1)));
export const slopeParallelType: Term = app(app(parallelVec, slopeValue), pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const slopeParallelProof: Term = refl(Nat, { kind: 'Zero' });
