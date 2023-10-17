interface ICity {
  name: string
  temperature: string
  humidity: string
}

type WithId<T> = T & { id: number }
type TempAndHumidity = {
  temp: number
  humidity: number
}

type SunHours = {
  sunrise: number
  sunset: number
  country: string
}

interface WeatherObject {
  id: number
  main: string
  description: string
  icon: string
}

interface IWeatherData {
  id: string
  weather: Array<WithId<WeatherObject>>
  main: TempAndHumidity
  sys: WithId<SunHours>
  timezone: number
  cod: number
  name: string
}

export type { WeatherObject, TempAndHumidity, SunHours }
export type { ICity, IWeatherData }
