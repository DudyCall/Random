(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`dice`,name:`Dice Roller`,icon:`🎲`},{id:`coin`,name:`Coin Flip`,icon:`🪙`},{id:`password`,name:`Password Gen`,icon:`🔑`},{id:`color`,name:`Color Picker`,icon:`🎨`},{id:`timer`,name:`Timer`,icon:`⏱️`},{id:`notes`,name:`Notepad`,icon:`📝`},{id:`calculator`,name:`Calculator`,icon:`🧮`},{id:`quotes`,name:`Random Quotes`,icon:`💬`},{id:`trivia`,name:`Trivia`,icon:`❓`},{id:`weather`,name:`Weather`,icon:`🌤️`},{id:`tracker`,name:`Daily Tracker`,icon:`📅`},{id:`browser`,name:`Web Browser`,icon:`🌐`},{id:`imagegen`,name:`Image Generator`,icon:`🖼️`}],t=0,n=10,r=new Map;function i(){return++t}function a(){return++n}function o(e){e.innerHTML=`
    <div class="dice-app" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;">
      <div class="dice-display" style="font-size:80px;line-height:1;user-select:none;">🎲</div>
      <div class="dice-result" style="font-size:36px;font-weight:700;min-height:44px;"></div>
      <div style="display:flex;gap:8px;align-items:center;">
        <label style="font-size:13px;">Dice:
          <select class="dice-type" style="font-size:13px;padding:2px 4px;">
            <option value="6" selected>d6</option>
            <option value="4">d4</option>
            <option value="8">d8</option>
            <option value="10">d10</option>
            <option value="12">d12</option>
            <option value="20">d20</option>
            <option value="100">d100</option>
          </select>
        </label>
        <label style="font-size:13px;">Count:
          <input type="number" class="dice-count" min="1" max="10" value="1"
            style="width:48px;font-size:13px;padding:2px 4px;" />
        </label>
      </div>
      <button class="dice-roll-btn" style="padding:8px 24px;font-size:16px;cursor:pointer;border-radius:6px;border:1px solid #888;">
        🎲 Roll
      </button>
      <div class="dice-history" style="font-size:12px;color:#666;max-height:60px;overflow-y:auto;text-align:center;"></div>
    </div>
  `;let t=e.querySelector(`.dice-display`),n=e.querySelector(`.dice-result`),r=e.querySelector(`.dice-type`),i=e.querySelector(`.dice-count`),a=e.querySelector(`.dice-roll-btn`),o=e.querySelector(`.dice-history`),s=[`⚀`,`⚁`,`⚂`,`⚃`,`⚄`,`⚅`];a.addEventListener(`click`,()=>{let e=parseInt(r.value,10),a=Math.min(Math.max(parseInt(i.value,10)||1,1),10),c=[];for(let t=0;t<a;t++)c.push(Math.floor(Math.random()*e)+1);let l=c.reduce((e,t)=>e+t,0);e===6&&a===1?t.textContent=s[c[0]-1]:t.textContent=`🎲`,n.textContent=a===1?c[0]:`${c.join(` + `)} = ${l}`,o.textContent=(o.textContent?o.textContent+` | `:``)+`[${c.join(`,`)}]`}),[r,i].forEach(e=>e.addEventListener(`mousedown`,e=>e.stopPropagation()))}function s(e){e.innerHTML=`
    <div class="coin-app" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;">
      <div class="coin-display" style="font-size:80px;line-height:1;user-select:none;">🪙</div>
      <div class="coin-result" style="font-size:28px;font-weight:700;min-height:36px;"></div>
      <button class="coin-flip-btn" style="padding:8px 24px;font-size:16px;cursor:pointer;border-radius:6px;border:1px solid #888;">
        🪙 Flip
      </button>
      <div class="coin-stats" style="font-size:12px;color:#666;"></div>
    </div>
  `;let t=e.querySelector(`.coin-display`),n=e.querySelector(`.coin-result`),r=e.querySelector(`.coin-flip-btn`),i=e.querySelector(`.coin-stats`),a=0,o=0;r.addEventListener(`click`,()=>{let e=Math.random()<.5;e?a++:o++,t.textContent=e?`🟡`:`⚪`,n.textContent=e?`Heads!`:`Tails!`,i.textContent=`Heads: ${a}  |  Tails: ${o}`})}function c(e){e.innerHTML=`
    <div class="password-app" style="display:flex;flex-direction:column;height:100%;padding:12px;gap:12px;">
      <div style="display:flex;gap:8px;align-items:center;">
        <input class="pw-output" type="text" readonly
          style="flex:1;padding:8px;font-family:monospace;font-size:16px;border:1px solid #aaa;border-radius:4px;" />
        <button class="pw-copy" title="Copy" style="font-size:18px;cursor:pointer;border:1px solid #aaa;border-radius:4px;padding:4px 10px;">📋</button>
      </div>
      <div style="display:flex;gap:12px;align-items:center;font-size:13px;">
        <label>Length: <input type="range" class="pw-length" min="4" max="64" value="16" />
          <span class="pw-length-val">16</span>
        </label>
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:13px;">
        <label><input type="checkbox" class="pw-upper" checked /> A-Z</label>
        <label><input type="checkbox" class="pw-lower" checked /> a-z</label>
        <label><input type="checkbox" class="pw-digits" checked /> 0-9</label>
        <label><input type="checkbox" class="pw-symbols" checked /> !@#$</label>
      </div>
      <button class="pw-generate" style="padding:8px;font-size:14px;cursor:pointer;border-radius:6px;border:1px solid #888;">
        🔑 Generate Password
      </button>
      <div class="pw-strength" style="font-size:12px;color:#666;"></div>
    </div>
  `;let t=e.querySelector(`.pw-output`),n=e.querySelector(`.pw-copy`),r=e.querySelector(`.pw-length`),i=e.querySelector(`.pw-length-val`),a=e.querySelector(`.pw-upper`),o=e.querySelector(`.pw-lower`),s=e.querySelector(`.pw-digits`),c=e.querySelector(`.pw-symbols`),l=e.querySelector(`.pw-generate`),u=e.querySelector(`.pw-strength`),d={upper:`ABCDEFGHIJKLMNOPQRSTUVWXYZ`,lower:`abcdefghijklmnopqrstuvwxyz`,digits:`0123456789`,symbols:`!@#$%^&*()-_=+[]{}|;:,.<>?`};r.addEventListener(`input`,()=>{i.textContent=r.value});function f(){let e=``;if(a.checked&&(e+=d.upper),o.checked&&(e+=d.lower),s.checked&&(e+=d.digits),c.checked&&(e+=d.symbols),!e){t.value=``,u.textContent=`Select at least one character set.`;return}let n=parseInt(r.value,10),i=new Uint32Array(n);crypto.getRandomValues(i);let l=``;for(let t=0;t<n;t++)l+=e[i[t]%e.length];t.value=l,u.textContent=`Strength: ~${Math.floor(n*Math.log2(e.length))} bits of entropy`}l.addEventListener(`click`,f),n.addEventListener(`click`,()=>{navigator.clipboard.writeText(t.value),n.textContent=`✅`,setTimeout(()=>n.textContent=`📋`,1500)}),t.addEventListener(`mousedown`,e=>e.stopPropagation()),f()}function l(e){e.innerHTML=`
    <div class="color-app" style="display:flex;flex-direction:column;height:100%;padding:12px;gap:12px;">
      <div class="color-preview" style="flex:1;border-radius:8px;border:1px solid #aaa;min-height:80px;"></div>
      <div style="display:flex;gap:8px;align-items:center;">
        <input type="color" class="color-picker" value="#4a90d9" style="width:48px;height:36px;border:none;cursor:pointer;" />
        <input type="text" class="color-hex" value="#4A90D9" spellcheck="false"
          style="flex:1;padding:6px 8px;font-family:monospace;font-size:15px;border:1px solid #aaa;border-radius:4px;text-transform:uppercase;" />
        <button class="color-copy" title="Copy" style="font-size:18px;cursor:pointer;border:1px solid #aaa;border-radius:4px;padding:4px 10px;">📋</button>
      </div>
      <div class="color-info" style="font-size:12px;color:#555;font-family:monospace;"></div>
      <button class="color-random-btn" style="padding:8px;font-size:14px;cursor:pointer;border-radius:6px;border:1px solid #888;">
        🎨 Random Color
      </button>
    </div>
  `;let t=e.querySelector(`.color-preview`),n=e.querySelector(`.color-picker`),r=e.querySelector(`.color-hex`),i=e.querySelector(`.color-copy`),a=e.querySelector(`.color-info`),o=e.querySelector(`.color-random-btn`);function s(e){let t=parseInt(e.replace(`#`,``),16);return{r:t>>16&255,g:t>>8&255,b:t&255}}function c(e){e=e.toUpperCase(),t.style.background=e,n.value=e,r.value=e;let{r:i,g:o,b:c}=s(e);a.textContent=`RGB: ${i}, ${o}, ${c}`}n.addEventListener(`input`,()=>c(n.value)),r.addEventListener(`change`,()=>{let e=r.value.trim();/^#?[0-9a-f]{6}$/i.test(e)&&c(e.startsWith(`#`)?e:`#`+e)}),i.addEventListener(`click`,()=>{navigator.clipboard.writeText(r.value),i.textContent=`✅`,setTimeout(()=>i.textContent=`📋`,1500)}),o.addEventListener(`click`,()=>{c(`#`+Math.floor(Math.random()*16777215).toString(16).padStart(6,`0`))}),[r].forEach(e=>e.addEventListener(`mousedown`,e=>e.stopPropagation())),c(`#4A90D9`)}function u(e){e.innerHTML=`
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
  `;let t=e.querySelector(`.timer-display`),n=e.querySelector(`.timer-min`),r=e.querySelector(`.timer-sec`),i=e.querySelector(`.timer-start`),a=e.querySelector(`.timer-pause`),o=e.querySelector(`.timer-reset`),s=e.querySelector(`.timer-inputs`),c=null,l=0,u=!0;e.querySelectorAll(`input[name="timer-mode"]`).forEach(e=>{e.addEventListener(`change`,()=>{u=e.value===`countdown`,s.style.display=u?`flex`:`none`,m()})});function d(e){return`${String(Math.floor(e/3600)).padStart(2,`0`)}:${String(Math.floor(e%3600/60)).padStart(2,`0`)}:${String(e%60).padStart(2,`0`)}`}function f(){if(u){if(l<=0){p();return}l--}else l++;t.textContent=d(l)}function p(){clearInterval(c),c=null,t.textContent=`00:00:00`,t.style.color=`red`,i.disabled=!1,a.disabled=!0,setTimeout(()=>t.style.color=``,3e3)}function m(){clearInterval(c),c=null,l=0,t.textContent=`00:00:00`,t.style.color=``,i.disabled=!1,a.disabled=!0}i.addEventListener(`click`,()=>{c||u&&(l=parseInt(n.value||0,10)*60+parseInt(r.value||0,10),l<=0)||(t.textContent=d(l),c=setInterval(f,1e3),i.disabled=!0,a.disabled=!1)}),a.addEventListener(`click`,()=>{clearInterval(c),c=null,i.disabled=!1,a.disabled=!0}),o.addEventListener(`click`,m),[n,r].forEach(e=>e.addEventListener(`mousedown`,e=>e.stopPropagation()))}var d=`notepad-content`;function f(e){let t=localStorage.getItem(d)||``;e.innerHTML=`
    <div class="notepad-app" style="display:flex;flex-direction:column;height:100%;">
      <div style="padding:4px 6px;display:flex;gap:6px;border-bottom:1px solid #ccc;background:#f0f0f0;">
        <button class="notepad-save" title="Save">💾 Save</button>
        <button class="notepad-clear" title="Clear">🗑️ Clear</button>
        <span class="notepad-status" style="margin-left:auto;font-size:11px;color:#888;align-self:center;"></span>
      </div>
      <textarea class="notepad-textarea" spellcheck="true"
        style="flex:1;resize:none;border:none;padding:8px;font-family:'Segoe UI',sans-serif;font-size:13px;outline:none;"
      ></textarea>
    </div>
  `;let n=e.querySelector(`.notepad-textarea`),r=e.querySelector(`.notepad-save`),i=e.querySelector(`.notepad-clear`),a=e.querySelector(`.notepad-status`);n.value=t;function o(){localStorage.setItem(d,n.value),a.textContent=`Saved ✓`,setTimeout(()=>a.textContent=``,2e3)}r.addEventListener(`click`,o),i.addEventListener(`click`,()=>{n.value=``,localStorage.removeItem(d),a.textContent=`Cleared`,setTimeout(()=>a.textContent=``,2e3)}),n.addEventListener(`keydown`,e=>{e.key===`s`&&(e.ctrlKey||e.metaKey)&&(e.preventDefault(),o())}),n.addEventListener(`mousedown`,e=>e.stopPropagation())}function p(e){e.innerHTML=`
    <div class="calculator-app" style="display:flex;flex-direction:column;height:100%;padding:8px;gap:8px;">
      <input class="calc-display" type="text" readonly
        style="text-align:right;font-size:24px;padding:8px 12px;border:1px solid #aaa;border-radius:4px;background:#fff;font-family:'Segoe UI',sans-serif;" />
      <div class="calc-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;flex:1;">
      </div>
    </div>
  `;let t=e.querySelector(`.calc-display`),n=e.querySelector(`.calc-grid`),r=[`C`,`±`,`%`,`÷`,`7`,`8`,`9`,`×`,`4`,`5`,`6`,`−`,`1`,`2`,`3`,`+`,`0`,`.`,`⌫`,`=`],i={"÷":`/`,"×":`*`,"−":`-`,"+":`+`},a=`0`,o=``,s=``,c=!1;function l(){t.value=a}function u(e,t,n){let r=parseFloat(e),i=parseFloat(n);if(isNaN(r)||isNaN(i))return n;switch(t){case`+`:return String(r+i);case`-`:return String(r-i);case`*`:return String(r*i);case`/`:return i===0?`Error`:String(r/i);default:return n}}r.forEach(e=>{let t=document.createElement(`button`);t.textContent=e,t.style.cssText=`font-size:18px;border:1px solid #bbb;border-radius:4px;cursor:pointer;background:#e8e8e8;`,e===`=`&&(t.style.background=`#4a90d9`),e===`=`&&(t.style.color=`#fff`),t.addEventListener(`click`,()=>{if(e>=`0`&&e<=`9`||e===`.`){if(c&&=(a=``,!1),e===`.`&&a.includes(`.`))return;a=a===`0`&&e!==`.`?e:a+e}else e===`C`?(a=`0`,o=``,s=``):e===`⌫`?a=a.length>1?a.slice(0,-1):`0`:e===`±`?a=a.startsWith(`-`)?a.slice(1):a===`0`?`0`:`-`+a:e===`%`?a=String(parseFloat(a)/100):e===`=`?s&&o!==``&&(a=u(o,s,a),s=``,o=``):i[e]&&(s&&o!==``&&!c&&(a=u(o,s,a)),s=i[e],o=a,c=!0);l()}),n.appendChild(t)}),l(),t.addEventListener(`mousedown`,e=>e.stopPropagation())}var m={owner:`DudyCall`,repo:`Random`,commitsFetchCount:10,trackedUsers:[`dudycall`,`loyvir`]},h=`https://www.wikipedia.org`,g=[{label:`arto.dk`,url:`https://www.arto.dk`},{label:`seydur.ngrok.app`,url:`https://www.seydur.ngrok.app`}],_={0:{desc:`Clear sky`,icon:`☀️`},1:{desc:`Mainly clear`,icon:`🌤️`},2:{desc:`Partly cloudy`,icon:`⛅`},3:{desc:`Overcast`,icon:`☁️`},45:{desc:`Fog`,icon:`🌫️`},48:{desc:`Depositing rime fog`,icon:`🌫️`},51:{desc:`Light drizzle`,icon:`🌦️`},53:{desc:`Moderate drizzle`,icon:`🌦️`},55:{desc:`Dense drizzle`,icon:`🌦️`},61:{desc:`Slight rain`,icon:`🌧️`},63:{desc:`Moderate rain`,icon:`🌧️`},65:{desc:`Heavy rain`,icon:`🌧️`},71:{desc:`Slight snow`,icon:`🌨️`},73:{desc:`Moderate snow`,icon:`🌨️`},75:{desc:`Heavy snow`,icon:`🌨️`},77:{desc:`Snow grains`,icon:`🌨️`},80:{desc:`Slight showers`,icon:`🌦️`},81:{desc:`Moderate showers`,icon:`🌦️`},82:{desc:`Violent showers`,icon:`🌦️`},85:{desc:`Slight snow showers`,icon:`🌨️`},86:{desc:`Heavy snow showers`,icon:`🌨️`},95:{desc:`Thunderstorm`,icon:`⛈️`},96:{desc:`Thunderstorm with hail`,icon:`⛈️`},99:{desc:`Thunderstorm with heavy hail`,icon:`⛈️`}},v=[{text:`The best way to predict the future is to invent a new sandwich.`,author:`Bill Gates`},{text:`I didn't fail, I just found 10,000 ways that a toaster won't fly.`,author:`Thomas Edison`},{text:`If you want to live a happy life, tie it up in a neat little bow and hope for the best.`,author:`Albert Einstein`},{text:`Stay hungry, stay foolish, but mostly stay away from the microwave.`,author:`Steve Jobs`},{text:`To be or not to be, that's not really the question, the question is 'What's for dinner?'`,author:`William Shakespeare`},{text:`Information is not knowledge, knowledge is not wisdom, wisdom is not a good burger.`,author:`Frank Zappa`},{text:`The only thing we have to fear is fear itself, and spiders. Definitely spiders.`,author:`Franklin D. Roosevelt`},{text:`I have a dream, that one day I will finally find my car keys.`,author:`Martin Luther King Jr.`},{text:`You miss 100% of the shots you don't take, especially at the bar.`,author:`Wayne Gretzky`},{text:`The greatest glory in living lies not in never falling, but in always having a good excuse.`,author:`Nelson Mandela`}];function y(e){let t=v[Math.floor(Math.random()*v.length)];e.innerHTML=`
    <div class="quotes-app">
      <div class="quote-container">
        <p class="quote-text">"${t.text}"</p>
        <p class="quote-author">— ${t.author}</p>
      </div>
      <button class="new-quote-btn">Next Fake Quote</button>
    </div>
  `,e.querySelector(`.new-quote-btn`).addEventListener(`click`,()=>y(e))}var b=[{q:`What is the capital of Australia?`,options:[`Sydney`,`Canberra`,`Melbourne`,`Perth`],answer:1},{q:`How many bones are in the adult human body?`,options:[`196`,`206`,`216`,`186`],answer:1},{q:`What planet is known as the Red Planet?`,options:[`Venus`,`Jupiter`,`Mars`,`Saturn`],answer:2},{q:`Who painted the Mona Lisa?`,options:[`Van Gogh`,`Da Vinci`,`Picasso`,`Monet`],answer:1},{q:`What is the largest ocean on Earth?`,options:[`Atlantic`,`Indian`,`Arctic`,`Pacific`],answer:3},{q:`In what year did the Titanic sink?`,options:[`1905`,`1912`,`1920`,`1898`],answer:1},{q:`What gas do plants absorb from the atmosphere?`,options:[`Oxygen`,`Nitrogen`,`CO₂`,`Hydrogen`],answer:2},{q:`Which element has the chemical symbol 'Au'?`,options:[`Silver`,`Iron`,`Gold`,`Copper`],answer:2},{q:`How many continents are there?`,options:[`5`,`6`,`7`,`8`],answer:2},{q:`What is the hardest natural substance?`,options:[`Quartz`,`Topaz`,`Diamond`,`Ruby`],answer:2}];function x(e){let t=0,n=0,r=!1,i=[...b].sort(()=>Math.random()-.5);function a(){if(t>=i.length){e.innerHTML=`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;">
          <div style="font-size:36px;">🏆</div>
          <div style="font-size:20px;font-weight:700;">Score: ${n} / ${i.length}</div>
          <button class="trivia-restart" style="padding:8px 20px;font-size:14px;cursor:pointer;border-radius:6px;border:1px solid #888;">Play Again</button>
        </div>`,e.querySelector(`.trivia-restart`).addEventListener(`click`,()=>{t=0,n=0,r=!1,i.sort(()=>Math.random()-.5),a()});return}let o=i[t];e.innerHTML=`
      <div style="display:flex;flex-direction:column;height:100%;padding:12px;gap:12px;">
        <div style="font-size:12px;color:#888;">Question ${t+1} / ${i.length}  |  Score: ${n}</div>
        <div style="font-size:15px;font-weight:600;">${o.q}</div>
        <div class="trivia-options" style="display:flex;flex-direction:column;gap:6px;"></div>
        <button class="trivia-next" style="margin-top:auto;padding:8px;font-size:14px;cursor:pointer;border-radius:6px;border:1px solid #888;display:none;">Next →</button>
      </div>`;let s=e.querySelector(`.trivia-options`),c=e.querySelector(`.trivia-next`);r=!1,o.options.forEach((e,t)=>{let i=document.createElement(`button`);i.textContent=e,i.style.cssText=`padding:8px 12px;font-size:14px;cursor:pointer;border:1px solid #bbb;border-radius:4px;text-align:left;background:#f5f5f5;`,i.addEventListener(`click`,()=>{r||(r=!0,t===o.answer?(n++,i.style.background=`#b5e6a3`):(i.style.background=`#f5a3a3`,s.children[o.answer].style.background=`#b5e6a3`),c.style.display=`block`)}),s.appendChild(i)}),c.addEventListener(`click`,()=>{t++,a()})}a()}function S(e){return _[e]||{desc:`Unknown`,icon:`❓`}}function C(e){e.innerHTML=`
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
  `;let t=e.querySelector(`.weather-input`),n=e.querySelector(`.weather-search-btn`),r=e.querySelector(`.weather-locate-btn`),i=e.querySelector(`.weather-content`);async function a(){let e=t.value.trim();if(e){i.innerHTML=`<div class="weather-loading">Searching...</div>`;try{let t=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(e)}&count=1&language=en&format=json`,n=await(await fetch(t)).json();if(!n.results||n.results.length===0){i.innerHTML=`<div class="weather-error">City not found. Try another name.</div>`;return}let r=n.results[0];await o(r.latitude,r.longitude,r.name,r.country)}catch{i.innerHTML=`<div class="weather-error">Failed to search. Check your connection.</div>`}}}n.addEventListener(`click`,a),t.addEventListener(`keydown`,e=>{e.key===`Enter`&&a()}),r.addEventListener(`click`,()=>{if(!navigator.geolocation){i.innerHTML=`<div class="weather-error">Geolocation not supported by your browser.</div>`;return}i.innerHTML=`<div class="weather-loading">Getting your location...</div>`,navigator.geolocation.getCurrentPosition(async e=>{await o(e.coords.latitude,e.coords.longitude,`Your Location`,``)},()=>{i.innerHTML=`<div class="weather-error">Location access denied.</div>`})});async function o(e,t,n,r){i.innerHTML=`<div class="weather-loading">Loading weather...</div>`;try{let a=[`latitude=${e}`,`longitude=${t}`,`current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`,`daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max`,`timezone=auto`,`forecast_days=7`].join(`&`),o=await(await fetch(`https://api.open-meteo.com/v1/forecast?${a}`)).json();if(o.error){i.innerHTML=`<div class="weather-error">${o.reason||`API error`}</div>`;return}s(i,o,n,r)}catch{i.innerHTML=`<div class="weather-error">Failed to load weather data.</div>`}}function s(e,t,n,r){let i=t.current,a=S(i.weather_code),o=r?`${n}, ${r}`:n,s=``;for(let e=0;e<t.daily.time.length;e++){let n=t.daily,r=S(n.weather_code[e]),i=new Date(n.time[e]+`T00:00`).toLocaleDateString(void 0,{weekday:`short`});s+=`
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
    `}}async function w(){let{owner:e,repo:t,commitsFetchCount:n,trackedUsers:r}=m,i=`https://api.github.com/repos/${e}/${t}/commits?per_page=${n}`;try{let e=await fetch(i);if(!e.ok)return e.status===403?{error:`GitHub API rate limit exceeded. Try again later.`}:e.status===404?{error:`Project not found. Is it public?`}:{error:`GitHub error: ${e.statusText}`};let t=await e.json(),n=new Date().toISOString().split(`T`)[0],a=Object.fromEntries(r.map(e=>[e,!1]));return t.forEach(e=>{if(e.commit.author.date.split(`T`)[0]===n){let t=e.author?e.author.login.toLowerCase():e.commit.author.name.toLowerCase();t in a&&(a[t]=!0)}}),{users:a,all:r.every(e=>a[e])}}catch{return{error:`Failed to connect to GitHub.`}}}async function T(e){let{trackedUsers:t}=m;e.innerHTML=`
    <div class="tracker-app">
      <div class="tracker-header">
        <h3>Daily Contribution Tracker</h3>
        <p>Tracking: ${t.map(e=>e.charAt(0).toUpperCase()+e.slice(1)).map(e=>`<strong>${e}</strong>`).join(` & `)}</p>
      </div>
      <div class="tracker-status" id="tracker-content">
        <div class="loading-spinner">Checking GitHub...</div>
      </div>
      <div class="tracker-footer">
        <button class="sync-btn">Refresh Now</button>
      </div>
    </div>
  `;let n=e.querySelector(`#tracker-content`),r=e.querySelector(`.sync-btn`);async function i(){n.innerHTML=`<div class="loading-spinner">Fetching latest commits...</div>`,r.disabled=!0;let e=await w();if(r.disabled=!1,e.error){n.innerHTML=`<div class="tracker-error">${e.error}</div>`;return}n.innerHTML=`
      <div class="contribution-list">
        ${t.map(t=>{let n=e.users[t],r=t.charAt(0).toUpperCase()+t.slice(1);return`
            <div class="contributor ${n?`done`:`pending`}">
              <span class="status-icon">${n?`✅`:`⏳`}</span>
              <span class="user-name">${r}</span>
              <span class="status-label">${n?`Added something today!`:`Not yet...`}</span>
            </div>`}).join(``)}
      </div>
      <div class="overall-status ${e.all?`complete`:``}">
        ${e.all?`🎉 Day Complete! Great work team!`:`💪 Keep going! Both players need to contribute.`}
      </div>
    `}r.addEventListener(`click`,i),i()}function E(e){let t=[h],n=0;e.innerHTML=`
    <div class="browser-app">
      <div class="browser-toolbar">
        <button class="browser-nav-btn" data-action="back" title="Back" disabled>◀</button>
        <button class="browser-nav-btn" data-action="forward" title="Forward" disabled>▶</button>
        <button class="browser-nav-btn" data-action="refresh" title="Refresh">⟳</button>
        <button class="browser-nav-btn" data-action="home" title="Home">🏠</button>
        <div class="browser-url-bar">
          <input type="text" class="browser-url-input" value="${h}" spellcheck="false" />
        </div>
        <button class="browser-nav-btn browser-go-btn" data-action="go" title="Go">→</button>
      </div>
      <div class="browser-bookmarks-bar">
          ${g.map(e=>`<button class="browser-bookmark" data-url="${e.url}">⭐ ${e.label}</button>`).join(`
          `)}
      </div>
      <div class="browser-viewport">
        <iframe class="browser-frame" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" src="${h}"></iframe>
        <div class="browser-error hidden">
          <div class="browser-error-icon">⚠️</div>
          <div class="browser-error-title">This page can't be displayed</div>
          <div class="browser-error-message">The website may have refused the connection, or the address may be incorrect.</div>
        </div>
      </div>
      <div class="browser-statusbar">Ready</div>
    </div>
  `;let r=e.querySelector(`.browser-url-input`),i=e.querySelector(`.browser-frame`),a=e.querySelector(`[data-action="back"]`),o=e.querySelector(`[data-action="forward"]`),s=e.querySelector(`[data-action="refresh"]`),c=e.querySelector(`[data-action="home"]`),l=e.querySelector(`[data-action="go"]`),u=e.querySelector(`.browser-error`),d=e.querySelector(`.browser-statusbar`);function f(e){let t=e.trim();return t?(/^https?:\/\//i.test(t)||(t=/^[\w-]+(\.[\w-]+)+/.test(t)?`https://`+t:`https://www.google.com/search?igu=1&q=`+encodeURIComponent(t)),t):h}function p(e){e=f(e),r.value=e,d.textContent=`Loading `+e+`...`,u.classList.add(`hidden`),i.classList.remove(`hidden`),i.src=e,n<t.length-1&&t.splice(n+1),t.push(e),n=t.length-1,m()}function m(){a.disabled=n<=0,o.disabled=n>=t.length-1}i.addEventListener(`load`,()=>{d.textContent=`Done`}),i.addEventListener(`error`,()=>{d.textContent=`Error loading page`,i.classList.add(`hidden`),u.classList.remove(`hidden`)}),a.addEventListener(`click`,()=>{if(n>0){n--;let e=t[n];r.value=e,i.src=e,u.classList.add(`hidden`),i.classList.remove(`hidden`),d.textContent=`Loading...`,m()}}),o.addEventListener(`click`,()=>{if(n<t.length-1){n++;let e=t[n];r.value=e,i.src=e,u.classList.add(`hidden`),i.classList.remove(`hidden`),d.textContent=`Loading...`,m()}}),s.addEventListener(`click`,()=>{i.src=i.src,d.textContent=`Refreshing...`}),c.addEventListener(`click`,()=>{p(h)}),l.addEventListener(`click`,()=>{p(r.value)}),r.addEventListener(`keydown`,e=>{e.key===`Enter`&&p(r.value)}),r.addEventListener(`mousedown`,e=>e.stopPropagation()),e.querySelectorAll(`.browser-bookmark`).forEach(e=>{e.addEventListener(`click`,()=>p(e.dataset.url))})}function D(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function O(e){e.innerHTML=`
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
  `;let t=e.querySelector(`.imagegen-key`),n=e.querySelector(`.imagegen-eye-btn`),r=e.querySelector(`.imagegen-model`),i=e.querySelector(`.imagegen-aspect`),a=e.querySelector(`.imagegen-prompt`),o=e.querySelector(`.imagegen-file`),s=e.querySelector(`.imagegen-file-name`),c=e.querySelector(`.imagegen-clear-file`),l=e.querySelector(`.imagegen-generate-btn`),u=e.querySelector(`.imagegen-output`),d=null,f=null;t.addEventListener(`input`,()=>{localStorage.setItem(`gemini-api-key`,t.value.trim())}),n.addEventListener(`click`,()=>{t.type=t.type===`password`?`text`:`password`}),o.addEventListener(`change`,()=>{let e=o.files[0];if(!e)return;s.textContent=e.name,c.classList.remove(`hidden`),f=e.type;let t=new FileReader;t.onload=()=>{d=t.result.split(`,`)[1]},t.readAsDataURL(e)}),c.addEventListener(`click`,()=>{o.value=``,s.textContent=`No file selected`,c.classList.add(`hidden`),d=null,f=null}),[t,a].forEach(e=>{e.addEventListener(`mousedown`,e=>e.stopPropagation())}),l.addEventListener(`click`,async()=>{let e=t.value.trim();if(!e){u.innerHTML=`<div class="imagegen-error">Please enter your Gemini API key.</div>`;return}let n=a.value.trim();if(!n){u.innerHTML=`<div class="imagegen-error">Please enter a prompt.</div>`;return}let o=r.value,s=i.value,c=[];c.push({text:n}),d&&c.push({inlineData:{mimeType:f,data:d}});let p={contents:[{parts:c}],generationConfig:{responseModalities:[`TEXT`,`IMAGE`]}};s&&(p.generationConfig.aspectRatio=s),u.innerHTML=`<div class="imagegen-loading"><div class="imagegen-spinner"></div>Generating image…</div>`,l.disabled=!0;try{let t=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(o)}:generateContent?key=${encodeURIComponent(e)}`,n=await fetch(t,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(p)}),r=await n.json();if(!n.ok){u.innerHTML=`<div class="imagegen-error">API Error: ${D(r.error?.message||n.statusText)}</div>`;return}if(!r.candidates||!r.candidates[0]?.content?.parts){let e=r.promptFeedback?.blockReason;u.innerHTML=`<div class="imagegen-error">${e?`Blocked: `+D(e):`No content returned. Try a different prompt.`}</div>`;return}let i=``;for(let e of r.candidates[0].content.parts)if(e.inlineData){let t=`data:${e.inlineData.mimeType||`image/png`};base64,${e.inlineData.data}`;i+=`<div class="imagegen-result-img"><img src="${t}" alt="Generated image" /><a class="imagegen-download" href="${t}" download="generated-image.png">💾 Save Image</a></div>`}else e.text&&(i+=`<div class="imagegen-feedback">${D(e.text)}</div>`);u.innerHTML=i||`<div class="imagegen-error">No image was generated. Try a different prompt.</div>`}catch(e){u.innerHTML=`<div class="imagegen-error">Request failed: ${D(e.message)}</div>`}finally{l.disabled=!1}}),a.addEventListener(`keydown`,e=>{e.key===`Enter`&&e.ctrlKey&&(e.preventDefault(),l.click())})}var k={dice:o,coin:s,password:c,color:l,timer:u,notes:f,calculator:p,quotes:y,trivia:x,weather:C,tracker:T,browser:E,imagegen:O};function A(e,t,n){let r=document.getElementById(`taskbar-items`),i=document.createElement(`div`);i.className=`taskbar-item active`,i.dataset.winId=e,i.innerHTML=`<div class="tb-icon" style="background:none;font-size:14px;display:flex;align-items:center;justify-content:center;">${t.icon}</div><span>${t.name}</span>`,i.addEventListener(`click`,n),r.appendChild(i)}function j(e){let t=document.getElementById(`taskbar-items`).querySelector(`[data-win-id="${e}"]`);t&&t.remove()}function M(e){let t=e.querySelector(`.window-titlebar`),n=!1,r,i,a,o;t.addEventListener(`mousedown`,t=>{t.target.closest(`.window-controls`)||e.classList.contains(`maximized`)||(n=!0,r=t.clientX,i=t.clientY,a=e.offsetLeft,o=e.offsetTop,document.body.style.cursor=`grabbing`,t.preventDefault())}),document.addEventListener(`mousemove`,t=>{if(!n)return;let s=t.clientX-r,c=t.clientY-i;e.style.left=a+s+`px`,e.style.top=o+c+`px`}),document.addEventListener(`mouseup`,()=>{n&&(n=!1,document.body.style.cursor=``)})}function N({id:e,title:t,icon:n,onMinimize:r,onMaximize:i,onClose:a,onFocus:o}){let s=document.getElementById(`window-template`).content.cloneNode(!0).querySelector(`.vista-window`);s.dataset.winId=e,s.querySelector(`.window-title`).textContent=t,n&&(s.querySelector(`.window-icon`).textContent=n),s.querySelector(`.minimize`).addEventListener(`click`,r),s.querySelector(`.maximize`).addEventListener(`click`,i),s.querySelector(`.close`).addEventListener(`click`,a),s.addEventListener(`mousedown`,o),M(s);let c=e%8*30;return s.style.top=40+c+`px`,s.style.left=60+c+`px`,{el:s,body:s.querySelector(`.window-body`)}}function P(e){for(let[t,n]of r)if(n.appId===e.id){L(t),F(t);return}let t=i(),n=document.getElementById(`windows-container`),{el:a,body:o}=N({id:t,title:e.name,icon:e.icon,onMinimize:()=>I(t),onMaximize:()=>R(t),onClose:()=>z(t),onFocus:()=>F(t)}),s=k[e.id];s&&s(o),n.appendChild(a),r.set(t,{el:a,title:e.name,appId:e.id,minimized:!1,maximized:!1}),A(t,e,()=>{let e=r.get(t);e&&(e.minimized?(L(t),F(t)):e.el.classList.contains(`active`)?I(t):F(t))}),F(t)}function F(e){let t=a(),n=r.get(e);n&&(r.forEach(e=>e.el.classList.remove(`active`)),n.el.classList.add(`active`),n.el.style.zIndex=t,document.querySelectorAll(`.taskbar-item`).forEach(t=>{t.classList.toggle(`active`,+t.dataset.winId===e)}))}function I(e){let t=r.get(e);t&&(t.minimized=!0,t.el.classList.add(`minimized`))}function L(e){let t=r.get(e);t&&(t.minimized=!1,t.el.classList.remove(`minimized`))}function R(e){let t=r.get(e);t&&(t.maximized=!t.maximized,t.el.classList.toggle(`maximized`,t.maximized))}function z(e){let t=r.get(e);t&&(t.el.remove(),r.delete(e),j(e))}function B(){let t=document.getElementById(`desktop-icons`);e.forEach(e=>{let n=document.createElement(`div`);n.className=`desktop-icon`,n.tabIndex=0,n.setAttribute(`data-app`,e.id),n.innerHTML=`
      <div class="icon-img">${e.icon}</div>
      <span class="icon-label">${e.name}</span>
    `,n.addEventListener(`dblclick`,()=>P(e)),n.addEventListener(`keydown`,t=>{t.key===`Enter`&&P(e)}),t.appendChild(n)})}function V(){let t=document.getElementById(`start-menu-apps`);e.forEach(e=>{let n=document.createElement(`a`);n.href=`#`,n.className=`start-menu-app`,n.innerHTML=`
      <span class="app-icon">${e.icon}</span>
      <span class="app-name">${e.name}</span>
    `,n.addEventListener(`click`,t=>{t.preventDefault(),H(!1),P(e)}),t.appendChild(n)})}function H(e){let t=document.getElementById(`start-menu`),n=typeof e==`boolean`?e:t.classList.contains(`hidden`);t.classList.toggle(`hidden`,!n)}function U(e){e.preventDefault(),W();let t=document.createElement(`div`);t.className=`context-menu`,t.innerHTML=`
    <div class="context-menu-item" data-action="refresh">Refresh</div>
    <div class="context-menu-separator"></div>
    <div class="context-menu-item" data-action="view-large">View: Large Icons</div>
    <div class="context-menu-item" data-action="view-small">View: Small Icons</div>
    <div class="context-menu-separator"></div>
    <div class="context-menu-item" data-action="about">About</div>
  `,t.style.left=e.clientX+`px`,t.style.top=e.clientY+`px`,t.querySelectorAll(`.context-menu-item`).forEach(e=>{e.addEventListener(`click`,()=>{W()})}),document.body.appendChild(t)}function W(){document.querySelectorAll(`.context-menu`).forEach(e=>e.remove())}function G(){let e=document.getElementById(`clock`);e.textContent=new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})}function K(){B(),V(),q(),G(),setInterval(G,1e3)}function q(){let e=document.getElementById(`start-button`),t=document.getElementById(`start-menu`);e.addEventListener(`click`,e=>{e.stopPropagation(),H()}),document.addEventListener(`click`,n=>{!t.classList.contains(`hidden`)&&!t.contains(n.target)&&!e.contains(n.target)&&H(!1),W()}),document.getElementById(`desktop`).addEventListener(`contextmenu`,U),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(H(!1),W())})}document.addEventListener(`DOMContentLoaded`,K);