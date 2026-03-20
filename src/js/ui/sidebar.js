import { renderDailyTracker } from "../apps/tracker.js";

export function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  // Create widget container for the Daily Tracker
  const trackerWidget = document.createElement("div");
  trackerWidget.className = "sidebar-widget tracker-widget";
  
  // Render the tracker into the widget container
  renderDailyTracker(trackerWidget);
  
  // Add the widget to the sidebar
  sidebar.appendChild(trackerWidget);
}
