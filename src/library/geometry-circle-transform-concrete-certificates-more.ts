import { Term, Nat, prod, pair, fst, snd, app, eq, refl } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { onCircle } from './geometry-circle';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Circle2: Term = prod(Point2, Nat);
const center = pair(numeral(2), numeral(3));
const circle = pair(center, numeral(13));
const shift = pair(numeral(1), numeral(2));
const movedCenter = app(app(translate, center), shift);
const turnedCenter = app(rotate90, movedCenter);

export const movedCenterType: Term = eq(Point2, movedCenter, pair(numeral(3), numeral(5)));
export const movedCenterProof: Term = refl(Point2, pair(numeral(3), numeral(5)));
export const turnedCenterType: Term = eq(Point2, turnedCenter, pair(numeral(5), numeral(3)));
export const turnedCenterProof: Term = refl(Point2, pair(numeral(5), numeral(3)));
export const radiusProjectionType: Term = eq(Nat, snd(circle), numeral(13));
export const radiusProjectionProof: Term = refl(Nat, numeral(13));
export const turnedCenterNormType: Term = eq(Nat, app(normSq, turnedCenter), numeral(34));
export const turnedCenterNormProof: Term = refl(Nat, numeral(34));
export const movedSelfCircleType: Term = app(app(onCircle, movedCenter), pair(movedCenter, numeral(34)));
export const movedSelfCircleProof: Term = refl(Nat, numeral(34));
