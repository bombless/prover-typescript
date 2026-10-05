import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { chordLengthSq, chordLengthSqType, zeroChordProof, zeroChordType, chordConcreteProof, chordConcreteType, chordFormulaProof, chordFormulaType, chordAxisConcreteProof, chordAxisConcreteType } from '../src/library/geometry-chord';

test('chord length square structure is kernel checked', () => {
  check([], chordLengthSq, chordLengthSqType);
  check([], zeroChordProof, zeroChordType);
  check([], chordConcreteProof, chordConcreteType);
  check([], chordFormulaProof, chordFormulaType);
  check([], chordAxisConcreteProof, chordAxisConcreteType);
});
