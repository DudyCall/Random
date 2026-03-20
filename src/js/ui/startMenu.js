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
  const $status = document.getElementById("shutdown-status");
  const $restartBtn = document.getElementById("restart-btn");
  
  $overlay.classList.remove("hidden");
  $status.innerText = "Shutting down...";
  $restartBtn.classList.add("hidden");

  // Play shutdown sound
  const shutdownSound = new Audio("assets/audio/shut_down.mp3");
  shutdownSound.play().catch(err => {
    console.warn("Could not play shutdown sound:", err);
  });
  
  // Bind restart button once
  if (!$restartBtn.dataset.bound) {
    $restartBtn.addEventListener("click", () => {
      location.reload();
    });
    $restartBtn.dataset.bound = "true";
  }

  // After some time (matching sound duration or fixed delay)
  setTimeout(() => {
    $status.innerText = "It is now safe to turn off your computer.";
    $restartBtn.classList.remove("hidden");
    console.log("System shut down.");
  }, 5000);
}


