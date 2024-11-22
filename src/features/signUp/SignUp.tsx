import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { FormEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { isUserSigned, logIn, userStatus } from "./signUpSlice"
import { useNavigate } from "react-router-dom"
import { Card, LogInContainer } from "../../theme"
import { validateName, validatePassword } from "./validations"

/**
 * The component works with the more classic state management approach, using createAppSlice
 */
export default function SignUp() {
  // Password section
  const [password, setPassword] = useState("")
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")

  // Name section
  const [name, setName] = useState("")
  const [nameErrorMessage, setNameErrorMessage] = useState("")

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const signed = useAppSelector(isUserSigned)
  const status = useAppSelector(userStatus)

  useEffect(() => {
    if (signed) {
      navigate("/table")
    }
  }, [signed, navigate])

  const validateInputName = (name: string) => {
    const nameIsValid = validateName(name)
    setName(name)
    setNameErrorMessage(nameIsValid)
  }

  const validateInputPassword = (password: string) => {
    const passwordIsValid = validatePassword(password)
    setPassword(password)
    setPasswordErrorMessage(passwordIsValid)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (nameErrorMessage || passwordErrorMessage) return

    if (name && password) {
      dispatch(logIn({ name, password }))
    }

    console.log({
      name: name,
      password: password,
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
                error={!!nameErrorMessage}
                helperText={nameErrorMessage}
                color={nameErrorMessage ? "error" : "primary"}
                onChange={(event) => validateInputName(event.currentTarget.value)}
                value={name}
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
                error={!!passwordErrorMessage}
                helperText={passwordErrorMessage}
                color={passwordErrorMessage ? "error" : "primary"}
                onChange={(event) => validateInputPassword(event.currentTarget.value)}
                value={password}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" disabled={!name || !password || !!nameErrorMessage || !!passwordErrorMessage || status === "loading"}>
              {status === "idle" ? "Log In" : status === "loading" ? "Loading" : "Failed"}
            </Button>
          </Box>
        </Card>
      </LogInContainer>
    </div>
  )
}
