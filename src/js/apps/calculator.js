export function renderCalculatorApp(el) {
  el.innerHTML = `
    <div class="calculator-app" style="display:flex;flex-direction:column;height:100%;padding:8px;gap:8px;">
      <input class="calc-display" type="text" readonly
        style="text-align:right;font-size:24px;padding:8px 12px;border:1px solid #aaa;border-radius:4px;background:#fff;font-family:'Segoe UI',sans-serif;" />
      <div class="calc-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;flex:1;">
      </div>
    </div>
  `;

  const display = el.querySelector(".calc-display");
  const grid    = el.querySelector(".calc-grid");

  const buttons = [
    "C", "±", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "−",
    "1", "2", "3", "+",
    "0", ".", "⌫", "=",
  ];

  const opMap = { "÷": "/", "×": "*", "−": "-", "+": "+" };

  let current = "0";
  let previous = "";
  let operator = "";
  let resetNext = false;

  function updateDisplay() {
    display.value = current;
  }

  function calculate(a, op, b) {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return b;
    switch (op) {
      case "+": return String(x + y);
      case "-": return String(x - y);
      case "*": return String(x * y);
      case "/": return y === 0 ? "Error" : String(x / y);
      default:  return b;
    }
  }

  buttons.forEach((label) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.style.cssText = "font-size:18px;border:1px solid #bbb;border-radius:4px;cursor:pointer;background:#e8e8e8;";
    if (label === "=") btn.style.background = "#4a90d9";
    if (label === "=") btn.style.color = "#fff";

    btn.addEventListener("click", () => {
      if (label >= "0" && label <= "9" || label === ".") {
        if (resetNext) { current = ""; resetNext = false; }
        if (label === "." && current.includes(".")) return;
        current = current === "0" && label !== "." ? label : current + label;
      } else if (label === "C") {
        current = "0"; previous = ""; operator = "";
      } else if (label === "⌫") {
        current = current.length > 1 ? current.slice(0, -1) : "0";
      } else if (label === "±") {
        current = current.startsWith("-") ? current.slice(1) : current === "0" ? "0" : "-" + current;
      } else if (label === "%") {
        current = String(parseFloat(current) / 100);
      } else if (label === "=") {
        if (operator && previous !== "") {
          current = calculate(previous, operator, current);
          operator = ""; previous = "";
        }
      } else if (opMap[label]) {
        if (operator && previous !== "" && !resetNext) {
          current = calculate(previous, operator, current);
        }
        operator = opMap[label];
        previous = current;
        resetNext = true;
      }
      updateDisplay();
    });

    grid.appendChild(btn);
  });

  updateDisplay();
  display.addEventListener("mousedown", (e) => e.stopPropagation());
}
