import { createAppSlice } from "../../app/createAppSlice"
import { loadUserFromStorage } from "./localStorage"
import { confirmLogIn, confirmLogOut } from "./logInAPI"

export interface UserData {
  name: string
  password: string
}

export interface SignUpSliceState {
  signed: boolean
  userData: UserData | null
  status: "idle" | "loading" | "failed"
}

const user = loadUserFromStorage()

const initialState: SignUpSliceState = {
  signed: !!user,
  userData: user,
  status: "idle",
}

export const signUpSlice = createAppSlice({
  name: "signUp",
  initialState,
  reducers: (create) => ({
    logout: create.asyncThunk(
      async () => {
        const response = await confirmLogOut()
        return response
      },
      {
        pending: (state) => {
          state.status = "loading"
        },
        fulfilled: (state) => {
          state.status = "idle"
          state.userData = null
          state.signed = false
        },
        rejected: (state) => {
          state.status = "failed"
          state.userData = null
          state.signed = false
        },
      }
    ),

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
    userStatus: (state) => state.status,
  },
})

export const { logIn, logout } = signUpSlice.actions

export const { isUserSigned, userStatus } = signUpSlice.selectors
