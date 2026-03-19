export function renderCoinApp(el) {
  el.innerHTML = `
    <div class="coin-app" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;">
      <div class="coin-display" style="font-size:80px;line-height:1;user-select:none;">🪙</div>
      <div class="coin-result" style="font-size:28px;font-weight:700;min-height:36px;"></div>
      <button class="coin-flip-btn" style="padding:8px 24px;font-size:16px;cursor:pointer;border-radius:6px;border:1px solid #888;">
        🪙 Flip
      </button>
      <div class="coin-stats" style="font-size:12px;color:#666;"></div>
    </div>
  `;

  const display = el.querySelector(".coin-display");
  const result  = el.querySelector(".coin-result");
  const flipBtn = el.querySelector(".coin-flip-btn");
  const stats   = el.querySelector(".coin-stats");

  let heads = 0;
  let tails = 0;

  flipBtn.addEventListener("click", () => {
    const isHeads = Math.random() < 0.5;
    if (isHeads) heads++; else tails++;
    display.textContent = isHeads ? "🟡" : "⚪";
    result.textContent = isHeads ? "Heads!" : "Tails!";
    stats.textContent = `Heads: ${heads}  |  Tails: ${tails}`;
  });
}
