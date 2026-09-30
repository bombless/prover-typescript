import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { pipelinePointProof, pipelinePointType, pipelineFstProof, pipelineFstType, pipelineSndProof, pipelineSndType, pipelineReflectTwiceProof, pipelineReflectTwiceType } from '../src/library/geometry-coordinate-pipelines-more';

test('coordinate transformation pipeline computes', () => check([], pipelinePointProof, pipelinePointType));
test('pipeline first projection computes', () => check([], pipelineFstProof, pipelineFstType));
test('pipeline second projection computes', () => check([], pipelineSndProof, pipelineSndType));
test('pipeline double reflection computes', () => check([], pipelineReflectTwiceProof, pipelineReflectTwiceType));
