import styles from "./Button.module.scss";

function Button({ children, type }) {
    if (type === "primary")
        return (
            <button className={`${styles.btn} ${styles.btn__primary}`}>
                {children}
            </button>
        );
    if (type === "secondary")
        return (
            <button className={`${styles.btn} ${styles.btn__secondary}`}>
                {children}
            </button>
        );
}

export default Button;
