import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { distanceSq } from './geometry-distance';
import { midpoint } from './geometry-segment';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const transform = (p: Term): Term =>
  app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, numeral(2)), p)))),
    pair(numeral(1), numeral(1)));

const a = transform(pair(numeral(1), numeral(2)));
const b = transform(pair(numeral(2), numeral(3)));
const c = transform(pair(numeral(3), numeral(1)));
const line = pair(pair(numeral(5), numeral(0)), pair(numeral(1), numeral(0)));

export const aType: Term = eq(Point2, a, pair(numeral(5), numeral(3)));
export const aProof: Term = refl(Point2, pair(numeral(5), numeral(3)));
export const bType: Term = eq(Point2, b, pair(numeral(7), numeral(5)));
export const bProof: Term = refl(Point2, pair(numeral(7), numeral(5)));
export const cType: Term = eq(Point2, c, pair(numeral(3), numeral(7)));
export const cProof: Term = refl(Point2, pair(numeral(3), numeral(7)));

export const aNormType: Term = eq(Nat, app(normSq, a), numeral(34));
export const aNormProof: Term = refl(Nat, numeral(34));
export const bNormType: Term = eq(Nat, app(normSq, b), numeral(74));
export const bNormProof: Term = refl(Nat, numeral(74));
export const cNormType: Term = eq(Nat, app(normSq, c), numeral(58));
export const cNormProof: Term = refl(Nat, numeral(58));

export const abDotType: Term = eq(Nat, app(app(dot2, a), b), numeral(50));
export const abDotProof: Term = refl(Nat, numeral(50));
export const abCrossType: Term = eq(Nat, app(app(cross2, a), b), numeral(46));
export const abCrossProof: Term = refl(Nat, numeral(46));
export const abDistanceType: Term = eq(Nat, app(app(distanceSq, a), b), numeral(50));
export const abDistanceProof: Term = refl(Nat, numeral(50));
export const bcDistanceType: Term = eq(Nat, app(app(distanceSq, b), c), numeral(56));
export const bcDistanceProof: Term = refl(Nat, numeral(56));

export const abMidpointType: Term = eq(Point2, app(app(midpoint, a), b), pair(numeral(5), numeral(5)));
export const abMidpointProof: Term = refl(Point2, pair(numeral(5), numeral(5)));
export const aCircleType: Term = app(app(onCircle, a), pair(a, numeral(34)));
export const aCircleProof: Term = refl(Nat, numeral(34));
export const aIncidenceType: Term = app(app(incidence, a), line);
export const aIncidenceProof: Term = refl(Nat, numeral(5));
export const aVerticalType: Term = app(app(onVerticalLine, a), numeral(5));
export const aVerticalProof: Term = refl(Nat, numeral(5));
