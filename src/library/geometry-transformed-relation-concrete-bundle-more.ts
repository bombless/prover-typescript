import { Term, Nat, prod, pair, app, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const x = pair(numeral(2), numeral(0));
const y = pair(numeral(3), numeral(0));
const sx = app(app(scaleVec, numeral(2)), pair(numeral(1), numeral(0)));
const sy = app(app(scaleVec, numeral(3)), pair(numeral(0), numeral(1)));

/** Concrete axis vectors remain parallel after a common quarter-turn. */
export const rotatedParallelType: Term = app(app(parallelVec, app(rotate90, x)), app(rotate90, y));
export const rotatedParallelProof: Term = refl(Nat, numeral(0));

/** Concrete perpendicular axes remain perpendicular after scaling. */
export const scaledPerpendicularType: Term = app(app(perpendicularVec, sx), sy);
export const scaledPerpendicularProof: Term = refl(Nat, numeral(0));

/** Scaling preserves parallelism for two x-axis vectors. */
export const scaledParallelType: Term = app(app(parallelVec,
  app(app(scaleVec, numeral(4)), x)), app(app(scaleVec, numeral(5)), y));
export const scaledParallelProof: Term = refl(Nat, numeral(0));

/** Rotated and scaled axes satisfy the perpendicular relation together. */
export const rotatedScaledPerpendicularType: Term = app(app(perpendicularVec,
  app(rotate90, app(app(scaleVec, numeral(2)), pair(numeral(1), numeral(0))))),
  app(rotate90, app(app(scaleVec, numeral(3)), pair(numeral(0), numeral(1)))));
export const rotatedScaledPerpendicularProof: Term = refl(Nat, numeral(0));
