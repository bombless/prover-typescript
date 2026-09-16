import "./styles.css";
import { RealProofEngine, type ProofStateView } from "./proof-engine";
import {
  NATURAL_NUMBERS_LESSON,
  initialLessonProgress,
  initialTheoremState,
  isCompleted,
  nextTheorem,
  recordProofResult,
  type TutorialTheorem,
} from "./tutorial";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("UI root element #app was not found");
const root = app;

const engine = new RealProofEngine();
let currentTheoremId = NATURAL_NUMBERS_LESSON.theorems[0].id;
let state: ProofStateView | null = initialTheoremState(NATURAL_NUMBERS_LESSON.theorems[0], (id) => engine.loadTheorem(id));
let progress = initialLessonProgress();
let statusMessage = "Real Proof Engine";
let statusKind: "neutral" | "success" | "error" = "neutral";

function currentTheorem(): TutorialTheorem {
  return NATURAL_NUMBERS_LESSON.theorems.find((theorem) => theorem.id === currentTheoremId) ?? NATURAL_NUMBERS_LESSON.theorems[0];
}

function renderContext(context: ProofStateView["goals"][number]["context"]): string {
  return context.length
    ? context.map((entry) => `<div class="context-row"><code>${entry.name}</code><span>:</span><code>${entry.type}</code></div>`).join("")
    : `<p class="muted">No local assumptions.</p>`;
}

function selectTheorem(theorem: TutorialTheorem): void {
  currentTheoremId = theorem.id;
  state = initialTheoremState(theorem, (id) => engine.loadTheorem(id));
  statusKind = theorem.available ? "neutral" : "error";
  statusMessage = theorem.available ? "Real Proof Engine" : (theorem.availabilityNote ?? "This theorem is not currently executable.");
  render();
}

function renderGoals(): string {
  if (!state) return `<div class="unavailable-state"><strong>Teaching content only</strong><span>${currentTheorem().availabilityNote ?? "This theorem is not currently available in the Proof Engine."}</span></div>`;
  if (state.completed) return `<div class="completed-state"><strong>✓ ${currentTheorem().countsAsCompleted ? "Theorem proved" : "Supported subtheorem proved"}</strong><span>Accepted by the real Kernel.</span></div>`;
  return state.goals.map((goal, index) => `
    <article class="goal-item ${index === 0 ? "focused" : ""}">
      <div class="goal-heading"><span>Goal ${index + 1}</span>${index === 0 ? "<span>focused</span>" : ""}</div>
      <div class="goal-expression">${goal.target}</div>
      <div class="goal-context">${renderContext(goal.context)}</div>
    </article>
  `).join("");
}

function render(): void {
  const theorem = currentTheorem();
  const next = nextTheorem(NATURAL_NUMBERS_LESSON, theorem.id);
  const courseComplete = NATURAL_NUMBERS_LESSON.theorems.every((item) => isCompleted(progress, item.id));
  root.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div><div class="brand">Prover</div><div class="tagline">Curry–Howard Interactive Proofs</div></div>
        <a class="github-link" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
      </header>
      <main class="workspace">
        <aside class="sidebar" aria-label="Lesson and theorem navigator">
          <div class="section-label">Lesson</div>
          <h2>${NATURAL_NUMBERS_LESSON.title}</h2>
          <nav>${NATURAL_NUMBERS_LESSON.theorems.map((item) => `
            <button class="theorem-item ${theorem.id === item.id ? "active" : ""} ${isCompleted(progress, item.id) ? "completed" : ""}" data-theorem="${item.id}" type="button">
              <span class="status">${isCompleted(progress, item.id) ? "✓" : theorem.id === item.id ? "→" : item.available ? item.title.slice(0, 2) : "·"}</span><span>${item.title.slice(3)}</span>
            </button>`).join("")}</nav>
        </aside>
        <section class="proof-panel">
          <div class="theorem-header">
            <div><div class="section-label">Theorem</div><h1>${theorem.title.slice(3)}</h1></div>
            <span class="mode-badge">${theorem.available ? "Real Proof Engine" : "Tutorial content"}</span>
          </div>
          ${state ? `
          <section class="card goal-card"><div class="card-title">Goal</div><div class="goal-expression">${state.goals[0]?.target ?? "No goals"}</div></section>
          <section class="card"><div class="card-title">Context</div>${renderContext(state.goals[0]?.context ?? [])}</section>
          <section class="card tactic-card">
            <div class="card-title">Tactic</div>
            <label class="sr-only" for="tactic-input">Tactic input</label>
            <input id="tactic-input" class="tactic-input" type="text" placeholder="intro, exact, rfl, assumption, apply" autocomplete="off" ${state.completed ? "disabled" : ""} />
            <button id="apply-button" class="apply-button" type="button" ${state.completed ? "disabled" : ""}>Apply</button>
          </section>` : `
          <section class="card unavailable-state"><div class="card-title">Capability</div><strong>Not yet supported by the current Proof Engine</strong><span>${theorem.availabilityNote}</span></section>`}
          <section class="proof-state" aria-live="polite">
            <div><div class="card-title">Proof State</div><div class="state-message ${statusKind}">${statusMessage}</div></div>
            <span class="goal-count">${state?.goals.length ?? 0} ${state?.goals.length === 1 ? "goal" : "goals"}</span>
          </section>
          <section class="goals-list" aria-label="Proof goals">${renderGoals()}</section>
          ${state?.completed && next ? `<button id="next-button" class="next-button" type="button">Next theorem</button>` : courseComplete ? `<div class="completed-state"><strong>✓ Course complete</strong><span>Every theorem has a Kernel-backed accepted proof.</span></div>` : ""}
        </section>
      </main>
    </div>`;

  root.querySelectorAll<HTMLButtonElement>("[data-theorem]").forEach((button) => button.addEventListener("click", () => {
    const selected = NATURAL_NUMBERS_LESSON.theorems.find((item) => item.id === button.dataset.theorem);
    if (selected) selectTheorem(selected);
  }));

  root.querySelector<HTMLButtonElement>("#next-button")?.addEventListener("click", () => {
    if (next) selectTheorem(next);
  });

  const input = root.querySelector<HTMLInputElement>("#tactic-input");
  const apply = root.querySelector<HTMLButtonElement>("#apply-button");
  const applyTactic = () => {
    if (!input || !state) return;
    const result = engine.runTactic(input.value);
    state = result.state;
    statusKind = result.kind;
    statusMessage = result.kind === "success" ? (result.message ?? "Proof state updated") : `✗ Proof rejected — ${result.message}`;
    if (result.kind === "success") progress = recordProofResult(progress, theorem, result);
    render();
  };
  apply?.addEventListener("click", applyTactic);
  input?.addEventListener("keydown", (event) => { if (event.key === "Enter") applyTactic(); });
}

render();
