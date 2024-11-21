import { createAppSlice } from "../../app/createAppSlice"
import { confirmLogIn } from "./logInAPI"

export interface UserData {
  name: string
  password: string
}

export interface SignUpSliceState {
  signed: boolean
  userData: UserData | null
  status: "idle" | "loading" | "failed"
}

const initialState: SignUpSliceState = {
  signed: false,
  userData: null,
  status: "idle",
}

export const signUpSlice = createAppSlice({
  name: "signUp",
  initialState,
  reducers: (create) => ({
    logout: create.reducer((state) => {
      state.status = "idle"
      state.userData = null
      state.signed = false
    }),

    logIn: create.asyncThunk(
      async (userData: UserData) => {
        const response = await confirmLogIn(userData)
        return response.data
      },
      {
        pending: (state) => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.userData = action.payload
          state.signed = true
        },
        rejected: (state) => {
          state.status = "failed"
          state.userData = null
          state.signed = false
        },
      }
    ),
  }),
  selectors: {
    isUserSigned: (state) => state.signed,
  },
})

export const { logIn, logout } = signUpSlice.actions

export const { isUserSigned } = signUpSlice.selectors
