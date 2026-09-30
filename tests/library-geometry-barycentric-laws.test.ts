import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointDiscreteFstProof, midpointDiscreteFstType, midpointDiscreteSndProof, midpointDiscreteSndType } from '../src/library/geometry-barycentric';

test('discrete midpoint coordinate laws are kernel checked', () => {
  check([], midpointDiscreteFstProof, midpointDiscreteFstType);
  check([], midpointDiscreteSndProof, midpointDiscreteSndType);
});
