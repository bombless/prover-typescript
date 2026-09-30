import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { numeral } from './nat';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { scaleVec } from './geometry-scalar';
import { reflectX } from './geometry-reflections';

export const Point2: Term = prod(Nat, Nat);

const transformed: Term = app(reflectX, app(rotate90, app(app(translate, pair(numeral(1), numeral(2))), app(app(scaleVec, numeral(2)), pair(numeral(3), numeral(4))))));

/** Coordinate projections of a long transformation pipeline remain reducible. */
export const transformedFstType: Term = eq(Nat, fst(transformed), fst(transformed));
export const transformedFstProof: Term = refl(Nat, fst(transformed));
export const transformedSndType: Term = eq(Nat, snd(transformed), snd(transformed));
export const transformedSndProof: Term = refl(Nat, snd(transformed));

/** Reconstructing the pipeline result from its projections is kernel checked. */
export const transformedEtaType: Term = eq(Point2, pair(fst(transformed), snd(transformed)), transformed);
export const transformedEtaProof: Term = refl(Point2, transformed);
