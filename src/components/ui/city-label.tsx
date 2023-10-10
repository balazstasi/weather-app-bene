import { styled } from "@linaria/react"

const CityName = styled.h1`
  color: var(--text);
  font-size: 50px;
  cursor: pointer;
  font-weight: bold;
  margin: 0;
  padding: 0;
  text-align: center;
  user-select: none;
  line-height: 1.2;
  margin-bottom: 8px;
  @media (max-width: 768px) {
    font-size: 40px;
  }
  @media (max-width: 480px) {
    font-size: 30px;
  }

  &:hover {
    filter: drop-shadow(0 0 32px var(--text));
    transition: all 0.2s ease-in-out;
    transform: scale(1.05);
    color: var(--text);
    &:active {
      filter: none;
      transition: all 0.05s ease-in-out;
      transform: scale(1);
    }
  }
`

type CityLabelProps = {
  city?: string
}
export const CityLabel = (props: CityLabelProps) => {
  const { city } = props
  return <CityName>{city ?? "No name"}</CityName>
}
