import { mock } from "../utilities/mocker.js"

// Generate mock data
const reports = []
const createMockReport = () => ({
  id: mock.uuid(),
  temperatureC: mock.randomInRangeInteger(5, 20),
  timestamp: mock.timeNowIso(),
  location: mock.randomCoordinatesIso(),
})
setInterval(() => reports.push(createMockReport()), 5000)

/**@returns {WeatherReport} */
const getLatest = () => {
  return reports[reports.length - 1]
}

// Configure Routes
export const routes = {
  "/api/v1/weather": async (req, res, context) => {
    const data = JSON.stringify(getLatest())
    res
      .writeHead(200, {
        "Content-Type": "application/json"
      })
      .end(data)
  }
}
