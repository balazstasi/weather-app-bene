import { CenterTop } from "@/components/ui/center-top"
import { Weather } from "@/components/composed/saved-city-list"

export function HomeScreen() {
  return (
    <CenterTop>
      <Weather />
    </CenterTop>
  )
}
