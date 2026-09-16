# prover-typescript

A small Curry–Howard proof-oriented TypeScript core with an explicit parser, elaborator, Kernel, environment, REPL, and incrementally built proof engine.

## Architecture

```text
Surface Syntax
      ↓
Parser
      ↓
Elaborator
      ↓
Core Term
      ↓
Kernel
```

The interactive proof path is kept outside the Kernel:

```text
Theorem
  ↓
Proof Engine
  ↓
Core Proof Term
  ↓
Kernel
```

The Kernel is the final trusted boundary. Parser, elaborator, environment, REPL, Proof State, tactics, metavariables, unification, and automation must not become Kernel dependencies.

## Milestone 16 — Proof State

Milestone 16 is complete. It introduces the smallest independent Proof State model needed for later tactics, without implementing tactics or metavariables.

The model is:

```text
ProofState
  ↓
Goals
  ↓
Context + Goal Type
```

`src/proof/state.ts` defines `ContextEntry`, `Context`, `Goal`, and `ProofState`, plus constructors for an initial state and immutable goal replacement. Context entries use names only as presentation metadata while their types remain existing Core `Term` values.

The M16 regression suite verifies:

- creation of a single Core-level goal with an empty context;
- contexts such as `A : Type` and `x : A`;
- multiple independent goals;
- goal replacement without mutating the original state;
- Proof State operations do not modify the Global Environment;
- invalid goal indexes are rejected.

M16 deliberately does not add:

```text
intro
exact
rfl
assumption
apply
metavariables
unification
implicit arguments
rewrite
automation
by syntax
```

No Kernel source was changed for M16. Proof State remains an untrusted proof-engine data model; any future generated proof must still become a Core Term and pass the Kernel.

## Verification

```text
npm run build -> success
npm test      -> 111 tests / 111 passed / 0 failed
```

The next planned milestone is M17 — Basic Tactics, but it is intentionally not started in this milestone.

## Milestone 17 — Basic Tactics

M17 is complete. The untrusted Proof Engine now provides `intro`, `exact`, `rfl`, `assumption`, and a deliberately bounded `apply` over the existing Proof State.

The tactic layer lives in `src/proof/tactic.ts`. It builds Core proof terms through a small internal proof skeleton; no metavariables or unification engine were introduced. Completed proofs are checked again through the existing Kernel API.

`apply` is intentionally limited to non-dependent Pi arguments. Dependent argument inference is deferred to M18/M19 rather than introducing metavariables early.

New regression coverage is in `tests/proof-tactic.test.ts` and covers success, failure, immutable state behavior, Kernel acceptance, and the M17 `apply` boundary.

M17 does not add `by` syntax, metavariables, unification, implicit arguments, rewrite, induction, or automation.

## Verification

```text
npm run build -> success
npx tsx --test "tests/**/*.test.ts" -> 131 tests / 131 passed / 0 failed
```

The next planned milestone is M18 — Metavariables.

## Milestone 18 — Metavariables

M18 is complete. The proof engine now has an immutable metavariable context in `src/proof/metavariable/meta.ts`.

The first implementation deliberately uses a separate `MetaTerm` wrapper:

```text
?m1
 ↓
assignment
 ↓
instantiate
 ↓
Core Term
 ↓
Kernel
```

Supported operations are:

- create a metavariable with an explicit local scope depth and optional Core type;
- assign it to a Core term or another metavariable;
- transitively resolve nested assignments;
- instantiate only when the result is a concrete Core `Term`;
- reject unassigned metavariables at the Core boundary;
- reject self-cycles and indirect cycles;
- reject assignments that escape the metavariable's local de Bruijn scope;
- keep failed assignments from mutating the original `MetaContext`.

M18 intentionally does **not** implement unification, occurs-check over arbitrary term structure, implicit arguments, or metavariables embedded inside Core syntax. Those remain later proof-engine work.

### Kernel boundary

The Kernel was not modified and has no dependency on `MetaContext`, `MetaVariable`, `MetaTerm`, or Proof State. A metavariable is never represented as a Core `Term`; `instantiate` must first resolve it to an actual Core term, which can then be checked by the existing Kernel.

### Verification

```text
npm run build -> success
npm test      -> 130 tests / 130 passed / 0 failed
```

M18 is complete. Stop here; do not begin M19 automatically.

## UI-1 — Web Shell

UI-1 is complete. A thin, static Vite shell now lives at the browser boundary without adding any dependency to the Kernel or Proof Engine. The page provides:

- Prover header and GitHub link;
- Natural Numbers lesson/theorem navigator;
- theorem title and current goal;
- local context display;
- tactic input and disabled Apply control;
- proof-state placeholder and explicit `UI-1 Web Shell` marker.

The UI is intentionally presentation-only. It does not run tactics, construct proof terms, or claim Kernel acceptance. Those responsibilities remain for the later Proof Engine adapter milestone.

The web build uses `VITE_BASE_PATH` for GitHub Pages repository subpaths and produces a static `dist-web/` bundle. Local development is available with `npm run dev:web`; production builds use `npm run build:web`.

### Verification

```text
npm run build:web -> success
npm run build     -> success
npm test          -> 130 tests / 130 passed / 0 failed
```

UI-1 is complete. Stop here; do not begin UI-2 automatically.
