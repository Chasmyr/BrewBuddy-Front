import { Box, Typography } from "@mui/material"
import RecipeFormBase from "../components/recipeForm/RecipeFormBase"
import Header from "../layout/Header"
import RecipeFormIngredient from "../components/recipeForm/RecipeFormIngredient"
import RecipeBreadcrumb from "../components/recipeForm/RecipeBreadcrumb"
import { useState } from "react"
import RecipeOptions from "../components/recipeForm/RecipeOptions"


const RecipePage = () => {

    const [currentStep, setCurrentStep] = useState(2)
    const recipeSteps = ['Profil', 'Empâtage', 'Ebullition', 'Fermentation']

    return (
        <>
            <Header />
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    bgcolor: "#F99926",
                }}
            >
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: "800px",
                        mb: 2,
                        mt: 16,
                        color: '#FFFCF2'
                    }}
                >
                    <Typography variant="h4">
                        Créer ta propre recette de bière ! 🍻
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: "800px",
                        mb: 6
                    }}
                >   
                    <RecipeBreadcrumb currentStep={currentStep} setCurrentStep={setCurrentStep} steps={recipeSteps}/>
                    {currentStep === 0 && (
                        <>
                            <RecipeFormBase />
                            <RecipeFormIngredient />
                        </>
                    )}

                    {currentStep === 1 && (
                        <p>
                            1
                        </p>
                    )}

                    {currentStep === 2 && (
                        <p>
                            2
                        </p>
                    )}

                    {currentStep === 3 && (
                        <p>
                            3
                        </p>
                    )}
                    <RecipeOptions currentStep={currentStep} setCurrentStep={setCurrentStep} steps={recipeSteps} />
                </Box>
            </Box>
        </>
    )
}

export default RecipePage