import {
    motion,
} from "framer-motion";

import { animate } from "../../utils/motionAnimation";
import { BASE_IMG } from "../../services/apiInfo";
import styles from "./Header.module.scss";

// Animations
const animateBg = {
    exit: {
        opacity: 0,
        transition: {
            duration: 1.5,
        },
    },
};
const animateHeaderImg = {
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

function HeaderCurrImg({ trend: { img_lg } }) {

    return (
        <>
            <motion.div className={styles.header__bg} {...animate(animateBg)} />
            <motion.img
                src={`${BASE_IMG}/original/${img_lg}`}
                alt="Movie"
                className={styles.header__img__active}
                {...animate(animateHeaderImg)}
            />
        </>
    );
}

export default HeaderCurrImg;
