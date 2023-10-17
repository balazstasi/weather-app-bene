import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"
import { IWeatherData } from "@/types"

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    entities: [],
  } as {
    entities: IWeatherData[]
  },
  reducers: {
    /**
     * Adds a city to the state entities if it does not already exist.
     *
     * @param {any} state - The current state.
     * @param {PayloadAction<IWeatherData>} action - The action containing the city data to be added.
     */
    addCity: (
      state: { entities: IWeatherData[] },
      action: PayloadAction<IWeatherData>,
    ) => {
      if (state.entities.find((city) => city.id === action.payload.id)) {
        return
      }

      state.entities.push(action.payload)
    },
    /**
     * Removes a city from the state based on its name.
     *
     * @param state - The current state.
     * @param action - The action containing the city name to be removed.
     */
    removeCity: (state, action: PayloadAction<string>): void => {
      state.entities = state.entities.filter(
        (city: IWeatherData) => city.name !== action.payload,
      )
    },
  },
})

const weatherActions = {
  addCity: weatherSlice.actions.addCity,
  removeCity: weatherSlice.actions.removeCity,
}

const weatherSelectors = {
  selectCities: (state: RootState) => state.weather.entities,
  /**
   * Checks if a city is saved in the state weather entities.
   *
   * @param {RootState} state - The root state object.
   * @param {string} city - The city name to check.
   * @return {IWeatherData} The weather data object if the city is saved, otherwise undefined.
   */
  isCitySaved: (state: RootState, city: string): IWeatherData | null => {
    return (
      state?.weather?.entities?.find(
        (cityWeatherData: IWeatherData) => cityWeatherData.name === city,
      ) ?? null
    )
  },
}

export { weatherSelectors, weatherActions }
export default weatherSlice.reducer
