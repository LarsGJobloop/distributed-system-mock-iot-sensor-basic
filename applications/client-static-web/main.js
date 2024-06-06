import { weatherApi } from "./scripts/weather-api.js";

/** Refresh intervall in seconds */
const refreshIntervalWidget = 5
const refreshIntervalTable = 10

const weatherWidget = document.getElementById("weather-widget")
const reportTable = document.getElementById("weather-reports-table")
const reportTemplate = document.getElementById("weather-reports-data-template")

async function updateWidget() {
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

async function updateTable() {
  const reports = await weatherApi.getAll()

  const reportTableEntries = reports
    .slice(-5)
    .map(report => {
    const reportEntry = reportTemplate.content.cloneNode(true)
    
    reportEntry
      .querySelector('[data-type="temperature"]')
      .textContent = report.temperatureC
    reportEntry
      .querySelector('[data-type="timestamp"]')
      .textContent = new Date(report.timestamp).toLocaleString()
    reportEntry
      .querySelector('[data-type="location"]')
      .textContent = Object.entries(report.location).map(([_,value]) => value).join(" ")
    
    return reportEntry
  })

  while (reportTable.hasChildNodes()) {
    reportTable.removeChild(reportTable.firstChild)
  }
  
  reportTable.append(...reportTableEntries)
}

// Inital fetch
Promise.allSettled([
  updateWidget(),
  updateTable(),
])

// Set refresh cycle
setInterval(updateWidget, refreshIntervalWidget * 1000) 
setInterval(updateTable, refreshIntervalTable * 1000) 
