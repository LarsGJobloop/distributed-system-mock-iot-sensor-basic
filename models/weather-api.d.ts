
type LocationISO6709 = {
  /**
   * Latitude
   */
  lat: string
  /**
   * Longitude
   */
  long: string
  /**
   * Elevation above sealeavel in meters
   */
  elevation: number
}

type WeatherReport = {
  /**
   * UUID in the 8-4-4-4-12 format
   */
  id: string
  /**
   * Measurement in degrees Celsius
   */
  temperatureC: number
  /**
   * Time of measurment in ISO 8601 format
   */
  timestamp: string
  /**
   * Location in ISO 6709
   */
  location: LocationISO6709
}

type WeatherMeasurment = {
  /**
   * Id of sensor in the UUID format 8-4-4-4-12
   */
  sensorId: string,
  /**
   * Time of measurment in ISO 8601 format
   */
  timestamp: string,
  /**
   * Location in ISO 6709
   */
  location: LocationISO6709,
  /**
   * Record of measurments and their value
   */
  measurments: Record<string, number>,
}