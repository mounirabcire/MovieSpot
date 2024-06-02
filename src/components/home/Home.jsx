import { useLoaderData } from "react-router-dom";
import { useState } from "react";

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
    const { results: data } = useLoaderData();
    const [maxRowData, setMaxRowData] = useState({ movies: 6, tvs: 6 });

    // Derive states
    const trendingMovies = data.filter(
        movie =>
            movie.media_type === "movie" &&
            Boolean(movie.backdrop_path) !== false
    );
    const trendingTvs = data.filter(
        movie =>
            movie.media_type === "tv" && Boolean(movie.backdrop_path) !== false
    );

    // Functions
    function updateMaxRowData(dataNum, type) {
        setMaxRowData(prev => ({ ...prev, [type]: prev[type] + dataNum }));
    }
    function updateMinRowData(dataNum, type) {
        setMaxRowData(prev => ({ ...prev, [type]: prev[type] - dataNum }));
    }

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
                        {trendingMovies.length <= maxRowData.movies ? (
                            <Button
                                style={{ cursor: "not-allowed" }}
                                disabled={true}
                            >
                                See more
                            </Button>
                        ) : (
                            <Button
                                onClick={() => updateMaxRowData(6, "movies")}
                            >
                                See more
                            </Button>
                        )}
                          {maxRowData.movies > 6 && (
                            <Button
                                style={{ marginLeft: "1rem" }}
                                onClick={() =>
                                    updateMinRowData(6, "movies")
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
                        {trendingTvs.length <= maxRowData.tvs ? (
                            <Button
                                style={{ cursor: "not-allowed" }}
                                disabled={true}
                            >
                                See more
                            </Button>
                        ) : (
                            <Button onClick={() => updateMaxRowData(6, "tvs")}>
                                See more
                            </Button>
                        )}
                          {maxRowData.tvs > 6 && (
                            <Button
                                style={{ marginLeft: "1rem" }}
                                onClick={() =>
                                    updateMinRowData(6, "tvs")
                                }
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
