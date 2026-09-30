import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const zero: Term = { kind: 'Zero' };
const one: Term = { kind: 'Succ', value: zero };

/** A quarter-turn maps the unit x-axis vector to the unit y-axis vector. */
export const rotateXAxisToYAxisType: Term = eq(Vec2,
  app(rotate90, pair(one, zero)), pair(zero, one));
export const rotateXAxisToYAxisProof: Term = refl(Vec2, pair(zero, one));

/** A quarter-turn maps a concrete x-axis vector to the corresponding y-axis vector. */
export const rotateConcreteAxisType: Term = eq(Vec2,
  app(rotate90, pair(numeral(3), zero)), pair(zero, numeral(3)));
export const rotateConcreteAxisProof: Term = refl(Vec2, pair(zero, numeral(3)));

/** Scaling a concrete x-axis vector preserves its axis and multiplies its coordinate. */
export const scaleConcreteAxisType: Term = eq(Vec2,
  app(app(scaleVec, numeral(4)), pair(numeral(2), zero)), pair(numeral(8), zero));
export const scaleConcreteAxisProof: Term = refl(Vec2, pair(numeral(8), zero));

/** Scaling a concrete y-axis vector preserves its axis and multiplies its coordinate. */
export const scaleConcreteYAxisType: Term = eq(Vec2,
  app(app(scaleVec, numeral(4)), pair(zero, numeral(2))), pair(zero, numeral(8)));
export const scaleConcreteYAxisProof: Term = refl(Vec2, pair(zero, numeral(8)));
