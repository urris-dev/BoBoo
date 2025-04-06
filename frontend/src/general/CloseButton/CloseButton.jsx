import cross from "@/../public/cross.png";

import styles from "./CloseButton.module.scss";

export default function CloseButton({ onClick }) {
    return (
        <button className={styles.button} onClick={onClick}>
            <img className={styles.img} src={cross} alt=""/>
        </button>
    );
}