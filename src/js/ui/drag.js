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
