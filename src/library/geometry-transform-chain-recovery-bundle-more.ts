import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90, rotate90TwiceType, rotate90TwiceProof } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate, translateZeroType, translateZeroProof } from './geometry-transform';
import { scaleVec } from './geometry-scalar';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Vec2: Term = Point2;

const point = pair(numeral(3), numeral(5));
const zero = pair(numeral(0), numeral(0));
const transformed = app(app(translate, app(reflectX, app(rotate90, point))), zero);

export const rotateRecoverType: Term = eq(Point2, app(rotate90, app(rotate90, point)), point);
export const rotateRecoverProof: Term = refl(Point2, point);
export const reflectRecoverType: Term = eq(Point2, app(reflectX, app(reflectX, point)), point);
export const reflectRecoverProof: Term = refl(Point2, point);
export const translateRecoverType: Term = eq(Point2, app(app(translate, point), zero), point);
export const translateRecoverProof: Term = refl(Point2, point);

export const scaleZeroType: Term = eq(Vec2, app(app(scaleVec, numeral(0)), point), zero);
export const scaleZeroProof: Term = refl(Vec2, zero);

export const chainedPointType: Term = eq(Point2, transformed, pair(numeral(5), numeral(3)));
export const chainedPointProof: Term = refl(Point2, pair(numeral(5), numeral(3)));
export const chainedNormType: Term = eq(Nat, app(normSq, transformed), numeral(34));
export const chainedNormProof: Term = refl(Nat, numeral(34));

export { rotate90TwiceType, rotate90TwiceProof, translateZeroType, translateZeroProof };
