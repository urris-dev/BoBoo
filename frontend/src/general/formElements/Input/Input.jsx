import hide from "../../../../src/icons/hide.png";
import show from "../../../../src/icons/show.png";

import { useState } from "react";

import inputStyles from './Input.module.scss';
import formElementsStyles from "../formElements.module.scss";

export default function Input({
    label, type = "text", name, required = false, value = '',
    isPassword = false, isValueVisible = !isPassword,
    onChange, onChangeVisible = () => {}
}) {
    const [inputValue, setInputValue] = useState(value);

    return (
        <div className={`${formElementsStyles.container} ${isPassword ? inputStyles.passwordInputContainer : ''}`}>
            <label className={formElementsStyles.label} htmlFor={name}>{label}</label>
            <input
                className={`
                    ${formElementsStyles.formElement}
                    ${formElementsStyles.textField}
                    ${inputStyles.input}
                `}
                type={isValueVisible && isPassword ? "text" : type} name={name} required={required}
                value={inputValue} onChange={(event) => {
                    setInputValue(event.target.value);
                    onChange(event.target.value);
                }}
            />
            {isPassword && (
                <img
                    className={inputStyles.passwordIcon} onClick={(event) => {
                        event.stopPropagation();
                        onChangeVisible();
                    }}
                    src={isValueVisible ? hide : show} alt=""
                />
            )}
        </div>
    );
}