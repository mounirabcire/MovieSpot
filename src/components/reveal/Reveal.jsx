import { memo, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

import styles from "./Reveal.module.scss";

function Reveal({ children }) {
    // Hooks
    const ref = useRef(null);
    const isInview = useInView(ref, { once: true, margin:'-10px' });
    const control = useAnimation();
    const secondControl = useAnimation();

    useEffect(() => {
        if (isInview) {
            control.start("anim");
            secondControl.start("anim");
        }
    }, [isInview, control, secondControl]);

    return (
        <div ref={ref} className={styles.reveal__container}>
            <motion.div
                variants={{
                    init: {
                        y: "100%",
                        opacity: 0,
                        // rotate: 2,
                    },
                    anim: {
                        y: 0,
                        opacity: 1,
                        // rotate: 0,
                    },
                }}
                initial="init"
                animate={control}
                exit="init"
                transition={{
                    duration: 0.5,
                    delay: 0.25,
                    ease: [0.5, 1, 0.89, 1],
                }}
            >
                {children}
            </motion.div>
            <motion.div
                variants={{
                    init: {
                        left: 0,
                    },
                    anim: {
                        left: "100%",
                    },
                }}
                initial="init"
                animate={secondControl}
                transition={{
                    duration: 0.5,
                    ease: "easeIn",
                }}
                className={styles.reveal__el}
            />
        </div>
    );
}

export default memo(Reveal);
