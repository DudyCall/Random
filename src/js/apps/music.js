export function renderMusicApp(el) {
  el.innerHTML = `
    <div class="winamp">
      <!-- Title bar area -->
      <div class="winamp-header">
        <div class="winamp-title-text">Winamp</div>
      </div>

      <!-- Visualizer -->
      <div class="winamp-visualizer">
        <canvas class="winamp-viz-canvas" width="275" height="40"></canvas>
      </div>

      <!-- Track info -->
      <div class="winamp-info">
        <div class="winamp-marquee">
          <span class="winamp-track-name">No file loaded</span>
        </div>
        <div class="winamp-time-row">
          <span class="winamp-time">0:00</span>
          <span class="winamp-duration">/ 0:00</span>
          <span class="winamp-kbps">--kbps</span>
          <span class="winamp-khz">--kHz</span>
        </div>
      </div>

      <!-- Seek bar -->
      <div class="winamp-seek-row">
        <input type="range" class="winamp-seek" min="0" max="100" value="0" step="0.1" />
      </div>

      <!-- Controls row -->
      <div class="winamp-controls">
        <button class="winamp-btn winamp-prev" title="Previous">⏮</button>
        <button class="winamp-btn winamp-play" title="Play">▶</button>
        <button class="winamp-btn winamp-pause" title="Pause">⏸</button>
        <button class="winamp-btn winamp-stop" title="Stop">⏹</button>
        <button class="winamp-btn winamp-next" title="Next">⏭</button>
        <div class="winamp-vol-group">
          <span class="winamp-vol-icon">🔊</span>
          <input type="range" class="winamp-volume" min="0" max="100" value="80" />
        </div>
      </div>

      <!-- Shuffle / repeat -->
      <div class="winamp-extras">
        <button class="winamp-btn winamp-shuffle" title="Shuffle">🔀</button>
        <button class="winamp-btn winamp-repeat" title="Repeat">🔁</button>
        <button class="winamp-btn winamp-add-file" title="Add files">📂 Add</button>
      </div>

      <!-- Playlist panel -->
      <div class="winamp-playlist">
        <div class="winamp-playlist-header">Playlist</div>
        <ul class="winamp-playlist-list"></ul>
        <div class="winamp-playlist-footer">
          <span class="winamp-pl-count">0 tracks</span>
          <span class="winamp-pl-total">0:00</span>
        </div>
      </div>
    </div>
  `;

  // DOM refs
  const audio = new Audio();
  const trackName = el.querySelector(".winamp-track-name");
  const timeEl = el.querySelector(".winamp-time");
  const durEl = el.querySelector(".winamp-duration");
  const kbpsEl = el.querySelector(".winamp-kbps");
  const khzEl = el.querySelector(".winamp-khz");
  const seekBar = el.querySelector(".winamp-seek");
  const volBar = el.querySelector(".winamp-volume");
  const volIcon = el.querySelector(".winamp-vol-icon");
  const playBtn = el.querySelector(".winamp-play");
  const pauseBtn = el.querySelector(".winamp-pause");
  const stopBtn = el.querySelector(".winamp-stop");
  const prevBtn = el.querySelector(".winamp-prev");
  const nextBtn = el.querySelector(".winamp-next");
  const shuffleBtn = el.querySelector(".winamp-shuffle");
  const repeatBtn = el.querySelector(".winamp-repeat");
  const addFileBtn = el.querySelector(".winamp-add-file");
  const playlistList = el.querySelector(".winamp-playlist-list");
  const plCount = el.querySelector(".winamp-pl-count");
  const plTotal = el.querySelector(".winamp-pl-total");
  const canvas = el.querySelector(".winamp-viz-canvas");
  const ctx = canvas.getContext("2d");

  // State
  let playlist = [];
  let currentIndex = -1;
  let shuffle = false;
  let repeat = false; // false=off, true=repeat-all
  let isSeeking = false;
  let animId = null;
  let audioCtx = null;
  let analyser = null;
  let source = null;
  let dataArray = null;

  // Pre-load bundled track
  const bundledTrack = {
    name: "Lonely Thomas Eli (Remastered)",
    url: "assets/audio/Lonely Thomas Eli (Remastered).mp3",
  };
  playlist.push(bundledTrack);
  renderPlaylist();

  // Volume init
  audio.volume = 0.8;

  // ---- File input (hidden) ----
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "audio/*";
  fileInput.multiple = true;
  fileInput.style.display = "none";
  el.appendChild(fileInput);

  addFileBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files);
    files.forEach((f) => {
      playlist.push({ name: f.name.replace(/\.[^.]+$/, ""), url: URL.createObjectURL(f) });
    });
    renderPlaylist();
    if (currentIndex === -1 && playlist.length) loadTrack(0);
    fileInput.value = "";
  });

  // ---- Playlist rendering ----
  function renderPlaylist() {
    playlistList.innerHTML = "";
    playlist.forEach((t, i) => {
      const li = document.createElement("li");
      li.className = "winamp-pl-item" + (i === currentIndex ? " active" : "");
      li.textContent = `${i + 1}. ${t.name}`;
      li.addEventListener("dblclick", () => { loadTrack(i); audio.play(); });
      playlistList.appendChild(li);
    });
    plCount.textContent = `${playlist.length} track${playlist.length !== 1 ? "s" : ""}`;
  }

  // ---- Load track ----
  function loadTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    currentIndex = index;
    const track = playlist[currentIndex];
    audio.src = track.url;
    audio.load();
    trackName.textContent = track.name;
    renderPlaylist();
    initVisualizer();
  }

  // ---- Transport controls ----
  playBtn.addEventListener("click", () => {
    if (!audio.src && playlist.length) loadTrack(0);
    audio.play();
  });

  pauseBtn.addEventListener("click", () => audio.pause());

  stopBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    seekBar.value = 0;
    timeEl.textContent = "0:00";
  });

  prevBtn.addEventListener("click", () => {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
    } else {
      const idx = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
      loadTrack(idx);
      audio.play();
    }
  });

  nextBtn.addEventListener("click", () => playNext());

  function playNext() {
    if (!playlist.length) return;
    let idx;
    if (shuffle) {
      idx = Math.floor(Math.random() * playlist.length);
    } else {
      idx = currentIndex + 1;
      if (idx >= playlist.length) {
        if (repeat) idx = 0; else return;
      }
    }
    loadTrack(idx);
    audio.play();
  }

  // ---- Shuffle / Repeat ----
  shuffleBtn.addEventListener("click", () => {
    shuffle = !shuffle;
    shuffleBtn.classList.toggle("on", shuffle);
  });

  repeatBtn.addEventListener("click", () => {
    repeat = !repeat;
    repeatBtn.classList.toggle("on", repeat);
  });

  // ---- Seek bar ----
  seekBar.addEventListener("input", () => { isSeeking = true; });
  seekBar.addEventListener("change", () => {
    if (audio.duration) audio.currentTime = (seekBar.value / 100) * audio.duration;
    isSeeking = false;
  });

  // Prevent window drag on range inputs
  [seekBar, volBar].forEach((inp) => inp.addEventListener("mousedown", (e) => e.stopPropagation()));

  // ---- Volume ----
  volBar.addEventListener("input", () => {
    audio.volume = volBar.value / 100;
    volIcon.textContent = audio.volume === 0 ? "🔇" : audio.volume < 0.4 ? "🔉" : "🔊";
  });

  // ---- Time update ----
  audio.addEventListener("timeupdate", () => {
    if (!isSeeking && audio.duration) {
      seekBar.value = (audio.currentTime / audio.duration) * 100;
    }
    timeEl.textContent = fmtTime(audio.currentTime);
  });

  audio.addEventListener("loadedmetadata", () => {
    durEl.textContent = `/ ${fmtTime(audio.duration)}`;
    kbpsEl.textContent = "320kbps";
    khzEl.textContent = "44kHz";
    plTotal.textContent = fmtTime(playlist.reduce((s, t, i) => {
      if (i === currentIndex) return s + audio.duration;
      return s;
    }, 0));
  });

  audio.addEventListener("ended", () => playNext());

  function fmtTime(s) {
    if (!s || !isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  // ---- Visualizer (frequency bars) ----
  function initVisualizer() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    }
    if (!animId) drawViz();
  }

  function drawViz() {
    animId = requestAnimationFrame(drawViz);
    if (!analyser) return;
    analyser.getByteFrequencyData(dataArray);

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const barCount = analyser.frequencyBinCount;
    const barW = w / barCount;

    for (let i = 0; i < barCount; i++) {
      const v = dataArray[i] / 255;
      const barH = v * h;
      // Winamp green-to-yellow gradient
      const g = Math.floor(200 + 55 * v);
      const r = Math.floor(100 * v);
      ctx.fillStyle = `rgb(${r},${g},30)`;
      ctx.fillRect(i * barW, h - barH, barW - 1, barH);
    }
  }
}
