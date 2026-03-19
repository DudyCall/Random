/* ==========================================================
   Random Things – Windows Vista Template  (app.js)
   ========================================================== */

(function () {
  "use strict";

  // ── State ──────────────────────────────────────────────
  let windowIdCounter = 0;
  let topZ = 10;
  const openWindows = new Map(); // id → { el, title, minimized }

  // ── Registry: define your app pages / tools here ──────
  // Each entry becomes a desktop icon AND start-menu item.
  const appRegistry = [
    { id: "dice",       name: "Dice Roller",       icon: "🎲" },
    { id: "coin",       name: "Coin Flip",         icon: "🪙" },
    { id: "password",   name: "Password Gen",      icon: "🔑" },
    { id: "color",      name: "Color Picker",      icon: "🎨" },
    { id: "timer",      name: "Timer",             icon: "⏱️" },
    { id: "notes",      name: "Notepad",           icon: "📝" },
    { id: "calculator", name: "Calculator",        icon: "🧮" },
    { id: "quotes",     name: "Random Quotes",     icon: "💬" },
    { id: "trivia",     name: "Trivia",            icon: "❓" },
    { id: "weather",    name: "Weather",           icon: "🌤️" },
    { id: "tracker",    name: "Daily Tracker",     icon: "📅" },
    { id: "browser",    name: "Web Browser",      icon: "🌐" },
    { id: "imagegen",  name: "Image Generator",  icon: "🖼️" },
  ];

  const fakeQuotes = [
    { text: "The best way to predict the future is to invent a new sandwich.", author: "Bill Gates" },
    { text: "I didn't fail, I just found 10,000 ways that a toaster won't fly.", author: "Thomas Edison" },
    { text: "If you want to live a happy life, tie it up in a neat little bow and hope for the best.", author: "Albert Einstein" },
    { text: "Stay hungry, stay foolish, but mostly stay away from the microwave.", author: "Steve Jobs" },
    { text: "To be or not to be, that's not really the question, the question is 'What's for dinner?'", author: "William Shakespeare" },
    { text: "Information is not knowledge, knowledge is not wisdom, wisdom is not a good burger.", author: "Frank Zappa" },
    { text: "The only thing we have to fear is fear itself, and spiders. Definitely spiders.", author: "Franklin D. Roosevelt" },
    { text: "I have a dream, that one day I will finally find my car keys.", author: "Martin Luther King Jr." },
    { text: "You miss 100% of the shots you don't take, especially at the bar.", author: "Wayne Gretzky" },
    { text: "The greatest glory in living lies not in never falling, but in always having a good excuse.", author: "Nelson Mandela" }
  ];

  // ── DOM refs ───────────────────────────────────────────
  const $desktop      = document.getElementById("desktop-icons");
  const $container    = document.getElementById("windows-container");
  const $taskbarItems = document.getElementById("taskbar-items");
  const $startMenu    = document.getElementById("start-menu");
  const $startBtn     = document.getElementById("start-button");
  const $clock        = document.getElementById("clock");
  const $startApps    = document.getElementById("start-menu-apps");
  const $template     = document.getElementById("window-template");

  // ── Init ───────────────────────────────────────────────
  function init() {
    buildDesktopIcons();
    buildStartMenu();
    bindGlobalEvents();
    tickClock();
    setInterval(tickClock, 1000);
  }

  // ── Clock ──────────────────────────────────────────────
  function tickClock() {
    const now = new Date();
    $clock.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // ── Desktop Icons ──────────────────────────────────────
  function buildDesktopIcons() {
    appRegistry.forEach((app) => {
      const el = document.createElement("div");
      el.className = "desktop-icon";
      el.tabIndex = 0;
      el.setAttribute("data-app", app.id);
      el.innerHTML = `
        <div class="icon-img">${app.icon}</div>
        <span class="icon-label">${app.name}</span>
      `;
      el.addEventListener("dblclick", () => openWindow(app));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") openWindow(app);
      });
      $desktop.appendChild(el);
    });
  }

  // ── Start Menu ─────────────────────────────────────────
  function buildStartMenu() {
    appRegistry.forEach((app) => {
      const el = document.createElement("a");
      el.href = "#";
      el.className = "start-menu-app";
      el.innerHTML = `
        <span class="app-icon">${app.icon}</span>
        <span class="app-name">${app.name}</span>
      `;
      el.addEventListener("click", (e) => {
        e.preventDefault();
        toggleStartMenu(false);
        openWindow(app);
      });
      $startApps.appendChild(el);
    });
  }

  function toggleStartMenu(force) {
    const show = typeof force === "boolean" ? force : $startMenu.classList.contains("hidden");
    $startMenu.classList.toggle("hidden", !show);
  }

  // ── Window Management ──────────────────────────────────
  function openWindow(app) {
    // If already open, focus it
    for (const [id, win] of openWindows) {
      if (win.appId === app.id) {
        restoreWindow(id);
        focusWindow(id);
        return;
      }
    }

    const id = ++windowIdCounter;
    const clone = $template.content.cloneNode(true);
    const el = clone.querySelector(".vista-window");

    el.dataset.winId = id;
    el.querySelector(".window-title").textContent = app.name;
    const body = el.querySelector(".window-body");

    if (app.id === "quotes") {
      renderQuotesApp(body);
    } else if (app.id === "weather") {
      renderWeatherApp(body);
    } else if (app.id === "tracker") {
      renderDailyTracker(body);
    } else if (app.id === "browser") {
      renderBrowserApp(body);
    } else if (app.id === "imagegen") {
      renderImageGenApp(body);
    } else {
      body.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:100%;opacity:0.3;font-size:48px;">
          ${app.icon}
        </div>
      `;
    }

    // Position with offset
    const offset = (id % 8) * 30;
    el.style.top  = 40 + offset + "px";
    el.style.left = 60 + offset + "px";

    // Wire controls
    el.querySelector(".minimize").addEventListener("click", () => minimizeWindow(id));
    el.querySelector(".maximize").addEventListener("click", () => toggleMaximize(id));
    el.querySelector(".close").addEventListener("click", () => closeWindow(id));

    // Focus on click
    el.addEventListener("mousedown", () => focusWindow(id));

    // Dragging
    makeDraggable(el);

    $container.appendChild(el);

    openWindows.set(id, { el, title: app.name, appId: app.id, minimized: false, maximized: false });
    addTaskbarItem(id, app);
    focusWindow(id);
  }

  function focusWindow(id) {
    topZ++;
    const win = openWindows.get(id);
    if (!win) return;
    // Remove active from all
    openWindows.forEach((w) => w.el.classList.remove("active"));
    win.el.classList.add("active");
    win.el.style.zIndex = topZ;

    // Update taskbar
    document.querySelectorAll(".taskbar-item").forEach((ti) => {
      ti.classList.toggle("active", +ti.dataset.winId === id);
    });
  }

  function minimizeWindow(id) {
    const win = openWindows.get(id);
    if (!win) return;
    win.minimized = true;
    win.el.classList.add("minimized");
  }

  function restoreWindow(id) {
    const win = openWindows.get(id);
    if (!win) return;
    win.minimized = false;
    win.el.classList.remove("minimized");
  }

  function toggleMaximize(id) {
    const win = openWindows.get(id);
    if (!win) return;
    win.maximized = !win.maximized;
    win.el.classList.toggle("maximized", win.maximized);
  }

  function closeWindow(id) {
    const win = openWindows.get(id);
    if (!win) return;
    win.el.remove();
    openWindows.delete(id);
    removeTaskbarItem(id);
  }

  // ── Specific App Renders ──────────────────────────────
  async function renderDailyTracker(el) {
    el.innerHTML = `
      <div class="tracker-app">
        <div class="tracker-header">
          <h3>Daily Contribution Tracker</h3>
          <p>Tracking: <strong>Dudycall</strong> & <strong>Loyvir</strong></p>
        </div>
        <div class="tracker-status" id="tracker-content">
          <div class="loading-spinner">Checking GitHub...</div>
        </div>
        <div class="tracker-footer">
          <button class="sync-btn">Refresh Now</button>
        </div>
      </div>
    `;

    const content = el.querySelector("#tracker-content");
    const syncBtn = el.querySelector(".sync-btn");

    async function updateStatus() {
      content.innerHTML = '<div class="loading-spinner">Fetching latest commits...</div>';
      syncBtn.disabled = true;
      
      const status = await fetchGithubStatus();
      syncBtn.disabled = false;

      if (status.error) {
        content.innerHTML = `<div class="tracker-error">${status.error}</div>`;
        return;
      }

      const today = new Date().toLocaleDateString();
      content.innerHTML = `
        <div class="contribution-list">
          <div class="contributor ${status.dudycall ? 'done' : 'pending'}">
            <span class="status-icon">${status.dudycall ? '✅' : '⏳'}</span>
            <span class="user-name">Dudycall</span>
            <span class="status-label">${status.dudycall ? 'Added something today!' : 'Not yet...'}</span>
          </div>
          <div class="contributor ${status.loyvir ? 'done' : 'pending'}">
            <span class="status-icon">${status.loyvir ? '✅' : '⏳'}</span>
            <span class="user-name">Loyvir</span>
            <span class="status-label">${status.loyvir ? 'Added something today!' : 'Not yet...'}</span>
          </div>
        </div>
        <div class="overall-status ${status.both ? 'complete' : ''}">
          ${status.both ? '🎉 Day Complete! Great work team!' : '💪 Keep going! Both players need to contribute.'}
        </div>
      `;
    }

    syncBtn.addEventListener("click", updateStatus);
    updateStatus();
  }

  async function fetchGithubStatus() {
    const owner = "DudyCall";
    const repo = "Random";
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 403) return { error: "GitHub API rate limit exceeded. Try again later." };
        if (response.status === 404) return { error: "Project not found. Is it public?" };
        return { error: `GitHub error: ${response.statusText}` };
      }
      
      const commits = await response.json();
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      
      let dudycallCommitted = false;
      let loyvirCommitted = false;

      commits.forEach(commit => {
        const commitDate = commit.commit.author.date.split('T')[0];
        if (commitDate === today) {
          const author = commit.author ? commit.author.login.toLowerCase() : commit.commit.author.name.toLowerCase();
          if (author === "dudycall") dudycallCommitted = true;
          if (author === "loyvir") loyvirCommitted = true;
        }
      });

      return {
        dudycall: dudycallCommitted,
        loyvir: loyvirCommitted,
        both: dudycallCommitted && loyvirCommitted
      };
    } catch (err) {
      return { error: "Failed to connect to GitHub." };
    }
  }

  // ── Weather App (Open-Meteo API) ───────────────────
  const WMO_CODES = {
    0: { desc: "Clear sky", icon: "☀️" },
    1: { desc: "Mainly clear", icon: "🌤️" },
    2: { desc: "Partly cloudy", icon: "⛅" },
    3: { desc: "Overcast", icon: "☁️" },
    45: { desc: "Fog", icon: "🌫️" },
    48: { desc: "Depositing rime fog", icon: "🌫️" },
    51: { desc: "Light drizzle", icon: "🌦️" },
    53: { desc: "Moderate drizzle", icon: "🌦️" },
    55: { desc: "Dense drizzle", icon: "🌦️" },
    61: { desc: "Slight rain", icon: "🌧️" },
    63: { desc: "Moderate rain", icon: "🌧️" },
    65: { desc: "Heavy rain", icon: "🌧️" },
    71: { desc: "Slight snow", icon: "🌨️" },
    73: { desc: "Moderate snow", icon: "🌨️" },
    75: { desc: "Heavy snow", icon: "🌨️" },
    77: { desc: "Snow grains", icon: "🌨️" },
    80: { desc: "Slight showers", icon: "🌦️" },
    81: { desc: "Moderate showers", icon: "🌦️" },
    82: { desc: "Violent showers", icon: "🌦️" },
    85: { desc: "Slight snow showers", icon: "🌨️" },
    86: { desc: "Heavy snow showers", icon: "🌨️" },
    95: { desc: "Thunderstorm", icon: "⛈️" },
    96: { desc: "Thunderstorm with hail", icon: "⛈️" },
    99: { desc: "Thunderstorm with heavy hail", icon: "⛈️" },
  };

  function getWmo(code) {
    return WMO_CODES[code] || { desc: "Unknown", icon: "❓" };
  }

  function renderWeatherApp(el) {
    el.innerHTML = `
      <div class="weather-app">
        <div class="weather-search">
          <input type="text" class="weather-input" placeholder="Enter city name..." />
          <button class="weather-search-btn">Search</button>
          <button class="weather-locate-btn" title="Use my location">📍</button>
        </div>
        <div class="weather-content">
          <div class="weather-placeholder">Enter a city or use your location to see the weather.</div>
        </div>
      </div>
    `;

    const input = el.querySelector(".weather-input");
    const searchBtn = el.querySelector(".weather-search-btn");
    const locateBtn = el.querySelector(".weather-locate-btn");
    const content = el.querySelector(".weather-content");

    async function searchCity() {
      const query = input.value.trim();
      if (!query) return;
      content.innerHTML = '<div class="weather-loading">Searching...</div>';
      try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) {
          content.innerHTML = '<div class="weather-error">City not found. Try another name.</div>';
          return;
        }
        const place = geoData.results[0];
        await loadWeather(place.latitude, place.longitude, place.name, place.country);
      } catch {
        content.innerHTML = '<div class="weather-error">Failed to search. Check your connection.</div>';
      }
    }

    searchBtn.addEventListener("click", searchCity);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") searchCity(); });

    locateBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        content.innerHTML = '<div class="weather-error">Geolocation not supported by your browser.</div>';
        return;
      }
      content.innerHTML = '<div class="weather-loading">Getting your location...</div>';
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          await loadWeather(pos.coords.latitude, pos.coords.longitude, "Your Location", "");
        },
        () => {
          content.innerHTML = '<div class="weather-error">Location access denied.</div>';
        }
      );
    });

    async function loadWeather(lat, lon, name, country) {
      content.innerHTML = '<div class="weather-loading">Loading weather...</div>';
      try {
        const params = [
          `latitude=${lat}`,
          `longitude=${lon}`,
          "current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
          "daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
          "timezone=auto",
          "forecast_days=7",
        ].join("&");
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
        const data = await res.json();
        if (data.error) {
          content.innerHTML = `<div class="weather-error">${data.reason || "API error"}</div>`;
          return;
        }
        renderWeatherData(content, data, name, country);
      } catch {
        content.innerHTML = '<div class="weather-error">Failed to load weather data.</div>';
      }
    }

    function renderWeatherData(container, data, name, country) {
      const cur = data.current;
      const wmo = getWmo(cur.weather_code);
      const label = country ? `${name}, ${country}` : name;

      let forecastHTML = "";
      for (let i = 0; i < data.daily.time.length; i++) {
        const d = data.daily;
        const dayWmo = getWmo(d.weather_code[i]);
        const dayName = new Date(d.time[i] + "T00:00").toLocaleDateString(undefined, { weekday: "short" });
        forecastHTML += `
          <div class="forecast-day">
            <span class="forecast-name">${dayName}</span>
            <span class="forecast-icon">${dayWmo.icon}</span>
            <span class="forecast-temps">
              <span class="temp-hi">${Math.round(d.temperature_2m_max[i])}°</span>
              <span class="temp-lo">${Math.round(d.temperature_2m_min[i])}°</span>
            </span>
            <span class="forecast-rain">${d.precipitation_probability_max[i] ?? "-"}%</span>
          </div>
        `;
      }

      container.innerHTML = `
        <div class="weather-current">
          <div class="weather-main">
            <span class="weather-big-icon">${wmo.icon}</span>
            <div class="weather-temp-block">
              <span class="weather-temp">${Math.round(cur.temperature_2m)}°C</span>
              <span class="weather-desc">${wmo.desc}</span>
              <span class="weather-location">${label}</span>
            </div>
          </div>
          <div class="weather-details">
            <div class="weather-detail"><span>Feels like</span><strong>${Math.round(cur.apparent_temperature)}°C</strong></div>
            <div class="weather-detail"><span>Humidity</span><strong>${cur.relative_humidity_2m}%</strong></div>
            <div class="weather-detail"><span>Wind</span><strong>${Math.round(cur.wind_speed_10m)} km/h</strong></div>
          </div>
        </div>
        <div class="weather-forecast">
          <h4>7-Day Forecast</h4>
          <div class="forecast-grid">${forecastHTML}</div>
        </div>
      `;
    }
  }

  // ── Web Browser App ──────────────────────────────────
  function renderBrowserApp(el) {
    const homepage = "https://www.wikipedia.org";
    const history = [homepage];
    let historyIndex = 0;

    el.innerHTML = `
      <div class="browser-app">
        <div class="browser-toolbar">
          <button class="browser-nav-btn" data-action="back" title="Back" disabled>◀</button>
          <button class="browser-nav-btn" data-action="forward" title="Forward" disabled>▶</button>
          <button class="browser-nav-btn" data-action="refresh" title="Refresh">⟳</button>
          <button class="browser-nav-btn" data-action="home" title="Home">🏠</button>
          <div class="browser-url-bar">
            <input type="text" class="browser-url-input" value="${homepage}" spellcheck="false" />
          </div>
          <button class="browser-nav-btn browser-go-btn" data-action="go" title="Go">→</button>
        </div>
        <div class="browser-bookmarks-bar">
          <button class="browser-bookmark" data-url="https://www.arto.dk">⭐ arto.dk</button>
          <button class="browser-bookmark" data-url="https://www.seydur.ngrok.app">⭐ seydur.ngrok.app</button>
        </div>
        <div class="browser-viewport">
          <iframe class="browser-frame" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" src="${homepage}"></iframe>
          <div class="browser-error hidden">
            <div class="browser-error-icon">⚠️</div>
            <div class="browser-error-title">This page can't be displayed</div>
            <div class="browser-error-message">The website may have refused the connection, or the address may be incorrect.</div>
          </div>
        </div>
        <div class="browser-statusbar">Ready</div>
      </div>
    `;

    const urlInput    = el.querySelector(".browser-url-input");
    const iframe      = el.querySelector(".browser-frame");
    const backBtn     = el.querySelector('[data-action="back"]');
    const fwdBtn      = el.querySelector('[data-action="forward"]');
    const refreshBtn  = el.querySelector('[data-action="refresh"]');
    const homeBtn     = el.querySelector('[data-action="home"]');
    const goBtn       = el.querySelector('[data-action="go"]');
    const errorPanel  = el.querySelector(".browser-error");
    const statusBar   = el.querySelector(".browser-statusbar");

    function normalizeUrl(raw) {
      let url = raw.trim();
      if (!url) return homepage;
      if (!/^https?:\/\//i.test(url)) {
        // If it looks like a domain, add https
        if (/^[\w-]+(\.[\w-]+)+/.test(url)) {
          url = "https://" + url;
        } else {
          // Treat as search query
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

      // Trim forward history when navigating from middle
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
      navigate(homepage);
    });

    goBtn.addEventListener("click", () => {
      navigate(urlInput.value);
    });

    urlInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") navigate(urlInput.value);
    });

    // Allow typing in URL bar without dragging window
    urlInput.addEventListener("mousedown", (e) => e.stopPropagation());

    // Bookmarks
    el.querySelectorAll(".browser-bookmark").forEach((btn) => {
      btn.addEventListener("click", () => navigate(btn.dataset.url));
    });
  }

  // ── Image Generator App (Gemini API) ─────────────────
  function renderImageGenApp(el) {
    const envKey = (typeof __GEMINI_API_KEY__ !== "undefined") ? __GEMINI_API_KEY__ : "";
    const savedKey = localStorage.getItem("gemini-api-key") || envKey;

    el.innerHTML = `
      <div class="imagegen-app">
        <div class="imagegen-settings">
          <div class="imagegen-row">
            <label>API Key</label>
            <div class="imagegen-key-wrap">
              <input type="password" class="imagegen-input imagegen-key" placeholder="Gemini API Key" value="${savedKey}" />
              <button class="imagegen-eye-btn" title="Show/Hide">👁️</button>
            </div>
          </div>
          <div class="imagegen-row imagegen-row-pair">
            <div class="imagegen-field">
              <label>Model</label>
              <select class="imagegen-select imagegen-model">
                <option value="gemini-3.1-flash-image-preview">Gemini 3.1 Flash Image</option>
                <option value="gemini-2.0-flash-preview-image-generation">Gemini 2.0 Flash (Fast)</option>
                <option value="gemini-2.0-flash-lite-preview-image-generation">Gemini 2.0 Flash Lite</option>
              </select>
            </div>
            <div class="imagegen-field">
              <label>Aspect Ratio</label>
              <select class="imagegen-select imagegen-aspect">
                <option value="">Auto</option>
                <option value="1:1">1:1</option>
                <option value="3:4">3:4</option>
                <option value="4:3">4:3</option>
                <option value="9:16">9:16</option>
                <option value="16:9">16:9</option>
              </select>
            </div>
          </div>
        </div>

        <div class="imagegen-prompt-area">
          <textarea class="imagegen-prompt" rows="3" placeholder="Describe the image you want to generate..."></textarea>
          <div class="imagegen-upload-row">
            <label class="imagegen-upload-btn">📎 Upload Image (for editing)
              <input type="file" class="imagegen-file" accept="image/*" hidden />
            </label>
            <span class="imagegen-file-name">No file selected</span>
            <button class="imagegen-clear-file hidden">✕</button>
          </div>
        </div>

        <div class="imagegen-actions">
          <button class="imagegen-generate-btn">✨ Generate Image</button>
        </div>

        <div class="imagegen-output">
          <div class="imagegen-placeholder">Enter a prompt and click Generate to create an image.</div>
        </div>
      </div>
    `;

    const keyInput    = el.querySelector(".imagegen-key");
    const eyeBtn      = el.querySelector(".imagegen-eye-btn");
    const modelSelect = el.querySelector(".imagegen-model");
    const aspectSelect= el.querySelector(".imagegen-aspect");
    const promptArea  = el.querySelector(".imagegen-prompt");
    const fileInput   = el.querySelector(".imagegen-file");
    const fileName    = el.querySelector(".imagegen-file-name");
    const clearFile   = el.querySelector(".imagegen-clear-file");
    const generateBtn = el.querySelector(".imagegen-generate-btn");
    const output      = el.querySelector(".imagegen-output");

    let uploadedImageData = null;
    let uploadedMimeType  = null;

    // Save API key on change
    keyInput.addEventListener("input", () => {
      localStorage.setItem("gemini-api-key", keyInput.value.trim());
    });

    // Toggle key visibility
    eyeBtn.addEventListener("click", () => {
      keyInput.type = keyInput.type === "password" ? "text" : "password";
    });

    // File upload
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;
      fileName.textContent = file.name;
      clearFile.classList.remove("hidden");
      uploadedMimeType = file.type;
      const reader = new FileReader();
      reader.onload = () => {
        uploadedImageData = reader.result.split(",")[1]; // base64 part
      };
      reader.readAsDataURL(file);
    });

    clearFile.addEventListener("click", () => {
      fileInput.value = "";
      fileName.textContent = "No file selected";
      clearFile.classList.add("hidden");
      uploadedImageData = null;
      uploadedMimeType = null;
    });

    // Stop events from triggering window drag
    [keyInput, promptArea].forEach((inp) => {
      inp.addEventListener("mousedown", (e) => e.stopPropagation());
    });

    // Generate
    generateBtn.addEventListener("click", async () => {
      const apiKey = keyInput.value.trim();
      if (!apiKey) {
        output.innerHTML = '<div class="imagegen-error">Please enter your Gemini API key.</div>';
        return;
      }
      const prompt = promptArea.value.trim();
      if (!prompt) {
        output.innerHTML = '<div class="imagegen-error">Please enter a prompt.</div>';
        return;
      }

      const model  = modelSelect.value;
      const aspect = aspectSelect.value;

      // Build request parts
      const parts = [];
      parts.push({ text: prompt });
      if (uploadedImageData) {
        parts.push({ inlineData: { mimeType: uploadedMimeType, data: uploadedImageData } });
      }

      const body = {
        contents: [{ parts }],
        generationConfig: {
          responseModalities: ["TEXT", "IMAGE"],
        },
      };
      if (aspect) {
        body.generationConfig.aspectRatio = aspect;
      }

      output.innerHTML = '<div class="imagegen-loading"><div class="imagegen-spinner"></div>Generating image…</div>';
      generateBtn.disabled = true;

      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();

        if (!res.ok) {
          const msg = data.error?.message || res.statusText;
          output.innerHTML = `<div class="imagegen-error">API Error: ${escapeHtml(msg)}</div>`;
          return;
        }

        if (!data.candidates || !data.candidates[0]?.content?.parts) {
          const block = data.promptFeedback?.blockReason;
          output.innerHTML = `<div class="imagegen-error">${block ? "Blocked: " + escapeHtml(block) : "No content returned. Try a different prompt."}</div>`;
          return;
        }

        let html = '';
        for (const part of data.candidates[0].content.parts) {
          if (part.inlineData) {
            const src = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
            html += `<div class="imagegen-result-img"><img src="${src}" alt="Generated image" /><a class="imagegen-download" href="${src}" download="generated-image.png">💾 Save Image</a></div>`;
          } else if (part.text) {
            html += `<div class="imagegen-feedback">${escapeHtml(part.text)}</div>`;
          }
        }
        output.innerHTML = html || '<div class="imagegen-error">No image was generated. Try a different prompt.</div>';
      } catch (err) {
        output.innerHTML = `<div class="imagegen-error">Request failed: ${escapeHtml(err.message)}</div>`;
      } finally {
        generateBtn.disabled = false;
      }
    });

    // Allow Enter (Ctrl+Enter) to generate
    promptArea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.ctrlKey) {
        e.preventDefault();
        generateBtn.click();
      }
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function renderQuotesApp(el) {
    const quoteObj = fakeQuotes[Math.floor(Math.random() * fakeQuotes.length)];
    el.innerHTML = `
      <div class="quotes-app">
        <div class="quote-container">
          <p class="quote-text">"${quoteObj.text}"</p>
          <p class="quote-author">— ${quoteObj.author}</p>
        </div>
        <button class="new-quote-btn">Next Fake Quote</button>
      </div>
    `;
    el.querySelector(".new-quote-btn").addEventListener("click", () => renderQuotesApp(el));
  }

  // ── Taskbar Items ──────────────────────────────────────
  function addTaskbarItem(id, app) {
    const el = document.createElement("div");
    el.className = "taskbar-item active";
    el.dataset.winId = id;
    el.innerHTML = `<div class="tb-icon" style="background:none;font-size:14px;display:flex;align-items:center;justify-content:center;">${app.icon}</div><span>${app.name}</span>`;
    el.addEventListener("click", () => {
      const win = openWindows.get(id);
      if (!win) return;
      if (win.minimized) {
        restoreWindow(id);
        focusWindow(id);
      } else if (win.el.classList.contains("active")) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    });
    $taskbarItems.appendChild(el);
  }

  function removeTaskbarItem(id) {
    const el = $taskbarItems.querySelector(`[data-win-id="${id}"]`);
    if (el) el.remove();
  }

  // ── Dragging ───────────────────────────────────────────
  function makeDraggable(winEl) {
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

  // ── Context Menu ───────────────────────────────────────
  function showContextMenu(e) {
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

  function removeContextMenu() {
    document.querySelectorAll(".context-menu").forEach((m) => m.remove());
  }

  // ── Global Events ──────────────────────────────────────
  function bindGlobalEvents() {
    // Start button
    $startBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleStartMenu();
    });

    // Close start menu on outside click
    document.addEventListener("click", (e) => {
      if (!$startMenu.classList.contains("hidden") && !$startMenu.contains(e.target) && !$startBtn.contains(e.target)) {
        toggleStartMenu(false);
      }
      removeContextMenu();
    });

    // Desktop right-click
    document.getElementById("desktop").addEventListener("contextmenu", showContextMenu);

    // Keyboard: Escape closes start menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        toggleStartMenu(false);
        removeContextMenu();
      }
    });
  }

  // ── Boot ───────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", init);
})();
