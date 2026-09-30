import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotationReflectionInvariantProof,rotationReflectionInvariantType,compositeInvariantProof,compositeInvariantType } from '../src/library/geometry-transform-invariant-bundle-more';
test('rotation and reflection invariant bundle checks',()=>check([],rotationReflectionInvariantProof,rotationReflectionInvariantType));
test('composite transform invariant bundle checks',()=>check([],compositeInvariantProof,compositeInvariantType));
