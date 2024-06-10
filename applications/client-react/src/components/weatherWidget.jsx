/// <reference path="../../../../models/weather-api.d.ts" />

import { useJson } from '../hooks/useJson'

const endpoint = "/api/v1/weather/latest"

export function WeatherWidget({ weatherApiAddress, refreshInterval }) {
  const {isLoading, data: report, error} = useJson(weatherApiAddress + endpoint, { refreshInterval })

  return (
    <div>
      {
        isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error...</p>
        ) : (
          <>
            <div>
              <p>Location:</p>
              <ul>
                <li>Latitude: {report.location.lat}</li>
                <li>Longitude: {report.location.long}</li>
                <li>Elevation: {report.location.elevation}</li>
              </ul>
            </div>
            <p>Temperature: {report.temperatureC}&deg;C</p>
          </>
        )
      }
    </div>
  )
}