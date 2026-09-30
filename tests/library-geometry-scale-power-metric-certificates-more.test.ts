import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleThreeNormType, scaleThreeNormProof, scaleFourNormType, scaleFourNormProof, nestedScaleNormType, nestedScaleNormProof } from '../src/library/geometry-scale-power-metric-certificates-more';

test('scale three norm metric', () => check([], scaleThreeNormProof, scaleThreeNormType));
test('scale four norm metric', () => check([], scaleFourNormProof, scaleFourNormType));
test('nested scale norm metric', () => check([], nestedScaleNormProof, nestedScaleNormType));
