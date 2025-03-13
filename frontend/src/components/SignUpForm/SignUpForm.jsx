import GoogleButton from "@/components/GoogleButton/GoogleButton.jsx";

import './SignUpForm.scss'

export default function SignUpForm() {
    return (
        <div className="sign-up-form-wrapper">
            <div className="form-container">
                <header>
                    <div className="circle"></div>
                    <h1>Создать аккаунт</h1>
                    <p>Уже есть аккаунт? Войти</p>
                </header>
                <main>
                    <form className="sign-up-form">
                        <div className="input-container">
                            <label htmlFor="username">Имя пользователя</label>
                            <input type="text" name="username"/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="email">Адрес электронной почты</label>
                            <input type="email" name="email"/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="password">Пароль</label>
                            <input type="text" name="password"/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="confirm-password">Подтвердите пароль</label>
                            <input type="text" name="confirm-password"/>
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