import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import savedCitiesReducer from "@/features/saved-cities/saved-cities.slice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    savedCities: savedCitiesReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
