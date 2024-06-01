import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { getMovies } from "../../../services/movies";

import Header from "../../../components/header/Header";
import styles from "./Movies.module.scss";
import Container from "../../../components/container/Container";
import Reveal from "../../../components/reveal/Reveal";
import CardList from "../../../components/card/CardList";
import Button from "../../../components/button/Button";

function Movies() {
    // Hooks
    const movies = useLoaderData();
    const {
        data_now_playing: { results: results_now_playing },
        data_popular: { results: results_popular },
        data_upcoming: { results: results_upcoming },
        data_top_rated: { results: results_top_rated },
    } = movies;
    const [maxRowData, setMaxRowData] = useState({
        now_playing: 6,
        popular: 6,
        upcoming: 6,
        top_rated: 6,
    });

    // Functions
    function updateMaxRowData(dataNum, type) {
        setMaxRowData(prev => ({ ...prev, [type]: prev[type] + dataNum }));
    }

    return (
        <>
            <header className={styles.header}>
                <Header data={results_now_playing} page="movie" />
            </header>
            <main className={styles.main}>
                <Container>
                    <div className={styles.movies__nowPlaying}>
                        <Reveal>
                            <h3 className={styles.movies__headingType}>
                                Now Playing Movies
                            </h3>
                        </Reveal>
                        <CardList
                            arrayData={results_now_playing}
                            maxRowData={maxRowData.now_playing}
                            page="movie"
                        />
                        {results_now_playing.length <=
                        maxRowData.now_playing ? (
                            <Button
                                style={{ cursor: "not-allowed" }}
                                disabled={true}
                            >
                                See more
                            </Button>
                        ) : (
                            <Button
                                onClick={() =>
                                    updateMaxRowData(6, "now_playing")
                                }
                            >
                                See more
                            </Button>
                        )}
                    </div>
                    <div className={styles.movies__topRated}>
                        <Reveal>
                            <h3 className={styles.movies__headingType}>
                                Top Rated Movies
                            </h3>
                        </Reveal>
                        <CardList
                            arrayData={results_top_rated}
                            maxRowData={maxRowData.top_rated}
                            page="movie"
                        />
                        {results_top_rated.length <= maxRowData.top_rated ? (
                            <Button
                                style={{ cursor: "not-allowed" }}
                                disabled={true}
                            >
                                See more
                            </Button>
                        ) : (
                            <Button
                                onClick={() => updateMaxRowData(6, "top_rated")}
                            >
                                See more
                            </Button>
                        )}
                    </div>
                    <div className={styles.movies__popular}>
                        <Reveal>
                            <h3 className={styles.movies__headingType}>
                                Popular Movies
                            </h3>
                        </Reveal>
                        <CardList
                            arrayData={results_popular}
                            maxRowData={maxRowData.popular}
                            page="movie"
                        />
                        {results_popular.length <= maxRowData.popular ? (
                            <Button
                                style={{ cursor: "not-allowed" }}
                                disabled={true}
                            >
                                See more
                            </Button>
                        ) : (
                            <Button
                                onClick={() => updateMaxRowData(6, "popular")}
                            >
                                See more
                            </Button>
                        )}
                    </div>
                    <div className={styles.movies__upcoming}>
                        <Reveal>
                            <h3 className={styles.movies__headingType}>
                                Up Coming Movies
                            </h3>
                        </Reveal>
                        <CardList
                            arrayData={results_upcoming}
                            maxRowData={maxRowData.upcoming}
                            page="movie"
                        />
                        {results_upcoming.length <= maxRowData.upcoming ? (
                            <Button
                                style={{ cursor: "not-allowed" }}
                                disabled={true}
                            >
                                See more
                            </Button>
                        ) : (
                            <Button
                                onClick={() => updateMaxRowData(6, "upcoming")}
                            >
                                See more
                            </Button>
                        )}
                    </div>
                </Container>
            </main>
        </>
    );
}

export async function loader() {
    const movies = await getMovies();

    return movies;
}

export default Movies;
