import { GITHUB_CONFIG } from "../core/constants.js";

async function fetchGithubStatus() {
  const { owner, repo, commitsFetchCount, trackedUsers } = GITHUB_CONFIG;
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${commitsFetchCount}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 403) return { error: "GitHub API rate limit exceeded. Try again later." };
      if (response.status === 404) return { error: "Project not found. Is it public?" };
      return { error: `GitHub error: ${response.statusText}` };
    }

    const commits = await response.json();
    const today = new Date().toISOString().split("T")[0];

    const committed = Object.fromEntries(trackedUsers.map((u) => [u, false]));

    commits.forEach((commit) => {
      const commitDate = commit.commit.author.date.split("T")[0];
      if (commitDate === today) {
        const author = commit.author
          ? commit.author.login.toLowerCase()
          : commit.commit.author.name.toLowerCase();
        if (author in committed) committed[author] = true;
      }
    });

    const all = trackedUsers.every((u) => committed[u]);
    return { users: committed, all };
  } catch {
    return { error: "Failed to connect to GitHub." };
  }
}

export async function renderDailyTracker(el) {
  const { trackedUsers } = GITHUB_CONFIG;
  const displayNames = trackedUsers.map((u) => u.charAt(0).toUpperCase() + u.slice(1));

  el.innerHTML = `
    <div class="tracker-app">
      <div class="tracker-header">
        <h3>Daily Contribution Tracker</h3>
        <p>Tracking: ${displayNames.map((n) => `<strong>${n}</strong>`).join(" & ")}</p>
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
        ${trackedUsers.map((user) => {
          const done = status.users[user];
          const name = user.charAt(0).toUpperCase() + user.slice(1);
          return `
            <div class="contributor ${done ? "done" : "pending"}">
              <span class="status-icon">${done ? "✅" : "⏳"}</span>
              <span class="user-name">${name}</span>
              <span class="status-label">${done ? "Added something today!" : "Not yet..."}</span>
            </div>`;
        }).join("")}
      </div>
      <div class="overall-status ${status.all ? "complete" : ""}">
        ${status.all ? "🎉 Day Complete! Great work team!" : "💪 Keep going! Both players need to contribute."}
      </div>
    `;
  }

  syncBtn.addEventListener("click", updateStatus);
  updateStatus();
}
