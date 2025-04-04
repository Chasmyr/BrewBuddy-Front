import { BrowserRouter } from "react-router"
import AppRouter from "./routes/Router"
import "./index.css"

const App = () => {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
