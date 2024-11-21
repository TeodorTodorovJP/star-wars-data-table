import { UserData } from "./signUpSlice"

// A mock function to mimic making an async login
export const confirmLogIn = (userData: UserData) => {
  return new Promise<{ data: UserData }>((resolve) => setTimeout(() => resolve({ data: userData }), 1000))
}
