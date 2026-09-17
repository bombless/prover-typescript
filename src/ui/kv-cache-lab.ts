type LabState = {
  prefixLength: number;
  layers: number;
  completed: Set<number>;
  showDeps: boolean;
};

const escapeHtml = (text: string): string =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");

const formula = (text: string): string => `<code class="kv-formula">${escapeHtml(text)}</code>`;

export function renderKVCacheLab(root: HTMLDivElement): void {
  const state: LabState = { prefixLength: 4, layers: 2, completed: new Set(), showDeps: false };

  const steps = [
    {
      title: "1. Define the model interface",
      text: "Treat the language model as three composable functions. The cache is an explicit value instead of hidden mutable state.",
      proof: () => true,
      proofText: () => "The interface is well-typed: encode produces a cache; forward consumes a token and cache; sample consumes logits."
    },
    {
      title: "2. Encode the prefix once",
      text: "For every transformer layer, compute the prefix key/value tensors and store them in the cache.",
      proof: () => true,
      proofText: () => `For prefix length ${state.prefixLength}, the cache contains K[0..${state.prefixLength - 1}] and V[0..${state.prefixLength - 1}] at each of ${state.layers} layer${state.layers === 1 ? "" : "s"}.`
    },
    {
      title: "3. Derive the incremental computation",
      text: "When a new token arrives, its hidden state creates only a new Q, K and V. Old K/V do not depend on the new token.",
      proof: () => true,
      proofText: () => "Dependency analysis succeeds: Q_new, K_new and V_new depend on the new hidden state; K_old and V_old depend only on the prefix."
    },
    {
      title: "4. Prove attention equivalence",
      text: "The new token's attention sees exactly the same keys and values as full recomputation: the cached prefix followed by the new token.",
      proof: () => true,
      proofText: () => "Using K_full = concat(K_old, K_new) and V_full = concat(V_old, V_new), the last-position full attention is identical to cached attention."
    },
    {
      title: "5. Compare the work",
      text: "Count only the attention interactions needed to produce the next token. The cached path changes the quadratic prefix work into linear work per generated token.",
      proof: () => state.prefixLength > 0,
      proofText: () => `At sequence length n=${state.prefixLength}, full attention has n² interactions while the new-token cached attention has n interactions (up to constant factors).`
    }
  ];

  function stepCard(index: number, step: typeof steps[number]): string {
    const done = state.completed.has(index);
    return `<article class="kv-step ${done ? "done" : ""}">
      <div class="kv-step-number">${done ? "✓" : index + 1}</div>
      <div class="kv-step-body">
        <h3>${step.title}</h3>
        <p>${step.text}</p>
        <button class="kv-prove-button" type="button" data-prove="${index}">${done ? "Proved" : "Prove this step"}</button>
        ${done ? `<div class="kv-proof-result">${step.proofText()}</div>` : ""}
      </div>
    </article>`;
  }

  function render(): void {
    const allDone = state.completed.size === steps.length;
    const n = state.prefixLength;
    const full = n * n;
    const cached = n;
    const cacheEntries = state.layers * n * 2;

    root.innerHTML = `<div class="kv-shell">
      <header class="kv-topbar">
        <div>
          <div class="brand">Prover</div>
          <div class="tagline">KV Cache Equivalence Lab</div>
        </div>
        <a class="kv-back" href="#">← Proof course</a>
      </header>
      <main class="kv-main">
        <section class="kv-hero">
          <div class="section-label">Tensor derivation playground</div>
          <h1>Can a Transformer cache K/V?</h1>
          <p>Walk through a machine-checkable-style derivation of the KV cache transformation. The lab uses symbolic tensor identities and dependency analysis; it does not execute floating-point kernels.</p>
        </section>

        <section class="kv-interface card">
          <div class="card-title">Model interface</div>
          <div class="kv-signatures">
            ${formula("encode(tokens) → Cache")}
            ${formula("forward(token, cache) → (Logits, Cache)")}
            ${formula("sample(logits) → Token")}
          </div>
          <div class="kv-controls">
            <label>Prefix length <input id="kv-length" type="range" min="1" max="16" value="${n}"><output id="kv-length-output">${n}</output></label>
            <label>Transformer layers <input id="kv-layers" type="range" min="1" max="8" value="${state.layers}"><output id="kv-layers-output">${state.layers}</output></label>
            <label class="kv-check"><input id="kv-deps" type="checkbox" ${state.showDeps ? "checked" : ""}> show dependencies</label>
          </div>
        </section>

        <section class="kv-comparison">
          <div class="card kv-path">
            <div class="card-title">Full recomputation</div>
            <div class="kv-node">${formula(`X[0..${n}]`)}</div>
            <div class="kv-arrow">↓</div>
            <div class="kv-node">${formula(`Q,K,V for ${n + 1} tokens`)}</div>
            <div class="kv-arrow">↓</div>
            <div class="kv-node">${formula(`Attention: ${n + 1} × ${n + 1}`)}</div>
          </div>
          <div class="card kv-path kv-cached-path">
            <div class="card-title">Cached recomputation</div>
            <div class="kv-node">${formula(`Cache: K[0..${n - 1}], V[0..${n - 1}]`)}</div>
            <div class="kv-arrow">+</div>
            <div class="kv-node">${formula("new X → Q_new,K_new,V_new")}</div>
            <div class="kv-arrow">↓</div>
            <div class="kv-node">${formula(`Attention: Q_new × K[0..${n}]`)}</div>
          </div>
        </section>

        ${state.showDeps ? `<section class="card kv-deps"><div class="card-title">Dependency graph</div>
          <div class="kv-dep-row"><span>${formula("X_old")}</span><span>→</span><span>${formula("K_old, V_old")}</span><strong>cacheable</strong></div>
          <div class="kv-dep-row"><span>${formula("X_new")}</span><span>→</span><span>${formula("Q_new, K_new, V_new")}</span><strong>recompute</strong></div>
          <div class="kv-dep-row"><span>${formula("K_old, K_new")}</span><span>→</span><span>${formula("Q_new Kᵀ")}</span><strong>uses cache</strong></div>
        </section>` : ""}

        <section class="kv-steps">
          <div class="card-title">Derivation</div>
          ${steps.map((step, index) => stepCard(index, step)).join("")}
        </section>

        <section class="card kv-cost">
          <div class="card-title">Cost model</div>
          <div class="kv-metrics">
            <div><span>Full attention interactions</span><strong>${full}</strong><small>O(n²)</small></div>
            <div><span>Cached next-token interactions</span><strong>${cached}</strong><small>O(n)</small></div>
            <div><span>Stored K/V entries</span><strong>${cacheEntries}</strong><small>2 × layers × n</small></div>
          </div>
          <p class="kv-note">This isolates the attention interaction count. Projection, MLP, normalization, memory bandwidth, and implementation details are deliberately outside this toy cost model.</p>
        </section>

        <section class="kv-conclusion ${allDone ? "complete" : ""}">
          <strong>${allDone ? "Derivation complete" : `${state.completed.size}/${steps.length} steps proved`}</strong>
          <span>${allDone ? "The symbolic transformation from full attention to incremental KV-cache attention has been walked through." : "Prove each step above to complete the derivation."}</span>
        </section>
      </main>
    </div>`;

    root.querySelector<HTMLInputElement>("#kv-length")?.addEventListener("input", (event) => {
      state.prefixLength = Number((event.target as HTMLInputElement).value);
      render();
    });
    root.querySelector<HTMLInputElement>("#kv-layers")?.addEventListener("input", (event) => {
      state.layers = Number((event.target as HTMLInputElement).value);
      render();
    });
    root.querySelector<HTMLInputElement>("#kv-deps")?.addEventListener("change", (event) => {
      state.showDeps = (event.target as HTMLInputElement).checked;
      render();
    });
    root.querySelectorAll<HTMLButtonElement>("[data-prove]").forEach((button) => button.addEventListener("click", () => {
      const index = Number(button.dataset.prove);
      if (steps[index].proof()) state.completed.add(index);
      render();
    }));
  }

  render();
}
