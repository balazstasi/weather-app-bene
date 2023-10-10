import { SpaceVertical } from "@/components/ui/space-vertical"
import { styled } from "@linaria/react"
import { UUID } from "@/utils/hooks/use-uuid"
import { useNavigate } from "react-router-dom"

type SearchResultsProps = {
  results: string[]
  query: string
}

export const SearchResults = ({ results, query }: SearchResultsProps) => {
  const navigate = useNavigate()

  return (
    <Container>
      <SpaceVertical height={16} />
      {results.map((city) => {
        const parts = city.split("")
        const uuid = UUID()
        return (
          <div
            key={uuid}
            onClick={() => {
              navigate(`/weather/${city}`)
            }}
          >
            <CityName key={city}>
              {parts.map((part) => {
                const uuid = UUID()
                return query.includes(part) ? (
                  <CityNameLetter glow key={uuid}>
                    {part}
                  </CityNameLetter>
                ) : (
                  <CityNameLetter key={uuid}>{part}</CityNameLetter>
                )
              })}
            </CityName>

            <SpaceVertical height={4} />
          </div>
        )
      })}
    </Container>
  )
}

const CityName = styled.p`
  font-weight: 500;
  font-size: 40px;
  color: var(--color-text);
  cursor: pointer;
  margin-top: 4px;
  margin-bottom: 0px;
  text-align: left;
  padding: 0px;
  margin-left: -16px;
  user-select: none;
  /* Glow effect */
  &:hover {
    color: var(--powder-blue);
    text-shadow: 0 0 10px var(--powder-blue);
    transition: all 0.2s ease-in;
    cursor: pointer;
    text-decoration-color: var(--powder-blue);
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
  }

  &:active {
    /* Push effect */
    transform: translateY(4px);
    transition: translateY 0.1s ease-in;
    color: white;
  }
`

const CityNameLetter = styled.b<{ glow?: boolean }>`
  color: ${({ glow }) => (glow ? "var(--powder-blue)" : "var(--color-text)")};

  &:active {
    /* Push effect */
    color: white !important;
    ${({ glow }) => (glow ? "text-shadow: 0 0 10px var(--powder-blue);" : "")}
    transition: all 0.2s ease-in;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 400px;
  max-width: 400px;
  justify-content: "flex-start";
`
