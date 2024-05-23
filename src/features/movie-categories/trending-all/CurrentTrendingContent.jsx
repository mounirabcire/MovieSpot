import Button from "../../../components/button/Button";
import styles from "./TrendingAll.module.scss";

function CurrentTrendingContent({ trend:{ title, overview} }) {
    return (
        <div className={styles.trending__active__box}>
            <h2>{title}</h2>
            <p>{overview}</p>
            <div className={styles.trending__btns}>
                <Button type="primary">Watch trailer</Button>
                <Button type="secondary">See details</Button>
            </div>
        </div>
    );
}

export default CurrentTrendingContent;
