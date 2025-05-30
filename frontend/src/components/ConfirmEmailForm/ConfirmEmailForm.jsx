import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { confirmEmail } from "@/api/auth.js";

import Input from "@/general/formElements/Input/Input.jsx";
import Modal from "@/components/Modal/Modal.jsx";
import signUpIllustration from "@/assets/signup-illustration.svg";

import './ConfirmEmailForm.scss';

export default function ConfirmEmailForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || localStorage.getItem("email")); 
    const [code, setCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    function isDataValid() {
        return code.length == 7;
    }

    async function submitConfirmEmail(event) {
        event.preventDefault();
        setLoading(true);

        if (isDataValid()) {
            const resp = await confirmEmail(email, code);
            if (resp.status != 200) {
                setLoading(false);
                setError((await resp.json()).detail);
                setIsModalOpen(true);
            } else {
                navigate("/login");
            }
        } else {
            setLoading(false);
            setError("Введённые данные некорректны");
            setIsModalOpen(true);
        }
    }

    return (
        <div className="confirm-email-form-wrapper">
            <div className="form-container">
                <header>
                    <div className="circle"></div>
                    <h1>Подтверждение email</h1>
                </header>
                <main>
                    <form onSubmit={submitConfirmEmail} className="confirm-email-form">
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
                            <label htmlFor="username">Код подтверждения</label>
                            <input
                                type="text" name="username" required={true}
                                value={code} onChange={(event) => setCode(event.target.value)}
                            />
                        </div>
                        <div className="buttons-container">
                            <button type="submit" className="registerbtn">
                                {loading && (
                                    <p>Загрузка...</p>
                                )}
                                {!loading && (
                                    <p>Подтвердить email</p>
                                )}
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