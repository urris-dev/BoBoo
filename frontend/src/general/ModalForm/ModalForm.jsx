import CloseButton from "@/general/CloseButton/CloseButton.jsx";

import styles from "./ModalForm.module.scss";

export default function ModalForm({ ref, title, closePopup, children }) {
    return (
        <dialog ref={ref} className={styles.popup}>
            <div className={styles.popupContent}>
                <header className={styles.header}>
                    <h1>{title}</h1>
                    <CloseButton onClick={() => closePopup()}/>
                </header>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </dialog>
    );
}