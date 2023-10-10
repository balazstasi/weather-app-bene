import { emptySplitApi } from "@/api"

const API_URL = "https://restcountries.com/v3.1/"
const capitalCitiesApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCapitalCities: builder.query<{ name: string; capital: string }[], void>({
      query: () => API_URL + "/all?fields=capital",
    }),
  }),
  overrideExisting: false,
})

export const { useGetCapitalCitiesQuery } = capitalCitiesApi
