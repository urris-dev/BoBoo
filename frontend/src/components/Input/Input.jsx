import hide from "@/../public/hide.png";
import show from "@/../public/show.png";

import { useState } from "react";

import styles from './Input.module.scss';

export default function Input({
    label, type = "text", name, required = false, value = '',
    isPassword = false, isValueVisible = !isPassword,
    onChange, onChangeVisible = () => {}
}) {
    const [inputValue, setInputValue] = useState(value);

    return (
        <div className={`${styles.inputContainer} ${isPassword ? styles.passwordInputContainer : ''}`}>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <input
                className={styles.input}
                type={isValueVisible && isPassword ? "text" : type} name={name} required={required}
                value={inputValue} onChange={(event) => {
                    setInputValue(event.target.value);
                    onChange(event.target.value);
                }}
            />
            {isPassword && (
                <img
                    className={styles.passwordIcon} onClick={(event) => {
                        event.stopPropagation();
                        onChangeVisible();
                    }}
                    src={isValueVisible ? hide : show} alt=""
                />
            )}
        </div>
    );
}