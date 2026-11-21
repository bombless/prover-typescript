# prover-typescript

A small Curry–Howard proof-oriented TypeScript core with an explicit parser, elaborator, Kernel, environment, REPL, and an interactive proof engine backed by a browser tutorial UI.

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

The Kernel is the final trusted boundary. Parser, elaborator, environment, REPL, proof state, tactics, metavariables, unification, and UI live outside it; an extracted proof must become a Core term and pass the Kernel check.

## Source layout

- `src/kernel/` — reduction and type checking for Core terms.
- `src/parser/`, `src/elaborator/`, `src/syntax/` — surface syntax, parsing, and elaboration to Core terms.
- `src/environment/` — global definitions.
- `src/library/` — Nat, addition, multiplication, power, geometry length lemmas, and Kernel-checked proof terms.
- `src/proof/` — untrusted proof engine: multi-goal state, tactics, metavariables, unification.
- `src/repl/` — REPL and proof-state formatting.
- `src/ui/` — Vite web app: engine adapter, tutorial registry, renderers, and styles.

## Proof engine

Supported tactics: `intro`, `exact`, `rfl`, `assumption`, `apply`, `rewrite <hypothesis>`, and `induction <name>`.

- Metavariables with local de Bruijn scope, assignment, instantiation, and cycle / scope rejection.
- Bounded unification for explicit theorem applications, with implicit-argument inference on top of it.
- Single-equality rewrite through Core `EqRec`; equality symmetry is derived internally.
- Natural-number induction over the newest local `Nat` binder, producing base and successor goals with a real induction hypothesis.
- Completed proofs are extracted through `TacticSession.proof()` and rechecked by the Kernel.
- The browser-facing view exposes only goal names, rendered targets, and rendered local context; Core terms, metavariable assignments, and session internals stay behind the adapter.

## Tutorial registry

The tutorial is structured as eleven chapters and thirty-nine stable exercise IDs in `src/ui/tutorial.ts`:

1. Natural Numbers — `numbers.zero_eq_zero`, `numbers.identity`, `numbers.zero_add`
2. Addition — `addition.add_zero`, `addition.add_succ`
3. Equality & Rewrite — `equality.transport`, `equality.rewrite`
4. Induction — `induction.add_zero`, `induction.zero_add`, `induction.succ_add_zero`
5. Addition Laws — `laws.assoc`, `laws.comm`
6. Multiplication — `mul.zero_left`, `mul.succ_left`, `mul.compute`
7. Powers — `pow.zero`, `pow.succ`, `pow.compute`
8. Computation — `compute.add`, `compute.mul`, `compute.pow`
9. Segments — `seg.add_zero`, `seg.zero_add`, `seg.comm`, `seg.assoc`, `seg.congr`
10. Triangle Perimeters — `tri.345`, `tri.equilateral3`, `tri.isosceles558`, `tri.equilateral5`, `tri.6810`, `tri.equilateral4`
11. Quadrilaterals & Polygons — `rect.35`, `square.4`, `rect.46`, `square.5`, `pentagon.3`, `hexagon.4`, `perim.swap`

Geometry is encoded over natural-number lengths: segments, sides, and perimeters are `Nat`, and the geometric propositions are length equalities (segment concatenation laws, congruence under extending a segment, triangle/rectangle/square/polygon perimeters, and side-swapping a perimeter). Every geometry proof term still crosses the Kernel check.

Exercise 4 and exercise 8 share the `add_zero` Core theorem builder but have distinct exercise IDs and progress records. Completion is recorded only from a successful `RealProofEngine` result whose extracted proof crosses the Kernel check; UI state cannot manufacture completion.

The goal renderer prints closed successor chains as decimal numerals and uses add / mul / pow precedence parentheses.

## Checked library theorems

- Equality: reflexivity.
- Addition: `n + 0 = n`, `0 + n = n`, `n + Succ m = Succ (n + m)`, associativity `(a + b) + c = a + (b + c)`, commutativity `a + b = b + a`, `Succ n + 0 = Succ n`.
- Multiplication: `0 * n = 0`, `Succ n * m = m + n * m`.
- Powers: `n ^ 0 = 1`, `n ^ Succ k = n * n ^ k`.
- Geometry (length equalities): right-congruence `a = b → a + c = b + c`; perimeter side swap `a + b + c = b + a + c`.
- Closed computations: `2 + 3 = 5`, `2 * 3 = 6`, `3 * 3 = 9`, `2 ^ 3 = 8`, `2 ^ 4 = 16`.
- Closed geometry perimeters: `3 + 4 + 5 = 12`, `3 + 3 + 3 = 9`, `5 + 5 + 8 = 18`, `5 + 5 + 5 = 15`, `6 + 8 + 10 = 24`, `4 + 4 + 4 = 12`, `2*3 + 2*5 = 16`, `4 * 4 = 16`, `2*4 + 2*6 = 20`, `5 * 5 = 25`, `3 * 5 = 15`, `4 * 6 = 24`.

## Commands

```sh
npm run build      # compile TypeScript to dist/
npm test           # build and run the compiled test suite
npm run dev:web    # local Vite dev server
npm run build:web  # production static bundle in dist-web/
```

`VITE_BASE_PATH` sets the asset base path; GitHub Pages builds use `/<repo-name>/`.

## Pull request checks

The `Check pull requests` workflow compiles TypeScript, runs every compiled test under `dist/tests`, and builds the web app with the GitHub Pages repository base path. It runs for pull requests, pushes to `master`, and manual dispatches on Node.js 22. These checks use read-only repository permissions.

To run the same checks locally:

```sh
npm ci
npm run build
node --test "dist/tests/**/*.test.js"
VITE_BASE_PATH=/prover-typescript/ npm run build:web
```
