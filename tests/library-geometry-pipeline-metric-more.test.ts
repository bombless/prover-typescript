import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { pipelineNormProof, pipelineNormType, pipelineDotProof, pipelineDotType, pipelineReflectNormProof, pipelineReflectNormType } from '../src/library/geometry-pipeline-metric-more';

test('pipeline norm expression is kernel checked', () => check([], pipelineNormProof, pipelineNormType));
test('pipeline dot expression is kernel checked', () => check([], pipelineDotProof, pipelineDotType));
test('double reflection preserves pipeline norm expression', () => check([], pipelineReflectNormProof, pipelineReflectNormType));
