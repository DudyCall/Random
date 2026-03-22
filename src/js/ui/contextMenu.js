export function showContextMenu(e) {
  e.preventDefault();
  removeContextMenu();

  const menu = document.createElement("div");
  menu.className = "context-menu";
  menu.innerHTML = `
    <div class="context-menu-item" data-action="refresh">Refresh</div>
    <div class="context-menu-separator"></div>
    <div class="context-menu-item" data-action="new-folder">New Folder</div>
    <div class="context-menu-separator"></div>
    <div class="context-menu-item" data-action="view-large">View: Large Icons</div>
    <div class="context-menu-item" data-action="view-small">View: Small Icons</div>
    <div class="context-menu-separator"></div>
    <div class="context-menu-item" data-action="about">About</div>
  `;
  menu.style.left = e.clientX + "px";
  menu.style.top  = e.clientY + "px";


  document.body.appendChild(menu);
}

// Helper to create a new folder icon on the desktop
function createNewFolder(x, y) {
  const $desktop = document.getElementById("desktop-icons");
  if (!$desktop) return;
  // Find a unique folder name
  let baseName = "New Folder";
  let name = baseName;
  let counter = 1;
  while ([...$desktop.children].some(el => el.classList.contains("desktop-icon") && el.querySelector(".icon-label")?.textContent === name)) {
    name = `${baseName} (${counter++})`;
  }
  // Create the folder icon
  const el = document.createElement("div");
  el.className = "desktop-icon folder-icon";
  el.tabIndex = 0;
  el.innerHTML = `
    <div class=\"icon-img\">📁</div>
    <span class=\"icon-label\">${name}</span>
  `;
  el.style.left = x + "px";
  el.style.top = y + "px";
  $desktop.appendChild(el);
  // Add click event to open folder map
  el.addEventListener("dblclick", () => openFolderWindow(name));
  // Immediately open the folder window
  openFolderWindow(name);
}

// Show a simple folder window (map)
function openFolderWindow(folderName) {
  // Remove any existing folder window
  const old = document.getElementById("folder-window");
  if (old) old.remove();
  // Create window
  const win = document.createElement("div");
  win.className = "vista-window";
  win.id = "folder-window";
  win.style.left = "120px";
  win.style.top = "120px";
  win.style.width = "400px";
  win.style.height = "300px";
  win.innerHTML = `
    <div class="window-titlebar">
      <span class="window-title">${folderName}</span>
      <button class="win-btn close" title="Close">✕</button>
    </div>
    <div class="window-body">
      <div style="color:#fff;opacity:0.7;text-align:center;margin-top:40px;">(Empty folder)</div>
    </div>
  `;
  // Close button
  win.querySelector(".win-btn.close").onclick = () => win.remove();
  // Add to windows container
  const container = document.getElementById("windows-container") || document.body;
  container.appendChild(win);
}

export function removeContextMenu() {
  document.querySelectorAll(".context-menu").forEach((m) => m.remove());
}
