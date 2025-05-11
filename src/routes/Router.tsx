import { Route, Routes } from "react-router"
import LandingPage from "../pages/Landing"
import AccountPage from "../pages/user/Account"
import LoginPage from "../pages/user/Login"
import RegisterPage from "../pages/user/Register"
import RecipePage from "../pages/recipe/Recipe"
import ErrorPage from "../pages/Error"

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/recipe" element={<RecipePage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default AppRouter