/* ==========================================================
   Random Things – Windows Vista Template  (app.js)
   ========================================================== */

(function () {
  "use strict";

  // ── State ──────────────────────────────────────────────
  let windowIdCounter = 0;
  let topZ = 10;
  const openWindows = new Map(); // id → { el, title, minimized }

  // ── Registry: define your app pages / tools here ──────
  // Each entry becomes a desktop icon AND start-menu item.
  const appRegistry = [
    { id: "dice",       name: "Dice Roller",       icon: "🎲" },
    { id: "coin",       name: "Coin Flip",         icon: "🪙" },
    { id: "password",   name: "Password Gen",      icon: "🔑" },
    { id: "color",      name: "Color Picker",      icon: "🎨" },
    { id: "timer",      name: "Timer",             icon: "⏱️" },
    { id: "notes",      name: "Notepad",           icon: "📝" },
    { id: "calculator", name: "Calculator",        icon: "🧮" },
    { id: "quotes",     name: "Random Quotes",     icon: "💬" },
    { id: "trivia",     name: "Trivia",            icon: "❓" },
    { id: "weather",    name: "Weather",           icon: "🌤️" },
  ];

  // ── DOM refs ───────────────────────────────────────────
  const $desktop      = document.getElementById("desktop-icons");
  const $container    = document.getElementById("windows-container");
  const $taskbarItems = document.getElementById("taskbar-items");
  const $startMenu    = document.getElementById("start-menu");
  const $startBtn     = document.getElementById("start-button");
  const $clock        = document.getElementById("clock");
  const $startApps    = document.getElementById("start-menu-apps");
  const $template     = document.getElementById("window-template");

  // ── Init ───────────────────────────────────────────────
  function init() {
    buildDesktopIcons();
    buildStartMenu();
    bindGlobalEvents();
    tickClock();
    setInterval(tickClock, 1000);
  }

  // ── Clock ──────────────────────────────────────────────
  function tickClock() {
    const now = new Date();
    $clock.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // ── Desktop Icons ──────────────────────────────────────
  function buildDesktopIcons() {
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

  // ── Start Menu ─────────────────────────────────────────
  function buildStartMenu() {
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

  function toggleStartMenu(force) {
    const show = typeof force === "boolean" ? force : $startMenu.classList.contains("hidden");
    $startMenu.classList.toggle("hidden", !show);
  }

  // ── Window Management ──────────────────────────────────
  function openWindow(app) {
    // If already open, focus it
    for (const [id, win] of openWindows) {
      if (win.appId === app.id) {
        restoreWindow(id);
        focusWindow(id);
        return;
      }
    }

    const id = ++windowIdCounter;
    const clone = $template.content.cloneNode(true);
    const el = clone.querySelector(".vista-window");

    el.dataset.winId = id;
    el.querySelector(".window-title").textContent = app.name;
    el.querySelector(".window-body").innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100%;opacity:0.3;font-size:48px;">
        ${app.icon}
      </div>
    `;

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
    addTaskbarItem(id, app);
    focusWindow(id);
  }

  function focusWindow(id) {
    topZ++;
    const win = openWindows.get(id);
    if (!win) return;
    // Remove active from all
    openWindows.forEach((w) => w.el.classList.remove("active"));
    win.el.classList.add("active");
    win.el.style.zIndex = topZ;

    // Update taskbar
    document.querySelectorAll(".taskbar-item").forEach((ti) => {
      ti.classList.toggle("active", +ti.dataset.winId === id);
    });
  }

  function minimizeWindow(id) {
    const win = openWindows.get(id);
    if (!win) return;
    win.minimized = true;
    win.el.classList.add("minimized");
  }

  function restoreWindow(id) {
    const win = openWindows.get(id);
    if (!win) return;
    win.minimized = false;
    win.el.classList.remove("minimized");
  }

  function toggleMaximize(id) {
    const win = openWindows.get(id);
    if (!win) return;
    win.maximized = !win.maximized;
    win.el.classList.toggle("maximized", win.maximized);
  }

  function closeWindow(id) {
    const win = openWindows.get(id);
    if (!win) return;
    win.el.remove();
    openWindows.delete(id);
    removeTaskbarItem(id);
  }

  // ── Taskbar Items ──────────────────────────────────────
  function addTaskbarItem(id, app) {
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
    $taskbarItems.appendChild(el);
  }

  function removeTaskbarItem(id) {
    const el = $taskbarItems.querySelector(`[data-win-id="${id}"]`);
    if (el) el.remove();
  }

  // ── Dragging ───────────────────────────────────────────
  function makeDraggable(winEl) {
    const titlebar = winEl.querySelector(".window-titlebar");
    let isDragging = false;
    let startX, startY, origX, origY;

    titlebar.addEventListener("mousedown", (e) => {
      if (e.target.closest(".window-controls")) return;
      if (winEl.classList.contains("maximized")) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      origX = winEl.offsetLeft;
      origY = winEl.offsetTop;
      document.body.style.cursor = "grabbing";
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      winEl.style.left = origX + dx + "px";
      winEl.style.top  = origY + dy + "px";
    });

    document.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      document.body.style.cursor = "";
    });
  }

  // ── Context Menu ───────────────────────────────────────
  function showContextMenu(e) {
    e.preventDefault();
    removeContextMenu();

    const menu = document.createElement("div");
    menu.className = "context-menu";
    menu.innerHTML = `
      <div class="context-menu-item" data-action="refresh">Refresh</div>
      <div class="context-menu-separator"></div>
      <div class="context-menu-item" data-action="view-large">View: Large Icons</div>
      <div class="context-menu-item" data-action="view-small">View: Small Icons</div>
      <div class="context-menu-separator"></div>
      <div class="context-menu-item" data-action="about">About</div>
    `;
    menu.style.left = e.clientX + "px";
    menu.style.top  = e.clientY + "px";

    menu.querySelectorAll(".context-menu-item").forEach((item) => {
      item.addEventListener("click", () => {
        removeContextMenu();
      });
    });

    document.body.appendChild(menu);
  }

  function removeContextMenu() {
    document.querySelectorAll(".context-menu").forEach((m) => m.remove());
  }

  // ── Global Events ──────────────────────────────────────
  function bindGlobalEvents() {
    // Start button
    $startBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleStartMenu();
    });

    // Close start menu on outside click
    document.addEventListener("click", (e) => {
      if (!$startMenu.classList.contains("hidden") && !$startMenu.contains(e.target) && !$startBtn.contains(e.target)) {
        toggleStartMenu(false);
      }
      removeContextMenu();
    });

    // Desktop right-click
    document.getElementById("desktop").addEventListener("contextmenu", showContextMenu);

    // Keyboard: Escape closes start menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        toggleStartMenu(false);
        removeContextMenu();
      }
    });
  }

  // ── Boot ───────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", init);
})();
