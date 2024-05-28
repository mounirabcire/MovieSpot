import { useNavigate } from "react-router-dom";

import Button from "../../../components/button/Button";
import MaxTxtLength from "../../../components/max-text-length/MaxTxtLength";
import Reveal from "../../../components/reveal/Reveal";
import styles from "./TrendingAll.module.scss";

function CurrentTrendingContent({
    trend: { title, overview, id, media_type },
}) {
    // Hooks
    const navigate = useNavigate();

    // Functions
    function handleNavigate() {
        navigate(`/details/${id}?media_type=${media_type}`);
    }

    return (
        <div className={styles.trending__active__box}>
            <Reveal>
                <h2>{title}</h2>
            </Reveal>
            <Reveal>
                <p>
                    <MaxTxtLength maxLength={332}>{overview}</MaxTxtLength>
                </p>
            </Reveal>
            <div className={styles.trending__btns}>
                <Button type="primary">Watch trailer</Button>
                <Button type="secondary" onClick={handleNavigate}>
                    See details
                </Button>
            </div>
        </div>
    );
}

export default CurrentTrendingContent;
