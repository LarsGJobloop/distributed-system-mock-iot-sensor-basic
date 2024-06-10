import './App.css'
import { WeatherReports } from './components/weatherReports'
import { WeatherWidget } from './components/weatherWidget'

const weatherApiAddress = import.meta.env.VITE_WEATHER_API_ADDRESS ?? "http://localhost:9090"

function App() {

  return (
    <>
      <WeatherWidget weatherApiAddress={weatherApiAddress} refreshInterval={5} />
      <WeatherReports weatherApiAddress={weatherApiAddress} />
    </>
  )
}

export default App
