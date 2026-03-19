import { makeDraggable } from "./drag.js";

/**
 * Creates a single Vista-style window element (the "chrome") and returns
 * an object with the outer element, body container, and lifecycle hooks.
 *
 * This module is responsible only for the window frame — title bar, control
 * buttons, dragging, positioning — and knows nothing about the content
 * rendered inside.
 */
export function createWindow({ id, title, icon, onMinimize, onMaximize, onClose, onFocus }) {
  const $template = document.getElementById("window-template");
  const clone = $template.content.cloneNode(true);
  const el = clone.querySelector(".vista-window");

  el.dataset.winId = id;
  el.querySelector(".window-title").textContent = title;
  if (icon) {
    el.querySelector(".window-icon").textContent = icon;
  }

  // Wire chrome controls
  el.querySelector(".minimize").addEventListener("click", onMinimize);
  el.querySelector(".maximize").addEventListener("click", onMaximize);
  el.querySelector(".close").addEventListener("click", onClose);

  // Focus on any click inside the window
  el.addEventListener("mousedown", onFocus);

  // Titlebar dragging
  makeDraggable(el);

  // Cascade position based on id
  const offset = (id % 8) * 30;
  el.style.top  = 40 + offset + "px";
  el.style.left = 60 + offset + "px";

  return {
    /** The root .vista-window element */
    el,
    /** The .window-body container — render app content here */
    body: el.querySelector(".window-body"),
  };
}
