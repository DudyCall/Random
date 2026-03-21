import { appRegistry } from "../core/registry.js";
import { openWindow } from "../ui/windowManager.js";

const STORAGE_KEY = "terminal-history";

const HELP_TEXT = `Available commands:
  help          Show this help message
  clear / cls   Clear the terminal
  echo [text]   Print text
  date          Show current date and time
  whoami        Show current user
  hostname      Show hostname
  uptime        Show page uptime
  calc [expr]   Evaluate a math expression
  color [hex]   Set terminal text color (e.g. color #0f0)
  reset         Reset terminal color to default
  history       Show command history
  ls / dir      List desktop apps
  open [app]    Open an app by id (e.g. open notes)
  ver           Show version info
`;

const startTime = Date.now();

function getUptime() {
  const ms = Date.now() - startTime;
  const s = Math.floor(ms / 1000) % 60;
  const m = Math.floor(ms / 60000) % 60;
  const h = Math.floor(ms / 3600000);
  return `${h}h ${m}m ${s}s`;
}

export function renderTerminalApp(el) {
  const savedHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const cmdHistory = savedHistory.slice(-50);
  let historyIndex = cmdHistory.length;

  el.innerHTML = `
    <div class="terminal-app">
      <div class="terminal-output"></div>
      <div class="terminal-input-line">
        <span class="terminal-prompt">C:\\&gt;&nbsp;</span>
        <input type="text" class="terminal-input" spellcheck="false" autocomplete="off" />
      </div>
    </div>
  `;

  const output = el.querySelector(".terminal-output");
  const input = el.querySelector(".terminal-input");
  const app = el.querySelector(".terminal-app");

  function print(text, cls = "") {
    const line = document.createElement("div");
    line.className = "terminal-line" + (cls ? ` ${cls}` : "");
    line.textContent = text;
    output.appendChild(line);
    app.scrollTop = app.scrollHeight;
  }

  print("Random OS [Version 1.0.0]");
  print("(c) 2026 Random Corp. All rights reserved.");
  print("");
  print('Type "help" for a list of commands.');
  print("");

  function execute(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    print(`C:\\> ${trimmed}`, "terminal-cmd");

    cmdHistory.push(trimmed);
    if (cmdHistory.length > 50) cmdHistory.shift();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cmdHistory));
    historyIndex = cmdHistory.length;

    const parts = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).map(a => a.replace(/^"|"$/g, ""));

    switch (cmd) {
      case "help":
        HELP_TEXT.split("\n").forEach(l => print(l));
        break;

      case "clear":
      case "cls":
        output.innerHTML = "";
        break;

      case "echo":
        print(args.join(" "));
        break;

      case "date":
        print(new Date().toString());
        break;

      case "whoami":
        print("guest@random-os");
        break;

      case "hostname":
        print("random-os");
        break;

      case "uptime":
        print(`System uptime: ${getUptime()}`);
        break;

      case "calc": {
        const expr = args.join(" ");
        if (!expr) { print("Usage: calc [expression]"); break; }
        if (!/^[\d+\-*/().%\s^]+$/.test(expr)) {
          print("Error: Invalid expression.");
          break;
        }
        try {
          const result = Function(`"use strict"; return (${expr})`)();
          print(`= ${result}`);
        } catch {
          print("Error: Could not evaluate expression.");
        }
        break;
      }

      case "color":
        if (!args[0]) { print("Usage: color [hex] (e.g. color #0f0)"); break; }
        app.style.color = args[0];
        print(`Color set to ${args[0]}`);
        break;

      case "reset":
        app.style.color = "";
        print("Color reset to default.");
        break;

      case "history":
        cmdHistory.forEach((c, i) => print(`  ${i + 1}  ${c}`));
        break;

      case "ls":
      case "dir":
        print(" Directory of C:\\Apps\n");
        appRegistry.forEach(a => print(`  ${a.icon}  ${a.id.padEnd(14)} ${a.name}`));
        print(`\n  ${appRegistry.length} app(s)`);
        break;

      case "open": {
        if (!args[0]) { print("Usage: open [app-id]  (use 'ls' to see ids)"); break; }
        const id = args[0].toLowerCase();
        const found = appRegistry.find(a => a.id === id);
        if (!found) {
          print(`'${id}' is not recognized as an app. Use 'ls' to list apps.`);
        } else {
          openWindow(found);
          print(`Opening ${found.name}...`);
        }
        break;
      }

      case "ver":
        print("Random OS [Version 1.0.0]");
        break;

      default:
        print(`'${cmd}' is not recognized as a command. Type 'help' for available commands.`);
    }
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      execute(input.value);
      input.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = cmdHistory[historyIndex] || "";
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        historyIndex++;
        input.value = cmdHistory[historyIndex] || "";
      } else {
        historyIndex = cmdHistory.length;
        input.value = "";
      }
    }
  });

  input.addEventListener("mousedown", (e) => e.stopPropagation());
  setTimeout(() => input.focus(), 100);
}
