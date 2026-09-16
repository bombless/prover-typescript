import "./styles.css";
import { MOCK_THEOREM_LIST, MockProofEngine, type ProofStateView } from "./proof-engine";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("UI root element #app was not found");
const root = app;

const engine = new MockProofEngine();
let state: ProofStateView = engine.loadTheorem("n_plus_zero");
let statusMessage = "Prototype / Mock Mode";
let statusKind: "neutral" | "success" | "error" = "neutral";

function renderContext(context: ProofStateView["goals"][number]["context"]): string {
  return context.length
    ? context.map((entry) => `<div class="context-row"><code>${entry.name}</code><span>:</span><code>${entry.type}</code></div>`).join("")
    : `<p class="muted">No local assumptions.</p>`;
}

function renderGoals(): string {
  if (state.completed) return `<div class="completed-state"><strong>✓ Mock proof completed</strong><span>Prototype result — not checked by the Kernel.</span></div>`;
  return state.goals.map((goal, index) => `
    <article class="goal-item ${index === 0 ? "focused" : ""}">
      <div class="goal-heading"><span>Goal ${index + 1}</span>${index === 0 ? "<span>focused</span>" : ""}</div>
      <div class="goal-expression">${goal.target}</div>
      <div class="goal-context">${renderContext(goal.context)}</div>
    </article>
  `).join("");
}

function render(): void {
  root.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div><div class="brand">Prover</div><div class="tagline">Curry–Howard Interactive Proofs</div></div>
        <a class="github-link" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
      </header>
      <main class="workspace">
        <aside class="sidebar" aria-label="Lesson and theorem navigator">
          <div class="section-label">Lessons</div>
          <h2>Natural Numbers</h2>
          <nav>${MOCK_THEOREM_LIST.map((theorem) => `
            <button class="theorem-item ${state.theoremName === theorem.id ? "active" : ""}" data-theorem="${theorem.id}" type="button">
              <span class="status">${state.theoremName === theorem.id ? "→" : theorem.label.slice(0, 2)}</span><span>${theorem.label.slice(4)}</span>
            </button>`).join("")}</nav>
        </aside>
        <section class="proof-panel">
          <div class="theorem-header">
            <div><div class="section-label">Theorem</div><h1>${state.theoremName}</h1></div>
            <span class="mode-badge">Prototype / Mock Mode</span>
          </div>
          <section class="card goal-card"><div class="card-title">Goal</div><div class="goal-expression">${state.goals[0]?.target ?? "No goals"}</div></section>
          <section class="card"><div class="card-title">Context</div>${renderContext(state.goals[0]?.context ?? [])}</section>
          <section class="card tactic-card">
            <div class="card-title">Tactic</div>
            <label class="sr-only" for="tactic-input">Tactic input</label>
            <input id="tactic-input" class="tactic-input" type="text" placeholder="intro, exact, rfl, assumption, apply" autocomplete="off" ${state.completed ? "disabled" : ""} />
            <button id="apply-button" class="apply-button" type="button" ${state.completed ? "disabled" : ""}>Apply</button>
          </section>
          <section class="proof-state" aria-live="polite">
            <div><div class="card-title">Proof State</div><div class="state-message ${statusKind}">${statusMessage}</div></div>
            <span class="goal-count">${state.goals.length} ${state.goals.length === 1 ? "goal" : "goals"}</span>
          </section>
          <section class="goals-list" aria-label="Mock proof goals">${renderGoals()}</section>
        </section>
      </main>
    </div>`;

  root.querySelectorAll<HTMLButtonElement>("[data-theorem]").forEach((button) => button.addEventListener("click", () => {
    state = engine.loadTheorem(button.dataset.theorem ?? "n_plus_zero");
    statusMessage = "Prototype / Mock Mode";
    statusKind = "neutral";
    render();
  }));

  const input = root.querySelector<HTMLInputElement>("#tactic-input");
  const apply = root.querySelector<HTMLButtonElement>("#apply-button");
  const applyTactic = () => {
    if (!input) return;
    const result = engine.runTactic(input.value);
    state = result.state;
    statusKind = result.kind;
    statusMessage = result.kind === "success" ? (result.message ?? "Mock proof state updated") : `✗ Tactic failed — ${result.message}`;
    render();
  };
  apply?.addEventListener("click", applyTactic);
  input?.addEventListener("keydown", (event) => { if (event.key === "Enter") applyTactic(); });
}

render();


