import { weatherApi } from "./scripts/weather-api.js";

/** Refresh intervall in seconds */
const refreshInterval = 5
const weatherWidget = document.getElementById("weather-widget")

async function updateUi() {
  /**@type {WeatherReport} */
  const report = await weatherApi.getLatest()

  weatherWidget
    .querySelector('[data-weather="temperature"]')
    .textContent = report.temperatureC
  weatherWidget
    .querySelector('[data-weather="timestamp"]')
    .textContent = new Date(report.timestamp).toLocaleString()
  weatherWidget
    .querySelector('[data-weather="location"]')
    .textContent = Object.entries(report.location).map(([_,value]) => value).join(" ")
}

// Inital fetch
updateUi()
// Set refresh cycle
setInterval(updateUi, refreshInterval * 1000) 
