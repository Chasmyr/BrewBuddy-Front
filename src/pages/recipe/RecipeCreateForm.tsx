import { Box, Typography } from "@mui/material"
import RecipeFormBase from "../../components/recipeForm/RecipeFormBase"
import Header from "../../layout/Header"
import RecipeBreadcrumb from "../../components/recipeForm/recipeFormComponents/RecipeBreadcrumb"
import RecipeFormMashing from "../../components/recipeForm/RecipeFormMashing"
import RecipeFormBoiling from "../../components/recipeForm/RecipeFormBoiling"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import RecipeFormFermentation from "../../components/recipeForm/RecipeFormFermentation"
import { useEffect, useState } from "react"
import RecipeFormSkeleton from "../../components/skeleton/RecipeFormSkeleton"
import { useApi } from "../../hooks/useApi"
import { setIngredientSlice } from "../../store/ingredientSlice"
import { useSnackbar } from "../../context/SnackbarContext"
import { useNavigate } from "react-router"
import RecipeFormValidation from "../../components/recipeForm/RecipeFormValidation"
import Footer from "../../layout/Footer"


const RecipePage = () => {

    const [isFormLoading, setIsFormLoading] = useState(true)
    const {fetchData} = useApi()
    const dispatch = useDispatch()
    const { showSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const currentStep = useSelector((state: RootState) => state.recipeForm.currentStep)
    const ingredients = useSelector((state: RootState) => state.ingredient.ingredients)

    useEffect(() => {
        if(ingredients.length === 0) {
            const fetchIngredient = async () => {
                let axiosConfig = {
                    method: 'get'
                }
                const ingredientResponse = await fetchData("/api/ingredients", axiosConfig)
                if(ingredientResponse) {
                    dispatch(setIngredientSlice(ingredientResponse))
                    setIsFormLoading(false)
                } else {
                    showSnackbar("Une erreur est survenue, merci de revenir plus tard.", "error")
                    window.scrollTo(0, 0)
                    navigate('/')
                }
            }
            fetchIngredient()
        } else {
            setIsFormLoading(false)
        }
    }, [])

    if(isFormLoading) {
        return (
            <RecipeFormSkeleton />
        )
    } else {
        return (
            <>
                <Header />
                <Box
                    sx={{
                        width: "100%",
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        bgcolor: {
                            xs: "#FCF7EB"
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: {xs: "95%", sm: "90%", md: "85%", lg: "1000px"},
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                mb: 2,
                                mt: 16,
                                width: "100%",
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            <Typography variant="h4">
                                Créer ta propre recette de bière ! 🍻
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                mb: 6,
                                mt: {xs: 10, sm: 0},
                                height: "100%",
                                boxShadow: 2
                            }}
                        >   
                            <RecipeBreadcrumb />
                            {currentStep === 0 && (
                                <RecipeFormBase />
                            )}
    
                            {currentStep === 1 && (
                                <RecipeFormMashing />
                            )}
    
                            {currentStep === 2 && (
                                <RecipeFormBoiling />
                            )}
    
                            {currentStep === 3 && (
                                <RecipeFormFermentation />
                            )}

                            {currentStep === 4 && (
                                <RecipeFormValidation />
                            )}
                        </Box>
                    </Box>
                </Box>
                <Footer />
            </>
        )
    }
}

export default RecipePage