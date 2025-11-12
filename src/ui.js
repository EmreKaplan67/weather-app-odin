const currentWeatherContainer = document.getElementById("current-weather");
const forecastGrid = document.getElementById("forecast-grid");

// --- Icon Mapping ---
function getWeatherIcon(icon) {
  const iconMap = {
    'clear-day': 'wi-day-sunny',
    'clear-night': 'wi-night-clear',
    'rain': 'wi-rain',
    'snow': 'wi-snow',
    'sleet': 'wi-sleet',
    'wind': 'wi-strong-wind',
    'fog': 'wi-fog',
    'cloudy': 'wi-cloudy',
    'partly-cloudy-day': 'wi-day-cloudy',
    'partly-cloudy-night': 'wi-night-alt-cloudy',
    'hail': 'wi-hail',
    'thunderstorm': 'wi-thunderstorm',
    'tornado': 'wi-tornado',
  };
  return iconMap[icon] || 'wi-day-sunny';
}

// --- Date Formatting ---
function formatDisplayDate(datetime) {
  return new Date(datetime).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

// --- Temperature Conversion ---
function convertTemperature(temp, unit) {
  if (unit === 'imperial') {
    return (temp * 9/5) + 32;
  }
  return temp;
}

// --- Wind Speed Conversion ---
function convertWindSpeed(speedKmh, unit) {
  if (unit === 'imperial') {
    // Convert km/h to mph
    return speedKmh * 0.621371;
  }
  return speedKmh;
}

// --- Main Display Rendering ---
function renderMainDisplay(dayData, address, unit) {
  const iconClass = getWeatherIcon(dayData.icon);
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  
  let temp;
  if (dayData.tempmax !== undefined) {
    const tempMax = convertTemperature(dayData.tempmax, unit).toFixed(1);
    const tempMin = convertTemperature(dayData.tempmin, unit).toFixed(1);
    temp = `${tempMax}${tempUnit} / ${tempMin}${tempUnit}`;
  } else {
    temp = `${convertTemperature(dayData.temp, unit).toFixed(1)}${tempUnit}`;
  }

  const date = new Date(dayData.datetimeEpoch * 1000);

  const windSpeed = convertWindSpeed(dayData.windspeed, unit).toFixed(1);
  const windUnit = unit === 'metric' ? 'km/h' : 'mph';

  currentWeatherContainer.innerHTML = `
    <h2>${formatDisplayDate(date)}, in ${address}</h2>
    <div class="current-weather-details">
      <i class="wi ${iconClass} weather-icon"></i>
      <div>
        <p>Temperature: ${temp}</p>
        <p>Conditions: ${dayData.conditions}</p>
        <p>Humidity: ${dayData.humidity}%</p>
        <p>Wind Speed: ${windSpeed} ${windUnit}</p>
      </div>
    </div>
  `;
}

// --- Forecast Card Rendering ---
function createForecastDayHTML(day, index, unit) {
  const iconClass = getWeatherIcon(day.icon);
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const tempMax = convertTemperature(day.tempmax, unit).toFixed(1);
  const tempMin = convertTemperature(day.tempmin, unit).toFixed(1);

  return `
    <div class="forecast-day" data-index="${index}">
      <p>${new Date(day.datetime).toLocaleDateString("en-US", { weekday: 'short' })}</p>
      <i class="wi ${iconClass} forecast-icon"></i>
      <p>${tempMax}${tempUnit} / ${tempMin}${tempUnit}</p>
      <p>${day.conditions}</p>
    </div>
  `;
}

// --- Main Exported Function ---
export function renderWeather(weatherData, unit) {
  // Initial render of the main display with current conditions
  renderMainDisplay(weatherData.currentConditions, weatherData.resolvedAddress, unit);

  // Render forecast cards
  const forecastDays = weatherData.days.slice(0, 11);
  forecastGrid.innerHTML = `
    <h3>10-Day Forecast</h3>
    <div class="grid-container">
      ${forecastDays.map((day, index) => createForecastDayHTML(day, index, unit)).join("")}
    </div>
  `;

  // Add click listeners to forecast cards
  const gridContainer = forecastGrid.querySelector('.grid-container');
  gridContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.forecast-day');
    if (card) {
      const dayIndex = parseInt(card.dataset.index, 10);
      const selectedDay = weatherData.days[dayIndex];
      renderMainDisplay(selectedDay, weatherData.resolvedAddress, unit);
    }
  });
}