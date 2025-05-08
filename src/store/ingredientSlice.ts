import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IngredientType } from "../type/ingredient"

export interface IngredientSlice {
    ingredients: IngredientType[]
}

const initialState: IngredientSlice = {
    ingredients: []
}

export const ingredientSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        setIngredientSlice: (state, action: PayloadAction<IngredientType[]>) => {
            state.ingredients = action.payload
        }
    }
})

export const  {setIngredientSlice} = ingredientSlice.actions
export default ingredientSlice.reducer