# prover-typescript — NEXT

当前工作区已完成 M18 — Metavariables，并完成其后的 Multi-Goal / Case / Proof UX 基础设施。

## 当前验证

```text
npm run build -> success
npm test      -> 139 tests / 139 passed / 0 failed
```

`npm` 工具包装器在本机返回过 `spawn EINVAL`，因此本轮验证通过 PowerShell 直接执行 `npm run build` / `npm test` 完成；命令本身成功。

## Multi-Goal / Case / Proof UX — complete

本阶段只扩展 Proof Engine / Proof UX，不增加 Kernel 语义。

新增能力：

```text
GoalId
focusedGoalId
currentGoal / focusGoal / focusNext / focusPrevious
caseName
solveCurrentGoal
focused-goal tactic execution
automatic focus after goal completion
REPL ProofState formatter
```

Goal identity 是稳定的 Proof Engine metadata；Goal 完成或重新排序不会复用 identity。Case name 同样只用于 ProofState / UI 展示，不进入 Core term 或 Kernel。

Tactic session 现在明确以 focused goal 为目标。`intro`、`exact`、`rfl`、`assumption`、`apply` 失败时保持原 session 不变；成功解决当前 goal 后按生成顺序继续 focus 下一个 pending goal，若没有后继则选择前一个。

`apply` 仍保持 M17 的边界：只支持非 dependent Pi arguments；本阶段没有实现 unification。

REPL 层新增 `formatProofState`，可以展示：

```text
Goals:

▶ Goal 1 (case-name)
  x : A
  ⊢ B

  Goal 2
  ⊢ C
```

无 goals 时显示：

```text
No goals.
Proof complete.
```

测试覆盖稳定 Goal identity、focus navigation、case metadata、focused tactic、自动 focus、失败回滚、REPL display，以及最终 proof 仍经 Kernel inference/check。

### 明确未实现

```text
unification
implicit arguments
rewrite
induction semantics
simp
ring
Int
user-defined inductives
pattern matching
modules
imports
LSP
by parser
```

### Kernel boundary

本阶段没有向 `src/kernel/` 添加 ProofState、Tactic、GoalId、Case 或 metavariable 依赖。Case / focus / goal identity 全部停留在 Proof Engine 层；proof extraction 后仍形成 Core `Term` 并交给 Kernel。

## Post-M19 next stage

下一阶段才是：

```text
M20 — Implicit Arguments
```

M19 已完成；不自动开始 M20。

## UI-2 — Mock Proof Interaction — complete

UI-2 adds the browser-facing `ProofEngine` abstraction and an isolated `MockProofEngine` under `src/ui/`. The UI now supports theorem selection, tactic input / Apply, mock Proof State updates, readable error messages, explicit `Prototype / Mock Mode`, completion display, and multiple goals.

The UI-facing model contains only presentation data (`ProofStateView`, `GoalView`, `ContextEntryView`) and never exposes Proof Engine internals such as `MetaContext`, assignments, or Core terms. Mock success is explicitly not Kernel acceptance.

### Verification

```text
npm run build     -> success
npm test          -> 146 tests / 146 passed / 0 failed
npm run build:web -> success
```

### Next stage

```text
UI-3 — Real Proof Engine Adapter
```

Do not begin UI-3 automatically.

## UI-3 — Real Proof Engine Adapter — complete

UI-3 connects the browser UI to the existing Proof Engine through `RealProofEngine`.

The adapter reuses `ProofState`, `TacticSession`, the existing parser/elaborator path for tactic arguments, and the existing Kernel validation performed by proof extraction. The browser-facing `ProofStateView` remains presentation-only and does not expose Core terms, metavariable assignments, or internal tactic state.

Supported browser tactics are the existing bounded proof-engine operations:

```text
intro
exact <term>
rfl
assumption
apply <term>
```

Successful completion calls proof extraction, which performs the existing Kernel inference check. Tactic failures return a user-facing error while preserving the previous session state.

### Verification

```text
npm test          -> 152 tests / 152 passed / 0 failed
npm run build     -> success
npm run build:web -> success
git diff --check  -> success
```

The UI remains an adapter over the existing Proof Engine; no ProofState, Tactic, or UI metadata was moved into `src/kernel/`.

### Next stage

