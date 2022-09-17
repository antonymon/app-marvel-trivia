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
        singIn: (state, action) => {
            state.user = action.payload;
        },
        Logout: (state) => {
            state.user = null;
            state.maintenance = {
                maintenance: false,
                data: null
            }
        },
        Maintenance: (state, action) => {
            state.maintenance = action.payload;
        }
    },
});

export const { singIn, Logout, Maintenance } = userSlice.actions;

export default userSlice.reducer;