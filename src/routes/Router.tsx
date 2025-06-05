import { Route, Routes } from "react-router"
import LandingPage from "../pages/Landing"
import AccountPage from "../pages/user/Account"
import LoginPage from "../pages/user/Login"
import RegisterPage from "../pages/user/Register"
import RecipePage from "../pages/recipe/RecipeCreateForm"
import ErrorPage from "../pages/Error"
import RecipeGaleryPage from "../pages/recipe/RecipeGalery"
import RecipeDetails from "../pages/recipe/RecipeDetails"
import FaqPage from "../pages/Faq"
import DicoPage from "../pages/DicoPage"
import CguPage from "../pages/CguPage"
import CgvPage from "../pages/CgvPage"
import MobileAppPage from "../pages/MobileApp"

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/recipes/create" element={<RecipePage />} />
            <Route path="/recipes" element={<RecipeGaleryPage />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/dico" element={<DicoPage />} />
            <Route path="/cgu" element={<CguPage />} />
            <Route path="/cgv" element={<CgvPage />} />
            <Route path="/application" element={<MobileAppPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default AppRouter