import { eventBus } from "../core/eventBus.js";
import { openWindows } from "../core/state.js";
import { focusWindow, minimizeWindow, restoreWindow } from "./windowManager.js";

function getTaskbarItems() {
  return document.getElementById("taskbar-items");
}

function addTaskbarItem({ id, app }) {
  const el = document.createElement("div");
  el.className = "taskbar-item active";
  el.dataset.winId = id;
  el.innerHTML = `<div class="tb-icon" style="background:none;font-size:14px;display:flex;align-items:center;justify-content:center;">${app.icon}</div><span>${app.name}</span>`;
  el.addEventListener("click", () => {
    const win = openWindows.get(id);
    if (!win) return;
    if (win.minimized) {
      restoreWindow(id);
      focusWindow(id);
    } else if (win.el.classList.contains("active")) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  });
  getTaskbarItems().appendChild(el);
}

function removeTaskbarItem({ id }) {
  const el = getTaskbarItems().querySelector(`[data-win-id="${id}"]`);
  if (el) el.remove();
}

function highlightTaskbarItem({ id }) {
  document.querySelectorAll(".taskbar-item").forEach((ti) => {
    ti.classList.toggle("active", +ti.dataset.winId === id);
  });
}

export function initTaskbar() {
  eventBus.on("window:opened", addTaskbarItem);
  eventBus.on("window:closed", removeTaskbarItem);
  eventBus.on("window:focused", highlightTaskbarItem);
}
