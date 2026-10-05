import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { twiceArea, twiceAreaType, collinearOriginProof, collinearOriginType, twiceAreaZeroProof, twiceAreaZeroType, concreteAreaProof, concreteAreaType, concreteAreaTwoProof, concreteAreaTwoType, areaZeroGeneralProof, areaZeroGeneralType } from '../src/library/geometry-area';

test('triangle area and collinearity certificate are kernel checked', () => {
  check([], twiceAreaType, { kind: 'Type' });
  check([], collinearOriginProof, collinearOriginType);
  check([], twiceAreaZeroProof, twiceAreaZeroType);
  check([], concreteAreaProof, concreteAreaType);
  check([], concreteAreaTwoProof, concreteAreaTwoType);
  check([], areaZeroGeneralProof, areaZeroGeneralType);
});
