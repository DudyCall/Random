import { FAKE_QUOTES } from "../core/constants.js";

export function renderQuotesApp(el) {
  const quoteObj = FAKE_QUOTES[Math.floor(Math.random() * FAKE_QUOTES.length)];
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
