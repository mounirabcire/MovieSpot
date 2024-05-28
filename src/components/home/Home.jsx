import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import { getTrendingAll } from "../../services/trendingAll";

import TrendingAll from "../../features/movie-categories/trending-all/TrendingAll";
import Container from "../container/Container";
import styles from "./Home.module.scss";
import CardList from "../card/CardList";
import Reveal from "../reveal/Reveal";
import Button from "../button/Button";

function Home() {
    const { results: data } = useLoaderData();
    const [maxRowData, setMaxRowData] = useState(6);
    const trendingMovies = data.filter(movie => movie.media_type === "movie");
    const trendingTvs = data.filter(movie => movie.media_type === "tv");

    function updateMaxRowData(dataNum) {
        setMaxRowData(prev => prev + dataNum);
    }

    return (
        <>
            <header className={styles.header}>
                <TrendingAll data={data} />
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
                            maxRowData={maxRowData}
                        />
                        {trendingMovies.length <= maxRowData ? (
                            <Button
                                style={{ cursor: "not-allowed" }}
                                disabled={true}
                            >
                                See more
                            </Button>
                        ) : (
                            <Button onClick={() => updateMaxRowData(6)}>
                                See more
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
                            maxRowData={maxRowData}
                        />
                        {trendingTvs.length <= maxRowData ? (
                            <Button
                                style={{ cursor: "not-allowed" }}
                                disabled={true}
                            >
                                See more
                            </Button>
                        ) : (
                            <Button onClick={() => updateMaxRowData(6)}>
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
    const trending_all = await getTrendingAll();

    return trending_all;
}

export default Home;
