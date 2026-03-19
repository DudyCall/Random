(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`dice`,name:`Dice Roller`,icon:`🎲`},{id:`coin`,name:`Coin Flip`,icon:`🪙`},{id:`password`,name:`Password Gen`,icon:`🔑`},{id:`color`,name:`Color Picker`,icon:`🎨`},{id:`timer`,name:`Timer`,icon:`⏱️`},{id:`notes`,name:`Notepad`,icon:`📝`},{id:`calculator`,name:`Calculator`,icon:`🧮`},{id:`quotes`,name:`Random Quotes`,icon:`💬`},{id:`trivia`,name:`Trivia`,icon:`❓`},{id:`weather`,name:`Weather`,icon:`🌤️`},{id:`tracker`,name:`Daily Tracker`,icon:`📅`},{id:`browser`,name:`Web Browser`,icon:`🌐`},{id:`imagegen`,name:`Image Generator`,icon:`🖼️`}],t=0,n=10,r=new Map;function i(){return++t}function a(){return++n}var o=[{text:`The best way to predict the future is to invent a new sandwich.`,author:`Bill Gates`},{text:`I didn't fail, I just found 10,000 ways that a toaster won't fly.`,author:`Thomas Edison`},{text:`If you want to live a happy life, tie it up in a neat little bow and hope for the best.`,author:`Albert Einstein`},{text:`Stay hungry, stay foolish, but mostly stay away from the microwave.`,author:`Steve Jobs`},{text:`To be or not to be, that's not really the question, the question is 'What's for dinner?'`,author:`William Shakespeare`},{text:`Information is not knowledge, knowledge is not wisdom, wisdom is not a good burger.`,author:`Frank Zappa`},{text:`The only thing we have to fear is fear itself, and spiders. Definitely spiders.`,author:`Franklin D. Roosevelt`},{text:`I have a dream, that one day I will finally find my car keys.`,author:`Martin Luther King Jr.`},{text:`You miss 100% of the shots you don't take, especially at the bar.`,author:`Wayne Gretzky`},{text:`The greatest glory in living lies not in never falling, but in always having a good excuse.`,author:`Nelson Mandela`}];function s(e){let t=o[Math.floor(Math.random()*o.length)];e.innerHTML=`
    <div class="quotes-app">
      <div class="quote-container">
        <p class="quote-text">"${t.text}"</p>
        <p class="quote-author">— ${t.author}</p>
      </div>
      <button class="new-quote-btn">Next Fake Quote</button>
    </div>
  `,e.querySelector(`.new-quote-btn`).addEventListener(`click`,()=>s(e))}var c={0:{desc:`Clear sky`,icon:`☀️`},1:{desc:`Mainly clear`,icon:`🌤️`},2:{desc:`Partly cloudy`,icon:`⛅`},3:{desc:`Overcast`,icon:`☁️`},45:{desc:`Fog`,icon:`🌫️`},48:{desc:`Depositing rime fog`,icon:`🌫️`},51:{desc:`Light drizzle`,icon:`🌦️`},53:{desc:`Moderate drizzle`,icon:`🌦️`},55:{desc:`Dense drizzle`,icon:`🌦️`},61:{desc:`Slight rain`,icon:`🌧️`},63:{desc:`Moderate rain`,icon:`🌧️`},65:{desc:`Heavy rain`,icon:`🌧️`},71:{desc:`Slight snow`,icon:`🌨️`},73:{desc:`Moderate snow`,icon:`🌨️`},75:{desc:`Heavy snow`,icon:`🌨️`},77:{desc:`Snow grains`,icon:`🌨️`},80:{desc:`Slight showers`,icon:`🌦️`},81:{desc:`Moderate showers`,icon:`🌦️`},82:{desc:`Violent showers`,icon:`🌦️`},85:{desc:`Slight snow showers`,icon:`🌨️`},86:{desc:`Heavy snow showers`,icon:`🌨️`},95:{desc:`Thunderstorm`,icon:`⛈️`},96:{desc:`Thunderstorm with hail`,icon:`⛈️`},99:{desc:`Thunderstorm with heavy hail`,icon:`⛈️`}};function l(e){return c[e]||{desc:`Unknown`,icon:`❓`}}function u(e){e.innerHTML=`
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
  `;let t=e.querySelector(`.weather-input`),n=e.querySelector(`.weather-search-btn`),r=e.querySelector(`.weather-locate-btn`),i=e.querySelector(`.weather-content`);async function a(){let e=t.value.trim();if(e){i.innerHTML=`<div class="weather-loading">Searching...</div>`;try{let t=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(e)}&count=1&language=en&format=json`,n=await(await fetch(t)).json();if(!n.results||n.results.length===0){i.innerHTML=`<div class="weather-error">City not found. Try another name.</div>`;return}let r=n.results[0];await o(r.latitude,r.longitude,r.name,r.country)}catch{i.innerHTML=`<div class="weather-error">Failed to search. Check your connection.</div>`}}}n.addEventListener(`click`,a),t.addEventListener(`keydown`,e=>{e.key===`Enter`&&a()}),r.addEventListener(`click`,()=>{if(!navigator.geolocation){i.innerHTML=`<div class="weather-error">Geolocation not supported by your browser.</div>`;return}i.innerHTML=`<div class="weather-loading">Getting your location...</div>`,navigator.geolocation.getCurrentPosition(async e=>{await o(e.coords.latitude,e.coords.longitude,`Your Location`,``)},()=>{i.innerHTML=`<div class="weather-error">Location access denied.</div>`})});async function o(e,t,n,r){i.innerHTML=`<div class="weather-loading">Loading weather...</div>`;try{let a=[`latitude=${e}`,`longitude=${t}`,`current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`,`daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max`,`timezone=auto`,`forecast_days=7`].join(`&`),o=await(await fetch(`https://api.open-meteo.com/v1/forecast?${a}`)).json();if(o.error){i.innerHTML=`<div class="weather-error">${o.reason||`API error`}</div>`;return}s(i,o,n,r)}catch{i.innerHTML=`<div class="weather-error">Failed to load weather data.</div>`}}function s(e,t,n,r){let i=t.current,a=l(i.weather_code),o=r?`${n}, ${r}`:n,s=``;for(let e=0;e<t.daily.time.length;e++){let n=t.daily,r=l(n.weather_code[e]),i=new Date(n.time[e]+`T00:00`).toLocaleDateString(void 0,{weekday:`short`});s+=`
        <div class="forecast-day">
          <span class="forecast-name">${i}</span>
          <span class="forecast-icon">${r.icon}</span>
          <span class="forecast-temps">
            <span class="temp-hi">${Math.round(n.temperature_2m_max[e])}°</span>
            <span class="temp-lo">${Math.round(n.temperature_2m_min[e])}°</span>
          </span>
          <span class="forecast-rain">${n.precipitation_probability_max[e]??`-`}%</span>
        </div>
      `}e.innerHTML=`
      <div class="weather-current">
        <div class="weather-main">
          <span class="weather-big-icon">${a.icon}</span>
          <div class="weather-temp-block">
            <span class="weather-temp">${Math.round(i.temperature_2m)}°C</span>
            <span class="weather-desc">${a.desc}</span>
            <span class="weather-location">${o}</span>
          </div>
        </div>
        <div class="weather-details">
          <div class="weather-detail"><span>Feels like</span><strong>${Math.round(i.apparent_temperature)}°C</strong></div>
          <div class="weather-detail"><span>Humidity</span><strong>${i.relative_humidity_2m}%</strong></div>
          <div class="weather-detail"><span>Wind</span><strong>${Math.round(i.wind_speed_10m)} km/h</strong></div>
        </div>
      </div>
      <div class="weather-forecast">
        <h4>7-Day Forecast</h4>
        <div class="forecast-grid">${s}</div>
      </div>
    `}}async function d(){try{let e=await fetch(`https://api.github.com/repos/DudyCall/Random/commits?per_page=10`);if(!e.ok)return e.status===403?{error:`GitHub API rate limit exceeded. Try again later.`}:e.status===404?{error:`Project not found. Is it public?`}:{error:`GitHub error: ${e.statusText}`};let t=await e.json(),n=new Date().toISOString().split(`T`)[0],r=!1,i=!1;return t.forEach(e=>{if(e.commit.author.date.split(`T`)[0]===n){let t=e.author?e.author.login.toLowerCase():e.commit.author.name.toLowerCase();t===`dudycall`&&(r=!0),t===`loyvir`&&(i=!0)}}),{dudycall:r,loyvir:i,both:r&&i}}catch{return{error:`Failed to connect to GitHub.`}}}async function f(e){e.innerHTML=`
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
  `;let t=e.querySelector(`#tracker-content`),n=e.querySelector(`.sync-btn`);async function r(){t.innerHTML=`<div class="loading-spinner">Fetching latest commits...</div>`,n.disabled=!0;let e=await d();if(n.disabled=!1,e.error){t.innerHTML=`<div class="tracker-error">${e.error}</div>`;return}t.innerHTML=`
      <div class="contribution-list">
        <div class="contributor ${e.dudycall?`done`:`pending`}">
          <span class="status-icon">${e.dudycall?`✅`:`⏳`}</span>
          <span class="user-name">Dudycall</span>
          <span class="status-label">${e.dudycall?`Added something today!`:`Not yet...`}</span>
        </div>
        <div class="contributor ${e.loyvir?`done`:`pending`}">
          <span class="status-icon">${e.loyvir?`✅`:`⏳`}</span>
          <span class="user-name">Loyvir</span>
          <span class="status-label">${e.loyvir?`Added something today!`:`Not yet...`}</span>
        </div>
      </div>
      <div class="overall-status ${e.both?`complete`:``}">
        ${e.both?`🎉 Day Complete! Great work team!`:`💪 Keep going! Both players need to contribute.`}
      </div>
    `}n.addEventListener(`click`,r),r()}function p(e){let t=`https://www.wikipedia.org`,n=[t],r=0;e.innerHTML=`
    <div class="browser-app">
      <div class="browser-toolbar">
        <button class="browser-nav-btn" data-action="back" title="Back" disabled>◀</button>
        <button class="browser-nav-btn" data-action="forward" title="Forward" disabled>▶</button>
        <button class="browser-nav-btn" data-action="refresh" title="Refresh">⟳</button>
        <button class="browser-nav-btn" data-action="home" title="Home">🏠</button>
        <div class="browser-url-bar">
          <input type="text" class="browser-url-input" value="${t}" spellcheck="false" />
        </div>
        <button class="browser-nav-btn browser-go-btn" data-action="go" title="Go">→</button>
      </div>
      <div class="browser-bookmarks-bar">
        <button class="browser-bookmark" data-url="https://www.arto.dk">⭐ arto.dk</button>
        <button class="browser-bookmark" data-url="https://www.seydur.ngrok.app">⭐ seydur.ngrok.app</button>
      </div>
      <div class="browser-viewport">
        <iframe class="browser-frame" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" src="${t}"></iframe>
        <div class="browser-error hidden">
          <div class="browser-error-icon">⚠️</div>
          <div class="browser-error-title">This page can't be displayed</div>
          <div class="browser-error-message">The website may have refused the connection, or the address may be incorrect.</div>
        </div>
      </div>
      <div class="browser-statusbar">Ready</div>
    </div>
  `;let i=e.querySelector(`.browser-url-input`),a=e.querySelector(`.browser-frame`),o=e.querySelector(`[data-action="back"]`),s=e.querySelector(`[data-action="forward"]`),c=e.querySelector(`[data-action="refresh"]`),l=e.querySelector(`[data-action="home"]`),u=e.querySelector(`[data-action="go"]`),d=e.querySelector(`.browser-error`),f=e.querySelector(`.browser-statusbar`);function p(e){let n=e.trim();return n?(/^https?:\/\//i.test(n)||(n=/^[\w-]+(\.[\w-]+)+/.test(n)?`https://`+n:`https://www.google.com/search?igu=1&q=`+encodeURIComponent(n)),n):t}function m(e){e=p(e),i.value=e,f.textContent=`Loading `+e+`...`,d.classList.add(`hidden`),a.classList.remove(`hidden`),a.src=e,r<n.length-1&&n.splice(r+1),n.push(e),r=n.length-1,h()}function h(){o.disabled=r<=0,s.disabled=r>=n.length-1}a.addEventListener(`load`,()=>{f.textContent=`Done`}),a.addEventListener(`error`,()=>{f.textContent=`Error loading page`,a.classList.add(`hidden`),d.classList.remove(`hidden`)}),o.addEventListener(`click`,()=>{if(r>0){r--;let e=n[r];i.value=e,a.src=e,d.classList.add(`hidden`),a.classList.remove(`hidden`),f.textContent=`Loading...`,h()}}),s.addEventListener(`click`,()=>{if(r<n.length-1){r++;let e=n[r];i.value=e,a.src=e,d.classList.add(`hidden`),a.classList.remove(`hidden`),f.textContent=`Loading...`,h()}}),c.addEventListener(`click`,()=>{a.src=a.src,f.textContent=`Refreshing...`}),l.addEventListener(`click`,()=>{m(t)}),u.addEventListener(`click`,()=>{m(i.value)}),i.addEventListener(`keydown`,e=>{e.key===`Enter`&&m(i.value)}),i.addEventListener(`mousedown`,e=>e.stopPropagation()),e.querySelectorAll(`.browser-bookmark`).forEach(e=>{e.addEventListener(`click`,()=>m(e.dataset.url))})}function m(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function h(e){e.innerHTML=`
    <div class="imagegen-app">
      <div class="imagegen-settings">
        <div class="imagegen-row">
          <label>API Key</label>
          <div class="imagegen-key-wrap">
            <input type="password" class="imagegen-input imagegen-key" placeholder="Gemini API Key" value="${localStorage.getItem(`gemini-api-key`)||`AIzaSyCecc-OGCX6Fv7XgPQWPmp4y0Sb4k9kbV4`}" />
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
  `;let t=e.querySelector(`.imagegen-key`),n=e.querySelector(`.imagegen-eye-btn`),r=e.querySelector(`.imagegen-model`),i=e.querySelector(`.imagegen-aspect`),a=e.querySelector(`.imagegen-prompt`),o=e.querySelector(`.imagegen-file`),s=e.querySelector(`.imagegen-file-name`),c=e.querySelector(`.imagegen-clear-file`),l=e.querySelector(`.imagegen-generate-btn`),u=e.querySelector(`.imagegen-output`),d=null,f=null;t.addEventListener(`input`,()=>{localStorage.setItem(`gemini-api-key`,t.value.trim())}),n.addEventListener(`click`,()=>{t.type=t.type===`password`?`text`:`password`}),o.addEventListener(`change`,()=>{let e=o.files[0];if(!e)return;s.textContent=e.name,c.classList.remove(`hidden`),f=e.type;let t=new FileReader;t.onload=()=>{d=t.result.split(`,`)[1]},t.readAsDataURL(e)}),c.addEventListener(`click`,()=>{o.value=``,s.textContent=`No file selected`,c.classList.add(`hidden`),d=null,f=null}),[t,a].forEach(e=>{e.addEventListener(`mousedown`,e=>e.stopPropagation())}),l.addEventListener(`click`,async()=>{let e=t.value.trim();if(!e){u.innerHTML=`<div class="imagegen-error">Please enter your Gemini API key.</div>`;return}let n=a.value.trim();if(!n){u.innerHTML=`<div class="imagegen-error">Please enter a prompt.</div>`;return}let o=r.value,s=i.value,c=[];c.push({text:n}),d&&c.push({inlineData:{mimeType:f,data:d}});let p={contents:[{parts:c}],generationConfig:{responseModalities:[`TEXT`,`IMAGE`]}};s&&(p.generationConfig.aspectRatio=s),u.innerHTML=`<div class="imagegen-loading"><div class="imagegen-spinner"></div>Generating image…</div>`,l.disabled=!0;try{let t=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(o)}:generateContent?key=${encodeURIComponent(e)}`,n=await fetch(t,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(p)}),r=await n.json();if(!n.ok){u.innerHTML=`<div class="imagegen-error">API Error: ${m(r.error?.message||n.statusText)}</div>`;return}if(!r.candidates||!r.candidates[0]?.content?.parts){let e=r.promptFeedback?.blockReason;u.innerHTML=`<div class="imagegen-error">${e?`Blocked: `+m(e):`No content returned. Try a different prompt.`}</div>`;return}let i=``;for(let e of r.candidates[0].content.parts)if(e.inlineData){let t=`data:${e.inlineData.mimeType||`image/png`};base64,${e.inlineData.data}`;i+=`<div class="imagegen-result-img"><img src="${t}" alt="Generated image" /><a class="imagegen-download" href="${t}" download="generated-image.png">💾 Save Image</a></div>`}else e.text&&(i+=`<div class="imagegen-feedback">${m(e.text)}</div>`);u.innerHTML=i||`<div class="imagegen-error">No image was generated. Try a different prompt.</div>`}catch(e){u.innerHTML=`<div class="imagegen-error">Request failed: ${m(e.message)}</div>`}finally{l.disabled=!1}}),a.addEventListener(`keydown`,e=>{e.key===`Enter`&&e.ctrlKey&&(e.preventDefault(),l.click())})}var g={quotes:s,weather:u,tracker:f,browser:p,imagegen:h};function _(e,t,n){let r=document.getElementById(`taskbar-items`),i=document.createElement(`div`);i.className=`taskbar-item active`,i.dataset.winId=e,i.innerHTML=`<div class="tb-icon" style="background:none;font-size:14px;display:flex;align-items:center;justify-content:center;">${t.icon}</div><span>${t.name}</span>`,i.addEventListener(`click`,n),r.appendChild(i)}function v(e){let t=document.getElementById(`taskbar-items`).querySelector(`[data-win-id="${e}"]`);t&&t.remove()}function y(e){let t=e.querySelector(`.window-titlebar`),n=!1,r,i,a,o;t.addEventListener(`mousedown`,t=>{t.target.closest(`.window-controls`)||e.classList.contains(`maximized`)||(n=!0,r=t.clientX,i=t.clientY,a=e.offsetLeft,o=e.offsetTop,document.body.style.cursor=`grabbing`,t.preventDefault())}),document.addEventListener(`mousemove`,t=>{if(!n)return;let s=t.clientX-r,c=t.clientY-i;e.style.left=a+s+`px`,e.style.top=o+c+`px`}),document.addEventListener(`mouseup`,()=>{n&&(n=!1,document.body.style.cursor=``)})}function b(e){for(let[t,n]of r)if(n.appId===e.id){C(t),x(t);return}let t=i(),n=document.getElementById(`window-template`),a=document.getElementById(`windows-container`),o=n.content.cloneNode(!0).querySelector(`.vista-window`);o.dataset.winId=t,o.querySelector(`.window-title`).textContent=e.name;let s=o.querySelector(`.window-body`),c=g[e.id];c?c(s):s.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:center;height:100%;opacity:0.3;font-size:48px;">
        ${e.icon}
      </div>
    `;let l=t%8*30;o.style.top=40+l+`px`,o.style.left=60+l+`px`,o.querySelector(`.minimize`).addEventListener(`click`,()=>S(t)),o.querySelector(`.maximize`).addEventListener(`click`,()=>w(t)),o.querySelector(`.close`).addEventListener(`click`,()=>T(t)),o.addEventListener(`mousedown`,()=>x(t)),y(o),a.appendChild(o),r.set(t,{el:o,title:e.name,appId:e.id,minimized:!1,maximized:!1}),_(t,e,()=>{let e=r.get(t);e&&(e.minimized?(C(t),x(t)):e.el.classList.contains(`active`)?S(t):x(t))}),x(t)}function x(e){let t=a(),n=r.get(e);n&&(r.forEach(e=>e.el.classList.remove(`active`)),n.el.classList.add(`active`),n.el.style.zIndex=t,document.querySelectorAll(`.taskbar-item`).forEach(t=>{t.classList.toggle(`active`,+t.dataset.winId===e)}))}function S(e){let t=r.get(e);t&&(t.minimized=!0,t.el.classList.add(`minimized`))}function C(e){let t=r.get(e);t&&(t.minimized=!1,t.el.classList.remove(`minimized`))}function w(e){let t=r.get(e);t&&(t.maximized=!t.maximized,t.el.classList.toggle(`maximized`,t.maximized))}function T(e){let t=r.get(e);t&&(t.el.remove(),r.delete(e),v(e))}function E(){let t=document.getElementById(`desktop-icons`);e.forEach(e=>{let n=document.createElement(`div`);n.className=`desktop-icon`,n.tabIndex=0,n.setAttribute(`data-app`,e.id),n.innerHTML=`
      <div class="icon-img">${e.icon}</div>
      <span class="icon-label">${e.name}</span>
    `,n.addEventListener(`dblclick`,()=>b(e)),n.addEventListener(`keydown`,t=>{t.key===`Enter`&&b(e)}),t.appendChild(n)})}function D(){let t=document.getElementById(`start-menu-apps`);e.forEach(e=>{let n=document.createElement(`a`);n.href=`#`,n.className=`start-menu-app`,n.innerHTML=`
      <span class="app-icon">${e.icon}</span>
      <span class="app-name">${e.name}</span>
    `,n.addEventListener(`click`,t=>{t.preventDefault(),O(!1),b(e)}),t.appendChild(n)})}function O(e){let t=document.getElementById(`start-menu`),n=typeof e==`boolean`?e:t.classList.contains(`hidden`);t.classList.toggle(`hidden`,!n)}function k(e){e.preventDefault(),A();let t=document.createElement(`div`);t.className=`context-menu`,t.innerHTML=`
    <div class="context-menu-item" data-action="refresh">Refresh</div>
    <div class="context-menu-separator"></div>
    <div class="context-menu-item" data-action="view-large">View: Large Icons</div>
    <div class="context-menu-item" data-action="view-small">View: Small Icons</div>
    <div class="context-menu-separator"></div>
    <div class="context-menu-item" data-action="about">About</div>
  `,t.style.left=e.clientX+`px`,t.style.top=e.clientY+`px`,t.querySelectorAll(`.context-menu-item`).forEach(e=>{e.addEventListener(`click`,()=>{A()})}),document.body.appendChild(t)}function A(){document.querySelectorAll(`.context-menu`).forEach(e=>e.remove())}function j(){let e=document.getElementById(`clock`);e.textContent=new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})}function M(){E(),D(),N(),j(),setInterval(j,1e3)}function N(){let e=document.getElementById(`start-button`),t=document.getElementById(`start-menu`);e.addEventListener(`click`,e=>{e.stopPropagation(),O()}),document.addEventListener(`click`,n=>{!t.classList.contains(`hidden`)&&!t.contains(n.target)&&!e.contains(n.target)&&O(!1),A()}),document.getElementById(`desktop`).addEventListener(`contextmenu`,k),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(O(!1),A())})}document.addEventListener(`DOMContentLoaded`,M);