import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { numeral } from './nat';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';
import { normSq, dot2 } from './geometry-metrics';

export const Point2: Term = prod(Nat, Nat);

const chain: Term = app(rotate90, app(app(translate, pair(numeral(1), numeral(2))), app(app(scaleVec, numeral(2)), pair(numeral(3), numeral(4)))));

/** A three-stage point transformation computes to a concrete point. */
export const chainPointType: Term = eq(Point2, chain, pair(numeral(10), numeral(7)));
export const chainPointProof: Term = refl(Point2, pair(numeral(10), numeral(7)));

export const chainFstType: Term = eq(Nat, fst(chain), numeral(10));
export const chainFstProof: Term = refl(Nat, numeral(10));
export const chainSndType: Term = eq(Nat, snd(chain), numeral(7));
export const chainSndProof: Term = refl(Nat, numeral(7));

/** The transformed point feeds directly into norm and dot product. */
export const chainNormType: Term = eq(Nat, app(normSq, chain), numeral(149));
export const chainNormProof: Term = refl(Nat, numeral(149));
export const chainDotType: Term = eq(Nat, app(app(dot2, chain), pair(numeral(1), numeral(1))), numeral(17));
export const chainDotProof: Term = refl(Nat, numeral(17));
