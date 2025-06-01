import {Routes, Route} from 'react-router-dom'

import SignUpLogInLayout from "@/layouts/SignUpLogInLayout/SignUpLogInLayout.jsx"
import SignUpForm from "@/components/SignUpForm/SignUpForm.jsx"
import ConfirmationForm from "@/components/ConfirmationForm/ConfirmationForm.jsx";
import LoginForm from "@/components/LoginForm/LoginForm.jsx";

import { confirmEmail, resetPassword } from "@/api/auth.js";

import './SignUp.scss'

export default function SingUp() {
    return (
        <>
            <Routes>
                <Route element={<SignUpLogInLayout />}>
                    <Route index element={<SignUpForm />} />
                    <Route path="confirm-email" element={<ConfirmationForm type="email" action={confirmEmail} />} />
                    <Route path="login" element={<LoginForm />} />
                    <Route path="reset-password" element={<ConfirmationForm type="password" action={resetPassword} />} />
                </Route>
            </Routes>
        </>
    )
}