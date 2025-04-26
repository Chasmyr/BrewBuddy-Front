import { Box, Typography } from "@mui/material"
import RecipeFormBase from "../components/recipeForm/RecipeFormBase"
import Header from "../layout/Header"
import RecipeBreadcrumb from "../components/recipeForm/RecipeBreadcrumb"
import { useState } from "react"
import RecipeFormMashing from "../components/recipeForm/RecipeFormMashing"
import RecipeFormBoiling from "../components/recipeForm/RecipeFormBoiling"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"


const RecipePage = () => {

    const currentStep = useSelector((state: RootState) => state.recipeForm.currentStep)
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
                        <RecipeBreadcrumb />
                        {currentStep === 0 && (
                            <RecipeFormBase />
                        )}

                        {currentStep === 1 && (
                            <RecipeFormMashing isMulti={isMultiMashing} setIsMulti={setIsMultiMashing} isMashout={isMashout} setIsMashout={setIsMashout} />
                        )}

                        {currentStep === 2 && (
                            <RecipeFormBoiling />
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default RecipePage