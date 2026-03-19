const TRIVIA_QUESTIONS = [
  { q: "What is the capital of Australia?", options: ["Sydney", "Canberra", "Melbourne", "Perth"], answer: 1 },
  { q: "How many bones are in the adult human body?", options: ["196", "206", "216", "186"], answer: 1 },
  { q: "What planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], answer: 2 },
  { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Monet"], answer: 1 },
  { q: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
  { q: "In what year did the Titanic sink?", options: ["1905", "1912", "1920", "1898"], answer: 1 },
  { q: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "CO₂", "Hydrogen"], answer: 2 },
  { q: "Which element has the chemical symbol 'Au'?", options: ["Silver", "Iron", "Gold", "Copper"], answer: 2 },
  { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
  { q: "What is the hardest natural substance?", options: ["Quartz", "Topaz", "Diamond", "Ruby"], answer: 2 },
];

export function renderTriviaApp(el) {
  let index  = 0;
  let score  = 0;
  let answered = false;
  const order = [...TRIVIA_QUESTIONS].sort(() => Math.random() - 0.5);

  function render() {
    if (index >= order.length) {
      el.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;">
          <div style="font-size:36px;">🏆</div>
          <div style="font-size:20px;font-weight:700;">Score: ${score} / ${order.length}</div>
          <button class="trivia-restart" style="padding:8px 20px;font-size:14px;cursor:pointer;border-radius:6px;border:1px solid #888;">Play Again</button>
        </div>`;
      el.querySelector(".trivia-restart").addEventListener("click", () => {
        index = 0; score = 0; answered = false;
        order.sort(() => Math.random() - 0.5);
        render();
      });
      return;
    }

    const q = order[index];
    el.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;padding:12px;gap:12px;">
        <div style="font-size:12px;color:#888;">Question ${index + 1} / ${order.length}  |  Score: ${score}</div>
        <div style="font-size:15px;font-weight:600;">${q.q}</div>
        <div class="trivia-options" style="display:flex;flex-direction:column;gap:6px;"></div>
        <button class="trivia-next" style="margin-top:auto;padding:8px;font-size:14px;cursor:pointer;border-radius:6px;border:1px solid #888;display:none;">Next →</button>
      </div>`;

    const optionsDiv = el.querySelector(".trivia-options");
    const nextBtn    = el.querySelector(".trivia-next");
    answered = false;

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.style.cssText = "padding:8px 12px;font-size:14px;cursor:pointer;border:1px solid #bbb;border-radius:4px;text-align:left;background:#f5f5f5;";
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        if (i === q.answer) {
          score++;
          btn.style.background = "#b5e6a3";
        } else {
          btn.style.background = "#f5a3a3";
          optionsDiv.children[q.answer].style.background = "#b5e6a3";
        }
        nextBtn.style.display = "block";
      });
      optionsDiv.appendChild(btn);
    });

    nextBtn.addEventListener("click", () => { index++; render(); });
  }

  render();
}
