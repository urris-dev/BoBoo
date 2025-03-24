import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { confirmEmail } from "@/store/authSlice.js";

import './ConfirmEmailForm.scss'

export default function ConfirmEmailForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [code, setCode] = useState('');

    function submitConfirmEmail(event) {
        event.preventDefault()
        dispatch(confirmEmail({code}))
        navigate("/")
    }

    return (
        <div className="confirm-email-form-wrapper">
            <div className="form-container">
                <header>
                    <div className="circle"></div>
                    <h1>Подтверждение email</h1>
                    <p>Уже есть аккаунт? Войти</p>
                </header>
                <main>
                    <form onSubmit={submitConfirmEmail} className="confirm-email-form">
                        <div className="input-container">
                            <label htmlFor="username">Код подтверждения</label>
                            <input
                                type="text" name="username" required={true}
                                value={code} onChange={(event) => setCode(event.target.value)}
                            />
                        </div>
                        <div className="buttons-container">
                            <button type="submit" className="registerbtn"><p>Подтвердить email</p></button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    )
}