import { useNavigate, useRouteError } from "react-router-dom";

import ErrorSvg from "../../assets/error_404.svg";
import wrongSvg from "../../assets/wrong.svg";
import styles from "./ErrorEl.module.scss";
import Button from "../button/Button";

function ErrorEl() {
    const navigate = useNavigate();
    const error = useRouteError();
    console.log(error);

    if (error.status === 404)
        return (
            <div className={styles.error__container}>
                <img className={styles.error__img} src={ErrorSvg} alt="Erorr" />
                <Button style={{marginTop: '1rem'}} onClick={() => navigate("/")}>Back Home</Button>
          
            </div>
        );

    return (
        <div className={styles.error__container}>
            <img className={styles.error__img} src={wrongSvg} alt="Erorr" />
            <p className={styles.error__message}>Something went wrong!</p>
            <Button style={{marginTop: '1rem'}} onClick={() => navigate("/")}>Back Home</Button>
        </div>
    );
}

export default ErrorEl;
