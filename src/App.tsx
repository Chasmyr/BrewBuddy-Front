import { BrowserRouter } from "react-router"
import AppRouter from "./routes/Router"
import "./index.css"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUserSlice } from "./store/userSlice"

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if(token) {
      dispatch(setUserSlice({"accessToken": token}))
    }
  }, [])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
