export function addTaskbarItem(id, app, onClick) {
  const $taskbarItems = document.getElementById("taskbar-items");
  const el = document.createElement("div");
  el.className = "taskbar-item active";
  el.dataset.winId = id;
  el.innerHTML = `<div class="tb-icon" style="background:none;font-size:14px;display:flex;align-items:center;justify-content:center;">${app.icon}</div><span>${app.name}</span>`;
  el.addEventListener("click", onClick);
  $taskbarItems.appendChild(el);
}

export function removeTaskbarItem(id) {
  const $taskbarItems = document.getElementById("taskbar-items");
  const el = $taskbarItems.querySelector(`[data-win-id="${id}"]`);
  if (el) el.remove();
}
