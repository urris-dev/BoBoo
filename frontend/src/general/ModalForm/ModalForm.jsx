import CloseButton from "@/general/CloseButton/CloseButton.jsx";

import styles from "./ModalForm.module.scss";

export default function ModalForm({ ref, title, children }) {
    return (
        <dialog ref={ref} className={styles.popup}>
            <div className={styles.popupContent}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{title}</h1>
                    <CloseButton onClick={() => ref.current.close()}/>
                </header>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </dialog>
    );
}