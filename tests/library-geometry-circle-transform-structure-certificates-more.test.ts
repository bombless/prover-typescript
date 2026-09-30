import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-circle-transform-structure-certificates-more';

test('rotation preserves circle radius projection', () => check([], c.rotatedRadiusProof, c.rotatedRadiusType));
test('rotated circle center eta law', () => check([], c.rotatedCenterEtaProof, c.rotatedCenterEtaType));
