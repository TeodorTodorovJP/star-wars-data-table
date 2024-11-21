import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { FormEvent, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { isUserSigned, logIn } from "./signUpSlice"
import { useNavigate } from "react-router-dom"
import { Card, LogInContainer } from "../../theme"

/**
 * The component works with the more classic state management approach, using createAppSlice
 */
export default function SignUp() {
  // Password section
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")

  // Name section
  const nameInputRef = useRef<HTMLInputElement>(null)
  const [nameError, setNameError] = useState(false)
  const [nameErrorMessage, setNameErrorMessage] = useState("")

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const signed = useAppSelector(isUserSigned)

  useEffect(() => {
    if (signed) {
      navigate("/table")
    }
  }, [signed, navigate])

  const validateInputs = () => {
    const name = nameInputRef.current?.value
    const password = passwordInputRef.current?.value

    let isValid = true

    if (!password || password.length < 6) {
      setPasswordError(true)
      setPasswordErrorMessage("Password must be at least 6 characters long.")
      isValid = false
    } else {
      setPasswordError(false)
      setPasswordErrorMessage("")
    }

    if (!name || name.length < 1) {
      setNameError(true)
      setNameErrorMessage("Name is required.")
      isValid = false
    } else {
      setNameError(false)
      setNameErrorMessage("")
    }

    return isValid
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (nameError || passwordError) return

    const data = new FormData(event.currentTarget)
    const name = data.get("name") as string
    const password = data.get("password") as string

    if (name && password) {
      dispatch(logIn({ name, password }))
    } else {
      console.error("Error during login")
    }

    console.log({
      name: data.get("name"),
      password: data.get("password"),
    })
  }

  return (
    <div>
      <LogInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined" sx={{ margin: "inherit" }}>
          <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="name">User Name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Yoda"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
                onChange={validateInputs}
                inputRef={nameInputRef}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
                onChange={validateInputs}
                inputRef={passwordInputRef}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" onClick={validateInputs} disabled={!nameInputRef.current?.value || !passwordInputRef.current?.value}>
              Log In
            </Button>
          </Box>
        </Card>
      </LogInContainer>
    </div>
  )
}
