/* ==========================================================
   Random Things – Windows Vista Template  (entry point)
   ========================================================== */

import { buildDesktopIcons } from "./ui/desktop.js";
import { buildStartMenu, toggleStartMenu } from "./ui/startMenu.js";
import { showContextMenu, removeContextMenu } from "./ui/contextMenu.js";
import { initTaskbar } from "./ui/taskbar.js";
import { tickClock } from "./utils/clock.js";

function init() {
  initTaskbar();
  buildDesktopIcons();
  buildStartMenu();
  bindGlobalEvents();
  tickClock();
  setInterval(tickClock, 1000);
}

function bindGlobalEvents() {
  const $startBtn  = document.getElementById("start-button");
  const $startMenu = document.getElementById("start-menu");

  $startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleStartMenu();
  });

  document.addEventListener("click", (e) => {
    if (!$startMenu.classList.contains("hidden") && !$startMenu.contains(e.target) && !$startBtn.contains(e.target)) {
      toggleStartMenu(false);
    }
    removeContextMenu();
  });

  document.getElementById("desktop").addEventListener("contextmenu", showContextMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      toggleStartMenu(false);
      removeContextMenu();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
