import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signupUser } from "@/api/auth.js";

import Input from "@/general/formElements/Input/Input.jsx";
import Button from "@/general/Button/Button.jsx";
import GoogleButton from "@/components/GoogleButton/GoogleButton.jsx";
import Modal from "@/components/Modal/Modal.jsx";

import signUpIllustration from "@/assets/signup-illustration.svg"

import './SignUpForm.scss'

export default function SignUpForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function isDataValid() {
        const isUsernameLengthCorrect = username.length >= 1 && username.length <= 50;
        const isPasswordLengthCorrect = password.length >= 8 && password.length <= 60;
        const isPasswordConfirm = password === confirmPassword;

        return isUsernameLengthCorrect && isPasswordLengthCorrect && isPasswordConfirm;
    }

    function switchPasswordVisibility() {
        setPasswordVisibility(!isPasswordVisible);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
      };

    async function submitForm(event) {
        event.preventDefault();
        setLoading(true);

        if (isDataValid()) {
            localStorage.setItem("email", email);
            localStorage.setItem("username", username);
            const resp = await signupUser(username, email, password);
            if (resp.status == 200) {
                navigate("confirm-email", {state: {email: email}});
            }
            if (resp.status == 409) {
                navigate("login", {state: {email: email}});
            }
        } else {
            setError("Введённые данные некорректны");
            setIsModalOpen(true);
        }
    }
    return (
        <div className="sign-up-form-wrapper">
            <div className="form-container">
                <header>
                    <h1>Создать аккаунт</h1>
                    <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
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
                            {loading && (
                                <Button
                                text="Загрузка..."
                            />
                            )}
                            {!loading && (
                                <Button
                                text="Создать аккаунт"
                                type="submit"
                                active={isDataValid()}
                            />
                            )}
                            <p>или</p>
                            <GoogleButton/>
                        </div>
                    </form>
                </main>
            </div>
            <div className="img-container">
               <img src={signUpIllustration} className="signup-img"/>
            </div>
            {isModalOpen && (
            <Modal
            type='error'
            message={error}
            onClose={handleCloseModal}
            />
            )}
        </div>
    )
}
