# Returning a local binding to the goal

`TacticSession.revert(name?)` turns the newest local binding `x : A` and target `B` into a function goal `(x : A) -> B` in the preceding context. This lets API clients generalize a recently introduced local before continuing a proof. An optional name must match that newest binding.

```ts
const target = pi(Nat, eq(Nat, variable(0), variable(0)), 'n');
const proof = tacticSession(initialProofState(target))
  .intro()
  .revert('n')
  .intro()
  .rfl()
  .proof();
check([], proof, target);
```

The complete new function target is checked in the smaller context before the session changes. Dependent domains and references to outer locals are preserved. The generated Core proof applies the resulting function to the original local variable; no Kernel primitive is added. The tactic preserves siblings and case metadata.

The operation is deliberately limited to the newest binding. Revert newer dependents first to reach an earlier local. This method does not reorder arbitrary hypotheses, infer a generalization or add browser/REPL syntax.
