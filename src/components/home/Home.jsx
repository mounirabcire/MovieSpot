import { useLoaderData } from "react-router-dom";
import { useMemo, useState } from "react";

import { getTrendingAll } from "../../services/trendingAll";

import Container from "../container/Container";
import styles from "./Home.module.scss";
import CardList from "../card/CardList";
import Reveal from "../reveal/Reveal";
import Button from "../button/Button";
import Header from "../header/Header";
import TrendingAll from "../../features/movie-categories/trending-all/TrendingAll";

function Home() {
    // Hooks
    const [maxRowData, setMaxRowData] = useState({ movies: 6, tvs: 6 });
    const loaderData = useLoaderData();
    const data = useMemo(() => loaderData.results, [loaderData]);

    // Memoize derived states
    const trendingMovies = useMemo(() => {
        return data.filter(
            movie =>
                movie.media_type === "movie" &&
                Boolean(movie.backdrop_path) !== false
        );
    }, [data]);

    const trendingTvs = useMemo(() => {
        return data.filter(
            movie =>
                movie.media_type === "tv" &&
                Boolean(movie.backdrop_path) !== false
        );
    }, [data]);

    // Functions
    const updateRowData = (dataNum, type, increase = true) => {
        setMaxRowData(prev => ({
            ...prev,
            [type]: increase ? prev[type] + dataNum : prev[type] - dataNum,
        }));
    };

    return (
        <>
            <header className={styles.header}>
                <TrendingAll>
                    <Header data={data} />
                </TrendingAll>
            </header>
            <main className={styles.main}>
                <Container>
                    <div className={styles.trending__movies}>
                        <Reveal>
                            <h3 className={styles.trending__headingType}>
                                Trendin Movies
                            </h3>
                        </Reveal>
                        <CardList
                            arrayData={trendingMovies}
                            maxRowData={maxRowData.movies}
                        />
                        {trendingMovies.length > maxRowData.movies && (
                            <Button onClick={() => updateRowData(6, "movies")}>
                                See more
                            </Button>
                        )}
                        {maxRowData.movies > 6 && (
                            <Button
                                style={{ marginLeft: "1rem" }}
                                onClick={() =>
                                    updateRowData(6, "movies", false)
                                }
                            >
                                See less
                            </Button>
                        )}
                    </div>
                    <div className={styles.trending__tvs}>
                        <Reveal>
                            <h3 className={styles.trending__headingType}>
                                Trendin Tv Shows
                            </h3>
                        </Reveal>
                        <CardList
                            arrayData={trendingTvs}
                            maxRowData={maxRowData.tvs}
                        />
                        {trendingTvs.length > maxRowData.movies && (
                            <Button onClick={() => updateRowData(6, "tvs")}>
                                See more
                            </Button>
                        )}
                        {maxRowData.tvs > 6 && (
                            <Button
                                style={{ marginLeft: "1rem" }}
                                onClick={() => updateRowData(6, "tvs", false)}
                            >
                                See less
                            </Button>
                        )}
                    </div>
                </Container>
            </main>
        </>
    );
}

export async function loader() {
    const trending_all = await getTrendingAll();

    return trending_all;
}

export default Home;
