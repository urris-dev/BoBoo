import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        username: '',
        email: '',
        photo: '',
    },
    reducers: {
        setUserData(state, action) {
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        setUserPhoto(state, action) {
            state.photo = action.payload.photo;
        },
    }
});

export default userDataSlice.reducer;
export const { setUserData, setUserPhoto } = userDataSlice.actions;

export const selectUsername = (state) => state.userData.username;
export const selectEmail = (state) => state.userData.email;