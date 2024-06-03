import { useState, useMemo } from "react";
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

    // Memoize derived states
    const memoizedResultsNowPlaying = useMemo(
        () => results_now_playing,
        [results_now_playing]
    );
    const memoizedResultsPopular = useMemo(
        () => results_popular,
        [results_popular]
    );
    const memoizedResultsUpcoming = useMemo(
        () => results_upcoming,
        [results_upcoming]
    );
    const memoizedResultsTopRated = useMemo(
        () => results_top_rated,
        [results_top_rated]
    );

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
                <Header data={memoizedResultsNowPlaying} page="movie" />
            </header>
            <main className={styles.main}>
                <Container>
                    {[
                        {
                            title: "Now Playing Movies",
                            data: memoizedResultsNowPlaying,
                            type: "now_playing",
                        },
                        {
                            title: "Top Rated Movies",
                            data: memoizedResultsTopRated,
                            type: "top_rated",
                        },
                        {
                            title: "Popular Movies",
                            data: memoizedResultsPopular,
                            type: "popular",
                        },
                        {
                            title: "Upcoming Movies",
                            data: memoizedResultsUpcoming,
                            type: "upcoming",
                        },
                    ].map(({ title, data, type }) => (
                        <div key={type} className={styles[`movies__${type}`]}>
                            <Reveal>
                                <h3 className={styles.movies__headingType}>
                                    {title}
                                </h3>
                            </Reveal>
                            <CardList
                                arrayData={data}
                                maxRowData={maxRowData[type]}
                                page="movie"
                            />
                            {data.length <= maxRowData[type] ? (
                                <Button
                                    style={{ cursor: "not-allowed" }}
                                    disabled={true}
                                >
                                    See more
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => updateRowData(6, type, true)}
                                >
                                    See more
                                </Button>
                            )}
                            {maxRowData[type] > 6 && (
                                <Button
                                    style={{ marginLeft: "1rem" }}
                                    onClick={() =>
                                        updateRowData(6, type, false)
                                    }
                                >
                                    See less
                                </Button>
                            )}
                        </div>
                    ))}
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
