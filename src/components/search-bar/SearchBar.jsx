import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { ACCESS, BASE_URL } from "../../services/apiInfo";

import styles from "./SearchBar.module.scss";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

function SearchBar({ handleSearchBar }) {
    // Hooks
    const [search, setSearch] = useState("");
    const [searchedData, setSearchedData] = useState([]);
    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        if (search.trim() !== "") {
            const controller = new AbortController();
            const { signal } = controller;

            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${ACCESS}`,
                },
                signal: signal,
            };

            const API_URL = `${BASE_URL}/search/multi?query=${search}&include_adult=false&language=en-US&page=1`;

            const getSearchedMovies = async api_url => {
                try {
                    const response = await fetch(api_url, options);

                    if (!response.ok) {
                        throw new Error("Network response was not ok!");
                    }

                    const data = await response.json();

                    if (data.Response === "False") {
                        throw new Error("Movie Not found!");
                    }

                    setSearchedData(data.results);
                } catch (err) {
                    if (err.name === "AbortError") {
                        console.log("Fetch aborted");
                    } else {
                        console.error(err.message);
                    }
                }
            };

            getSearchedMovies(API_URL);

            return () => {
                controller.abort();
            };
        }
    }, [search]);

    useEffect(() => {
        ref.current.focus();
    }, []);

    // Functions
    function handleNavigate() {
        if (search.trim() !== "") {
            handleSearchBar(false);
            navigate(`/search?query=${search.trim()}`);
        } else {
            setSearch("");
        }
    }

    return (
        <div className={styles.searchbar__bg}>
            <motion.div
                className={styles.searchbar__container}
                initial={{
                    y: -50,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                exit={{
                    y: -50,
                    opacity: 0,
                }}
            >
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className={styles.searchbar__input}
                    placeholder="Search..."
                    ref={ref}
                />

                <Button
                    type="primary"
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        height: "100%",
                        padding: ".5rem 1rem",
                    }}
                    onClick={handleNavigate}
                >
                    Search
                </Button>
                <div
                    className={styles.searchbar__close}
                    onClick={() => handleSearchBar(false)}
                >
                    <i className="ri-close-line"></i>
                </div>
            </motion.div>
            {searchedData.length > 0 && (
                <div className={styles.searchedMovies__container}>
                    <ul className={styles.searchedMovies__list}>
                        {searchedData.map((d, i) => (
                            <li
                                key={i}
                                className={styles.searchedMovies__item}
                                onClick={() => setSearch(d.name || d.title)}
                            >
                                {d.name || d.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
