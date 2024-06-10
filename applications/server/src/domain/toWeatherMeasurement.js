/**
 * Validates an object into a Weather Report
 * 
 * @param {Object} obj 
 * @returns {WeatherReport | null}
 */
export function toWeatherMeasurement(obj) {
  if (
    obj && typeof obj === "object" &&
    typeof obj.sensorId === "string" &&
    typeof obj.timestamp === "string" &&
    typeof obj.location === "object" &&
    typeof obj.measurments === "object" &&
    typeof obj.measurments["temperature"] === "string"
  ) {
    return obj
  } {
    return null
  }
}
