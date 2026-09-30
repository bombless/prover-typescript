import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateTriangleSecondFstProof, rotateTriangleSecondFstType, rotateTriangleSecondSndProof, rotateTriangleSecondSndType, translateTriangleThirdFstProof, translateTriangleThirdFstType, translateTriangleThirdSndProof, translateTriangleThirdSndType } from '../src/library/geometry-triangle-transform-parametric-more';

test('rotated triangle second x projection law is kernel checked', () => check([], rotateTriangleSecondFstProof, rotateTriangleSecondFstType));
test('rotated triangle second y projection law is kernel checked', () => check([], rotateTriangleSecondSndProof, rotateTriangleSecondSndType));
test('translated triangle third x projection law is kernel checked', () => check([], translateTriangleThirdFstProof, translateTriangleThirdFstType));
test('translated triangle third y projection law is kernel checked', () => check([], translateTriangleThirdSndProof, translateTriangleThirdSndType));
