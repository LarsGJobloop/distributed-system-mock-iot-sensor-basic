import {mock} from './utilities/mocker.js'  

// Get Environment Configurations
const serverAddress = process.env.WEATHER_ADDRESS
const version = "v1"
const endpoint = `/api/${version}/weather`
const url = `${serverAddress}${endpoint}`
const sensorId = mock.uuid()

// Figure out local configuration
const location = mock.randomCoordinatesIso()

/**
 * Create a new report
 */
const createMockReport = () => ({
  sensorId,
  location,
  timestamp: mock.timeNowIso(),
  measurments: {
    temperature: mock.randomInRangeInteger(5, 20),
  }
})

/**
 * Sends a report to the server
 */
const sendReport = async (report) => {
  console.log(`Trying sending report to: ${url}`)
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
    })

    console.log(`Report posted to: ${url}`)
  } catch (error) {
    console.log("Failed sending report to server")
    console.log(error)
  }
}

// Main worker loop
const intervalId = setInterval(() => sendReport(createMockReport()), 5000)

// Listen for shutdown signals
const shutdown = (signal) => {
  console.log(`Recieved signal: ${signal}. Shutting down worker`)
  
  clearInterval(intervalId)
}

process.addListener("SIGINT", shutdown)
process.addListener("SIGTERM", shutdown)
