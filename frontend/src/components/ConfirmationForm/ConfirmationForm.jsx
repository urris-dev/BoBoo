import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Input from "@/general/formElements/Input/Input.jsx";
import Modal from "@/components/Modal/Modal.jsx";
import signUpIllustration from "@/assets/signup-illustration.svg";

import './ConfirmationForm.scss';

export default function ConfirmationForm(params) {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || localStorage.getItem("email")); 
    const [code, setCode] = useState('');
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

    function isDataValid() {
        if (params.type == 'password') {
            return (password.length >= 8 && password.length <= 60) && code.length == 7;
        }
        return code.length == 7;
    }

    async function submitConfirmation(event) {
        event.preventDefault();
        setLoading(true);

        if (isDataValid()) {
            localStorage.setItem("email", email);
            let resp;
            if (params.type == 'email') {
                resp = await params.action(email, code);
            }
            if (params.type == 'password') {
                resp = await params.action(email, code, password);
            }
            if (resp.status != 200) {
                setLoading(false);
                setError((await resp.json()).detail);
                setIsModalOpen(true);
            } else {
                navigate("/login", {state: {email: email}});
            }
        } else {
            setLoading(false);
            setError("Введённые данные некорректны");
            setIsModalOpen(true);
        }
    }

    return (
        <div className="confirmation-form-wrapper">
            <div className="form-container">
                <header>
                    <div className="circle"></div>
                    { params.type == 'email' && <h1>Подтверждение email</h1> }
                    { params.type == 'password' && <h1>Сброс пароля</h1> }
                </header>
                <main>
                    <form onSubmit={submitConfirmation} className="confirmation-form">
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
                            <label htmlFor="code">Код подтверждения</label>
                            <input
                                type="text" name="code" required={true}
                                value={code} onChange={(event) => setCode(event.target.value)}
                            />
                        </div>
                        {params.type == 'password' && 
                            <div className="input-container">
                            <Input
                                label="Новый пароль"
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
                        }
                        <div className="buttons-container">
                            <button type="submit" className="registerbtn">
                                {loading && <p>Загрузка...</p> }
                                { (!loading && params.type == 'email') && <p>Подтвердить email</p> }
                                { (!loading && params.type == 'password') && <p>Сбросить пароль</p> }
                            </button>
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