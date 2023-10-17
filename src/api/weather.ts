import { emptySplitApi } from "@/api"
import { IWeatherData } from "@/types"

const weatherApi = emptySplitApi.injectEndpoints({
  /**
   * Generates the endpoints for fetching weather data.
   *
   * @param {Function} builder - The query builder function.
   * @return {Object} An object containing the fetchWeatherData endpoint.
   */
  endpoints: (builder) => ({
    fetchWeatherData: builder.query<IWeatherData, string>({
      /**
       * Returns the URL for querying weather information based on the provided city name.
       *
       * @param {string} cityName - The name of the city for which weather information is to be queried.
       * @return {string} The URL for querying weather information.
       */
      query: (cityName: string): string => {
        if (!cityName) return ""
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
          import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY
        }&units=metric}`
        return url
      },
    }),
  }),
  overrideExisting: false,
})

export const { useFetchWeatherDataQuery } = weatherApi
