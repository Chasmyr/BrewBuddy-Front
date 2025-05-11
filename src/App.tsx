import { BrowserRouter } from "react-router"
import AppRouter from "./routes/Router"
import "./index.css"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUserSlice } from "./store/userSlice"
import { SnackbarProvider } from "./context/SnackbarContext"
import { ThemeProvider } from "@emotion/react"
import theme from "./themes/theme"

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if(token) {
      dispatch(setUserSlice({"accessToken": token}))
    }
    const uid = localStorage.getItem("id")
    if(uid) {
      dispatch(setUserSlice({"id": uid}))
    }
    const role = localStorage.getItem("role")
    if(role) {
      dispatch(setUserSlice({"role": role}))
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
