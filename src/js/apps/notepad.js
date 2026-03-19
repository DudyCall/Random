const STORAGE_KEY = "notepad-content";

export function renderNotepadApp(el) {
  const saved = localStorage.getItem(STORAGE_KEY) || "";

  el.innerHTML = `
    <div class="notepad-app" style="display:flex;flex-direction:column;height:100%;">
      <div style="padding:4px 6px;display:flex;gap:6px;border-bottom:1px solid #ccc;background:#f0f0f0;">
        <button class="notepad-save" title="Save">💾 Save</button>
        <button class="notepad-clear" title="Clear">🗑️ Clear</button>
        <span class="notepad-status" style="margin-left:auto;font-size:11px;color:#888;align-self:center;"></span>
      </div>
      <textarea class="notepad-textarea" spellcheck="true"
        style="flex:1;resize:none;border:none;padding:8px;font-family:'Segoe UI',sans-serif;font-size:13px;outline:none;"
      ></textarea>
    </div>
  `;

  const textarea = el.querySelector(".notepad-textarea");
  const saveBtn  = el.querySelector(".notepad-save");
  const clearBtn = el.querySelector(".notepad-clear");
  const status   = el.querySelector(".notepad-status");

  textarea.value = saved;

  function save() {
    localStorage.setItem(STORAGE_KEY, textarea.value);
    status.textContent = "Saved ✓";
    setTimeout(() => (status.textContent = ""), 2000);
  }

  saveBtn.addEventListener("click", save);
  clearBtn.addEventListener("click", () => {
    textarea.value = "";
    localStorage.removeItem(STORAGE_KEY);
    status.textContent = "Cleared";
    setTimeout(() => (status.textContent = ""), 2000);
  });

  // Ctrl+S shortcut
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      save();
    }
  });

  textarea.addEventListener("mousedown", (e) => e.stopPropagation());
}
