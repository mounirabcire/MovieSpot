import { delay, motion } from "framer-motion";
import { BASE_IMG } from "../../../services/apiInfo";
import styles from "./TrendingAll.module.scss";

function TrendingImgItem({
    trend: { title, rate, img, dataNum },
    currentTrending,
}) {
    return (
        <motion.div
            className={styles.trending__imgContainer}
            animate={{
                opacity: dataNum === currentTrending ? 0 : 1,
                zIndex: dataNum === currentTrending ? -100 : 0,
                transition: {
                    duration: 1,
                    delay: 0.15,
                    ease: "linear",
                },
                transitionEnd: {
                    opacity: 1,
                    zIndex: 0,
                },
            }}
        >
            <img
                src={`${BASE_IMG}/w500/${img}`}
                alt="Trending"
                className={styles.trending__img}
            />
            {/* <div className={styles.trending__imgInfo}>
                <h4 className={styles.trending__imgInfo_title}>{title}</h4>
                <p className={styles.trending__imgInfo_rate}>
                    {rate.toFixed(2)}{" "}
                    <span className={styles.trending__imgInfo_iconContainer}>
                        <i className="ri-star-s-line"></i>
                    </span>
                </p>
            </div> */}
        </motion.div>
    );
}

export default TrendingImgItem;
