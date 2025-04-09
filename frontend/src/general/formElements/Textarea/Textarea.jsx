import { useState } from "react";

import textareaStyles from "./Textarea.module.scss";
import formElementsStyles from "../formElements.module.scss";

export default function Textarea({
    label, name, rows = 5, value = '', onChange
}) {
    const [text, setText] = useState(value);

    return (
        <div className={formElementsStyles.container}>
            <label className={formElementsStyles.label} htmlFor={name}>{label}</label>
            <textarea
                className={`
                    ${formElementsStyles.formElement}
                    ${formElementsStyles.textField}
                    ${textareaStyles.textarea}
                `}
                name={name} rows={rows} value={text}
                onChange={(event) => {
                    setText(event.target.value)
                    onChange(event.target.value);
                }}
            >
                {text}
            </textarea>
        </div>
    );
}