import { mock } from './mocker.js'

const BASE_URL = "http://localhost:5001"
const API_VERSION = "v1"

const getMockReport = () => ({
  id: mock.uuid(),
  temperatureC: mock.randomInRangeInteger(5, 20),
  timestamp: mock.timeNowIso(),
  location: mock.randomCoordinatesIso(),
})

/**
 * @returns {Promise<WeatherReport>}
 */
async function getLatest(address) {
  return getMockReport()
}

export const weatherApi = {
  /**
   * Returns the latest weather report
   */
  getLatest: () => getLatest(`${BASE_URL}/api/${API_VERSION}/latest`)
}
