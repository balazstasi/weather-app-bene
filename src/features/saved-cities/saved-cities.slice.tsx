import { RootState } from "@/app/store"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface IWeather {
  description: string
  humidity: number
  temperature: number
}

interface ICity {
  id: number
  name: string
  weather: IWeather
}

type Status = "idle" | "loading" | "failed"

export const getWeather = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
      import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY
    }&units=metric`,
  )
  return response.json()
}

export const getCityWeatherAsync = createAsyncThunk(
  "savedCities/getCityWeather",
  async (city: string) => {
    const response = await getWeather(city)
    return response
  },
)

export const savedCitiesSlice = createSlice({
  name: "savedCities",
  initialState: {
    value: [] as ICity[],
    error: null as Error | null,
    status: "idle" as Status,
  },
  reducers: {
    addCity: (state, action) => {
      state.value.push(action.payload)
    },
    removeCity: (state, action) => {
      state.value = state.value.filter((city) => city.id !== action.payload)
    },
    clearCities: (state) => {
      state.value = []
    },
    setCities: (state, action) => {
      state.value = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCityWeatherAsync.fulfilled, (state, action) => {
        state.value.push(action.payload)
        state.status = "idle"
        state.error = null
      })
      .addCase(getCityWeatherAsync.rejected, (state, action) => {
        state.value = []
        state.status = "failed"
        state.error = action.payload as Error
      })
      .addCase(getCityWeatherAsync.pending, (state) => {
        state.value = []
        state.status = "loading"
        state.error = null
      })
  },
})

export const { addCity, removeCity, clearCities, setCities } =
  savedCitiesSlice.actions

export const selectSavedCities = (state: RootState) => state.savedCities.value

export default savedCitiesSlice.reducer
