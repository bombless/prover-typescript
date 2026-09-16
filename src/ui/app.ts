import "./styles.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("UI root element #app was not found");
}

app.innerHTML = `
  <div class="app-shell">
    <header class="topbar">
      <div>
        <div class="brand">Prover</div>
        <div class="tagline">Curry–Howard Interactive Proofs</div>
      </div>
      <a class="github-link" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
    </header>

    <main class="workspace">
      <aside class="sidebar" aria-label="Lesson and theorem navigator">
        <div class="section-label">Lessons</div>
        <h2>Natural Numbers</h2>
        <nav>
          <button class="theorem-item completed" type="button">
            <span class="status">✓</span><span>01&nbsp; Zero</span>
          </button>
          <button class="theorem-item active" type="button">
            <span class="status">→</span><span>02&nbsp; Addition</span>
          </button>
          <button class="theorem-item" type="button">
            <span class="status">03</span><span>Add one</span>
          </button>
          <button class="theorem-item" type="button">
            <span class="status">04</span><span>Multiplication</span>
          </button>
        </nav>
      </aside>

      <section class="proof-panel">
        <div class="theorem-header">
          <div>
            <div class="section-label">Theorem</div>
            <h1>add_zero</h1>
          </div>
          <span class="mode-badge">UI-1 Web Shell</span>
        </div>

        <section class="card goal-card">
          <div class="card-title">Goal</div>
          <div class="goal-expression">n + 0 = n</div>
        </section>

        <section class="card">
          <div class="card-title">Context</div>
          <div class="context-row"><code>n</code><span>:</span><code>Nat</code></div>
        </section>

        <section class="card tactic-card">
          <div class="card-title">Tactic</div>
          <label class="sr-only" for="tactic-input">Tactic input</label>
          <input id="tactic-input" class="tactic-input" type="text" placeholder="intro, exact, rfl, assumption, apply" autocomplete="off" />
          <button class="apply-button" type="button" disabled>Apply</button>
        </section>

        <section class="proof-state" aria-live="polite">
          <div>
            <div class="card-title">Proof State</div>
            <p class="muted">The proof engine will connect here in a later milestone.</p>
          </div>
          <span class="goal-count">1 goal</span>
        </section>
      </section>
    </main>
  </div>
`;
