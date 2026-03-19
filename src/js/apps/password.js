export function renderPasswordApp(el) {
  el.innerHTML = `
    <div class="password-app" style="display:flex;flex-direction:column;height:100%;padding:12px;gap:12px;">
      <div style="display:flex;gap:8px;align-items:center;">
        <input class="pw-output" type="text" readonly
          style="flex:1;padding:8px;font-family:monospace;font-size:16px;border:1px solid #aaa;border-radius:4px;" />
        <button class="pw-copy" title="Copy" style="font-size:18px;cursor:pointer;border:1px solid #aaa;border-radius:4px;padding:4px 10px;">📋</button>
      </div>
      <div style="display:flex;gap:12px;align-items:center;font-size:13px;">
        <label>Length: <input type="range" class="pw-length" min="4" max="64" value="16" />
          <span class="pw-length-val">16</span>
        </label>
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:13px;">
        <label><input type="checkbox" class="pw-upper" checked /> A-Z</label>
        <label><input type="checkbox" class="pw-lower" checked /> a-z</label>
        <label><input type="checkbox" class="pw-digits" checked /> 0-9</label>
        <label><input type="checkbox" class="pw-symbols" checked /> !@#$</label>
      </div>
      <button class="pw-generate" style="padding:8px;font-size:14px;cursor:pointer;border-radius:6px;border:1px solid #888;">
        🔑 Generate Password
      </button>
      <div class="pw-strength" style="font-size:12px;color:#666;"></div>
    </div>
  `;

  const output    = el.querySelector(".pw-output");
  const copyBtn   = el.querySelector(".pw-copy");
  const lengthInp = el.querySelector(".pw-length");
  const lengthVal = el.querySelector(".pw-length-val");
  const upper     = el.querySelector(".pw-upper");
  const lower     = el.querySelector(".pw-lower");
  const digits    = el.querySelector(".pw-digits");
  const symbols   = el.querySelector(".pw-symbols");
  const genBtn    = el.querySelector(".pw-generate");
  const strength  = el.querySelector(".pw-strength");

  const charSets = {
    upper:   "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower:   "abcdefghijklmnopqrstuvwxyz",
    digits:  "0123456789",
    symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?",
  };

  lengthInp.addEventListener("input", () => {
    lengthVal.textContent = lengthInp.value;
  });

  function generate() {
    let pool = "";
    if (upper.checked)   pool += charSets.upper;
    if (lower.checked)   pool += charSets.lower;
    if (digits.checked)  pool += charSets.digits;
    if (symbols.checked) pool += charSets.symbols;
    if (!pool) { output.value = ""; strength.textContent = "Select at least one character set."; return; }

    const len = parseInt(lengthInp.value, 10);
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    let pw = "";
    for (let i = 0; i < len; i++) {
      pw += pool[arr[i] % pool.length];
    }
    output.value = pw;

    const bits = Math.floor(len * Math.log2(pool.length));
    strength.textContent = `Strength: ~${bits} bits of entropy`;
  }

  genBtn.addEventListener("click", generate);

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(output.value);
    copyBtn.textContent = "✅";
    setTimeout(() => (copyBtn.textContent = "📋"), 1500);
  });

  output.addEventListener("mousedown", (e) => e.stopPropagation());
  generate();
}
