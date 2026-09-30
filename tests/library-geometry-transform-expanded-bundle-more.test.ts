import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { transformStagesType, transformStagesProof, transformDistanceType, transformDistanceProof } from '../src/library/geometry-transform-expanded-bundle-more';

test('three-stage transform bundle', () => check([], transformStagesProof, transformStagesType));
test('three-stage transform distance', () => check([], transformDistanceProof, transformDistanceType));
