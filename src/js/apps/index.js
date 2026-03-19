import { renderQuotesApp } from "./quotes.js";
import { renderWeatherApp } from "./weather.js";
import { renderDailyTracker } from "./tracker.js";
import { renderBrowserApp } from "./browser.js";
import { renderImageGenApp } from "./imagegen.js";

export const appRenderers = {
  quotes:   renderQuotesApp,
  weather:  renderWeatherApp,
  tracker:  renderDailyTracker,
  browser:  renderBrowserApp,
  imagegen: renderImageGenApp,
};
