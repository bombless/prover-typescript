import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { numeral } from './nat';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { normSq, dot2 } from './geometry-metrics';
import { distanceSq } from './geometry-distance';

export const Point2: Term = prod(Nat, Nat);

/** A longer transformation pipeline reduces to a concrete point. */
export const transformPipelineType: Term = eq(Point2,
  app(rotate90, app(reflectX, app(app(translate, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5))))),
  pair(numeral(8), numeral(6)));
export const transformPipelineProof: Term = refl(Point2, pair(numeral(8), numeral(6)));

/** The same pipeline's norm and coordinate projections compute. */
export const transformPipelineNormType: Term = eq(Nat,
  app(normSq, app(rotate90, app(reflectX, app(app(translate, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5)))))), numeral(100));
export const transformPipelineNormProof: Term = refl(Nat, numeral(100));

export const transformPipelineFstType: Term = eq(Nat,
  fst(app(rotate90, app(reflectX, app(app(translate, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5)))))), numeral(8));
export const transformPipelineFstProof: Term = refl(Nat, numeral(8));

export const transformPipelineSndType: Term = eq(Nat,
  snd(app(rotate90, app(reflectX, app(app(translate, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5)))))), numeral(6));
export const transformPipelineSndProof: Term = refl(Nat, numeral(6));

/** A translated point can be fed directly into the dot product. */
export const translatedDotType: Term = eq(Nat,
  app(app(dot2, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))), pair(numeral(2), numeral(1))), numeral(14));
export const translatedDotProof: Term = refl(Nat, numeral(14));

/** Distance between two transformed concrete points. */
export const transformedDistanceType: Term = eq(Nat,
  app(app(distanceSq, app(rotate90, pair(numeral(2), numeral(5)))), app(reflectX, pair(numeral(3), numeral(4)))), numeral(23));
export const transformedDistanceProof: Term = refl(Nat, numeral(23));
