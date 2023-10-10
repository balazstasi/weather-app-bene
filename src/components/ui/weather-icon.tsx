import { styled } from "@linaria/react"

/**
 * Returns the base URL for weather icons.
 *
 * @param {string} type - The type of weather icon.
 * @return {string} The URL of the weather icon.
 */
export const ICON_BASE_URL = (type: string) =>
  `https://openweathermap.org/img/wn/${type}@4x.png`

export const WeatherIcon = styled.img<{ iconType: string }>`
  width: 200px;
  height: 200px;
  margin-right: 16px;
  mask-image: ${(props) => `url('${ICON_BASE_URL(props.iconType)}')`};
  background-color: var(--bondi-blue);
  margin: 0px;
  margin-top: -16px;
  padding: 0px;

  /* Glow effect */
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  transition: all 0.2s ease-in;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 1));
    transition: all 0.2s ease-in;
  }
`
