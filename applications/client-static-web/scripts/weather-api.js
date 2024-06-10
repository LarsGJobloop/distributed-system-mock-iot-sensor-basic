/// <reference path="../../../models/weather-api.d.ts" />

// Since this is a static page we need to hardcode the URL
// address here, which means that if we want to deploy this
// to a hosting service under some domain this will need to
// be updated. For working with a development version
// and a production version we would need more logic
const BASE_URL = "http://localhost:9090"
const API_VERSION = "v1"

async function fetchJson(address) {
  const response = await fetch(address)
  const data = await response.json()

  return data
}

export const weatherApi = {
  /**
   * Gets the latest weather report
   * @returns {Promise<WeatherReport>}
   */
  getLatest: async () => await fetchJson(`${BASE_URL}/api/${API_VERSION}/weather/latest`),
  /**
   * Gets all registered resports
   * @returns {Promise<WeatherReport[]>}
   */
  getAll: async () => await fetchJson(`${BASE_URL}/api/${API_VERSION}/weather`),
}
