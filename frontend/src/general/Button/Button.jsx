import styles from './Button.module.scss';

export default function Button({ text, type, active = false, onClick = () => {} }) {
    return (
        <button
            className={`${styles.button} ${active ? styles.active : ''}`}
            type={type}
            onClick={(event) => {
                event.stopPropagation();
                onClick();
            }}
        >
            <p>{text}</p>
        </button>
    );
}