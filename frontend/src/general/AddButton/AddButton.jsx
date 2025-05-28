import plus from "@/../src/assets/plus.svg";

import styles from "./AddButton.module.scss";

export default function AddButton({ width = 28, onClick }) {
    return (
        <button
            style={{
                width: width,
            }}
            onClick={onClick}
            className={styles.button}
        >
            <img
                style={{
                    width: width / 3,
                }}
                src={plus} alt=""
            />
        </button>
    );
}