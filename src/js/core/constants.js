/* Shared configuration constants used across apps */

export const GITHUB_CONFIG = {
  owner: "DudyCall",
  repo: "Random",
  commitsFetchCount: 10,
  trackedUsers: ["dudycall", "loyvir"],
};

export const BROWSER_HOMEPAGE = "https://www.redtube.com";

export const BROWSER_BOOKMARKS = [
  { label: "arto.dk", url: "https://www.arto.dk" },
  { label: "seydur.ngrok.app", url: "https://www.seydur.ngrok.app" },
];

export const WMO_CODES = {
  0:  { desc: "Clear sky",                    icon: "☀️" },
  1:  { desc: "Mainly clear",                 icon: "🌤️" },
  2:  { desc: "Partly cloudy",                icon: "⛅" },
  3:  { desc: "Overcast",                     icon: "☁️" },
  45: { desc: "Fog",                          icon: "🌫️" },
  48: { desc: "Depositing rime fog",          icon: "🌫️" },
  51: { desc: "Light drizzle",                icon: "🌦️" },
  53: { desc: "Moderate drizzle",             icon: "🌦️" },
  55: { desc: "Dense drizzle",                icon: "🌦️" },
  61: { desc: "Slight rain",                  icon: "🌧️" },
  63: { desc: "Moderate rain",                icon: "🌧️" },
  65: { desc: "Heavy rain",                   icon: "🌧️" },
  71: { desc: "Slight snow",                  icon: "🌨️" },
  73: { desc: "Moderate snow",                icon: "🌨️" },
  75: { desc: "Heavy snow",                   icon: "🌨️" },
  77: { desc: "Snow grains",                  icon: "🌨️" },
  80: { desc: "Slight showers",               icon: "🌦️" },
  81: { desc: "Moderate showers",             icon: "🌦️" },
  82: { desc: "Violent showers",              icon: "🌦️" },
  85: { desc: "Slight snow showers",          icon: "🌨️" },
  86: { desc: "Heavy snow showers",           icon: "🌨️" },
  95: { desc: "Thunderstorm",                 icon: "⛈️" },
  96: { desc: "Thunderstorm with hail",       icon: "⛈️" },
  99: { desc: "Thunderstorm with heavy hail", icon: "⛈️" },
};

export const FAKE_QUOTES = [
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
