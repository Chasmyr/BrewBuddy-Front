import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface User {
    token: string | null
}

const initialState: User = {
    token: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserSlice: (state, action: PayloadAction<any>) => {
            state.token = action.payload.accessToken
        },
        logout: (state) => {
            state.token = null
        }
    }
})

export const  {setUserSlice, logout} = userSlice.actions
export default userSlice.reducer