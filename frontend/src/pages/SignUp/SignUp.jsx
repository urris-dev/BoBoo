import {Routes, Route} from 'react-router-dom'

import SignUpLogInLayout from "@/components/SignUpLogInLayout/SignUpLogInLayout.jsx"
import SignUpForm from "@/components/SignUpForm/SignUpForm.jsx"

import './SignUp.scss'

export default function SingUp() {
    return (
        <>
            <Routes>
                <Route element={<SignUpLogInLayout />}>
                    <Route index element={<SignUpForm />} />
                </Route>
            </Routes>
        </>
    )
}