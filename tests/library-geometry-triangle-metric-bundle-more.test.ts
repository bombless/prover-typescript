import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleEdgeDistanceBundleProof,triangleEdgeDistanceBundleType } from '../src/library/geometry-triangle-metric-bundle-more';
test('three triangle edge distance certificates bundle together',()=>check([],triangleEdgeDistanceBundleProof,triangleEdgeDistanceBundleType));
