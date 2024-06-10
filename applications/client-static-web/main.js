import { weatherApi } from "./scripts/weather-api.js";

/** Refresh intervall in seconds */
const refreshInterval = 5

// Elements from the document
const weatherWidget = document.getElementById("weather-widget")
const reportTable = document.getElementById("weather-reports-table")
const reportTemplate = document.getElementById("weather-reports-data-template")

/**
 * Function for updating the Widget
 */
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
    .textContent = Object.entries(report.location)
      .map(([_,value]) => value)
      .join(" ")
}

/**
 * Function for updating the Table 
 */
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

/**
 * Function describing the update sequence
 */
async function updateGui() {
  return await Promise.all([
    updateWidget(),
    updateTable(),
  ])
}

// Execute updates
let error = null
while (error === null) {
  try {
    await updateGui()
  } catch (err) {
    error = err
  }
  await new Promise(resolve => setTimeout(resolve, refreshInterval * 1000))
}
