import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BeerProfil, CreateRecipe, RecipeIngredientList, Mashing, BoilingStep, FermentingSteps } from "../type/recipeObject"
import { baseStateRecipe } from "../utils/const"

export interface RecipeForm {
    currentStep: number,
    recipe: CreateRecipe
}

const initialState: RecipeForm = {
    currentStep: 0,
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
        setBeerIngredients: (state, action: PayloadAction<RecipeIngredientList[]>) => {
            action.payload.forEach((incomingCategory) => {
                const existingCategoryIndex = state.recipe.recipeIngredients.findIndex(
                    (cat) => cat.category === incomingCategory.category
                )

                if (existingCategoryIndex === -1) {
                // Catégorie absente : ajout direct
                    state.recipe.recipeIngredients.push(incomingCategory)
                } else {
                    const existingIngredients = state.recipe.recipeIngredients[existingCategoryIndex].ingredients

                    const preserved = existingIngredients.filter((ingredient) => {
                        return (
                        (incomingCategory.category === "houblons" && ingredient.dryHoping === true) ||
                        (incomingCategory.category === "sucres" && ingredient.sugar === true)
                        )
                    })

                    const incomingUuids = incomingCategory.ingredients.map((ing) => ing.uuid)
                    const filteredPreserved = preserved.filter(
                        (ing) => !incomingUuids.includes(ing.uuid)
                    )

                    state.recipe.recipeIngredients[existingCategoryIndex].ingredients = [
                        ...filteredPreserved,
                        ...incomingCategory.ingredients
                    ]
                }
            })
        },
        setBeerIngredientsFermenting: (state, action: PayloadAction<RecipeIngredientList[]>) => {
            action.payload.forEach((incomingCategory) => {
                const existingCategoryIndex = state.recipe.recipeIngredients.findIndex(
                    (cat) => cat.category === incomingCategory.category
                )

                const incomingUuids = incomingCategory.ingredients.map(i => i.uuid)
            
                if (existingCategoryIndex === -1) {
                    // Catégorie absente : ajout direct
                    state.recipe.recipeIngredients.push(incomingCategory)
                } else {
                    const existingIngredients = state.recipe.recipeIngredients[existingCategoryIndex].ingredients

                    // supression des ingrédients si modification
                    const updatedIngredients = existingIngredients.filter(existing => {
                        const isInPayload = incomingUuids.includes(existing.uuid)

                        if(incomingCategory.category === "levures") {
                            return isInPayload
                        }

                        if(existing.dryHoping) {
                            return isInPayload
                        }

                        if(existing.sugar) {
                            return isInPayload
                        }

                        return true
                    })

                    // ajout des nouveaux ingrédients
                    incomingCategory.ingredients.forEach((ingredient) => {
                        const alreadyExists = updatedIngredients.some(
                            (ing) => ing.uuid === ingredient.uuid
                        )
                        
                        if (!alreadyExists) {
                            updatedIngredients.push(ingredient)
                        }
                    })

                    state.recipe.recipeIngredients[existingCategoryIndex].ingredients = updatedIngredients
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
        },
        setBeerFermentingSteps: (state, action: PayloadAction<FermentingSteps[]>) => {
            state.recipe.steps.fermenting.steps = action.payload
            let totalDurationOfBaseFermenting = 0
            action.payload.map((step) => {
                if(step.name === "primary" || "secondary")
                totalDurationOfBaseFermenting += step.duration
            })
            state.recipe.steps.fermenting.totalDurationOfBaseFermenting = totalDurationOfBaseFermenting
        }
    }
})

export const { setCurrentStep, setBeerProfil, setBeerIngredients, setBeerMashingSteps, setBeerBoilingSteps, setBeerFermentingSteps, setBeerIngredientsFermenting } = recipeFormSlice.actions
export default recipeFormSlice.reducer