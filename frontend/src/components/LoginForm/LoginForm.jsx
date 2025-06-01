import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { login, sendPasswordResetCode } from "@/api/auth.js";

import Input from "@/general/formElements/Input/Input.jsx";
import Modal from "@/components/Modal/Modal.jsx";
import signUpIllustration from "@/assets/signup-illustration.svg";

import './LoginForm.scss';

export default function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || localStorage.getItem("email")); 
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    
    function switchPasswordVisibility() {
        setPasswordVisibility(!isPasswordVisible);
    }

    async function handlePasswordReset(event) {
        event.preventDefault();
        setLoading(true);

        if (email == "") {
            setLoading(false);
            setError("Введите адрес электронной почты");
            setIsModalOpen(true);
        }
        const resp = await sendPasswordResetCode(email);
        if (resp.status != 200) {
            setLoading(false);
            setError((await resp.json()).detail);
            setIsModalOpen(true);
        } else {
            navigate("/reset-password", {state: {email: email}});
        }
    }

    function isDataValid() {
        return password.length >= 8 && password.length <= 60;
    }

    async function submitLogin(event) {
        event.preventDefault();
        setLoading(true);

        if (isDataValid()) {
            const resp = await login(email, password);
            if (resp.status != 200) {
                setLoading(false);
                setError((await resp.json()).detail);
                setIsModalOpen(true);
            } else {
                localStorage.setItem("logged", true);
                navigate("/workspace");
            }
        } else {
            setLoading(false);
            setError("Введённые данные некорректны");
            setIsModalOpen(true);
        }
    }

    return (
        <div className="login-form-wrapper">
            <div className="form-container">
                <header>
                    <h1>Войти в аккаунт</h1>
                    <p>Ещё нет аккаунта? <a href="/">Зарегистрироваться</a></p>
                </header>
                <main>
                    <form onSubmit={submitLogin} className="login-form">
                        <div className="input-container">
                            <Input
                                label="Адрес электронной почты"
                                type="email"
                                name="email"
                                required={true}
                                value={email}
                                onChange={(value) => setEmail(value)}
                            />
                        </div>
                        <div className="input-container">
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
                            <a href="/" onClick={handlePasswordReset}>Забыли пароль?</a>
                        </div>
                        <div className="buttons-container">
                            <button type="submit" className="registerbtn">
                                {loading && (
                                    <p>Загрузка...</p>
                                )}
                                {!loading && (
                                    <p>Войти в аккаунт</p>
                                )}
                            </button>
                        </div>
                        <p>Пароль должен содержать от 8 букв, цифр и прочих символов</p>
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