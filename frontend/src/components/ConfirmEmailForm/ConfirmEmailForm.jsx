import { useState } from "react";

import './ConfirmEmailForm.scss'
import {useNavigate} from "react-router-dom";

export default function ConfirmEmailForm() {
    const navigate = useNavigate();
    const [code, setCode] = useState('');

    function confirmEmail(event) {
        event.preventDefault()

        fetch('http://127.0.0.1:8000/api/users/confirm-email', {
            method: 'POST',
            headers: {},
            body: JSON.stringify({
                email: email,
                code: code
            })
        })
            .then(() => {
                navigate("");
            })
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
                    <form onSubmit={confirmEmail} className="confirm-email-form">
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