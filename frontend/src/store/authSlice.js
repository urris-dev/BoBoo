import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import store from "@/store/store.js"

// const state = store.getState();
// const userData = state.userData;

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async function ({password}) {
        const userData = store.getState().userData;
        console.log(userData.username, userData.email, password);

        // await fetch('http://127.0.0.1:8000/api/users/send-email-confirmation-code', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: userData.username,
        //         email: userData.email,
        //         password: password
        //     })
        // })
    }
);

export const confirmEmail = createAsyncThunk(
    'auth/confirmEmail',
    async function ({code}) {
        const userData = store.getState().userData;

        console.log(userData.email, code);
        // await fetch('http://127.0.0.1:8000/api/users/confirm-email', {
        //     method: 'POST',
        //     headers: {},
        //     body: JSON.stringify({
        //         email: userData.email,
        //         code: code
        //     })
        // })
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: null,
        error: null
    },
    reducers: {

    },
    // extraReducers: {
    //
    // }
});

export default authSlice.reducer;