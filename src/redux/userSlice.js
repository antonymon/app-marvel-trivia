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
        Logout: (state) => {
            state.user = null;
            state.maintenance = {
                maintenance: false,
                data: null
            }
        },
        MaintenanceIn: (state, action) => {
            state.maintenance = action.payload;
        },
        MaintenanceOut: (state) => {
            state.maintenance = {
                maintenance: false,
                data: null
            }
        }
    },
});

export const { SingIn, Logout, MaintenanceIn, MaintenanceOut } = userSlice.actions;

export default userSlice.reducer;