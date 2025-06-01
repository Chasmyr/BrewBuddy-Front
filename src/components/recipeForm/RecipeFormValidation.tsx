import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import RecipeOptions from "./recipeFormComponents/RecipeOptions"
import { Box } from "@mui/material"
import RecipeFullDetails from "../recipeGalery/RecipeFullDetails"

const RecipeFormValidation = () => {

    const currentRecipe = useSelector((state: RootState) => state.recipeForm.recipe)

    useEffect(() => {

    }, [])

    const handleNext = () => {
        return false
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
                width: {
                    md: "calc(100% - 96px)",
                    sm: "calc(100% - 48px)"
                },
                bgcolor: "#FFFBF2",
                px: {
                    xs: 3,
                    md: 6
                },
                pt: 2
            }}
        >  
            <RecipeFullDetails recipe={currentRecipe}/>
            <Box sx={{my: 2}}></Box>
            <RecipeOptions handleNext={handleNext}/>
        </Box>
    )
}

export default RecipeFormValidation