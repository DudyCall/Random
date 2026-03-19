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

  // Bind the static shutdown button
  const $shutdownBtn = document.querySelector('.start-menu-link.shutdown');
  if ($shutdownBtn) {
    if (!$shutdownBtn.dataset.bound) {
      $shutdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleStartMenu(false);
        triggerShutdown();
      });
      $shutdownBtn.dataset.bound = "true";
    }
  }
}


export function toggleStartMenu(force) {
  const $startMenu = document.getElementById("start-menu");
  const show = typeof force === "boolean" ? force : $startMenu.classList.contains("hidden");
  $startMenu.classList.toggle("hidden", !show);
}

export function triggerShutdown() {
  const $overlay = document.getElementById("shutdown-overlay");
  $overlay.classList.remove("hidden");
  
  // Optionally play sound or wait then reload
  setTimeout(() => {
    // In a real app we might redirect to a login screen or just sit here
    console.log("System shut down.");
    // location.reload(); // Uncomment if you want it to restart after 5s
  }, 5000);
}


