export function renderTimerApp(el) {
  el.innerHTML = `
    <div class="timer-app" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;">
      <div class="timer-display" style="font-size:48px;font-family:monospace;font-weight:700;">00:00:00</div>
      <div class="timer-inputs" style="display:flex;gap:6px;align-items:center;font-size:13px;">
        <label>M <input type="number" class="timer-min" min="0" max="99" value="5" style="width:48px;font-size:13px;padding:2px;" /></label>
        <label>S <input type="number" class="timer-sec" min="0" max="59" value="0" style="width:48px;font-size:13px;padding:2px;" /></label>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="timer-start"  style="padding:6px 16px;font-size:14px;cursor:pointer;border-radius:6px;border:1px solid #888;">▶ Start</button>
        <button class="timer-pause"  style="padding:6px 16px;font-size:14px;cursor:pointer;border-radius:6px;border:1px solid #888;" disabled>⏸ Pause</button>
        <button class="timer-reset"  style="padding:6px 16px;font-size:14px;cursor:pointer;border-radius:6px;border:1px solid #888;">↺ Reset</button>
      </div>
      <div class="timer-mode" style="display:flex;gap:12px;font-size:13px;">
        <label><input type="radio" name="timer-mode" value="countdown" checked /> Countdown</label>
        <label><input type="radio" name="timer-mode" value="stopwatch" /> Stopwatch</label>
      </div>
    </div>
  `;

  const display  = el.querySelector(".timer-display");
  const minInp   = el.querySelector(".timer-min");
  const secInp   = el.querySelector(".timer-sec");
  const startBtn = el.querySelector(".timer-start");
  const pauseBtn = el.querySelector(".timer-pause");
  const resetBtn = el.querySelector(".timer-reset");
  const inputs   = el.querySelector(".timer-inputs");

  let intervalId = null;
  let remaining  = 0;      // seconds remaining (countdown) or elapsed (stopwatch)
  let isCountdown = true;

  el.querySelectorAll('input[name="timer-mode"]').forEach((r) => {
    r.addEventListener("change", () => {
      isCountdown = r.value === "countdown";
      inputs.style.display = isCountdown ? "flex" : "none";
      resetTimer();
    });
  });

  function fmt(s) {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  }

  function tick() {
    if (isCountdown) {
      if (remaining <= 0) { finish(); return; }
      remaining--;
    } else {
      remaining++;
    }
    display.textContent = fmt(remaining);
  }

  function finish() {
    clearInterval(intervalId);
    intervalId = null;
    display.textContent = "00:00:00";
    display.style.color = "red";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    setTimeout(() => (display.style.color = ""), 3000);
  }

  function resetTimer() {
    clearInterval(intervalId);
    intervalId = null;
    remaining = 0;
    display.textContent = "00:00:00";
    display.style.color = "";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  startBtn.addEventListener("click", () => {
    if (intervalId) return;
    if (isCountdown) {
      remaining = parseInt(minInp.value || 0, 10) * 60 + parseInt(secInp.value || 0, 10);
      if (remaining <= 0) return;
    }
    display.textContent = fmt(remaining);
    intervalId = setInterval(tick, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
  });

  pauseBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  });

  resetBtn.addEventListener("click", resetTimer);

  [minInp, secInp].forEach((inp) => inp.addEventListener("mousedown", (e) => e.stopPropagation()));
}
