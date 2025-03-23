import {Routes, Route} from 'react-router-dom'

import SignUpLogInLayout from "@/layouts/SignUpLogInLayout/SignUpLogInLayout.jsx"
import SignUpForm from "@/components/SignUpForm/SignUpForm.jsx"

import './SignUp.scss'
import ConfirmEmailForm from "@/components/ConfirmEmailForm/ConfirmEmailForm.jsx";

export default function SingUp() {
    return (
        <>
            <Routes>
                <Route element={<SignUpLogInLayout />}>
                    <Route index element={<SignUpForm />} />
                    <Route path="confirm-email" element={<ConfirmEmailForm />} />
                </Route>
            </Routes>
        </>
    )
}