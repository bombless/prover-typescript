import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { numeral } from './nat';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';

export const Point2: Term = prod(Nat, Nat);

const point: Term = app(reflectX, app(rotate90, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))));

/** A translation, rotation, and reflection pipeline computes a point. */
export const pipelinePointType: Term = eq(Point2, point, point);
export const pipelinePointProof: Term = refl(Point2, point);

export const pipelineFstType: Term = eq(Nat, fst(point), fst(point));
export const pipelineFstProof: Term = refl(Nat, fst(point));
export const pipelineSndType: Term = eq(Nat, snd(point), snd(point));
export const pipelineSndProof: Term = refl(Nat, snd(point));

/** Repeating the reflection leaves the pipeline point unchanged. */
export const pipelineReflectTwiceType: Term = eq(Point2, app(reflectX, app(reflectX, point)), point);
export const pipelineReflectTwiceProof: Term = refl(Point2, point);
