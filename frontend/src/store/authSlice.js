import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import store from "@/store/store.js"

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async function ({password}) {
        const state = store.getState();
        const apiData = state.api;
        const userData = state.userData;

        return fetch(new URL('send-email-confirmation-code', apiData.authApiURL).href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userData.username,
                email: userData.email,
                password: password
            })
        });
    }
);

export const confirmEmail = createAsyncThunk(
    'auth/confirmEmail',
    async function ({code}) {
        const state = store.getState();
        const apiData = state.api;
        const userData = state.userData;

        await fetch(new URL('confirm-email', apiData.authApiURL).href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userData.email,
                code: code
            })
        })
    }
);

export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async function () {
        const state = store.getState();
        const apiData = state.api;
        const userData = state.userData;

        await fetch(new URL('google-login', apiData.authApiURL).href, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: userData.token
            }),
        });
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: null,
        error: null,
    },
    reducers: {},
});

export default authSlice.reducer;