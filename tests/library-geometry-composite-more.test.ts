import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import {
  scaleRotateProof, scaleRotateType, translateScaleProof, translateScaleType,
  translateRotateScaleProof, translateRotateScaleType, scaledNormProof, scaledNormType,
  rotatedDotProof, rotatedDotType, distanceAfterTranslateProof, distanceAfterTranslateType,
  midpointConcreteMoreProof, midpointConcreteMoreType, chordConcreteProof, chordConcreteType,
  circleConcreteProof, circleConcreteType, incidenceConcreteProof, incidenceConcreteType,
} from '../src/library/geometry-composite-more';

test('scale then rotate computes through geometry definitions', () => check([], scaleRotateProof, scaleRotateType));
test('translation after scaling computes through geometry definitions', () => check([], translateScaleProof, translateScaleType));
test('translation after rotation and scaling computes through geometry definitions', () => check([], translateRotateScaleProof, translateRotateScaleType));
test('scaled norm is kernel checked', () => check([], scaledNormProof, scaledNormType));
test('rotated dot product is kernel checked', () => check([], rotatedDotProof, rotatedDotType));
test('translated distance is kernel checked', () => check([], distanceAfterTranslateProof, distanceAfterTranslateType));
test('concrete midpoint is kernel checked', () => check([], midpointConcreteMoreProof, midpointConcreteMoreType));
test('concrete chord length expression is kernel checked', () => check([], chordConcreteProof, chordConcreteType));
test('concrete circle membership expression is kernel checked', () => check([], circleConcreteProof, circleConcreteType));
test('concrete line incidence expression is kernel checked', () => check([], incidenceConcreteProof, incidenceConcreteType));
