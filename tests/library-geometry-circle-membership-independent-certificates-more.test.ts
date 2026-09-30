import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { pOnOwnCircleType, pOnOwnCircleProof, qOnOwnCircleType, qOnOwnCircleProof, zeroOnZeroCircleType, zeroOnZeroCircleProof } from '../src/library/geometry-circle-membership-independent-certificates-more';

test('point p own-circle membership checks', () => check([], pOnOwnCircleProof, pOnOwnCircleType));
test('point q own-circle membership checks', () => check([], qOnOwnCircleProof, qOnOwnCircleType));
test('origin zero-circle membership checks', () => check([], zeroOnZeroCircleProof, zeroOnZeroCircleType));
