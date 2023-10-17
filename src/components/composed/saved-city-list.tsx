import { useAppSelector } from "@/app/hooks"
import { CityLabel } from "@/components/ui/city-label"
import { PlusButton } from "@/components/ui/plus-button"
import { SpaceVertical } from "@/components/ui/space-vertical"
import { weatherSelectors } from "@/features/weather/weather.slice"
import { IWeatherData } from "@/types"
import { useNavigate } from "react-router-dom"

export const Weather = () => {
  const navigate = useNavigate()
  const cities = useAppSelector(weatherSelectors.selectCities)

  return (
    <>
      <SpaceVertical height={128} />
      {cities.map((city: IWeatherData) => (
        <div
          onClick={() => {
            navigate(`/weather/${city.name}`)
          }}
        >
          <CityLabel key={city.id} city={city.name} />
        </div>
      ))}
      <SpaceVertical height={128} />
      <PlusButton
        onClick={() => {
          navigate("/search")
        }}
      />
    </>
  )
}
