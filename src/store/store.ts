import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import recipeFormReducer from "./recipeFormSlice"
import ingredientReducer from "./ingredientSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        recipeForm: recipeFormReducer,
        ingredient: ingredientReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type ApiDispatch = typeof store.dispatch