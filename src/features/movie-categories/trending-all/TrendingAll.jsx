import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
    randomUniqueNumsSet,
} from "../../../utils/helper";
import { getTrendingAll } from "../../../services/trendingAll";
import styles from "./TrendingAll.module.scss";
import TrendingImgItem from "./TrendingImgItem";
import CurrentTrendingImg from "./CurrentTrendingImg";
import CurrentTrendingContent from "./CurrentTrendingContent";

function TrendingAll({ activeTrend }) {
    const { results: data } = useLoaderData();
    // const [activeTrend, setActiveTrend] = useState(0);
    const [fir, sec, thi, fou, fif] = randomUniqueNumsSet(5, 19);
    const [trending_all, setTrendingAll] = useState([
        {
            id: data[fir].id,
            img_lg: data[fir].backdrop_path,
            img: data[fir].poster_path,
            title: data[fir]?.name ?? data[fir].title,
            rate: data[fir].vote_average,
            overview: data[fir].overview,
            dataNum: 0,
        },
        {
            id: data[sec].id,
            img_lg: data[sec].backdrop_path,
            img: data[sec].poster_path,
            title: data[sec]?.name ?? data[sec].title,
            rate: data[sec].vote_average,
            overview: data[sec].overview,
            dataNum: 1,
        },
        {
            id: data[thi].id,
            img_lg: data[thi].backdrop_path,
            img: data[thi].poster_path,
            title: data[thi]?.name ?? data[thi].title,
            rate: data[thi].vote_average,
            overview: data[thi].overview,
            dataNum: 2,
        },
        {
            id: data[fou].id,
            img_lg: data[fou].backdrop_path,
            img: data[fou].poster_path,
            title: data[fou]?.name ?? data[fou].title,
            rate: data[fou].vote_average,
            overview: data[fou].overview,
            dataNum: 3,
        },
        {
            id: data[fif].id,
            img_lg: data[fif].backdrop_path,
            img: data[fif].poster_path,
            title: data[fif]?.name ?? data[fif].title,
            rate: data[fif].vote_average,
            overview: data[fif].overview,
            dataNum: 4,
        },
    ]);

    function getActiveTrend(activeTrend) {
        const [currTrend] = trending_all.filter(
            tr => tr.dataNum === activeTrend
        );
        return currTrend;
    }

    useEffect(() => {
        console.log("rendered");
    }, []);

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

    return (
        <div className={styles.trending}>
            <AnimatePresence mode="wait">
                <CurrentTrendingImg
                    key={activeTrend}
                    trend={getActiveTrend(activeTrend)}
                />
            </AnimatePresence>

            <CurrentTrendingContent trend={getActiveTrend(activeTrend)} />

            <AnimatePresence>
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

export async function loader() {
    const trending_all = await getTrendingAll();

    return trending_all;
}

export default TrendingAll;
