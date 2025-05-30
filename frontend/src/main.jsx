import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from "@react-oauth/google";

import store from './store/store.js'

import App from './App.jsx'

import './index.scss'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
                <App />
            </GoogleOAuthProvider>
    </Provider>,
)
