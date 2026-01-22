/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
    token: string | null;
    user: any | null;
}

const akuthSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        user: null,
    } as AuthState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string; user: any }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { setCredentials, logout } = akuthSlice.actions;

export default akuthSlice.reducer;