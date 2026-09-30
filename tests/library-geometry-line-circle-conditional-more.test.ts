import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { verticalIncidenceProof,verticalIncidenceType,centerZeroCircleProof,centerZeroCircleType,lineCircleConcreteProof,lineCircleConcreteType } from '../src/library/geometry-line-circle-conditional-more';
test('matching vertical base coordinate gives incidence',()=>check([],verticalIncidenceProof,verticalIncidenceType));
test('a center lies on its zero-radius circle',()=>check([],centerZeroCircleProof,centerZeroCircleType));
test('concrete line-circle coordinate certificate checks',()=>check([],lineCircleConcreteProof,lineCircleConcreteType));
