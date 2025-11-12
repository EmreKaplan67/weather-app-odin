import "./styles.css";
import "./styles.css";
import { getWeatherData } from "./api";
import { renderWeather } from "./ui";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const unitToggle = document.getElementById("unit-toggle");

let currentWeatherData = null;
let currentUnit = 'metric'; // 'metric' for Celsius, 'imperial' for Fahrenheit

async function fetchAndRender(location) {
  try {
    currentWeatherData = await getWeatherData(location); // Store data
    renderWeather(currentWeatherData, currentUnit);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    alert("Could not retrieve weather data. Please try again.");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value.trim();
  if (location) {
    fetchAndRender(location);
    input.value = "";
  }
});

unitToggle.addEventListener('click', () => {
  currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
  unitToggle.classList.toggle('imperial-active');
  if (currentWeatherData) {
    renderWeather(currentWeatherData, currentUnit);
  }
});

// Initial load for Dublin
fetchAndRender("Dublin");