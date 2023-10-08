import { CenterTop } from "@/components/ui/center-top"
import { SavedCities } from "@/features/saved-cities/saved-cities"

export function HomeScreen() {
  return (
    <CenterTop>
      <SavedCities />
    </CenterTop>
  )
}
