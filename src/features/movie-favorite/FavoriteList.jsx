import { useState } from "react";

import { useFavoriteList } from "../../contexts/FavoriteListContext";

import Button from "../../components/button/Button";
import CardList from "../../components/card/CardList";
import Container from "../../components/container/Container";
import Reveal from "../../components/reveal/Reveal";
import styles from "./FavoriteList.module.scss";

function FavoriteList() {
    // Hooks
    const {
        values: { favList },
    } = useFavoriteList();
    console.log(favList);
    const [maxRowData, setMaxRowData] = useState(6);

    // Functions
    function updateMaxRowData(dataNum) {
        setMaxRowData(prev => prev + dataNum);
    }

    if (favList.length === 0)
        return (
            <main className={styles.main}>
                <Container>
                    <div className={styles.faveList__list}>
                        <Reveal>
                            <h3 className={styles.favList__headingType}>
                                Your Favorite List
                            </h3>
                        </Reveal>
                        <p className={styles.favList__empty}>
                            Your list is empty
                        </p>
                    </div>
                </Container>
            </main>
        );

    return (
        <main className={styles.main}>
            <Container>
                <div className={styles.faveList__list}>
                    <Reveal>
                        <h3 className={styles.favList__headingType}>
                            Your Favorite List
                        </h3>
                    </Reveal>
                    <CardList
                        arrayData={favList}
                        maxRowData={maxRowData}
                        page="movie"
                    />
                    {favList.length <= maxRowData ? (
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
    );
}

export default FavoriteList;
