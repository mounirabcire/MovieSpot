import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { getTvShows } from "../../../services/tvshows";

import Header from "../../../components/header/Header";
import styles from "./TvShows.module.scss";
import Container from "../../../components/container/Container";
import Reveal from "../../../components/reveal/Reveal";
import CardList from "../../../components/card/CardList";
import Button from "../../../components/button/Button";

function TvShows() {
    // Hooks
    const tvShows = useLoaderData();
    console.log(tvShows);
    const {
        data_airing_today: { results: results_airing_today },
        data_popular: { results: results_popular },
        data_on_the_air: { results: results_on_the_air },
        data_top_rated: { results: results_top_rated },
    } = tvShows;
    const [maxRowData, setMaxRowData] = useState({
        airing_today: 6,
        popular: 6,
        on_the_air: 6,
        top_rated: 6,
    });

    // Functions
    function updateMaxRowData(dataNum, type) {
        setMaxRowData(prev => ({ ...prev, [type]: prev[type] + dataNum }));
    }

    return (
        <>
            <header className={styles.header}>
                <Header data={results_airing_today} page="tv" />
            </header>
            <main className={styles.main}>
                <Container>
                    <div className={styles.tvShows__airingToday}>
                        <Reveal>
                            <h3 className={styles.tvShows__headingType}>
                                Airing Today Tv Shows
                            </h3>
                        </Reveal>
                        <CardList
                            arrayData={results_airing_today}
                            maxRowData={maxRowData.airing_today}
                            page="tv"
                        />
                        {results_airing_today.length <=
                        maxRowData.airing_today ? (
                            <Button
                                style={{ cursor: "not-allowed" }}
                                disabled={true}
                            >
                                See more
                            </Button>
                        ) : (
                            <Button
                                onClick={() =>
                                    updateMaxRowData(6, "airing_today")
                                }
                            >
                                See more
                            </Button>
                        )}
                    </div>
                    <div className={styles.tvShows__topRated}>
                        <Reveal>
                            <h3 className={styles.tvShows__headingType}>
                                Top Rated Tv Shows
                            </h3>
                        </Reveal>
                        <CardList
                            arrayData={results_top_rated}
                            maxRowData={maxRowData.top_rated}
                            page="tv"
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
                    <div className={styles.tvShows__popular}>
                        <Reveal>
                            <h3 className={styles.tvShows__headingType}>
                                Popular Tv Shows
                            </h3>
                        </Reveal>
                        <CardList
                            arrayData={results_popular}
                            maxRowData={maxRowData.popular}
                            page="tv"
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
                    <div className={styles.tvShows__on_the_air}>
                        <Reveal>
                            <h3 className={styles.tvShows__headingType}>
                                On The Air Tv Shows
                            </h3>
                        </Reveal>
                        <CardList
                            arrayData={results_on_the_air}
                            maxRowData={maxRowData.on_the_air}
                        />
                        {results_on_the_air.length <= maxRowData.on_the_air ? (
                            <Button
                                style={{ cursor: "not-allowed" }}
                                disabled={true}
                            >
                                See more
                            </Button>
                        ) : (
                            <Button
                                onClick={() =>
                                    updateMaxRowData(6, "on_the_air")
                                }
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
    const tvShows = await getTvShows();

    return tvShows;
}

export default TvShows;
