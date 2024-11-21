import { Container, Typography } from "@mui/material"

import { Outlet } from "react-router-dom"
function App() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        color: "text.primary",
        padding: 2,
        gap: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography sx={{ typography: { sm: "h6", md: "h2" } }}>Vite + TypeScript + React + Redux</Typography>

      <Outlet />
    </Container>
  )
}

export default App
