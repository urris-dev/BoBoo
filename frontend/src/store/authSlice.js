import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import store from "@/store/store.js"

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async function ({password}) {
        const state = store.getState();
        const authData = state.auth;
        const userData = state.userData;

        return fetch(new URL('send-email-confirmation-code', authData.baseApiURL).href, {
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
        const authData = state.auth;
        const userData = state.userData;

        await fetch(new URL('confirm-email', authData.baseUrl).href, {
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
        const authData = state.auth;
        const userData = state.userData;

        await fetch(new URL('google-login', authData.baseApiURL).href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userData.username,
                email: userData.email,
                photo: userData.photo,
            }),
        });
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: null,
        error: null,
        baseApiURL: new URL('api/users/', 'https://ranks-catalogue-actually-arrive.trycloudflare.com/').href,
    },
    reducers: {

    },
    // extraReducers: {
    //
    // }
});

export default authSlice.reducer;
export const selectBaseURL = (state) => state.auth.baseApiURL;