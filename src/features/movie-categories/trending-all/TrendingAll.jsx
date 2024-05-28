import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { randomUniqueNumsSet } from "../../../utils/helper";
import { animate } from "../../../utils/motionAnimation";

import styles from "./TrendingAll.module.scss";
import TrendingImgItem from "./TrendingImgItem";
import CurrentTrendingImg from "./CurrentTrendingImg";
import CurrentTrendingContent from "./CurrentTrendingContent";

// Get 5 unique random numbers
const [fir, sec, thi, fou, fif] = randomUniqueNumsSet(5, 19);

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

function TrendingAll({ data }) {
    // Hooks
    const [activeTrend, setActiveTrend] = useState(0);
    const [trending_all, setTrendingAll] = useState([
        {
            id: data[fir].id,
            img_lg: data[fir].backdrop_path,
            img: data[fir].poster_path,
            title: data[fir]?.name ?? data[fir].title,
            rate: data[fir].vote_average,
            overview: data[fir].overview,
            media_type: data[fir].media_type,
            dataNum: 0,
        },
        {
            id: data[sec].id,
            img_lg: data[sec].backdrop_path,
            img: data[sec].poster_path,
            title: data[sec]?.name ?? data[sec].title,
            rate: data[sec].vote_average,
            overview: data[sec].overview,
            media_type: data[sec].media_type,
            dataNum: 1,
        },
        {
            id: data[thi].id,
            img_lg: data[thi].backdrop_path,
            img: data[thi].poster_path,
            title: data[thi]?.name ?? data[thi].title,
            rate: data[thi].vote_average,
            overview: data[thi].overview,
            media_type: data[thi].media_type,
            dataNum: 2,
        },
        {
            id: data[fou].id,
            img_lg: data[fou].backdrop_path,
            img: data[fou].poster_path,
            title: data[fou]?.name ?? data[fou].title,
            rate: data[fou].vote_average,
            overview: data[fou].overview,
            media_type: data[fou].media_type,
            dataNum: 3,
        },
        {
            id: data[fif].id,
            img_lg: data[fif].backdrop_path,
            img: data[fif].poster_path,
            title: data[fif]?.name ?? data[fif].title,
            rate: data[fif].vote_average,
            overview: data[fif].overview,
            media_type: data[fif].media_type,
            dataNum: 4,
        },
    ]);

    useEffect(() => {
        const set = setTimeout(() => {
            setTrendingAll(currState => {
                const newTrendingAll = [...currState];
                const removedData = newTrendingAll.shift();
                newTrendingAll.push(removedData);

                return newTrendingAll;
            });
        }, 1000);

        return () => clearTimeout(set);
    }, [activeTrend]);

    useEffect(() => {
        const set = setInterval(() => {
            setActiveTrend(prev => (prev === 4 ? 0 : prev + 1));
        }, 7000);

        return () => clearInterval(set);
    }, []);

    // Functions
    function getActiveTrend(activeTrend) {
        const [currTrend] = trending_all.filter(
            tr => tr.dataNum === activeTrend
        );
        return currTrend;
    }

    return (
        <div className={styles.trending}>
            <motion.div
                className={styles.trending__progressBar}
                {...animate(animateProgressBar)}
            />

            <AnimatePresence initial={false}>
                <CurrentTrendingImg
                    key={activeTrend}
                    trend={getActiveTrend(activeTrend)}
                />
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <CurrentTrendingContent
                    key={activeTrend}
                    trend={getActiveTrend(activeTrend)}
                />
            </AnimatePresence>

            <AnimatePresence initial={false}>
                <div
                    className={styles.trending__imgsContainer}
                    key={activeTrend}
                >
                    {trending_all.map(t => (
                        <TrendingImgItem
                            key={t.id}
                            trend={t}
                            currentTrending={activeTrend}
                        />
                    ))}
                </div>
            </AnimatePresence>
        </div>
    );
}

export default TrendingAll;
