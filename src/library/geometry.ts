import { Term, Real, Cartesian, Angle, pi, point, angleLiteral, realLiteral, eq } from '../syntax/ast';

/** The Cartesian plane is the type of ordered pairs of real coordinates. */
export const cartesianPlane: Term = Cartesian;
export const real: Term = Real;
export const angle: Term = Angle;

/** A point in the Cartesian plane. */
export function coordinates(x: number, y: number): Term {
  return point(realLiteral(x), realLiteral(y));
}

/** Construct an angle from its radian measure. */
export function radians(value: number): Term { return angleLiteral(value); }

/** The type of real-coordinate points, useful in theorem statements. */
export const pointType: Term = pi(Real, pi(Real, Cartesian));

export function pointEquality(a: Term, b: Term): Term { return eq(Cartesian, a, b); }
