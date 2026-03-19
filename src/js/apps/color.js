export function renderColorApp(el) {
  el.innerHTML = `
    <div class="color-app" style="display:flex;flex-direction:column;height:100%;padding:12px;gap:12px;">
      <div class="color-preview" style="flex:1;border-radius:8px;border:1px solid #aaa;min-height:80px;"></div>
      <div style="display:flex;gap:8px;align-items:center;">
        <input type="color" class="color-picker" value="#4a90d9" style="width:48px;height:36px;border:none;cursor:pointer;" />
        <input type="text" class="color-hex" value="#4A90D9" spellcheck="false"
          style="flex:1;padding:6px 8px;font-family:monospace;font-size:15px;border:1px solid #aaa;border-radius:4px;text-transform:uppercase;" />
        <button class="color-copy" title="Copy" style="font-size:18px;cursor:pointer;border:1px solid #aaa;border-radius:4px;padding:4px 10px;">📋</button>
      </div>
      <div class="color-info" style="font-size:12px;color:#555;font-family:monospace;"></div>
      <button class="color-random-btn" style="padding:8px;font-size:14px;cursor:pointer;border-radius:6px;border:1px solid #888;">
        🎨 Random Color
      </button>
    </div>
  `;

  const preview   = el.querySelector(".color-preview");
  const picker    = el.querySelector(".color-picker");
  const hexInput  = el.querySelector(".color-hex");
  const copyBtn   = el.querySelector(".color-copy");
  const info      = el.querySelector(".color-info");
  const randomBtn = el.querySelector(".color-random-btn");

  function hexToRgb(hex) {
    const n = parseInt(hex.replace("#", ""), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function update(hex) {
    hex = hex.toUpperCase();
    preview.style.background = hex;
    picker.value = hex;
    hexInput.value = hex;
    const { r, g, b } = hexToRgb(hex);
    info.textContent = `RGB: ${r}, ${g}, ${b}`;
  }

  picker.addEventListener("input", () => update(picker.value));

  hexInput.addEventListener("change", () => {
    const v = hexInput.value.trim();
    if (/^#?[0-9a-f]{6}$/i.test(v)) {
      update(v.startsWith("#") ? v : "#" + v);
    }
  });

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(hexInput.value);
    copyBtn.textContent = "✅";
    setTimeout(() => (copyBtn.textContent = "📋"), 1500);
  });

  randomBtn.addEventListener("click", () => {
    const hex = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
    update(hex);
  });

  [hexInput].forEach((inp) => inp.addEventListener("mousedown", (e) => e.stopPropagation()));
  update("#4A90D9");
}
