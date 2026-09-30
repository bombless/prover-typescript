import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { chordOnOriginCircleProof, chordOnOriginCircleType } from '../src/library/geometry-circle-chord';

test('circle chord endpoint certificate is kernel checked', () => check([], chordOnOriginCircleProof, chordOnOriginCircleType));
