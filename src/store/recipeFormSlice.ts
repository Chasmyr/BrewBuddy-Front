import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BeerProfil, CreateRecipe, RecipeIngredientList, Mashing, BoilingStep } from "../type/recipeObject"
import { baseStateRecipe } from "../utils/const"

export interface RecipeForm {
    currentStep: number,
    recipe: CreateRecipe
}

const initialState: RecipeForm = {
    currentStep: 3,
    recipe: baseStateRecipe
}

export const recipeFormSlice = createSlice({
    name: "recipeForm",
    initialState,
    reducers: {
        setCurrentStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload
        },
        setBeerProfil: (state, action: PayloadAction<BeerProfil>) => {
            state.recipe.profil = action.payload
        },
        setBeerIngredients: (state, action: PayloadAction<RecipeIngredientList[]>)  => {
            action.payload.forEach((incomingCategory) => {
                const existingCategoryIndex = state.recipe.recipeIngredients.findIndex(
                    (cat) => cat.category === incomingCategory.category
                )
            
                if (existingCategoryIndex === -1) {
                    // Catégorie absente : ajout direct
                    state.recipe.recipeIngredients.push(incomingCategory)
                } else {
                    // Catégorie existante : on remplace les ingrédients par ceux du payload
                    state.recipe.recipeIngredients[existingCategoryIndex].ingredients = [
                        ...incomingCategory.ingredients
                ]
                }
            })
        },
        setBeerMashingSteps: (state, action: PayloadAction<Mashing>) => {
            state.recipe.steps.mashing = action.payload
        },
        setBeerBoilingSteps: (state, action: PayloadAction<BoilingStep[]>) => {
            const steps = action.payload

            const boilingStepsWithoutPostBoiling = steps
                .filter(step => !step.postBoiling)
                .sort((a, b) => a.whenToAdd - b.whenToAdd)
            
            const postBoilingStep = steps
                .filter(step => step.postBoiling)
            
            state.recipe.steps.boiling = [...boilingStepsWithoutPostBoiling, ...postBoilingStep]
        }
    }
})

export const { setCurrentStep, setBeerProfil, setBeerIngredients, setBeerMashingSteps, setBeerBoilingSteps } = recipeFormSlice.actions
export default recipeFormSlice.reducer