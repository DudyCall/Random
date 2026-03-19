import { appRegistry } from "../core/registry.js";
import { openWindow } from "./windowManager.js";

export function buildStartMenu() {
  const $startApps = document.getElementById("start-menu-apps");
  appRegistry.forEach((app) => {
    const el = document.createElement("a");
    el.href = "#";
    el.className = "start-menu-app";
    el.innerHTML = `
      <span class="app-icon">${app.icon}</span>
      <span class="app-name">${app.name}</span>
    `;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      toggleStartMenu(false);
      openWindow(app);
    });
    $startApps.appendChild(el);
  });
}

export function toggleStartMenu(force) {
  const $startMenu = document.getElementById("start-menu");
  const show = typeof force === "boolean" ? force : $startMenu.classList.contains("hidden");
  $startMenu.classList.toggle("hidden", !show);
}
