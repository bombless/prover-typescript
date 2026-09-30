import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { pointToOriginType, pointToOriginProof, originToPointType, originToPointProof } from '../src/library/geometry-zero-distance-general-certificates-more';

test('every point to origin distance certificate', () => check([], pointToOriginProof, pointToOriginType));
test('origin to every point distance certificate', () => check([], originToPointProof, originToPointType));
