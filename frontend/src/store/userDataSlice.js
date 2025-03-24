import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        username: '',
        email: '',
    },
    reducers: {
        setUserData(state, action) {
            state.username = action.payload.username;
            state.email = action.payload.email;
        }
    }
});

export default userDataSlice.reducer;
export const { setUserData } = userDataSlice.actions;

export const selectUsername = (state) => state.userData.username;
export const selectEmail = (state) => state.userData.email;