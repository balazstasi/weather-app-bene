import { useGetCapitalCitiesQuery } from "@/api/capital-city"
import { SearchInput } from "@/components/composed/search-input"
import { SearchResults } from "@/components/composed/search-results"
import { useFuzzySearch } from "@/utils/hooks/use-fuzzy-search"
import { styled } from "@linaria/react"
import { useEffect, useState } from "react"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`

export const SearchCity = () => {
  const [value, setValue] = useState("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const cities = useGetCapitalCitiesQuery().data?.map(
    (city: { name: string; capital: string }) => city.capital?.[0] ?? "",
  )
  const { results } = useFuzzySearch((cities ?? []) as string[], value)

  useEffect(() => {
    if (results.length === 0 && value) setErrorMessage("No results found!")
    else if (results.length === 0 && !value)
      setErrorMessage("Enter a city name!")
    else setErrorMessage("")
  }, [results.length, value])

  return (
    <Container>
      <SearchInput
        value={value}
        setValue={setValue}
        errorMessage={errorMessage}
      />
      <SearchResults results={results} query={value} />
    </Container>
  )
}
