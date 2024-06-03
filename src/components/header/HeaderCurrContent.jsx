import { useNavigate } from "react-router-dom";

import Button from "../button/Button";
import MaxTxtLength from "../max-text-length/MaxTxtLength";
import Reveal from "../reveal/Reveal";
import styles from "./Header.module.scss";

function HeaderCurrContent({ trend: { title, overview, id, media_type } }) {
    // Hooks
    const navigate = useNavigate();

    // Functions
    function handleNavigate() {
        navigate(`/details/${id}?media_type=${media_type}`);
    }

    return (
        <div className={styles.header__active__box}>
            <Reveal>
                <h2>{title}</h2>
            </Reveal>
            <Reveal>
                <p>
                    <MaxTxtLength maxLength={332}>{overview}</MaxTxtLength>
                </p>
            </Reveal>
            <div className={styles.header__btns}>
                <Button type="primary" onClick={handleNavigate}>Watch trailer</Button>
                <Button type="secondary" onClick={handleNavigate}>
                    See details
                </Button>
            </div>
        </div>
    );
}

export default HeaderCurrContent;
