export function showContextMenu(e) {
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

export function removeContextMenu() {
  document.querySelectorAll(".context-menu").forEach((m) => m.remove());
}
