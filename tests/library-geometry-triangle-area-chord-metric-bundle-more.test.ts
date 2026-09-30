import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-area-chord-metric-bundle-more';

test('triangle area and chord metrics are kernel checked', () => {
  check([], c.areaProof, c.areaType);
  check([], c.abChordProof, c.abChordType);
  check([], c.bcChordProof, c.bcChordType);
  check([], c.caChordProof, c.caChordType);
});

test('self-circle and chord-distance certificates are kernel checked', () => {
  check([], c.selfCircleProof, c.selfCircleType);
  check([], c.chordDistanceProof, c.chordDistanceType);
});
