import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme"
import { Provider } from "react-redux"
import { store } from "./app/store"
import RouterWrap from "./routing/RouterWrap.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <RouterWrap />
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
