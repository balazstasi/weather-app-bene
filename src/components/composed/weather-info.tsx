import { useFetchWeatherDataQuery } from "@/api/weather"
import { CityLabel } from "@/components/ui/city-label"
import { SpaceVertical } from "@/components/ui/space-vertical"
import { WeatherIcon } from "@/components/ui/weather-icon"
import { useCurrentTime } from "@/utils/hooks/use-current-time"
import { styled } from "@linaria/react"
import { TempIcon } from "@/_assets/TempIcon"
import { Sunrise } from "@/_assets/Sunrise"
import { Sunset } from "@/_assets/Sunset"
import { Plus as PlusIcon } from "@/_assets/Plus"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Check as CheckIcon } from "@/_assets/Check"
import {
  weatherActions,
  weatherSelectors,
} from "@/features/weather/weather.slice"
import { RootState } from "@/app/store"
import { IWeatherData } from "@/types"

const convertFtoC = (temp: number) => {
  return Math.round((temp - 273.15) * 10) / 10
}

type WeatherInfoProps = {
  city: string
}
export const WeatherInfo = (props: WeatherInfoProps) => {
  const { city } = props
  const { data: weatherData } = useFetchWeatherDataQuery(city)
  const weatherIcon = weatherData?.weather[0]?.icon ?? ""

  const dispatch = useAppDispatch()
  const addCity = (cityWeather: IWeatherData) => {
    dispatch(weatherActions.addCity(cityWeather))
  }
  const removeCity = (cityWeather: IWeatherData) => {
    dispatch(weatherActions.removeCity(cityWeather.name))
  }
  const isSaved = useAppSelector((state: RootState) =>
    weatherSelectors.isCitySaved(state, city),
  )
  const timezoneOffset = weatherData?.timezone ?? 0

  const { formatted: currentTime } = useCurrentTime({
    offset: timezoneOffset,
    starting: 0,
  })

  const { formatted: sunsetTime } = useCurrentTime({
    offset: timezoneOffset,
    starting: weatherData?.sys?.sunset ?? 0,
    constant: true,
  })

  const { formatted: sunriseTime } = useCurrentTime({
    offset: timezoneOffset,
    starting: weatherData?.sys?.sunrise ?? 0,
    constant: true,
  })

  const temperature = convertFtoC(weatherData?.main.temp ?? 0)

  return (
    <div>
      <SpaceVertical height={128} />
      <CurrentTimeWrapper>
        {!isSaved && (
          <SvgIcon
            onClick={() => {
              if (weatherData) addCity(weatherData)
            }}
          >
            <Plus />
          </SvgIcon>
        )}
        {isSaved && (
          <SvgIcon
            onClick={() => {
              if (weatherData) removeCity(weatherData)
            }}
          >
            <Check />
          </SvgIcon>
        )}
        <CurrentTime>{currentTime()}</CurrentTime>
      </CurrentTimeWrapper>
      <SpaceVertical height={8} />
      <CityLabel city={city} />
      <WeatherDataWrapper>
        {weatherData && <WeatherIcon iconType={weatherIcon} />}
        <WeatherDataLabel>{weatherData?.weather[0].main}</WeatherDataLabel>
      </WeatherDataWrapper>
      <AdditionalWeatherDataWrapper>
        <AdditionalWeatherData>
          <SvgIcon>
            <TempIcon />
          </SvgIcon>
          <AdditionalWeatherDataLabel>{`${temperature.toFixed()} C° `}</AdditionalWeatherDataLabel>
        </AdditionalWeatherData>
        <SpaceVertical height={16} />
        <AdditionalWeatherData>
          <SvgIcon>
            <Sunrise />
          </SvgIcon>
          <AdditionalWeatherDataLabel>
            {sunriseTime()}
          </AdditionalWeatherDataLabel>
        </AdditionalWeatherData>
        <SpaceVertical height={16} />

        <AdditionalWeatherData>
          <SvgIcon>
            <Sunset />
          </SvgIcon>
          <AdditionalWeatherDataLabel>
            {sunsetTime()}
          </AdditionalWeatherDataLabel>
        </AdditionalWeatherData>
      </AdditionalWeatherDataWrapper>
    </div>
  )
}

const Plus = styled(PlusIcon)`
  width: 48px;
  height: 48px;
  color: var(--yale-blue);
  transition: all 0.2s ease-in;
  cursor: pointer;
  margin-left: 96px;
  &:hover {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 1));
    transition: all 0.2s ease-in;
    cursor: pointer;
    color: var(--powder-blue);
    text-shadow: 0 0 10px var(--powder-blue);
  }
  &:active {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 1));
    transition: all 0.2s ease-in;
    cursor: pointer;
    color: var(--powder-blue);
    text-shadow: 0 0 10px var(--powder-blue);
    transform: translateY(2px);
    transition: translateY 0.1s ease-in;
  }
`

const Check = styled(CheckIcon)`
  width: 48px;
  height: 48px;
  color: var(--yale-blue);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin-left: 96px;
  &:hover {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 1));
    transition: all 0.2s ease-in;
    cursor: pointer;
    color: lightgreen;
    text-shadow: 0 0 10px var(--powder-blue);
  }
  &:active {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 1));
    transition: all 0.2s ease-in;
    cursor: pointer;
    color: var(--powder-blue);
    text-shadow: 0 0 10px var(--powder-blue);
    transform: translateY(2px);
    transition: translateY 0.1s ease-in;
  }
`

const AdditionalWeatherData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0px;
  align-self: center;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
`

export const SvgIcon = styled.div`
  width: 48px;
  height: 48px;
  color: var(--yale-blue);
  transition: all 0.2s ease-in;
`

const AdditionalWeatherDataLabel = styled.p`
  font-weight: 400;
  font-size: 32px;
  color: var(--text);
  margin: 0px;
  padding-right: 64px;
  text-transform: capitalize;
  text-align: right;
`

const WeatherDataWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  user-select: none;
`

const AdditionalWeatherDataWrapper = styled(WeatherDataWrapper)`
  align-self: center;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 32px;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 32px;
`

const WeatherDataLabel = styled.p`
  font-weight: 400;
  font-size: 24px;
  color: var(--text);
  margin: 0px;
  margin-top: -32px;
  padding: 0px;
  text-transform: lowercase;
`

const CurrentTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  user-select: none;
`

const CurrentTime = styled.p`
  font-weight: 400;
  font-size: 64px;
  color: var(--color-text);
  margin: 0px;
  margin-top: -8px;
  padding: 0px;
`
