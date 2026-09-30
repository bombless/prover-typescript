import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translationCoordinateBundleProof,translationCoordinateBundleType } from '../src/library/geometry-translation-bundle-more';
test('translation coordinate bundle checks for arbitrary point and displacement',()=>check([],translationCoordinateBundleProof,translationCoordinateBundleType));
