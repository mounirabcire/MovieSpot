import { useState } from "react";

import { useFavoriteList } from "../../contexts/FavoriteListContext";

import Button from "../../components/button/Button";
import CardList from "../../components/card/CardList";
import Container from "../../components/container/Container";
import Reveal from "../../components/reveal/Reveal";
import styles from "./FavoriteList.module.scss";
import { useNavigate } from "react-router-dom";

function FavoriteList() {
    // Hooks
    const {
        values: { favList },
        functions: { deleteItem },
    } = useFavoriteList();
    const [maxRowData, setMaxRowData] = useState(6);
    const navigate = useNavigate();

    // Functions
    function updateMaxRowData(dataNum) {
        setMaxRowData(prev => prev + dataNum);
    }
    function updateMinRowData(dataNum) {
        setMaxRowData(prev => prev - dataNum);
    }

    if (favList.length === 0)
        return (
            <main className={styles.main}>
                <Container>
                    <Button onClick={() => navigate(-1)}>Back</Button>
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
                    <Button onClick={() => navigate(-1)}>Back</Button>
                    <Reveal>
                        <h3 className={styles.favList__headingType}>
                            Your Favorite List
                        </h3>
                    </Reveal>
                    <CardList
                        arrayData={favList}
                        maxRowData={maxRowData}
                        page="movie"
                        isFavpage={true}
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
                    {maxRowData > 6 && (
                        <Button
                            style={{ marginLeft: "1rem" }}
                            onClick={() => updateMinRowData(6)}
                        >
                            See less
                        </Button>
                    )}
                </div>
            </Container>
        </main>
    );
}

export default FavoriteList;
