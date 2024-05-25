import styles from "./Button.module.scss";

function Button({
    children,
    type = "normal",
    disabled = false,
    onClick = null,
    style = {},
}) {
    if (type === "normal")
        return (
            <button
                className={`${styles.btn} ${styles.btn__normal}`}
                disabled={disabled}
                onClick={onClick}
                style={style}
            >
                {children}
            </button>
        );
    if (type === "primary")
        return (
            <button
                className={`${styles.btn} ${styles.btn__primary}`}
                disabled={disabled}
                onClick={onClick}
                style={style}
            >
                {children}
            </button>
        );
    if (type === "secondary")
        return (
            <button
                className={`${styles.btn} ${styles.btn__secondary}`}
                disabled={disabled}
                onClick={onClick}
                style={style}
            >
                {children}
            </button>
        );
}

export default Button;
