export const validateName = (name: string | undefined) => {
  const min = 2
  return !name || name.length < min ? "Name is required." : ""
}

export const validatePassword = (password: string | undefined) => {
  const limit = 6
  return !password || password.length < limit ? `Password must be at least ${limit} characters long.` : ""
}
