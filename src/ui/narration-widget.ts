import { narrateStep } from "./narrator";

type ProofStateLike = { goals: Array<{ target: string }> } | null;
const STYLE_ID = "proof-narration-widget-style";
const PANEL_ID = "proof-narration-widget";

function escapeHtml(text: string): string { return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;"); }
function readHistory(): string[] { return [...document.querySelectorAll<HTMLElement>(".tactic-history li code")].map((node) => node.textContent?.trim() ?? "").filter(Boolean); }
function readGoal(): string { return document.querySelector<HTMLElement>(".goal-item.focused .goal-expression")?.textContent?.trim() ?? document.querySelector<HTMLElement>(".goal-expression")?.textContent?.trim() ?? "the current goal"; }

function ensureStyle(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `.proof-narration-widget{margin-top:14px;border:1px solid #d9dee7;border-radius:12px;background:linear-gradient(145deg,#fff,#f7f9fc);overflow:hidden}.proof-narration-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:15px 18px;border-bottom:1px solid #e3e7ed}.proof-narration-title{font-size:13px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:#465269}.proof-narration-badge{font-size:11px;color:#687386;padding:4px 7px;border:1px solid #d8dee7;border-radius:999px;background:#fff}.proof-narration-body{padding:4px 18px 15px}.proof-narration-step{position:relative;padding:13px 0 13px 34px;border-bottom:1px solid #e8ebef}.proof-narration-step:last-child{border-bottom:0}.proof-narration-number{position:absolute;left:0;top:14px;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:#273449;color:#fff;font-size:11px;font-weight:800}.proof-narration-step h4{margin:0 0 4px;font-size:14px;color:#273449}.proof-narration-step p{margin:0;color:#647084;font-size:13px;line-height:1.55}.proof-narration-empty{padding:16px 0 5px;color:#7a8494;font-size:13px;line-height:1.5}.proof-narration-footer{padding:9px 18px;background:#f1f4f8;color:#7a8494;font-size:11px}`;
  document.head.appendChild(style);
}

function render(): void {
  const app = document.querySelector<HTMLElement>("#app");
  if (!app) return;
  ensureStyle();
  document.getElementById(PANEL_ID)?.remove();
  const history = readHistory();
  const finalState: ProofStateLike = { goals: [{ target: readGoal() }] };
  const steps = history.map((tactic) => narrateStep(tactic, null, finalState));
  const panel = document.createElement("section");
  panel.id = PANEL_ID;
  panel.className = "proof-narration-widget";
  panel.setAttribute("aria-label", "English proof explanation");
  panel.innerHTML = `<div class="proof-narration-head"><span class="proof-narration-title">Proof in English</span><span class="proof-narration-badge">Deterministic narration</span></div><div class="proof-narration-body">${steps.length ? steps.map((step,index) => `<article class="proof-narration-step"><span class="proof-narration-number">${index+1}</span><h4>${escapeHtml(step.title)}</h4><p><code>${escapeHtml(step.tactic)}</code> — ${escapeHtml(step.explanation)}</p></article>`).join("") : `<div class="proof-narration-empty">Apply a tactic above. Each accepted proof step will be translated into a short English explanation here.</div>`}</div><div class="proof-narration-footer">The explanation follows the visible proof trace; it does not invent proof steps.</div>`;
  app.querySelector<HTMLElement>(".proof-panel")?.appendChild(panel);
}

let scheduled = false;
const observer = new MutationObserver(() => {
  if (scheduled) return;
  scheduled = true;
  queueMicrotask(() => {
    scheduled = false;
    observer.disconnect();
    render();
    const app = document.querySelector("#app");
    if (app) observer.observe(app, { childList: true, subtree: true });
  });
});

function start(): void {
  const app = document.querySelector("#app");
  if (!app) return;
  observer.observe(app, { childList: true, subtree: true });
  render();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
