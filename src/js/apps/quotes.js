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
  { text: "The greatest glory in living lies not in never falling, but in always having a good excuse.", author: "Nelson Mandela" },
];

export function renderQuotesApp(el) {
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
