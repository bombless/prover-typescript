# prover-typescript — Milestone 12 后续开发交接计划

## 当前状态

当前项目：

```text
D:\mcp-agent-workspace\prover-typescript
```

Milestone 12 已完成并提交：

```text
509a361 feat: add named definitions and global environment
```

当前 worktree 应保持干净。

最近验证结果：

```text
npm run build  ✅
npm test       ✅
98 tests
98 passed
0 failed
```

Milestone 12 已实现：

- 持久 global Environment
- `def name := term`
- 后续 term 引用 definition
- duplicate definition 拒绝
- failed definition 不污染 Environment
- self-reference 拒绝
- local lexical binding 优先于 global definition
- Command Parser 与 Term Parser 分离
- Kernel 保持不变

---

## 新上下文第一步

不要直接编码。先执行：

```powershell
cd D:\mcp-agent-workspace\prover-typescript

git status --short
git log -3 --oneline
git diff --stat

npm run build
npm test
```

预期：

```text
worktree clean
HEAD 至少包含 509a361
build 成功
98/98 或后续增加后的全部测试通过
```

---

## 新上下文必须重新阅读

按以下顺序确认实际代码，而不是依赖旧上下文假设：

```text
README.md
package.json

src/syntax/*
src/parser/*
src/elaborator/*
src/environment/*
src/repl/*
src/kernel/*

tests/*
```

重点重新确认：

1. `SurfaceTerm` 的实际结构和构造函数。
2. `parse()` 与 `parseCommand()` 的实际 API。
3. `Environment` / `GlobalEnvironment` 的实际 API。
4. `elaborate()` 当前参数顺序和 global lookup 行为。
5. `processLine()` 当前 Environment/state 传递方式。
6. `infer()` / `check()` / `show()` 当前 Kernel API。
7. `src/kernel/*` 是否继续零修改。

---

## Milestone 12 验收基线

必须继续成立：

```text
> def zero := 0
defined zero

> zero
Nat

> def one := Succ zero
defined one

> one
Nat
```

错误语义继续保持：

```text
> def zero := 0
defined zero

> def zero := Succ 0
Error: already defined: zero

> def bad := unknown
Error: Unknown variable: unknown

> def loop := loop
Error: Unknown variable: loop
```

失败 definition 不得进入 Environment。

局部变量必须优先于 global：

```text
def x := 0
(x : Nat) => x
```

结果仍应是：

```text
(x : Nat) -> Nat
```

---

## 后续开发优先方向

Milestone 12 已经证明了“持久命名环境”这一层架构成立。

下一阶段不要直接跳到完整声明系统。建议按下面的顺序逐步扩展。

### 1. 先稳定 Environment 语义

目前保持：

```text
name -> Core Term
```

下一步可以评估是否需要保存 type：

```ts
interface Definition {
  name: string;
  term: CoreTerm;
  type: CoreTerm;
}
```

只有在 REPL、打印或后续声明功能真正需要时再引入，不要提前复杂化。

### 2. 考虑 REPL state 抽象

当前已经通过 Environment 实现持久状态。

后续如果 command 数量增加，可考虑把：

```text
Environment
command dispatch
```

封装进一个小型 `ReplState` / `Repl`，但不要把 parser 或 command 类型放进 Kernel。

### 3. 扩展 Command 时保持层次边界

未来若增加 command，应继续遵循：

```text
Parser
  ↓
Surface Command
  ↓
REPL / command dispatcher
  ↓
Elaborator + Environment
  ↓
Core Term
  ↓
Kernel
```

不要让 Kernel 开始认识：

```text
Command
Environment
GlobalDefinition
source identifier
REPL state
```

---

## 下一阶段暂不实现

继续明确排除：

```text
theorem
proof state
tactics
automation
unification
metavariables
implicit arguments
typeclass inference
coercions
recursive definitions
mutual recursion
namespaces
modules
imports
files-as-modules
let bindings
pattern matching
inductive declarations
universe polymorphism
LSP / IDE protocol
```

除非后续 milestone 明确重新定义范围，否则不要顺手加入。

---

## 每次修改前

```powershell
cd D:\mcp-agent-workspace\prover-typescript

git status --short
git diff --stat
npm run build
npm test
```

先确认 baseline，再修改。

---

## 每次修改后

```powershell
git diff --stat
git diff
npm run build
npm test
git status --short
```

重点检查：

- Kernel 是否意外修改。
- Milestone 9/10/11 文件是否被删除或覆盖。
- Parser / REPL 回归是否发生。
- `package.json` test script 是否变化。
- README 是否出现大面积无关重排。
- 是否新增无关依赖。
- 是否出现超出当前 milestone 的 declaration feature。

---

## 推荐的下一 milestone 方向

当前最自然的下一步不是继续扩大 `def` 语法，而是先决定“definitions 在语言中的展示与声明边界”。

可以优先选择以下窄目标：

```text
Named Definitions / Environment hardening
```

重点处理：

- definition type 是否持久化；
- 更明确的 Environment API；
- REPL state 与 command dispatch 的职责分离；
- definition 查询/打印的最小支持；
- 更完整的 environment-aware elaboration 测试。

只有这一层稳定后，再考虑 theorem/proof-state 等更高层能力。

---

## 最终架构原则

始终保持：

```text
Surface / Parser
        ↓
Command / REPL
        ↓
Elaborator + Environment
        ↓
Core Term
        ↓
Kernel
```

其中：

```text
Kernel = 只处理 Core Term
Environment = 高层命名状态
Command = Parser / REPL 层概念
```

核心目标不是快速增加语法，而是持续维持清晰、可测试、可演进的边界。
