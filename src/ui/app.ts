import "./styles.css";
import { RealProofEngine, type ProofStateView } from "./proof-engine";
import { NATURAL_NUMBERS_LESSON, initialLessonProgress, initialTheoremState, isCompleted, nextExercise, recordProofResult, type Exercise } from "./tutorial";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("UI root element #app was not found");
const root = app;
const engine = new RealProofEngine();
let currentExerciseId = NATURAL_NUMBERS_LESSON.exercises[0].id;
let state: ProofStateView | null = initialTheoremState(NATURAL_NUMBERS_LESSON.exercises[0], (id) => engine.loadTheorem(id));
let progress = initialLessonProgress();
let statusMessage = "Real Proof Engine";
let statusKind: "neutral" | "success" | "error" = "neutral";

function currentExercise(): Exercise {
  return NATURAL_NUMBERS_LESSON.exercises.find((exercise) => exercise.id === currentExerciseId) ?? NATURAL_NUMBERS_LESSON.exercises[0];
}

function currentChapter() {
  return NATURAL_NUMBERS_LESSON.chapters.find((chapter) => chapter.exerciseIds.includes(currentExerciseId)) ?? NATURAL_NUMBERS_LESSON.chapters[0];
}

function renderContext(context: ProofStateView["goals"][number]["context"]): string {
  return context.length ? context.map((entry) => `<div class="context-row"><code>${entry.name}</code><span>:</span><code>${entry.type}</code></div>`).join("") : `<p class="muted">No local assumptions.</p>`;
}

function selectExercise(exercise: Exercise): void {
  currentExerciseId = exercise.id;
  state = initialTheoremState(exercise, (id) => engine.loadTheorem(id));
  statusKind = "neutral";
  statusMessage = "Real Proof Engine";
  render();
}

function renderGoals(): string {
  if (!state) return `<div class="unavailable-state"><strong>Unavailable</strong><span>${currentExercise().availabilityNote ?? "This exercise is not currently executable."}</span></div>`;
  if (state.completed) return `<div class="completed-state"><strong>Proof accepted</strong><span>Accepted by the real Kernel.</span></div>`;
  return state.goals.map((goal, index) => `<article class="goal-item ${index === 0 ? "focused" : ""}"><div class="goal-heading"><span>Goal ${index + 1}</span>${index === 0 ? "<span>focused</span>" : ""}</div><div class="goal-expression">${goal.target}</div><div class="goal-context">${renderContext(goal.context)}</div></article>`).join("");
}

function render(): void {
  const exercise = currentExercise();
  const chapter = currentChapter();
  const next = nextExercise(NATURAL_NUMBERS_LESSON, exercise.id);
  const courseComplete = NATURAL_NUMBERS_LESSON.exercises.every((item) => isCompleted(progress, item.id));
  root.innerHTML = `<div class="app-shell">
    <header class="topbar"><div><div class="brand">Prover</div><div class="tagline">Curry–Howard Interactive Proofs</div></div><span class="mode-badge">Real Proof Engine</span></header>
    <main class="workspace">
      <aside class="sidebar" aria-label="Chapter and exercise navigator">
        <div class="section-label">Course</div><h2>${NATURAL_NUMBERS_LESSON.title}</h2>
        ${NATURAL_NUMBERS_LESSON.chapters.map((item) => `<section class="chapter"><div class="chapter-title">Chapter ${item.number} · ${item.title}</div>${item.exerciseIds.map((id) => { const itemEx = NATURAL_NUMBERS_LESSON.exercises.find((x) => x.id === id)!; return `<button class="theorem-item ${exercise.id === id ? "active" : ""} ${isCompleted(progress, id) ? "completed" : ""}" data-exercise="${id}" type="button"><span class="status">${isCompleted(progress, id) ? "✓" : itemEx.number}</span><span>${itemEx.title}</span></button>`; }).join("")}</section>`).join("")}
      </aside>
      <section class="proof-panel">
        <div class="theorem-header"><div><div class="section-label">Chapter ${chapter.number} · Exercise ${exercise.number}</div><h1>${exercise.title}</h1><p class="theorem-statement"><code>${exercise.statement}</code></p></div></div>
        <section class="card"><div class="card-title">Prerequisites</div><div>${exercise.prerequisiteIds.length ? exercise.prerequisiteIds.join(" → ") : "None"}</div></section>
        <section class="card"><div class="card-title">Suggested path</div><code>${exercise.tacticHint}</code></section>
        ${state ? `<section class="card goal-card"><div class="card-title">Focused Goal</div><div class="goal-expression">${state.goals[0]?.target ?? "No goals"}</div></section><section class="card"><div class="card-title">Context</div>${renderContext(state.goals[0]?.context ?? [])}</section><section class="card tactic-card"><div class="card-title">Tactic</div><input id="tactic-input" class="tactic-input" type="text" placeholder="intro, rfl, assumption, exact, apply, rewrite h, induction n" autocomplete="off" ${state.completed ? "disabled" : ""}/><button id="apply-button" class="apply-button" type="button" ${state.completed ? "disabled" : ""}>Apply</button></section>` : `<section class="card unavailable-state"><strong>Unavailable</strong><span>${exercise.availabilityNote}</span></section>`}
        <section class="proof-state" aria-live="polite"><div><div class="card-title">Proof State</div><div class="state-message ${statusKind}">${statusMessage}</div></div><span class="goal-count">${state?.goals.length ?? 0} ${state?.goals.length === 1 ? "goal" : "goals"}</span></section>
        <section class="goals-list" aria-label="Proof goals">${renderGoals()}</section>
        ${state?.completed && next ? `<button id="next-button" class="next-button" type="button">Next exercise →</button>` : courseComplete ? `<div class="completed-state"><strong>Course complete</strong><span>All ten exercises have Kernel-backed accepted proofs.</span></div>` : ""}
      </section>
    </main></div>`;

  root.querySelectorAll<HTMLButtonElement>("[data-exercise]").forEach((button) => button.addEventListener("click", () => { const selected = NATURAL_NUMBERS_LESSON.exercises.find((item) => item.id === button.dataset.exercise); if (selected) selectExercise(selected); }));
  root.querySelector<HTMLButtonElement>("#next-button")?.addEventListener("click", () => { if (next) selectExercise(next); });
  const input = root.querySelector<HTMLInputElement>("#tactic-input");
  const apply = root.querySelector<HTMLButtonElement>("#apply-button");
  const applyTactic = () => {
    if (!input || !state) return;
    const result = engine.runTactic(input.value);
    state = result.state;
    statusKind = result.kind;
    statusMessage = result.kind === "success" ? (result.message ?? "Proof state updated") : `Proof rejected: ${result.message}`;
    if (result.kind === "success") progress = recordProofResult(progress, exercise, result);
    render();
  };
  apply?.addEventListener("click", applyTactic);
  input?.addEventListener("keydown", (event) => { if (event.key === "Enter") applyTactic(); });
}

render();
