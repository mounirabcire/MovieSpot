import { BASE_IMG } from "../../services/apiInfo";
import MaxTxtLength from "../max-text-length/MaxTxtLength";
import Reveal from "../reveal/Reveal";
import styles from "./Card.module.scss";

function CardItem({ data }) {
    const { backdrop_path, title, name, vote_average, vote_count } = data;

    return (
        <div className={styles.card}>
            <img
                src={`${BASE_IMG}/original/${backdrop_path}`}
                alt="Trending"
                className={styles.card__img}
            />
            <div className={styles.card__imgInfo}>
                <Reveal>
                    <h4 className={styles.card__imgInfo_title}>
                        <MaxTxtLength maxLength={23}>
                            {title || name}
                        </MaxTxtLength>
                    </h4>
                </Reveal>
                <div className={styles.card__imgInfo_ratesInfo}>
                    <Reveal>
                        <p className={styles.card__imgInfo_rate}>
                            {vote_average.toFixed(2)}{" "}
                            <span
                                className={styles.card__imgInfo_iconContainer}
                            >
                                <i className="ri-star-s-fill"></i>
                            </span>
                        </p>
                    </Reveal>
                    <Reveal>
                        <p className={styles.card__imgInfo_rateCount}>
                            {vote_count}{" "}
                            <span
                                className={styles.card__imgInfo_iconContainer}
                            >
                                <i className="ri-user-fill"></i>
                            </span>
                        </p>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}

export default CardItem;
