import {useJson} from '../hooks/useJson'

const endpoint = "/api/v1/weather"

export function WeatherReports({weatherApiAddress}) {
  const {
    isLoading,
    data: reports,
    error
  } = useJson(weatherApiAddress + endpoint)
  
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Latitude</th>
          <th scope="col">Longitude</th>
          <th scope="col">Elevation</th>
          <th scope="col">Temperature</th>
        </tr>
      </thead>

      <tbody>
        {
          isLoading ? (null)
          : error ? (null)
          : (
            reports.map(report => (
              <tr key={report.id}>
                <th>Latitude: {report.location.lat}</th>
                <td>Longitude: {report.location.long}</td>
                <td>Elevation: {report.location.elevation}</td>
                <td>Temperature: {report.temperatureC}&deg;C</td>
              </tr>
            ))
          )
        }
      </tbody>
    </table>
  ) 
}