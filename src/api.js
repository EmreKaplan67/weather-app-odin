// src/api.js
const BASE =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

const apiKey = process.env.VC_API_KEY;
const unitGroup = "metric";

export const getWeatherData = async (location = "Dublin") => {
  const response = await fetch(
    `${BASE}/${encodeURIComponent(
      location
    )}?unitGroup=${unitGroup}&key=${apiKey}&contentType=json`
  );
  const data = await response.json();
  return data;
};
