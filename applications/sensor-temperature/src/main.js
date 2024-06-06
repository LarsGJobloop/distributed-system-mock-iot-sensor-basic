import {mock} from './utilities/mocker.js'  

const serverAddress = process.env.WEATHER_ADDRESS
const version = "v1"
const endpoint = `/api/${version}/weather`
const url = `${serverAddress}${endpoint}`
console.log(url)

const sensorId = mock.uuid()
const location = mock.randomCoordinatesIso()

const createMockReport = () => ({
  sensorId,
  location,
  timestamp: mock.timeNowIso(),
  measurments: {
    temperature: mock.randomInRangeInteger(5, 20),
  }
})

const sendReport = async (report) => {
  console.log(`Trying sending the report to the server: ${url}`)
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

sendReport(createMockReport())
setInterval(() => sendReport(createMockReport()), 5000)
