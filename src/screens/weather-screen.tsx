import { WeatherInfo } from "@/components/composed/weather-info"
import { BackButton } from "@/components/ui/back-button"
import { CenterTop } from "@/components/ui/center-top"
import { useParams } from "react-router-dom"

export function WeatherScreen() {
  const params = useParams()
  const city = params.city

  return (
    <CenterTop>
      <BackButton />
      {typeof city === "string" && city.length > 0 && (
        <WeatherInfo city={city} />
      )}
    </CenterTop>
  )
}
