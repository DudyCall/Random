/* Window management state */

let windowIdCounter = 0;
let topZ = 10;

export const openWindows = new Map(); // id → { el, title, appId, minimized, maximized }

export function nextWindowId() {
  return ++windowIdCounter;
}

export function nextZ() {
  return ++topZ;
}
