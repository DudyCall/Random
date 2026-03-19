import { openWindows, nextWindowId, nextZ } from "../core/state.js";
import { appRenderers } from "../apps/index.js";
import { addTaskbarItem, removeTaskbarItem } from "./taskbar.js";
import { makeDraggable } from "./drag.js";

export function openWindow(app) {
  // If already open, focus it
  for (const [id, win] of openWindows) {
    if (win.appId === app.id) {
      restoreWindow(id);
      focusWindow(id);
      return;
    }
  }

  const id = nextWindowId();
  const $template = document.getElementById("window-template");
  const $container = document.getElementById("windows-container");

  const clone = $template.content.cloneNode(true);
  const el = clone.querySelector(".vista-window");

  el.dataset.winId = id;
  el.querySelector(".window-title").textContent = app.name;
  const body = el.querySelector(".window-body");

  // Dispatch to app-specific renderer, or show placeholder
  const renderer = appRenderers[app.id];
  if (renderer) {
    renderer(body);
  } else {
    body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100%;opacity:0.3;font-size:48px;">
        ${app.icon}
      </div>
    `;
  }

  // Position with offset
  const offset = (id % 8) * 30;
  el.style.top  = 40 + offset + "px";
  el.style.left = 60 + offset + "px";

  // Wire controls
  el.querySelector(".minimize").addEventListener("click", () => minimizeWindow(id));
  el.querySelector(".maximize").addEventListener("click", () => toggleMaximize(id));
  el.querySelector(".close").addEventListener("click", () => closeWindow(id));

  // Focus on click
  el.addEventListener("mousedown", () => focusWindow(id));

  // Dragging
  makeDraggable(el);

  $container.appendChild(el);

  openWindows.set(id, { el, title: app.name, appId: app.id, minimized: false, maximized: false });

  addTaskbarItem(id, app, () => {
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

  focusWindow(id);
}

export function focusWindow(id) {
  const z = nextZ();
  const win = openWindows.get(id);
  if (!win) return;
  openWindows.forEach((w) => w.el.classList.remove("active"));
  win.el.classList.add("active");
  win.el.style.zIndex = z;

  document.querySelectorAll(".taskbar-item").forEach((ti) => {
    ti.classList.toggle("active", +ti.dataset.winId === id);
  });
}

export function minimizeWindow(id) {
  const win = openWindows.get(id);
  if (!win) return;
  win.minimized = true;
  win.el.classList.add("minimized");
}

export function restoreWindow(id) {
  const win = openWindows.get(id);
  if (!win) return;
  win.minimized = false;
  win.el.classList.remove("minimized");
}

export function toggleMaximize(id) {
  const win = openWindows.get(id);
  if (!win) return;
  win.maximized = !win.maximized;
  win.el.classList.toggle("maximized", win.maximized);
}

export function closeWindow(id) {
  const win = openWindows.get(id);
  if (!win) return;
  win.el.remove();
  openWindows.delete(id);
  removeTaskbarItem(id);
}
