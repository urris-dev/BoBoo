import store from "@/store/store.js"

export const signupUser = async (username, email, password) => {
    const state = store.getState();
    const apiData = state.api;

    const response = await fetch(new URL('send-email-confirmation-code', apiData.authApiURL).href, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    });
    
    return response;
};

export const confirmEmail = async (email, code) => {
    const state = store.getState();
    const apiData = state.api;

    const response = await fetch(new URL('confirm-email', apiData.authApiURL).href, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            code: code
        })
    });

    return response;
};

export const googleLogin = async (token) => {
    const state = store.getState();
    const apiData = state.api;

    const response = await fetch(new URL('google-login', apiData.authApiURL).href, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token
        }),
    });

    return response;
};

export const login = async (email, password) => {
    const state = store.getState();
    const apiData = state.api;

    const response = await fetch(new URL('login', apiData.authApiURL).href, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    });

    return response;
}

export const sendPasswordResetCode = async (email) => {
    const state = store.getState();
    const apiData = state.api;

    const response = await fetch(new URL('send-password-reset-code', apiData.authApiURL).href, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        }),
    });

    return response;
}

export const resetPassword = async (email, code, password) => {
    const state = store.getState();
    const apiData = state.api;

    const response = await fetch(new URL('reset-password', apiData.authApiURL).href, {
        method: 'PATCH',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            code: code,
            password: password
        }),
    });

    return response;    
}
