import { appRegistry } from "../core/registry.js";
import { openWindow } from "./windowManager.js";
import { makeIconDraggable } from "./drag.js";
import { getIconPositions } from "../core/firebaseDb.js";

export async function buildDesktopIcons() {
  const $desktop = document.getElementById("desktop-icons");
  if (!$desktop) return;

  const colWidth = 100;
  const rowHeight = 100;
  const margin = 20;
  
  // Calculate how many icons fit per column
  const desktopHeight = window.innerHeight - 44; // 44 is taskbar height
  const iconsPerCol = Math.max(1, Math.floor((desktopHeight - margin) / rowHeight));

  const savedPositions = await getIconPositions();

  appRegistry.forEach((app, index) => {
    const el = document.createElement("div");
    el.className = "desktop-icon";
    el.tabIndex = 0;
    el.setAttribute("data-app", app.id);
    el.innerHTML = `
      <div class="icon-img">${app.icon}</div>
      <span class="icon-label">${app.name}</span>
    `;

    // Position from Firebase or initial grid position
    if (savedPositions[app.id]) {
      el.style.left = savedPositions[app.id].left;
      el.style.top = savedPositions[app.id].top;
    } else {
      const col = Math.floor(index / iconsPerCol);
      const row = index % iconsPerCol;
      el.style.left = margin + (col * colWidth) + "px";
      el.style.top = margin + (row * rowHeight) + "px";
    }

    el.addEventListener("dblclick", () => openWindow(app));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openWindow(app);
    });

    $desktop.appendChild(el);
    makeIconDraggable(el);
  });
}
