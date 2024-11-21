import { ReactNode } from "react"
import { useAppSelector } from "../app/hooks"
import { isUserSigned } from "../features/signUp/signUpSlice"
import { Card, Typography } from "@mui/material"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const signed = useAppSelector(isUserSigned)

  if (!signed) {
    return (
      <Card variant="outlined" sx={{ margin: "inherit", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography sx={{ typography: { sm: "h4", md: "h2" }, textAlign: "center" }}>You must be logged in to view this page.</Typography>
        <Typography variant="h5">
          Please <a href="/">log in</a> to continue.
        </Typography>
      </Card>
    )
  }

  return children
}

export default ProtectedRoute
