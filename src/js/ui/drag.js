import { saveIconPosition } from "../core/firebaseDb.js";

export function makeDraggable(winEl) {
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

export function makeIconDraggable(el) {
  let isDragging = false;
  let startX, startY, origX, origY;
  let hasMoved = false;

  el.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    hasMoved = false;
    startX = e.clientX;
    startY = e.clientY;
    origX = el.offsetLeft;
    origY = el.offsetTop;
    el.style.zIndex = "1000";
    e.stopPropagation();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasMoved = true;
    }

    if (hasMoved) {
      el.style.left = origX + dx + "px";
      el.style.top  = origY + dy + "px";
      el.classList.add("dragging");
    }
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    el.style.zIndex = "10";
    el.classList.remove("dragging");
    
    // Prevent selection if moved
    if (hasMoved) {
      // Small timeout to prevent immediate click/dblclick if needed
      setTimeout(() => { hasMoved = false; }, 50);
      const appId = el.getAttribute("data-app");
      if (appId) {
        saveIconPosition(appId, el.style.left, el.style.top);
      }
    }
  });
  
  // Intercept click if moved to prevent opening/selecting
  el.addEventListener("click", (e) => {
    if (hasMoved) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }, true);
}
