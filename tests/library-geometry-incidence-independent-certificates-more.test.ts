import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { incidenceFirstType, incidenceFirstProof, incidenceSecondType, incidenceSecondProof, incidenceOriginType, incidenceOriginProof } from '../src/library/geometry-incidence-independent-certificates-more';

test('incidence first concrete checks', () => check([], incidenceFirstProof, incidenceFirstType));
test('incidence second concrete checks', () => check([], incidenceSecondProof, incidenceSecondType));
test('incidence origin concrete checks', () => check([], incidenceOriginProof, incidenceOriginType));
