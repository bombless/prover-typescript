import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectFstCoordinateType, reflectFstCoordinateProof, reflectSndCoordinateType, reflectSndCoordinateProof, reflectTwiceFstCoordinateType, reflectTwiceFstCoordinateProof, reflectTwiceSndCoordinateType, reflectTwiceSndCoordinateProof } from '../src/library/geometry-reflection-independent-coordinate-certificates-more';

test('reflection first coordinate check', () => check([], reflectFstCoordinateProof, reflectFstCoordinateType));
test('reflection second coordinate check', () => check([], reflectSndCoordinateProof, reflectSndCoordinateType));
test('double reflection first coordinate check', () => check([], reflectTwiceFstCoordinateProof, reflectTwiceFstCoordinateType));
test('double reflection second coordinate check', () => check([], reflectTwiceSndCoordinateProof, reflectTwiceSndCoordinateType));
