import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-composite-intersection-chain-certificates-more';

test('composite intersection candidate coordinates', () => check([], c.candidateCoordinateProof, c.candidateCoordinateType));
test('composite intersection line incidence', () => check([], c.candidateIncidenceProof, c.candidateIncidenceType));
test('composite intersection circle membership', () => check([], c.candidateCircleProof, c.candidateCircleType));
test('composite intersection norm', () => check([], c.candidateNormProof, c.candidateNormType));
