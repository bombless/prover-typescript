import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateTriangleSecondFstType, rotateTriangleSecondFstProof, reflectTriangleThirdSndType, reflectTriangleThirdSndProof, translateTriangleThirdFstType, translateTriangleThirdFstProof, rotateLineDirectionFstMoreType, rotateLineDirectionFstMoreProof, rotateLineDirectionSndMoreType, rotateLineDirectionSndMoreProof } from '../src/library/geometry-triangle-line-transform-laws-more';

test('rotated triangle second vertex first coordinate', () => check([], rotateTriangleSecondFstProof, rotateTriangleSecondFstType));
test('reflected triangle third vertex second coordinate', () => check([], reflectTriangleThirdSndProof, reflectTriangleThirdSndType));
test('translated triangle third vertex first coordinate', () => check([], translateTriangleThirdFstProof, translateTriangleThirdFstType));
test('rotated line direction first coordinate', () => check([], rotateLineDirectionFstMoreProof, rotateLineDirectionFstMoreType));
test('rotated line direction second coordinate', () => check([], rotateLineDirectionSndMoreProof, rotateLineDirectionSndMoreType));
