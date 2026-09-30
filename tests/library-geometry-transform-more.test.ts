import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { transformPipelineProof, transformPipelineType, transformPipelineNormProof, transformPipelineNormType, transformPipelineFstProof, transformPipelineFstType, transformPipelineSndProof, transformPipelineSndType, translatedDotProof, translatedDotType, transformedDistanceProof, transformedDistanceType } from '../src/library/geometry-transform-more';

test('transformation pipeline computes', () => check([], transformPipelineProof, transformPipelineType));
test('transformation pipeline norm computes', () => check([], transformPipelineNormProof, transformPipelineNormType));
test('transformation pipeline first projection computes', () => check([], transformPipelineFstProof, transformPipelineFstType));
test('transformation pipeline second projection computes', () => check([], transformPipelineSndProof, transformPipelineSndType));
test('translated dot product computes', () => check([], translatedDotProof, translatedDotType));
test('distance between transformed points computes', () => check([], transformedDistanceProof, transformedDistanceType));
