import { Route, Routes } from "react-router"
import LandingPage from "../pages/Landing"

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
        </Routes>
    )
}

export default AppRouter