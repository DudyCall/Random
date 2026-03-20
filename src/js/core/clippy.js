/**
 * Clippy Assistant Manager
 * Handles random appearances, messages, and animations for Clippy.
 */

const CLIPPY_MESSAGES = [
  "It looks like you're trying to use a Windows Vista simulation. Would you like help with that?",
  "I'm here to ensure you have the most beautiful glass-effect experience possible!",
  "Did you know? Aero Glass was the peak of UI design. Don't let anyone tell you otherwise.",
  "I can see you're clicking things. I also like clicking things!",
  "If you get lost, just look for the Start Orb. It's green and shiny!",
  "I'm not saying I'm better than Cortana, but... where is she now?",
  "Need a quote? We have an app for that. It's very random.",
  "I'm currently trying to find where they hid the Minesweeper.",
  "Is your RAM okay? Aero uses a lot of it. I'm helping by being here!",
  "I just want to be involved. Is that too much to ask?",
  "Would you like me to write an email for you? I'm very good at 'Dear [Name], ...'",
  "I'm a paperclip. You're a human. Together, we're unstoppable.",
  "Don't mind me, I'm just hanging out in the corner."
];

class ClippyManager {
  constructor() {
    this.container = null;
    this.sprite = null;
    this.bubble = null;
    this.isVisible = false;
    this.timer = null;
    this.init();
  }

  init() {
    // Create elements
    this.container = document.createElement('div');
    this.container.id = 'clippy-container';

    this.bubble = document.createElement('div');
    this.bubble.className = 'clippy-bubble';
    this.bubble.style.display = 'none';

    this.sprite = document.createElement('div');
    this.sprite.className = 'clippy-sprite';
    
    this.container.appendChild(this.bubble);
    this.container.appendChild(this.sprite);
    document.body.appendChild(this.container);

    // Event listeners
    this.sprite.addEventListener('click', () => this.handleSpriteClick());
    
    // Start random timer
    this.scheduleAppearance();
  }

  scheduleAppearance() {
    // Appear every 2 to 5 minutes randomly
    const delay = Math.floor(Math.random() * (300000 - 120000 + 1)) + 120000;
    // For testing/initial appearance, let's make it shorter for the first time
    const initialDelay = 30000; 

    this.timer = setTimeout(() => {
      this.show();
    }, this.isVisible ? delay : initialDelay);
  }

  show() {
    if (this.isVisible) return;
    
    this.isVisible = true;
    this.container.classList.add('visible');
    
    // Wait a bit before showing the bubble
    setTimeout(() => {
      this.sayRandom();
    }, 1000);
  }

  hide() {
    this.isVisible = false;
    this.container.classList.remove('visible');
    this.bubble.style.display = 'none';
    this.scheduleAppearance();
  }

  sayRandom() {
    const msg = CLIPPY_MESSAGES[Math.floor(Math.random() * CLIPPY_MESSAGES.length)];
    this.say(msg);
  }

  say(text) {
    this.bubble.innerHTML = `
      <div class="clippy-close" title="Dismiss">✕</div>
      <div class="clippy-text">${text}</div>
    `;
    this.bubble.style.display = 'block';
    
    const closeBtn = this.bubble.querySelector('.clippy-close');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.hide();
    });

    // Auto-hide bubble after 10 seconds, but keep Clippy
    setTimeout(() => {
      if (this.isVisible && this.bubble.style.display === 'block') {
        this.bubble.style.display = 'none';
        // Hide Clippy too after some more time if no interaction
        setTimeout(() => {
            if (this.isVisible && this.bubble.style.display === 'none') {
                this.hide();
            }
        }, 5000);
      }
    }, 10000);
  }

  handleSpriteClick() {
    if (this.bubble.style.display === 'none') {
      this.sayRandom();
    } else {
        this.say("I'm right here if you need me! (But I probably can't actually do anything)");
    }
  }
}

export const clippy = new ClippyManager();
