import { BROWSER_HOMEPAGE, BROWSER_BOOKMARKS } from "../core/constants.js";

export function renderBrowserApp(el) {
  const history = [BROWSER_HOMEPAGE];
  let historyIndex = 0;

  el.innerHTML = `
    <div class="browser-app">
      <div class="browser-toolbar">
        <button class="browser-nav-btn" data-action="back" title="Back" disabled>◀</button>
        <button class="browser-nav-btn" data-action="forward" title="Forward" disabled>▶</button>
        <button class="browser-nav-btn" data-action="refresh" title="Refresh">⟳</button>
        <button class="browser-nav-btn" data-action="home" title="Home">🏠</button>
        <div class="browser-url-bar">
          <input type="text" class="browser-url-input" value="${BROWSER_HOMEPAGE}" spellcheck="false" />
        </div>
        <button class="browser-nav-btn browser-go-btn" data-action="go" title="Go">→</button>
      </div>
      <div class="browser-bookmarks-bar">
          ${BROWSER_BOOKMARKS.map(b => `<button class="browser-bookmark" data-url="${b.url}">⭐ ${b.label}</button>`).join("\n          ")}
      </div>
      <div class="browser-viewport">
        <iframe class="browser-frame" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" src="${BROWSER_HOMEPAGE}"></iframe>
        <div class="browser-error hidden">
          <div class="browser-error-icon">⚠️</div>
          <div class="browser-error-title">This page can't be displayed</div>
          <div class="browser-error-message">The website may have refused the connection, or the address may be incorrect.</div>
        </div>
      </div>
      <div class="browser-statusbar">Ready</div>
    </div>
  `;

  const urlInput   = el.querySelector(".browser-url-input");
  const iframe     = el.querySelector(".browser-frame");
  const backBtn    = el.querySelector('[data-action="back"]');
  const fwdBtn     = el.querySelector('[data-action="forward"]');
  const refreshBtn = el.querySelector('[data-action="refresh"]');
  const homeBtn    = el.querySelector('[data-action="home"]');
  const goBtn      = el.querySelector('[data-action="go"]');
  const errorPanel = el.querySelector(".browser-error");
  const statusBar  = el.querySelector(".browser-statusbar");

  function normalizeUrl(raw) {
    let url = raw.trim();
    if (!url) return BROWSER_HOMEPAGE;
    if (!/^https?:\/\//i.test(url)) {
      if (/^[\w-]+(\.[\w-]+)+/.test(url)) {
        url = "https://" + url;
      } else {
        url = "https://www.google.com/search?igu=1&q=" + encodeURIComponent(url);
      }
    }
    return url;
  }

  function navigate(url) {
    url = normalizeUrl(url);
    urlInput.value = url;
    statusBar.textContent = "Loading " + url + "...";
    errorPanel.classList.add("hidden");
    iframe.classList.remove("hidden");
    iframe.src = url;

    if (historyIndex < history.length - 1) {
      history.splice(historyIndex + 1);
    }
    history.push(url);
    historyIndex = history.length - 1;
    updateNavButtons();
  }

  function updateNavButtons() {
    backBtn.disabled = historyIndex <= 0;
    fwdBtn.disabled  = historyIndex >= history.length - 1;
  }

  iframe.addEventListener("load", () => {
    statusBar.textContent = "Done";
  });

  iframe.addEventListener("error", () => {
    statusBar.textContent = "Error loading page";
    iframe.classList.add("hidden");
    errorPanel.classList.remove("hidden");
  });

  backBtn.addEventListener("click", () => {
    if (historyIndex > 0) {
      historyIndex--;
      const url = history[historyIndex];
      urlInput.value = url;
      iframe.src = url;
      errorPanel.classList.add("hidden");
      iframe.classList.remove("hidden");
      statusBar.textContent = "Loading...";
      updateNavButtons();
    }
  });

  fwdBtn.addEventListener("click", () => {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      const url = history[historyIndex];
      urlInput.value = url;
      iframe.src = url;
      errorPanel.classList.add("hidden");
      iframe.classList.remove("hidden");
      statusBar.textContent = "Loading...";
      updateNavButtons();
    }
  });

  refreshBtn.addEventListener("click", () => {
    iframe.src = iframe.src;
    statusBar.textContent = "Refreshing...";
  });

  homeBtn.addEventListener("click", () => {
    navigate(BROWSER_HOMEPAGE);
  });

  goBtn.addEventListener("click", () => {
    navigate(urlInput.value);
  });

  urlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") navigate(urlInput.value);
  });

  urlInput.addEventListener("mousedown", (e) => e.stopPropagation());

  el.querySelectorAll(".browser-bookmark").forEach((btn) => {
    btn.addEventListener("click", () => navigate(btn.dataset.url));
  });
}
