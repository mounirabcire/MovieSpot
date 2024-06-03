import { useState, useMemo } from "react";
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
    const {
        data_popular: { results: results_popular },
        data_top_rated: { results: results_top_rated },
    } = tvShows;
    const [maxRowData, setMaxRowData] = useState({
        popular: 6,
        top_rated: 6,
    });

    // Memoize derived states
    const memoizedResultsPopular = useMemo(
        () => results_popular,
        [results_popular]
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
                <Header data={memoizedResultsTopRated} page="tv" />
            </header>
            <main className={styles.main}>
                <Container>
                    {[
                        {
                            title: "Top Rated Tv Shows",
                            data: memoizedResultsTopRated,
                            type: "top_rated",
                        },
                        {
                            title: "Popular Tv Shows",
                            data: memoizedResultsPopular,
                            type: "popular",
                        },
                    ].map(({ title, data, type }) => (
                        <div key={type} className={styles[`tvShows__${type}`]}>
                            <Reveal>
                                <h3 className={styles.tvShows__headingType}>
                                    {title}
                                </h3>
                            </Reveal>
                            <CardList
                                arrayData={data}
                                maxRowData={maxRowData[type]}
                                page="tv"
                            />
                            {data.length > maxRowData[type] && (
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
    const tvShows = await getTvShows();
    return tvShows;
}

export default TvShows;
