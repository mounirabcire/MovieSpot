import { useNavigate } from "react-router-dom";

import { BASE_IMG } from "../../services/apiInfo";
import MaxTxtLength from "../max-text-length/MaxTxtLength";
import Reveal from "../reveal/Reveal";
import styles from "./Card.module.scss";
import Button from "../button/Button";
import { useFavoriteList } from "../../contexts/FavoriteListContext";

function CardItem({ data, page, isFavpage = false }) {
    // Hooks
    const navigate = useNavigate();

    const {
        functions: { deleteItem },
    } = useFavoriteList();

    // variables
    const {
        backdrop_path,
        title,
        name,
        vote_average,
        vote_count,
        id,
        media_type,
    } = data;

    // Functions
    function handleNavigate() {
        navigate(`/details/${id}?media_type=${media_type ?? page}`);
    }

    // Favorite page.
    if (isFavpage)
        return (
            <div className={styles.container}>
                <div className={styles.card} onClick={handleNavigate}>
                    <img
                        src={`${BASE_IMG}/original/${backdrop_path}`}
                        alt="Movie"
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
                                        className={
                                            styles.card__imgInfo_iconContainer
                                        }
                                    >
                                        <i className="ri-star-s-fill"></i>
                                    </span>
                                </p>
                            </Reveal>
                            <Reveal>
                                <p className={styles.card__imgInfo_rateCount}>
                                    {vote_count}{" "}
                                    <span
                                        className={
                                            styles.card__imgInfo_iconContainer
                                        }
                                    >
                                        <i className="ri-user-fill"></i>
                                    </span>
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
                {isFavpage && (
                    <Button
                        onClick={() => deleteItem(id)}
                        style={{
                            padding: ".5rem 1rem",
                            fontSize: "1.4rem",
                            borderRadius: "5px",
                            background: "#fb5d5d",
                            border: "none",
                            color: "#570202",
                            marginTop: "1rem",
                        }}
                    >
                        Remove
                    </Button>
                )}
            </div>
        );

    return (
        <div className={styles.card} onClick={handleNavigate}>
            <img
                src={`${BASE_IMG}/original/${backdrop_path}`}
                alt="Movie"
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