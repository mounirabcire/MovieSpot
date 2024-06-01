import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { randomUniqueNumsSet } from "../../utils/helper";
import { animate } from "../../utils/motionAnimation";

import styles from "./Header.module.scss";
import HeaderCurrImg from "./HeaderCurrImg";
import HeaderCurrContent from "./HeaderCurrContent";
import HeaderImgList from "./HeaderImgList";

// Animations
const animateProgressBar = {
    initial: {
        width: 0,
    },
    animate: {
        width: "100%",
        transition: {
            duration: 7,
            ease: "linear",
            repeat: Infinity,
        },
    },
};

function Header({ data, page = "home" }) {
    // Get 5 unique random numbers
    const [fir, sec, thi, fou, fif] = randomUniqueNumsSet(5, data.length - 1);

    // Hooks
    const [activeData, setActiveData] = useState(0);
    const [randomData, setRandomData] = useState([
        {
            id: data[fir].id,
            img_lg: data[fir].backdrop_path,
            img: data[fir].poster_path,
            title: data[fir]?.name ?? data[fir].title,
            rate: data[fir].vote_average,
            overview: data[fir].overview,
            media_type: page !== "home" ? page : data[fir].media_type,
            dataNum: 0,
        },
        {
            id: data[sec].id,
            img_lg: data[sec].backdrop_path,
            img: data[sec].poster_path,
            title: data[sec]?.name ?? data[sec].title,
            rate: data[sec].vote_average,
            overview: data[sec].overview,
            media_type: page !== "home" ? page : data[sec].media_type,
            dataNum: 1,
        },
        {
            id: data[thi].id,
            img_lg: data[thi].backdrop_path,
            img: data[thi].poster_path,
            title: data[thi]?.name ?? data[thi].title,
            rate: data[thi].vote_average,
            overview: data[thi].overview,
            media_type: page !== "home" ? page : data[thi].media_type,
            dataNum: 2,
        },
        {
            id: data[fou].id,
            img_lg: data[fou].backdrop_path,
            img: data[fou].poster_path,
            title: data[fou]?.name ?? data[fou].title,
            rate: data[fou].vote_average,
            overview: data[fou].overview,
            media_type: page !== "home" ? page : data[fou].media_type,
            dataNum: 3,
        },
        {
            id: data[fif].id,
            img_lg: data[fif].backdrop_path,
            img: data[fif].poster_path,
            title: data[fif]?.name ?? data[fif].title,
            rate: data[fif].vote_average,
            overview: data[fif].overview,
            media_type: page !== "home" ? page : data[fif].media_type,
            dataNum: 4,
        },
    ]);

    useEffect(() => {
        const set = setTimeout(() => {
            setRandomData(currState => {
                const newTrendingAll = [...currState];
                const removedData = newTrendingAll.shift();
                newTrendingAll.push(removedData);

                return newTrendingAll;
            });
        }, 1000);

        return () => clearTimeout(set);
    }, [activeData]);

    useEffect(() => {
        const set = setInterval(() => {
            setActiveData(prev => (prev === 4 ? 0 : prev + 1));
        }, 7000);

        return () => clearInterval(set);
    }, []);

    // Functions
    function getActiveData(activeData) {
        const [currTrend] = randomData.filter(tr => tr.dataNum === activeData);
        return currTrend;
    }

    return (
        <div className={styles.header}>
            <motion.div
                className={styles.header__progressBar}
                {...animate(animateProgressBar)}
            />

            <AnimatePresence initial={false}>
                <HeaderCurrImg
                    key={activeData}
                    trend={getActiveData(activeData)}
                />
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <HeaderCurrContent
                    key={activeData}
                    trend={getActiveData(activeData)}
                />
            </AnimatePresence>

            <AnimatePresence initial={false}>
                <HeaderImgList
                    activeData={activeData}
                    data={randomData}
                    key={activeData}
                />
            </AnimatePresence>
        </div>
    );
}

export default Header;
