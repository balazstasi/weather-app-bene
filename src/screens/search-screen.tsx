import { SearchCity } from "@/components/composed/search-city"
import { BackButton } from "@/components/ui/back-button"
import { CenterTop } from "@/components/ui/center-top"
import { SpaceVertical } from "@/components/ui/space-vertical"

export function SearchScreen() {
  return (
    <CenterTop>
      <BackButton />
      <SpaceVertical height={128} />
      <SearchCity />
    </CenterTop>
  )
}
