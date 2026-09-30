import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotatedCoordinateBundleProof,rotatedCoordinateBundleType,lineProjectionBundleProof,lineProjectionBundleType,triangleProjectionBundleProof,triangleProjectionBundleType } from '../src/library/geometry-certificate-bundles-more';
test('rotated point coordinate bundle checks',()=>check([],rotatedCoordinateBundleProof,rotatedCoordinateBundleType));
test('line projection bundle checks',()=>check([],lineProjectionBundleProof,lineProjectionBundleType));
test('triangle projection bundle checks',()=>check([],triangleProjectionBundleProof,triangleProjectionBundleType));
