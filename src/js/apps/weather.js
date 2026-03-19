const WMO_CODES = {
  0: { desc: "Clear sky", icon: "☀️" },
  1: { desc: "Mainly clear", icon: "🌤️" },
  2: { desc: "Partly cloudy", icon: "⛅" },
  3: { desc: "Overcast", icon: "☁️" },
  45: { desc: "Fog", icon: "🌫️" },
  48: { desc: "Depositing rime fog", icon: "🌫️" },
  51: { desc: "Light drizzle", icon: "🌦️" },
  53: { desc: "Moderate drizzle", icon: "🌦️" },
  55: { desc: "Dense drizzle", icon: "🌦️" },
  61: { desc: "Slight rain", icon: "🌧️" },
  63: { desc: "Moderate rain", icon: "🌧️" },
  65: { desc: "Heavy rain", icon: "🌧️" },
  71: { desc: "Slight snow", icon: "🌨️" },
  73: { desc: "Moderate snow", icon: "🌨️" },
  75: { desc: "Heavy snow", icon: "🌨️" },
  77: { desc: "Snow grains", icon: "🌨️" },
  80: { desc: "Slight showers", icon: "🌦️" },
  81: { desc: "Moderate showers", icon: "🌦️" },
  82: { desc: "Violent showers", icon: "🌦️" },
  85: { desc: "Slight snow showers", icon: "🌨️" },
  86: { desc: "Heavy snow showers", icon: "🌨️" },
  95: { desc: "Thunderstorm", icon: "⛈️" },
  96: { desc: "Thunderstorm with hail", icon: "⛈️" },
  99: { desc: "Thunderstorm with heavy hail", icon: "⛈️" },
};

function getWmo(code) {
  return WMO_CODES[code] || { desc: "Unknown", icon: "❓" };
}

export function renderWeatherApp(el) {
  el.innerHTML = `
    <div class="weather-app">
      <div class="weather-search">
        <input type="text" class="weather-input" placeholder="Enter city name..." />
        <button class="weather-search-btn">Search</button>
        <button class="weather-locate-btn" title="Use my location">📍</button>
      </div>
      <div class="weather-content">
        <div class="weather-placeholder">Enter a city or use your location to see the weather.</div>
      </div>
    </div>
  `;

  const input = el.querySelector(".weather-input");
  const searchBtn = el.querySelector(".weather-search-btn");
  const locateBtn = el.querySelector(".weather-locate-btn");
  const content = el.querySelector(".weather-content");

  async function searchCity() {
    const query = input.value.trim();
    if (!query) return;
    content.innerHTML = '<div class="weather-loading">Searching...</div>';
    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        content.innerHTML = '<div class="weather-error">City not found. Try another name.</div>';
        return;
      }
      const place = geoData.results[0];
      await loadWeather(place.latitude, place.longitude, place.name, place.country);
    } catch {
      content.innerHTML = '<div class="weather-error">Failed to search. Check your connection.</div>';
    }
  }

  searchBtn.addEventListener("click", searchCity);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") searchCity(); });

  locateBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      content.innerHTML = '<div class="weather-error">Geolocation not supported by your browser.</div>';
      return;
    }
    content.innerHTML = '<div class="weather-loading">Getting your location...</div>';
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        await loadWeather(pos.coords.latitude, pos.coords.longitude, "Your Location", "");
      },
      () => {
        content.innerHTML = '<div class="weather-error">Location access denied.</div>';
      }
    );
  });

  async function loadWeather(lat, lon, name, country) {
    content.innerHTML = '<div class="weather-loading">Loading weather...</div>';
    try {
      const params = [
        `latitude=${lat}`,
        `longitude=${lon}`,
        "current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
        "daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
        "timezone=auto",
        "forecast_days=7",
      ].join("&");
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
      const data = await res.json();
      if (data.error) {
        content.innerHTML = `<div class="weather-error">${data.reason || "API error"}</div>`;
        return;
      }
      renderWeatherData(content, data, name, country);
    } catch {
      content.innerHTML = '<div class="weather-error">Failed to load weather data.</div>';
    }
  }

  function renderWeatherData(container, data, name, country) {
    const cur = data.current;
    const wmo = getWmo(cur.weather_code);
    const label = country ? `${name}, ${country}` : name;

    let forecastHTML = "";
    for (let i = 0; i < data.daily.time.length; i++) {
      const d = data.daily;
      const dayWmo = getWmo(d.weather_code[i]);
      const dayName = new Date(d.time[i] + "T00:00").toLocaleDateString(undefined, { weekday: "short" });
      forecastHTML += `
        <div class="forecast-day">
          <span class="forecast-name">${dayName}</span>
          <span class="forecast-icon">${dayWmo.icon}</span>
          <span class="forecast-temps">
            <span class="temp-hi">${Math.round(d.temperature_2m_max[i])}°</span>
            <span class="temp-lo">${Math.round(d.temperature_2m_min[i])}°</span>
          </span>
          <span class="forecast-rain">${d.precipitation_probability_max[i] ?? "-"}%</span>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="weather-current">
        <div class="weather-main">
          <span class="weather-big-icon">${wmo.icon}</span>
          <div class="weather-temp-block">
            <span class="weather-temp">${Math.round(cur.temperature_2m)}°C</span>
            <span class="weather-desc">${wmo.desc}</span>
            <span class="weather-location">${label}</span>
          </div>
        </div>
        <div class="weather-details">
          <div class="weather-detail"><span>Feels like</span><strong>${Math.round(cur.apparent_temperature)}°C</strong></div>
          <div class="weather-detail"><span>Humidity</span><strong>${cur.relative_humidity_2m}%</strong></div>
          <div class="weather-detail"><span>Wind</span><strong>${Math.round(cur.wind_speed_10m)} km/h</strong></div>
        </div>
      </div>
      <div class="weather-forecast">
        <h4>7-Day Forecast</h4>
        <div class="forecast-grid">${forecastHTML}</div>
      </div>
    `;
  }
}
