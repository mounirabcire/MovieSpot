import { motion } from "framer-motion";
import { BASE_IMG } from "../../../services/apiInfo";
import styles from "./TrendingAll.module.scss";

function CurrentTrendingImg({ trend: { img_lg } }) {

    return (
        <>
            <div className={styles.trending__bg}></div>
            <motion.img
                src={`${BASE_IMG}/original/${img_lg}`}
                alt=""
                className={styles.trending__img__active}
                animate={{
                    width: "100%",
                    height: "100%",
                    inset: 0,
                    transition: {
                        duration: 1,
                        // delay: .5,
                        ease: [0.45, 0, 0.55, 1],
                    },
                }}
            />
        </>
    );
}

export default CurrentTrendingImg;
