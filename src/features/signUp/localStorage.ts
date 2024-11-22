import { UserData } from "./signUpSlice"

export const loadUserFromStorage = (): UserData | null => {
  try {
    const serializedState = localStorage.getItem("login")
    return serializedState ? JSON.parse(serializedState) : null
  } catch (err) {
    console.error("Error loading state from localStorage:", err)
    return null
  }
}

export const logInUserInStorage = (state: UserData): void => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("login", serializedState)
  } catch (err) {
    console.error("Error saving item to localStorage:", err)
  }
}

export const logOutUserFromStorage = (): void => {
  try {
    localStorage.removeItem("login")
  } catch (err) {
    console.error("Error removing item from localStorage:", err)
  }
}
