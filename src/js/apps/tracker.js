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
    const today = new Date().toISOString().split("T")[0];

    let dudycallCommitted = false;
    let loyvirCommitted = false;

    commits.forEach((commit) => {
      const commitDate = commit.commit.author.date.split("T")[0];
      if (commitDate === today) {
        const author = commit.author
          ? commit.author.login.toLowerCase()
          : commit.commit.author.name.toLowerCase();
        if (author === "dudycall") dudycallCommitted = true;
        if (author === "loyvir") loyvirCommitted = true;
      }
    });

    return {
      dudycall: dudycallCommitted,
      loyvir: loyvirCommitted,
      both: dudycallCommitted && loyvirCommitted,
    };
  } catch {
    return { error: "Failed to connect to GitHub." };
  }
}

export async function renderDailyTracker(el) {
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

    content.innerHTML = `
      <div class="contribution-list">
        <div class="contributor ${status.dudycall ? "done" : "pending"}">
          <span class="status-icon">${status.dudycall ? "✅" : "⏳"}</span>
          <span class="user-name">Dudycall</span>
          <span class="status-label">${status.dudycall ? "Added something today!" : "Not yet..."}</span>
        </div>
        <div class="contributor ${status.loyvir ? "done" : "pending"}">
          <span class="status-icon">${status.loyvir ? "✅" : "⏳"}</span>
          <span class="user-name">Loyvir</span>
          <span class="status-label">${status.loyvir ? "Added something today!" : "Not yet..."}</span>
        </div>
      </div>
      <div class="overall-status ${status.both ? "complete" : ""}">
        ${status.both ? "🎉 Day Complete! Great work team!" : "💪 Keep going! Both players need to contribute."}
      </div>
    `;
  }

  syncBtn.addEventListener("click", updateStatus);
  updateStatus();
}
