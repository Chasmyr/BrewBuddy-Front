import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface User {
    token: string | null
    id: number | null
    role: string | null
}

const initialState: User = {
    token: null,
    id: null,
    role: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserSlice: (state, action: PayloadAction<any>) => {
            if(action.payload.accessToken) {
                state.token = action.payload.accessToken
            }
            if(action.payload.id) {
                state.id = action.payload.id
            }
            if(action.payload.role) {
                state.role = action.payload.role
            }
        },
        logout: (state) => {
            state.token = null
        }
    }
})

export const  {setUserSlice, logout} = userSlice.actions
export default userSlice.reducer