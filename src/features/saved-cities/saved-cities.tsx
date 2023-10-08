import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { CityLabel } from "@/components/ui/city-label"
import { PlusButton } from "@/components/ui/plus-button"
import { SpaceVertical } from "@/components/ui/space-vertical"
import { selectSavedCities } from "@/features/saved-cities/saved-cities.slice"
import { NavigationContext } from "@/utils/router/router"
import { RoutingContext } from "@/utils/router/use-router"
import { useContext } from "react"

export const SavedCities = () => {
  const savedCities = useAppSelector(selectSavedCities)
  const dispatch = useAppDispatch()
  const { navigate } = useContext(NavigationContext)

  const onAddCity = () => {
    navigate("search")
  }

  return (
    <>
      <SpaceVertical height={32} />
      {savedCities.map((city) => (
        <CityLabel key={city.id} city={city.name} />
      ))}
      <SpaceVertical height={64} />

      <PlusButton onClick={onAddCity} />
    </>
  )
}
