import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { getSearchedMovies } from "../../services/searchedMovies";

import CardList from "../../components/card/CardList";
import Reveal from "../../components/reveal/Reveal";
import styles from "./SearchedMovies.module.scss";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";

function SearchedMovies() {
    const searchedData = useLoaderData();
    const [maxRowData, setMaxRowData] = useState(6);
    const filteredData = searchedData.results.filter(d => d?.backdrop_path);

    // Functions
    function updateMaxRowData(dataNum) {
        setMaxRowData(prev => prev + dataNum);
    }

    return (
        <Container>
            <div className={styles.searchedMovies__container}>
                <Reveal>
                    <h3 className={styles.searchedMovies__headingType}>
                        Searched Movies
                    </h3>
                </Reveal>
                <CardList
                    arrayData={filteredData}
                    maxRowData={maxRowData}
                    page="movie"
                />
                {filteredData.length <= maxRowData ? (
                    <Button style={{ cursor: "not-allowed" }} disabled={true}>
                        See more
                    </Button>
                ) : (
                    <Button onClick={() => updateMaxRowData(6)}>
                        See more
                    </Button>
                )}
            </div>
        </Container>
    );
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const searchedMovies = await getSearchedMovies(
        `search/multi?query=${query}&include_adult=false&language=en-US&page=1`
    );

    return searchedMovies;
}

export default SearchedMovies;
