import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-circle-line-concrete-certificates-more';

test('point lies on concrete circle', () => check([], c.selfCircleProof, c.selfCircleType));
test('point is incident with concrete line', () => check([], c.lineIncidenceProof, c.lineIncidenceType));
test('point lies on matching vertical line', () => check([], c.verticalMembershipProof, c.verticalMembershipType));
test('same x coordinate gives line incidence', () => check([], c.sharedVerticalLineProof, c.sharedVerticalLineType));
