import { logInUserInStorage, logOutUserFromStorage } from "./localStorage"
import { UserData } from "./signUpSlice"

// A mock function to mimic making an async login
export const confirmLogIn = (userData: UserData) => {
  return new Promise<{ data: UserData }>((resolve) =>
    setTimeout(() => {
      logInUserInStorage(userData)
      resolve({ data: userData })
    }, 1000)
  )
}

// A mock function to mimic making an async login
export const confirmLogOut = () => {
  return new Promise<{ data: null }>((resolve) =>
    setTimeout(() => {
      logOutUserFromStorage()
      resolve({ data: null })
    }, 1000)
  )
}
