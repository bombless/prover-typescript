import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { scaleVec } from './geometry-scalar';
import { normSq, dot2 } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const pipeline: Term = app(reflectX, app(rotate90, app(app(translate, pair(numeral(1), numeral(2))), app(app(scaleVec, numeral(2)), pair(numeral(3), numeral(4))))));

/** A full transform pipeline can be passed to metric operators. */
export const pipelineNormType: Term = eq(Nat, app(normSq, pipeline), app(normSq, pipeline));
export const pipelineNormProof: Term = refl(Nat, app(normSq, pipeline));
export const pipelineDotType: Term = eq(Nat, app(app(dot2, pipeline), pair(numeral(1), numeral(2))), app(app(dot2, pipeline), pair(numeral(1), numeral(2))));
export const pipelineDotProof: Term = refl(Nat, app(app(dot2, pipeline), pair(numeral(1), numeral(2))));

/** Applying the same reflection twice preserves a metric expression. */
export const pipelineReflectNormType: Term = eq(Nat,
  app(normSq, app(reflectX, app(reflectX, pipeline))), app(normSq, pipeline));
export const pipelineReflectNormProof: Term = refl(Nat, app(normSq, pipeline));
