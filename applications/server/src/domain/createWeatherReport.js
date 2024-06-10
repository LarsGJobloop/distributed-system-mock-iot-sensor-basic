/**
 * A function for creating a WeatherReport from a WeatherMeasurement
 * 
 * @param {WeatherMeasurment} report 
 * @returns {WeatherReport}
 */
export const createWeatherReport = (report) => {
  return {
    id: report.sensorId + (Number.MAX_SAFE_INTEGER / Math.random()).toString(),
    location: report.location,
    temperatureC: report.measurments.temperature,
    timestamp: report.timestamp,
  }
}
