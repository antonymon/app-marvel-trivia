import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        singIn: (state, action) => {
            state.user = action.payload;
        },
        Logout: (state) => {
            state.user = null;
        }
    },
});

export const { singIn, Logout } = userSlice.actions;

export default userSlice.reducer;