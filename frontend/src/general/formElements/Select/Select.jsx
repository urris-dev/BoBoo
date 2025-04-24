import { useState } from "react";

import selectStyles from "./Select.module.scss";
import formElementsStyles from "../formElements.module.scss";

export default function Select({ label, name, value, options, onChange }) {
    const [select, setSelect] = useState(value);

    return (
        <div className={`${formElementsStyles.container} ${selectStyles.container}`}>
            <label className={formElementsStyles.label} htmlFor={name}>{label}</label>
            <select
                className={`
                    ${selectStyles.select}
                    ${formElementsStyles.formElement}
                `}
                value={select}
                name={name}
                onChange={(event) => {
                    setSelect(event.target.value);
                    onChange(event.target.value);
                }}
            >
                {Object.entries(options).map(opt =>
                    <option key={opt[0]} value={opt[0]}>{opt[1]}</option>
                )}
            </select>
        </div>
    );
}