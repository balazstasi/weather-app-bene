import { useState, useEffect } from "react"
import axios from "axios"

interface WeatherData {
  temperature: number
  humidity: number
  description: string
}

interface WeatherError {
  message: string
}

interface UseWeatherHook {
  data: WeatherData | null
  error: WeatherError | null
  loading: boolean
}

export const useWeather = (city: string): UseWeatherHook => {
  const [data, setData] = useState<WeatherData | null>(null)
  const [error, setError] = useState<WeatherError | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
            import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY
          }&units=metric`,
        )

        const weatherData: WeatherData = {
          temperature: response.data.main.temp,
          humidity: response.data.main.humidity,
          description: response.data.weather[0].description,
        }

        setData(weatherData)
      } catch (err) {
        setError({ message: "Could not fetch weather data." })
      } finally {
        setLoading(false)
      }
    }

    if (city) {
      fetchWeatherData()
    }
  }, [city])

  return { data, error, loading }
}
