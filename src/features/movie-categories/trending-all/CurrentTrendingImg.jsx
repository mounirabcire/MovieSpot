import { motion } from "framer-motion";

import { animate } from "../../../utils/motionAnimation";
import { BASE_IMG } from "../../../services/apiInfo";
import styles from "./TrendingAll.module.scss";

// Animations
const animateBg = {
    exit: {
        opacity: 0,
        transition: {
            duration: 1.5,
        },
    },
};
const animateTrendingImg = {
    animate: {
        width: "100%",
        height: "100%",
        inset: 0,
        transition: {
            duration: 1,
            ease: [0.45, 0, 0.55, 1],
        },
    },
    exit: {
        scale: 1.75,
        transition: {
            duration: 1,
            ease: [0.45, 0, 0.55, 1],
        },
    },
};

function CurrentTrendingImg({ trend: { img_lg } }) {
    return (
        <>
            <motion.div
                className={styles.trending__bg}
                {...animate(animateBg)}
            />
            <motion.img
                src={`${BASE_IMG}/original/${img_lg}`}
                alt="Trending"
                className={styles.trending__img__active}
                {...animate(animateTrendingImg)}
            />
        </>
    );
}

export default CurrentTrendingImg;
