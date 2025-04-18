import { Route, Routes } from "react-router"
import LandingPage from "../pages/Landing"
import AccountPage from "../pages/Account"
import LoginPage from "../pages/Login"
import RegisterPage from "../pages/Register"

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    )
}

export default AppRouter