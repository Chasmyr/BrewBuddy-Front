import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import recipeFormReducer from "./recipeFormSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        recipeForm: recipeFormReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type ApiDispatch = typeof store.dispatch