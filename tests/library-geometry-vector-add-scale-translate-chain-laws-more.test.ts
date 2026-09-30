import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-vector-add-scale-translate-chain-laws-more';

test('scale vector sum full coordinate law', () => check([], c.scaleAddPointProof, c.scaleAddPointType));
test('two translations full coordinate law', () => check([], c.translateComposePointProof, c.translateComposePointType));
