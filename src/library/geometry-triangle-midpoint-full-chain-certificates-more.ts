import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { midpoint } from './geometry-segment';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { onVerticalLine } from './geometry-line';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a = pair(numeral(1), numeral(4));
const b = pair(numeral(5), numeral(2));
const m = app(app(midpoint, a), b);
const transformed = app(app(translate, app(reflectX, app(rotate90, m))), pair(numeral(1), numeral(1)));

export const midpointType: Term = eq(Point2, m, pair(numeral(1), numeral(2)));
export const midpointProof: Term = refl(Point2, pair(numeral(1), numeral(2)));
export const transformedType: Term = eq(Point2, transformed, pair(numeral(3), numeral(2)));
export const transformedProof: Term = refl(Point2, pair(numeral(3), numeral(2)));
export const normType: Term = eq(Nat, app(normSq, transformed), numeral(13));
export const normProof: Term = refl(Nat, numeral(13));
export const circleType: Term = app(app(onCircle, transformed), pair(transformed, numeral(13)));
export const circleProof: Term = refl(Nat, numeral(13));
export const verticalType: Term = app(app(onVerticalLine, transformed), numeral(3));
export const verticalProof: Term = refl(Nat, numeral(3));
