const $ = (id) => document.getElementById(id);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

// ---------- 1. MINI SCREENS (illustrations, not real screenshots) ----------
let cal = "";
for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) cal += `<rect class="f" x="${16 + c * 21}" y="${34 + r * 21}" width="16" height="16" rx="4"/>`;
const row = (y, ok) => `<rect class="f" x="16" y="${y}" width="216" height="36" rx="8"/><rect class="l" x="28" y="${y + 10}" width="150" height="5" rx="2"/><rect class="l" x="28" y="${y + 22}" width="96" height="5" rx="2"/>` +
  (ok ? `<circle class="t" cx="254" cy="${y + 18}" r="14"/><path d="M247 ${y + 18}l5 5 9-10" fill="none" stroke="#052B2A" stroke-width="3" stroke-linecap="round"/>`
      : `<circle cx="254" cy="${y + 18}" r="14" fill="#F87171"/><path d="M254 ${y + 11}v8M254 ${y + 24}v.5" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`);
const pk = (d, b) => `<circle r="4" fill="#2DD4BF"><animateMotion dur="2.4s" begin="${b}s" repeatCount="indefinite" path="${d}"/></circle>`;
const ag = (x, k, w) => `<g class="n ${k}"><rect class="f" x="${x}" y="112" width="60" height="30" rx="9"/><text x="${x + 30}" y="131" text-anchor="middle">${w}</text></g>`;
const SCR = {
  "credit-risk-paper": `<svg viewBox="0 0 300 160"><path d="M150 46L44 112M150 46L115 112M150 46L186 112M150 46L257 112" stroke="#1D2D47" stroke-width="2" fill="none"/>${pk("M150 46L44 112", 0)}${pk("M150 46L115 112", .6)}${pk("M150 46L186 112", 1.2)}${pk("M150 46L257 112", 1.8)}<rect class="t" x="100" y="18" width="100" height="28" rx="9"/><text class="on" x="150" y="36" text-anchor="middle">Orchestrator</text>${ag(14, "n1", "Data")}${ag(85, "n2", "Risk")}${ag(156, "n3", "Policy")}${ag(227, "n4", "Explain")}</svg>`,
  "fake-review": `<svg viewBox="0 0 300 160">${row(14, 1)}${row(58, 0)}${row(102, 1)}<rect class="t scan" x="10" y="8" width="280" height="3" rx="1"/></svg>`,
  "job-security": `<svg viewBox="0 0 300 160"><rect class="l" x="16" y="140" width="268" height="2"/><rect class="gb" x="28" y="90" width="34" height="50" rx="5"/><rect class="gb" x="78" y="56" width="34" height="84" rx="5"/><rect class="gb" x="128" y="78" width="34" height="62" rx="5"/><rect class="gb" x="178" y="40" width="34" height="100" rx="5"/><rect class="gb" x="228" y="68" width="34" height="72" rx="5"/><path class="draw" d="M45 82L95 48L145 70L195 32L245 60" fill="none" stroke="#2DD4BF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  "healthcare-portal": `<svg viewBox="0 0 300 160"><rect class="l" x="16" y="14" width="90" height="8" rx="4"/>${cal}<rect class="t hop" x="16" y="34" width="16" height="16" rx="4"/><rect class="f" x="182" y="14" width="102" height="70" rx="9"/><circle class="l" cx="233" cy="44" r="14"/><path class="l" d="M209 84q24-26 48 0z"/><circle class="live" cx="272" cy="26" r="3.5" fill="#F87171"/><rect class="t" x="182" y="96" width="102" height="24" rx="12"/><text class="on" x="233" y="112" text-anchor="middle">Book</text></svg>`,
  "quiz-arena": `<svg viewBox="0 0 300 160"><rect class="l" x="20" y="16" width="260" height="14" rx="4"/><rect class="l" x="20" y="36" width="170" height="8" rx="4"/><rect class="f o1" x="20" y="58" width="124" height="32" rx="9"/><text x="34" y="78">A</text><rect class="f o2" x="156" y="58" width="124" height="32" rx="9"/><text x="170" y="78">B</text><rect class="f o3" x="20" y="98" width="124" height="32" rx="9"/><text x="34" y="118">C</text><rect class="f o4" x="156" y="98" width="124" height="32" rx="9"/><text x="170" y="118">D</text><rect class="l" x="20" y="142" width="260" height="6" rx="3"/><rect class="t prog" x="20" y="142" width="260" height="6" rx="3"/></svg>`
};

// ---------- 2. PROJECT DATA ----------
const P = [
  { id: "credit-risk-paper", n: "Credit-Risk Agents", k: "Research paper",
    t: "A Multi-Agent AI Framework for Explainable Credit-Risk Assessment",
    lead: "Five AI agents that validate data, predict risk, apply policy rules and explain every result.",
    tags: ["Agentic AI", "LangChain", "Llama 3.2", "XGBoost", "SHAP", "Explainable AI"],
    s: [
      { t: "The problem", l: ["Credit-risk assessment in a regulated lending environment is more than prediction. Records must be checked for completeness, review rules applied, and the score justified.", "The paper asks how an Agentic AI framework can bring ML-based prediction, data reconciliation, policy-based review and SHAP-based explainability into one coordinated workflow."] },
      { t: "The five agents", l: ["<b>Data Reconciliation.</b> Checks that Bank and CIBIL records exist, counts records, and looks for duplicates and missing values.", "<b>Credit Risk Assessment.</b> Reports the XGBoost prediction: a risk class from P1 to P4, a confidence value and class probabilities.", "<b>Policy and Compliance.</b> Applies project-defined rules that map each class to a risk category, raise review flags and suggest an action.", "<b>Explainability.</b> Turns SHAP feature contributions into a plain-language explanation.", "<b>Orchestrator.</b> Combines everything into one structured decision-support result."] },
      { t: "How it’s built", o: 1, l: ["<b>Data.</b> The Leading Indian Bank and CIBIL Real World Dataset: a Bank dataset (26 features) and a CIBIL dataset (62 features) merged on PROSPECTID into 51,336 records. After preprocessing, 85 features remained.", "<b>Target.</b> Approved_Flag with four classes, P1 to P4. The classes are highly imbalanced, with P2 holding 32,199 records.", "<b>Models.</b> XGBoost was chosen after comparison with Decision Tree and Random Forest on a stratified train-test split, trained on the top 30 features.", "<b>Agents.</b> Built with LangChain, all using Llama 3.2 run locally through Ollama.", "<b>Design choice.</b> Record lookup, model inference, SHAP computation and rule application are Python tools. The agents interpret and report tool output, so the language model never generates the numbers."] },
      { t: "Results", l: ["<b>With Credit_Score:</b> XGBoost reached 99.48% accuracy (weighted F1 99.48%, macro F1 98.98%), ahead of Decision Tree (99.32%) and Random Forest (99.14%).", "<b>Without Credit_Score:</b> XGBoost fell to 80.54% accuracy (weighted F1 79.34%), about 19 points lower, showing the risk classes depend mainly on one variable.", "<b>Data Reconciliation Agent:</b> 100% accuracy across 100 customers.", "<b>Policy and Compliance Agent:</b> 100% agreement with the rule output across 20 cases.", "<b>Explainability Agent:</b> 96.00% mean top-5 overlap with SHAP features and 90.00% agreement on feature direction, across 20 customers."] },
      { t: "Limitations", l: ["A proof of concept, not a system ready for real lending.", "The policy rules are defined for this study, not official RBI, CIBIL or bank regulations.", "The perfect reconciliation and policy scores reflect their rule-based design. The reconciliation agent does not compare attribute values between Bank and CIBIL data.", "Agents run in a fixed sequence, so the Orchestrator does not decide which agent to call.", "Evaluation used small samples and one dataset, and tests consistency with SHAP, not whether explanations are faithful or useful to people."] },
    ] }, 
  { id: "fake-review", n: "Fake Review Detector", k: "Machine learning", t: "Fake review detection",
    lead: "A classifier that tells genuine hotel reviews from deceptive ones.",
    tags: ["Machine learning", "NLP", "TF-IDF", "Naive Bayes", "Python"],
    s: [
      { t: "Approach", o: 1, l: ["<b>Data.</b> Used the Deceptive Opinion Spam Corpus. Removed duplicates and inconsistencies, leaving 1,533 records.", "<b>Text to numbers.</b> Converted reviews into numerical form with TF-IDF vectorisation.", "<b>Writing-pattern features.</b> Engineered text length, word count, character count, average word length, exclamation marks and uppercase ratio.", "<b>Model comparison.</b> Compared Naive Bayes, Decision Tree, Random Forest, KNN and SVM.", "<b>Final model.</b> Selected Naive Bayes."] },
      { t: "Why it matters", l: ["The project shows how machine learning and text analytics can help identify misleading online reviews."] }
    ] },
  { id: "job-security", n: "AI & Job Security", k: "Statistics", t: "AI and job security perception",
    lead: "A statistical study of how age groups perceive job security as AI spreads.",
    tags: ["Statistics", "ANOVA", "Chi-square", "Regression", "Kaggle data"],
    s: [
      { t: "Approach", o: 1, l: ["<b>Question.</b> How does growing AI adoption influence perceptions of employment stability, and does it vary by age group?", "<b>Data.</b> A Kaggle dataset on AI and employment-related views.", "<b>Exploration.</b> Exploratory data analysis to find age-related differences and patterns.", "<b>Testing.</b> ANOVA, Chi-square tests and regression analysis, chosen to match each research objective.", "<b>Goal.</b> Draw statistical insights into how perceptions of AI-driven employment change vary across demographic groups."] }
    ] },
  { id: "healthcare-portal", n: "Healthcare Portal", k: "Web app", t: "Healthcare appointment and teleconsultation portal",
    lead: "A web platform that connects patients and doctors.",
    tags: ["Python", "Django", "HTML", "CSS", "JavaScript"],
    s: [
      { t: "What it includes", l: ["User registration and authentication", "Doctor information management", "Appointment booking", "Doctor availability management", "Teleconsultation for remote access to healthcare"] },
      { t: "How it’s built", l: ["Django handles the backend logic, database operations and application functionality. The frontend uses HTML, CSS and JavaScript. It replaces manual appointment scheduling with a digital workflow."] }
    ] },
  { id: "quiz-arena", n: "AI Quiz Arena", k: "Interactive app", t: "AI Quiz Arena",
    lead: "A Streamlit quiz app for learning AI concepts.",
    tags: ["Python", "Streamlit", "API integration"],
    s: [
      { t: "What it includes", l: ["50+ questions on AI foundations, intelligent agents, rational agents, problem-solving and state-space search", "Search topics: BFS, DFS, Iterative Deepening, Hill Climbing, heuristic search, Best First Search and Constraint Satisfaction Problems", "Seven question formats: MCQ, true/false, assertion-reason, fill in the blanks, match the following, scenario-based and problem-solving", "Difficulty selection, interactive navigation and scoring", "A modern dark-themed gaming dashboard interface", "Explored API integration for dynamic question generation and explanations"] },
      { t: "Why it matters", l: ["The goal was to make AI learning more interactive, application-oriented and engaging."] }
    ] }
];

// ---------- 3. STACKED PROJECT CARDS ----------
$("stack").innerHTML = P.map((p, i) => `
  <article class="pcard" style="--i:${i}" data-i="${i}" tabindex="0" role="button" aria-label="Open ${p.n}">
    <div>
      <div class="num">${String(i + 1).padStart(2, "0")}</div>
      <span class="kind">${p.k}</span>
      <h3>${p.n}</h3>
      <p>${p.lead}</p>
      <span class="go">Open case file</span>
    </div>
    <div class="scr"><div class="chr"><i></i><i></i><i></i></div>${SCR[p.id]}</div>
  </article>`).join("");

$("stack").addEventListener("pointermove", (e) => {
  const c = e.target.closest(".pcard");
  if (!c) return;
  const r = c.getBoundingClientRect();
  c.style.setProperty("--mx", e.clientX - r.left + "px");
  c.style.setProperty("--my", e.clientY - r.top + "px");
});

// ---------- 4. CASE-FILE DIALOG ----------
const dlg = $("dlg");
function openCase(i) {
  const p = P[i];
  dlg.innerHTML = `<div class="in"><button class="x" aria-label="Close">✕</button>
    <span class="kind">${p.k}</span><h2>${p.t}</h2><p class="lead">${p.lead}</p>
    <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
    <div class="tabs" role="tablist">${p.s.map((s, j) => `<button role="tab" data-j="${j}">${s.t}</button>`).join("")}</div>
    <div class="pan"></div></div>`;
  const pan = dlg.querySelector(".pan");
  const show = (j) => {
    const s = p.s[j], tag = s.o ? "ol" : "ul";
    pan.innerHTML = `<${tag}>${s.l.map((x) => `<li>${x}</li>`).join("")}</${tag}>`;
    dlg.querySelectorAll("[role=tab]").forEach((b, k) => b.setAttribute("aria-selected", k === j));
  };
  show(0);
  dlg.onclick = (e) => {
    const b = e.target.closest("[role=tab]");
    if (b) show(+b.dataset.j);
    if (e.target.closest(".x") || e.target === dlg) dlg.close();
  };
  dlg.onclose = () => (document.body.style.overflow = "");
  document.body.style.overflow = "hidden";
  dlg.showModal();
}
$("stack").addEventListener("click", (e) => { const c = e.target.closest(".pcard"); if (c) openCase(+c.dataset.i); });
$("stack").addEventListener("keydown", (e) => {
  const c = e.target.closest(".pcard");
  if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openCase(+c.dataset.i); }
});

// ---------- 5. HERO: PARTICLE NAME ----------
const hero = $("hero"), cv = $("cv"), ctx = cv.getContext("2d");
let dots = [], W = 0, H = 0, mouse = { x: -999, y: -999 }, onScreen = true;
let sz = 3;   // size of each dot

function build() {
  const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
  W = Math.floor(r.width); H = Math.floor(r.height);
  cv.width = W * d; cv.height = H * d;
  ctx.setTransform(d, 0, 0, d, 0, 0);

  // fit the name into the space above the text at the bottom of the hero
  const lowH = hero.querySelector(".low").offsetHeight;
  const room = H - lowH - 100 - 24;
  const fs = Math.max(56, Math.min(W / 4.6, room / 1.95));
  const pad = Math.max(20, (W - 1100) / 2), y1 = 96 + fs / 2;

  // draw the name on a hidden canvas, then turn its pixels into particles
  const o = document.createElement("canvas"); o.width = W; o.height = H;
  const q = o.getContext("2d");
  q.font = `800 ${fs}px Sora, sans-serif`; q.textBaseline = "middle"; q.fillStyle = "#fff";
  q.fillText("SONAL", pad, y1); q.fillText("SHAW.", pad, y1 + fs * 0.92);

  const px = q.getImageData(0, 0, W, H).data, gap = W < 700 ? 3 : 4;
  sz = gap - 0.8;
  dots = [];
  for (let y = 0; y < H; y += gap) for (let x = 0; x < W; x += gap)
    if (px[(y * W + x) * 4 + 3] > 128)
      dots.push({ hx: x, hy: y, x: reduce ? x : Math.random() * W, y: reduce ? y : Math.random() * H, vx: 0, vy: 0 });
}

function frame() {
  if (onScreen) {
    ctx.clearRect(0, 0, W, H);
    for (const p of dots) {
      if (!reduce) {
        p.vx += (p.hx - p.x) * 0.06; p.vy += (p.hy - p.y) * 0.06;     // spring back home
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 14400) { const d = Math.sqrt(d2) || 1, f = (1 - d / 120) * 6; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
        p.vx *= 0.85; p.vy *= 0.85; p.x += p.vx; p.y += p.vy;
      }
      ctx.fillStyle = Math.abs(p.vx) + Math.abs(p.vy) > 2.5 ? "#FBBF24" : "#2DD4BF";
      ctx.fillRect(p.x, p.y, sz, sz);
    }
  }
  if (!reduce) requestAnimationFrame(frame);
}

hero.addEventListener("pointermove", (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
hero.addEventListener("click", (e) => {                                   // click = scatter
  if (e.target.closest("a,button") || reduce) return;
  const r = cv.getBoundingClientRect(), cx = e.clientX - r.left, cy = e.clientY - r.top;
  for (const p of dots) {
    const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1;
    if (d < 320) { const f = (1 - d / 320) * 26; p.vx += (dx / d) * f + (Math.random() - 0.5) * 6; p.vy += (dy / d) * f + (Math.random() - 0.5) * 6; }
  }
});
new IntersectionObserver((en) => (onScreen = en[0].isIntersecting)).observe(hero);

let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { build(); if (reduce) frame(); }, 200); });
(document.fonts ? document.fonts.load("800 100px Sora") : Promise.resolve()).catch(() => {}).then(() => { build(); frame(); });

// ---------- 6. SMALL EXTRAS ----------
// rotating word
const words = ["answers", "insights", "predictions", "stories"]; let wi = 0;
if (!reduce) setInterval(() => {
  $("rot").classList.add("sw");
  setTimeout(() => { wi = (wi + 1) % words.length; $("rot").textContent = words[wi]; $("rot").classList.remove("sw"); }, 300);
}, 2600);

// skills tape
const skills = ["Statistics", "Machine learning", "NLP", "Agentic AI", "Explainable AI", "Python", "Django", "Streamlit"];
const one = skills.map((s) => `<span>${s}</span>`).join("");
$("tape").innerHTML = one + one;

// scroll progress + reveal
addEventListener("scroll", () => {
  const h = document.documentElement;
  $("bar").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
}, { passive: true });
const io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.3 });
document.querySelectorAll(".rv").forEach((el) => io.observe(el));

// copy email
$("mail").addEventListener("click", async () => {
  const t = $("mail").textContent.trim();
  try { await navigator.clipboard.writeText(t); } catch (e) {}
  $("copied").textContent = "Copied ✓";
  setTimeout(() => ($("copied").textContent = "Click the address to copy it"), 2000);
});

// small cursor + magnetic buttons (mouse devices only)
const cur = $("cur");
if (fine) {
  let cx = 0, cy = 0, tx = 0, ty = 0;
  addEventListener("pointermove", (e) => {
    tx = e.clientX; ty = e.clientY;
    const t = e.target.closest(".pcard, .mail, a, button");
    cur.className = "cur" + (t ? (t.matches(".pcard, .mail") ? " big" : " mid") : "");
    cur.dataset.t = t && t.matches(".pcard") ? "Open" : t && t.matches(".mail") ? "Copy" : "";
    if (!reduce) document.querySelectorAll(".btn, .mail").forEach((el) => {
      const r = el.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      el.style.translate = Math.hypot(dx, dy) < 90 ? `${dx * 0.2}px ${dy * 0.2}px` : "";
    });
  });
  (function f() { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(f); })();
} else cur.remove();
