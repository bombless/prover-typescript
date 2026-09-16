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

## 下一阶段

下一阶段仍为：

```text
M19 — Unification
```

本上下文到此停止，不自动开始 M19。

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
