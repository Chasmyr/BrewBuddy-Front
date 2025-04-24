import { Box, Typography } from "@mui/material"
import RecipeFormBase from "../components/recipeForm/RecipeFormBase"
import Header from "../layout/Header"
import RecipeFormIngredient from "../components/recipeForm/RecipeFormIngredient"
import RecipeBreadcrumb from "../components/recipeForm/RecipeBreadcrumb"
import { useState } from "react"
import RecipeOptions from "../components/recipeForm/RecipeOptions"
import RecipeFormMashing from "../components/recipeForm/RecipeFormMashing"
import { recipeSteps } from "../utils/const"
import RecipeFormBoiling from "../components/recipeForm/RecipeFormBoiling"


const RecipePage = () => {

    const [currentStep, setCurrentStep] = useState(2)
    const [isMultiMashing, setIsMultiMashing] = useState(false)
    const [isMashout, setIsMashout] = useState(false)

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
                    bgcolor: "#F99926",
                }}
            >
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: "800px"
                    }}
                >
                    <Box
                        sx={{
                            mb: 2,
                            mt: 16,
                            color: '#FFFCF2',
                            width: "714px"
                        }}
                    >
                        <Typography variant="h4">
                            Créer ta propre recette de bière ! 🍻
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: "714px",
                            mb: 6,
                        }}
                    >   
                        <RecipeBreadcrumb currentStep={currentStep} setCurrentStep={setCurrentStep} steps={recipeSteps}/>
                        {currentStep === 0 && (
                            <RecipeFormBase />
                        )}

                        {currentStep === 1 && (
                            <RecipeFormIngredient />
                        )}

                        {currentStep === 2 && (
                            <RecipeFormMashing isMulti={isMultiMashing} setIsMulti={setIsMultiMashing} isMashout={isMashout} setIsMashout={setIsMashout} />
                        )}

                        {currentStep === 3 && (
                            <RecipeFormBoiling />
                        )}
                        <RecipeOptions currentStep={currentStep} setCurrentStep={setCurrentStep} steps={recipeSteps} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default RecipePage