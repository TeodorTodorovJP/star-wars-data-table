// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_BASE_URL } from "../../app/constants"

interface DetailPair {
  label: string
  value: string
}

export interface Details {
  eye_color: DetailPair
  birth_year: DetailPair
  gender: DetailPair
  films: DetailPair
  vehicles: DetailPair
  starships: DetailPair
}

export interface Person {
  name: string
  height: number
  mass: number
  hair_color: string
  skin_color: string
  created: string
  edited: string
  url: string
  details: Details
}

interface People {
  /**  The total count of people. */
  count: number
  next: null | string
  previous: null | string
  results: Person[]
}

export interface PersonResponse {
  name: string
  height: number
  mass: number
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

interface PeopleResponse {
  /**  The total count of people. */
  count: number
  next: null | string
  previous: null | string
  results: PersonResponse[]
}

// Define a service using a base URL and expected endpoints
export const peopleApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  reducerPath: "peopleApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["People"],
  endpoints: (build) => ({
    getPeople: build.query<People, number>({
      // The values of next and previous could be used, but that would increase the complexity of the code when synchronizing with the table pages
      query: (page = 1) => `?page=${page + 1}`, // Page is always + 1, because the API does not accept page 0
      transformResponse: (response: PeopleResponse): People => {
        // Restructures the data, to better fit the needs of the app.
        const updatedResults = response.results.map((person) => {
          const details: Details = {
            eye_color: { label: "Eye Color", value: person.eye_color },
            birth_year: { label: "Birth Year", value: person.birth_year },
            gender: { label: "Gender", value: person.gender },
            films: { label: "Films", value: person.films.length.toString() },
            vehicles: { label: "Vehicles", value: person.vehicles.length.toString() },
            starships: { label: "Starships", value: person.starships.length.toString() },
          }
          const newPerson: Person = { ...person, details }

          return newPerson
        })

        return { ...response, results: updatedResults }
      },

      // Caches the requests called with that ID
      providesTags: (_, __, id) => [{ type: "People", id }],
    }),
  }),
})

export const { useGetPeopleQuery } = peopleApiSlice
