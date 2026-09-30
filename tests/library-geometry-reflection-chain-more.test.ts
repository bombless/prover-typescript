import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectTwiceConcreteProof,reflectTwiceConcreteType,reflectRotateConcreteProof,reflectRotateConcreteType,scaleRotateReflectProof,scaleRotateReflectType,reflectZeroTranslateProof,reflectZeroTranslateType } from '../src/library/geometry-reflection-chain-more';
test('two reflections restore a concrete point',()=>check([],reflectTwiceConcreteProof,reflectTwiceConcreteType));
test('reflection after rotation computes concrete coordinates',()=>check([],reflectRotateConcreteProof,reflectRotateConcreteType));
test('scale rotate reflect chain computes concrete coordinates',()=>check([],scaleRotateReflectProof,scaleRotateReflectType));
test('zero translation preserves reflected point',()=>check([],reflectZeroTranslateProof,reflectZeroTranslateType));
