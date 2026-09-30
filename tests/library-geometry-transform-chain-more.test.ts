import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateTwiceConcreteProof,rotateTwiceConcreteType,scaleRotateConcreteProof,scaleRotateConcreteType,scaleTranslateRotateConcreteProof,scaleTranslateRotateConcreteType,chainZeroTranslateProof,chainZeroTranslateType } from '../src/library/geometry-transform-chain-more';
test('two concrete quarter-turns restore the point',()=>check([],rotateTwiceConcreteProof,rotateTwiceConcreteType));
test('scale then rotate computes concrete coordinates',()=>check([],scaleRotateConcreteProof,scaleRotateConcreteType));
test('scale translate rotate chain computes concrete coordinates',()=>check([],scaleTranslateRotateConcreteProof,scaleTranslateRotateConcreteType));
test('zero translation preserves a transformed point',()=>check([],chainZeroTranslateProof,chainZeroTranslateType));
