import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        token: ''
    },
    reducers: {
        setUserData(state, action) {
            state.token = action.payload.token;
        },
    }
});

export default userDataSlice.reducer;
export const { setUserData } = userDataSlice.actions;
