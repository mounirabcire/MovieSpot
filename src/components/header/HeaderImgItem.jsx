import { motion } from "framer-motion";

import { animate } from "../../utils/motionAnimation";
import { BASE_IMG } from "../../services/apiInfo";
import styles from "./Header.module.scss";

function HeaderImgItem({ trend: { title, rate, img, dataNum }, currentData }) {
    // Animations
    const animateImg = {
        animate: {
            width: dataNum === currentData ? 0 : "12.5rem",
            transition: {
                duration: 0.2,
                delay: 0.2,
                ease: [0.5, 1, 0.89, 1],
            },
        },
    };

    return (
        <motion.div
            className={styles.header__imgContainer}
            {...animate(animateImg)}
        >
            <img
                src={`${BASE_IMG}/w500/${img}`}
                alt="Movie"
                className={styles.header__img}
                loading="lazy"
            />
            {/* <div className={styles.header__imgInfo}>
                <h4 className={styles.header__imgInfo_title}>{title}</h4>
                <p className={styles.header__imgInfo_rate}>
                    {rate.toFixed(2)}{" "}
                    <span className={styles.header__imgInfo_iconContainer}>
                        <i className="ri-star-s-line"></i>
                    </span>
                </p>
            </div> */}
        </motion.div>
    );
}

export default HeaderImgItem;
