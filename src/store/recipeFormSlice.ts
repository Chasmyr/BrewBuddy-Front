import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface RecipeForm {
    currentStep: number
}

const initialState: RecipeForm = {
    currentStep: 0
}

export const recipeFormSlice = createSlice({
    name: "recipeForm",
    initialState,
    reducers: {
        setCurrentStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload
        }
    }
})

export const { setCurrentStep } = recipeFormSlice.actions
export default recipeFormSlice.reducer