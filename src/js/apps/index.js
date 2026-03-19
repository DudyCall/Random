import { renderDiceApp } from "./dice.js";
import { renderCoinApp } from "./coin.js";
import { renderPasswordApp } from "./password.js";
import { renderColorApp } from "./color.js";
import { renderTimerApp } from "./timer.js";
import { renderNotepadApp } from "./notepad.js";
import { renderCalculatorApp } from "./calculator.js";
import { renderQuotesApp } from "./quotes.js";
import { renderTriviaApp } from "./trivia.js";
import { renderWeatherApp } from "./weather.js";
import { renderDailyTracker } from "./tracker.js";
import { renderBrowserApp } from "./browser.js";
import { renderImageGenApp } from "./imagegen.js";

export const appRenderers = {
  dice:       renderDiceApp,
  coin:       renderCoinApp,
  password:   renderPasswordApp,
  color:      renderColorApp,
  timer:      renderTimerApp,
  notes:      renderNotepadApp,
  calculator: renderCalculatorApp,
  quotes:     renderQuotesApp,
  trivia:     renderTriviaApp,
  weather:    renderWeatherApp,
  tracker:    renderDailyTracker,
  browser:    renderBrowserApp,
  imagegen:   renderImageGenApp,
};
