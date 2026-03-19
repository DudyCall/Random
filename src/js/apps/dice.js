export function renderDiceApp(el) {
  el.innerHTML = `
    <div class="dice-app" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;">
      <div class="dice-display" style="font-size:80px;line-height:1;user-select:none;">🎲</div>
      <div class="dice-result" style="font-size:36px;font-weight:700;min-height:44px;"></div>
      <div style="display:flex;gap:8px;align-items:center;">
        <label style="font-size:13px;">Dice:
          <select class="dice-type" style="font-size:13px;padding:2px 4px;">
            <option value="6" selected>d6</option>
            <option value="4">d4</option>
            <option value="8">d8</option>
            <option value="10">d10</option>
            <option value="12">d12</option>
            <option value="20">d20</option>
            <option value="100">d100</option>
          </select>
        </label>
        <label style="font-size:13px;">Count:
          <input type="number" class="dice-count" min="1" max="10" value="1"
            style="width:48px;font-size:13px;padding:2px 4px;" />
        </label>
      </div>
      <button class="dice-roll-btn" style="padding:8px 24px;font-size:16px;cursor:pointer;border-radius:6px;border:1px solid #888;">
        🎲 Roll
      </button>
      <div class="dice-history" style="font-size:12px;color:#666;max-height:60px;overflow-y:auto;text-align:center;"></div>
    </div>
  `;

  const display  = el.querySelector(".dice-display");
  const result   = el.querySelector(".dice-result");
  const typeSel  = el.querySelector(".dice-type");
  const countInp = el.querySelector(".dice-count");
  const rollBtn  = el.querySelector(".dice-roll-btn");
  const history  = el.querySelector(".dice-history");

  const dieFaces = ["⚀","⚁","⚂","⚃","⚄","⚅"];

  rollBtn.addEventListener("click", () => {
    const sides = parseInt(typeSel.value, 10);
    const count = Math.min(Math.max(parseInt(countInp.value, 10) || 1, 1), 10);
    const rolls = [];
    for (let i = 0; i < count; i++) {
      rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    const total = rolls.reduce((a, b) => a + b, 0);

    if (sides === 6 && count === 1) {
      display.textContent = dieFaces[rolls[0] - 1];
    } else {
      display.textContent = "🎲";
    }
    result.textContent = count === 1 ? rolls[0] : `${rolls.join(" + ")} = ${total}`;
    history.textContent = (history.textContent ? history.textContent + " | " : "") + `[${rolls.join(",")}]`;
  });

  [typeSel, countInp].forEach((inp) => inp.addEventListener("mousedown", (e) => e.stopPropagation()));
}
