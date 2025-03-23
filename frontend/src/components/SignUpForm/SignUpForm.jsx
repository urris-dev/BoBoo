import hide from '@/../public/hide.png'
import show from '@/../public/show.png'

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import GoogleButton from "@/components/GoogleButton/GoogleButton.jsx";

import './SignUpForm.scss'

export default function SignUpForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    function switchPasswordVisibility(event) {
        event.stopPropagation()
        setPasswordVisibility(!isPasswordVisible)
    }

    function submitForm(event) {
        event.preventDefault()

        const isUsernameLengthCorrect = username.length >= 1 && username.length <= 50
        const isPasswordLengthCorrect = password.length >= 8 && password.length <= 100
        const isPasswordConfirm = password === confirmPassword

        if (isUsernameLengthCorrect && isPasswordLengthCorrect && isPasswordConfirm) {
            fetch('http://127.0.0.1:8000/api/users/send-email-confirmation-code', {
                method: 'POST',
                headers: {},
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            })
                .then(() => {
                    const navigate = useNavigate();
                    navigate("/confirm-email");
                })
        } else {
            alert('хуй тебе')
        }
    }

    return (
        <div className="sign-up-form-wrapper">
            <div className="form-container">
                <header>
                    <div className="circle"></div>
                    <h1>Создать аккаунт</h1>
                    <p>Уже есть аккаунт? Войти</p>
                </header>
                <main>
                    <form className="sign-up-form" onSubmit={submitForm}>
                        <div className="input-container">
                            <label htmlFor="username">Имя пользователя</label>
                            <input
                                type="text" name="username" required={true}
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="email">Адрес электронной почты</label>
                            <input
                                type="email" name="email" required={true}
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="input-container password-input-container">
                            <label htmlFor="password">Пароль</label>
                            <input
                                type={isPasswordVisible ? "text" : "password"} name="password" required={true}
                                value={password} onChange={(event => setPassword(event.target.value))}
                                minLength={8} maxLength={100}
                            />
                            <img
                                className="password-icon" onClick={switchPasswordVisibility}
                                src={isPasswordVisible ? hide : show} alt=""
                            />
                        </div>
                        <div className="input-container password-input-container">
                            <label htmlFor="confirm-password">Подтвердите пароль</label>
                            <input
                                type={isPasswordVisible ? "text" : "password"} name="confirm-password" required={true}
                                value={confirmPassword} onChange={(event => setConfirmPassword(event.target.value))}
                                minLength={8} maxLength={100}
                                /*{onBlur = {() => alert(password === confirmPassword)}}*/
                            />
                            <img
                                className="password-icon" onClick={switchPasswordVisibility}
                                src={isPasswordVisible ? hide : show} alt=""
                            />
                        </div>
                        <p>Пароль должен содержать от 8 букв, цифр и прочих символов</p>

                        <div className="buttons-container">
                            <button type="submit" className="registerbtn"><p>Создать аккаунт</p></button>
                            <p>или</p>
                            <GoogleButton />
                        </div>
                    </form>
                </main>
            </div>
            <div className="img-container"></div>
        </div>
    )
}