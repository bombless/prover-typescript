# Predecessor and truncated subtraction

`src/library/sub.ts` extends the natural-number Core library with saturating predecessor and subtraction. Both are ordinary lambda terms built from the existing `NatRec` constructor.

- `predTerm(n)` computes `max(n - 1, 0)`.
- `subTerm(n, m)` computes `max(n - m, 0)` by recursion on `m`.

```ts
const result = subTerm(numeral(5), numeral(3));
check([], result, Nat);
assert.ok(definitionalEqual(result, numeral(2)));
assert.ok(definitionalEqual(subTerm(numeral(2), numeral(5)), Zero));
```

The module exports the function terms `pred` and `sub`, their types, and generic checked proofs of the four defining equations: `pred 0 = 0`, `pred (Succ n) = n`, `sub n 0 = n`, and `sub n (Succ m) = pred (sub n m)`. Their export names are `predZeroType/Proof`, `predSuccType/Proof`, `subZeroType/Proof`, and `subSuccType/Proof`.

Subtraction never returns a negative integer. This library adds no integer type, new Core constructor, simplifier or browser/REPL alias. Application builders assemble terms; the Kernel checks argument types in the caller's context.
