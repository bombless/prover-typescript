import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateScaleFstProof, rotateScaleFstType, rotateScaleSndProof, rotateScaleSndType, scaleRotateConcreteProof, scaleRotateConcreteType, scaleRotateNormProof, scaleRotateNormType } from '../src/library/geometry-scale-rotate-parametric-more';

test('rotate scale first coordinate law is kernel checked', () => check([], rotateScaleFstProof, rotateScaleFstType));
test('rotate scale second coordinate law is kernel checked', () => check([], rotateScaleSndProof, rotateScaleSndType));
test('scale rotate concrete point computes', () => check([], scaleRotateConcreteProof, scaleRotateConcreteType));
test('scale rotate norm computes', () => check([], scaleRotateNormProof, scaleRotateNormType));
