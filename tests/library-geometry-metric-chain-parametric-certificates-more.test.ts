import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-metric-chain-parametric-certificates-more';

test('translated norm coordinate formula', () => check([], c.translatedNormProof, c.translatedNormType));
test('scaled norm coordinate formula', () => check([], c.scaledNormProof, c.scaledNormType));
