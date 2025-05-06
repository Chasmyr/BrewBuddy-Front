import { Box, Typography } from "@mui/material"
import RecipeFormBase from "../components/recipeForm/RecipeFormBase"
import Header from "../layout/Header"
import RecipeBreadcrumb from "../components/recipeForm/recipeFormComponents/RecipeBreadcrumb"
import RecipeFormMashing from "../components/recipeForm/RecipeFormMashing"
import RecipeFormBoiling from "../components/recipeForm/RecipeFormBoiling"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import RecipeFormFermentation from "../components/recipeForm/RecipeFormFermentation"


const RecipePage = () => {

    const currentStep = useSelector((state: RootState) => state.recipeForm.currentStep)

    return (
        <>
            <Header />
            <Box
                sx={{
                    width: "100vw",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    bgcolor: {
                        xs: "#FFFCF2",
                        sm: "#F99926"
                    },
                }}
            >
                <Box
                    sx={{
                        width: {
                            xl: "45%",
                            lg: "60%",
                            md: "70%",
                            sm: "90%",
                            xs: "100%"
                        },
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
                            color: '#FFFCF2',
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
                            height: "100%"
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
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default RecipePage