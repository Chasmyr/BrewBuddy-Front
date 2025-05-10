import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import RecipeOptions from "./recipeFormComponents/RecipeOptions"

const RecipeFormValidation = () => {

    const currentRecipe = useSelector((state: RootState) => state.recipeForm.recipe)
    console.log(currentRecipe)

    useEffect(() => {

    }, [])

    const handleNext = () => {
        return false
    }

    return (
        <>
            <RecipeOptions handleNext={handleNext}/>
        </>
    )
}

export default RecipeFormValidation