The next stage is not started automatically. Re-check the workspace and choose the next explicitly authorized milestone before making further changes.

## UI-4 — Natural Number Tutorial — complete for audited capability scope

UI-4 adds the Natural Numbers lesson model and browser navigation:

```text
Natural Numbers
  01 Zero
  02 Equality
  03 Addition
  04 Addition: Successor
```

The lesson/theorem model is UI-facing presentation metadata. The UI resets to a fresh `RealProofEngine` session when a theorem is selected, and `Next theorem` also starts a fresh session.

Capability audit results through the real path:

```text
0 = 0
  rfl
  ↓
RealProofEngine
  ↓
TacticSession.proof()
  ↓
Kernel accepted

n = n
  intro; rfl
  ↓
RealProofEngine
  ↓
TacticSession.proof()
  ↓
Kernel accepted
```

The addition tutorial content is exposed with the audited partial capability:

```text
0 + n = n
  intro; rfl
  ↓
Kernel accepted

n + 0 = n
  not currently completable by M17

n + Succ m = Succ (n + m)
  not currently completable by M17
```

The Addition lesson does not become a completed lesson item after only the supported `0 + n = n` subtheorem is proved. M17 still lacks the unification/rewrite/induction capabilities needed for the remaining general proofs.

Completion state is driven only by a successful `ProofResult` with `state.completed === true`; the UI never sets completion directly. `MockProofEngine` remains intact for existing prototype/regression coverage and is not used to claim tutorial completion.

### Verification

```text
npm run build     -> success
npm test          -> 160 tests / 160 passed / 0 failed
npm run build:web -> success
git diff --check  -> success
```

### Explicitly not implemented

```text
M19 Unification
M20 Implicit Arguments
M21 Rewrite
M22 Induction
UI-5
UI-6
```

## M19 — Unification — complete

M19 adds bounded proof-engine unification for explicit theorem applications.

```text
apply theorem
    ↓
metavariables for explicit Pi arguments
    ↓
unify theorem conclusion with current goal
    ↓
MetaContext assignments
    ↓
explicit Core application
    ↓
TacticSession.proof()
    ↓
Kernel inference/check
```

Implemented and tested: simple variable assignment, application and nested-application unification, constructor mismatch rejection, occurs check, scope safety, assignment stability, and failed-unification rollback.

`apply` can now solve an explicit dependent theorem argument from the current goal, while unresolved explicit arguments remain as proof goals. This does not implement implicit arguments.

M19 reuses the M18 `MetaContext` infrastructure and does not modify `src/kernel/`. Metavariables and unification remain in the Proof Engine; extracted proofs are Core `Term` values checked by the Kernel.

M19 does not implement implicit arguments, rewrite, induction, simp, ring, automation, typeclass inference, UI-5, or UI-6.

### Verification

```text
npm run build      -> success
npm test           -> 168 tests / 168 passed / 0 failed
npm run build:web  -> success
git diff --check   -> success
```

M19 is complete. Stop here; do not begin M20 automatically.

## M20 — Implicit Arguments — complete

M20 adds bounded implicit-argument inference on top of the existing metavariable and unification infrastructure.

Implemented path:

```text
apply theorem
    ↓
metavariables for Pi arguments
    ↓
implicit binders marked inference-only
    ↓
expected goal drives unification
    ↓
implicit assignments resolved
    ↓
unresolved explicit arguments remain as proof goals
    ↓
Core proof term
    ↓
Kernel acceptance
```

Implemented and tested:

```text
basic implicit inference
expected-type-driven inference
multiple implicit arguments
explicit + implicit interaction
implicit inference through application/unification
failed implicit inference without guessing
conflicting constraints
scope safety via existing MetaContext/unification checks
failed inference without state mutation
Kernel-backed integration
```

The implementation reuses M18 `MetaContext` and M19 `unify`; no second inference or metavariable infrastructure was added. The Kernel was not modified and does not understand implicit-argument inference.

Explicitly not implemented:

```text
rewrite
induction
simp
ring
automation
typeclass inference
general-purpose elaboration
UI-5
UI-6
```

### Verification

```text
npm run build      -> success
npm test           -> 174 tests / 174 passed / 0 failed
npm run build:web  -> success
git diff --check   -> success
```

M20 is complete and committed independently. Stop here; do not begin M21 automatically.
