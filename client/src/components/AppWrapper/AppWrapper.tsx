import { useContext, useMemo } from "react"
import { BrowserRouter } from "react-router-dom"
import { CssBaseline, ThemeProvider } from "@mui/material"

import { ColorModeContext } from "../../contexts"
import { RoutesWrapper } from "../RoutesWrapper"
import { darkTheme, lightTheme } from "../../theme"

export const AppWrapper = () => {
  const { colorMode } = useContext(ColorModeContext)

  const getTheme = useMemo(() => colorMode === 'dark' ? darkTheme : lightTheme, [colorMode])

  return (
    <ThemeProvider theme={getTheme}>
      <CssBaseline />
      <BrowserRouter>
        <RoutesWrapper />
      </BrowserRouter>
    </ThemeProvider>
  )
}