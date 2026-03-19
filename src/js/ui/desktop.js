import { appRegistry } from "../core/registry.js";
import { openWindow } from "./windowManager.js";

export function buildDesktopIcons() {
  const $desktop = document.getElementById("desktop-icons");
  appRegistry.forEach((app) => {
    const el = document.createElement("div");
    el.className = "desktop-icon";
    el.tabIndex = 0;
    el.setAttribute("data-app", app.id);
    el.innerHTML = `
      <div class="icon-img">${app.icon}</div>
      <span class="icon-label">${app.name}</span>
    `;
    el.addEventListener("dblclick", () => openWindow(app));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openWindow(app);
    });
    $desktop.appendChild(el);
  });
}
