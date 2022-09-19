import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        maintenance: {
            isMaintenance: false,
            data: null
        }
    },
    reducers: {
        SingIn: (state, action) => {
            state.user = action.payload;
        },
    }
});

export const { SingIn } = userSlice.actions;

export default userSlice.reducer;