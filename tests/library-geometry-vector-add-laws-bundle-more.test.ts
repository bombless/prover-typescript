import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { addRightZeroProof,addRightZeroType,addLeftZeroProof,addLeftZeroType } from '../src/library/geometry-vector-add-laws-bundle-more';
test('vector right zero law checks',()=>check([],addRightZeroProof,addRightZeroType));
test('vector left zero law checks',()=>check([],addLeftZeroProof,addLeftZeroType));
