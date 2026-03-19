export function tickClock() {
  const $clock = document.getElementById("clock");
  const now = new Date();
  $clock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
