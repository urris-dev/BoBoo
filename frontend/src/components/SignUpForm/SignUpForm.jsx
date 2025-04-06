import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUserData } from "@/store/userDataSlice.js";
import { signupUser } from "@/store/authSlice.js";

import Input from "@/components/Input/Input.jsx";
import GoogleButton from "@/components/GoogleButton/GoogleButton.jsx";

import './SignUpForm.scss'

export default function SignUpForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    function isDataValid() {
        const isUsernameLengthCorrect = username.length >= 1 && username.length <= 50;
        const isPasswordLengthCorrect = password.length >= 8 && password.length <= 60;
        const isPasswordConfirm = password === confirmPassword;

        return isUsernameLengthCorrect && isPasswordLengthCorrect && isPasswordConfirm;
    }

    function switchPasswordVisibility() {
        setPasswordVisibility(!isPasswordVisible)
    }

    async function submitForm(event) {
        event.preventDefault();

        if (isDataValid()) {
            try {
                dispatch(setUserData({username, email}));
                const resp = await dispatch(signupUser({password}));
                if (!resp.ok) {
                    throw new SyntaxError("сервер не доступенз");
                }
                navigate("confirm-email");
            } catch (error) {
                alert(error);
            }
        } else {
            alert('ошибка')
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
                        <div className="sign-up-form-input">
                            <Input
                                className="input"
                                label="Имя пользователя"
                                type="text"
                                name="username"
                                required={true}
                                value={username}
                                onChange={(value) => setUsername(value)}
                            />
                        </div>
                        <div className="sign-up-form-input">
                            <Input
                                label="Адрес электронной почты"
                                type="email"
                                name="email"
                                required={true}
                                value={email}
                                onChange={(value) => setEmail(value)}
                            />
                        </div>
                        <div className="sign-up-form-input">
                            <Input
                                label="Пароль"
                                type="password"
                                name="password"
                                required={true}
                                value={password}
                                isPassword={true}
                                isValueVisible={isPasswordVisible}
                                onChange={(value) => setPassword(value)}
                                onChangeVisible={() => switchPasswordVisibility()}
                            />
                        </div>
                        <div className="sign-up-form-input">
                            <Input
                                label="Подтвердите пароль"
                                type="password"
                                name="confirm-password"
                                required={true}
                                value={confirmPassword}
                                isPassword={true}
                                isValueVisible={isPasswordVisible}
                                onChange={(value) => setConfirmPassword(value)}
                                onChangeVisible={() => switchPasswordVisibility()}
                            />
                        </div>

                        <p>Пароль должен содержать от 8 букв, цифр и прочих символов</p>

                        <div className="buttons-container">
                            <button type="submit" className={"registerbtn" + (isDataValid() ? " active" : "")}>
                                <p>Создать аккаунт</p>
                            </button>
                            <p>или</p>
                            <GoogleButton/>
                        </div>
                    </form>
                </main>
            </div>
            <div className="img-container"></div>
        </div>
    )
}