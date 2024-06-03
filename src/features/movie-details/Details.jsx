import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useFavoriteList } from "../../contexts/FavoriteListContext";
import { animate } from "../../utils/motionAnimation";
import { getMovieDetails, getTvDetails } from "../../services/details";
import { BASE_IMG } from "../../services/apiInfo";
import { convertRuntime } from "../../utils/helper";

import Button from "../../components/button/Button";
import styles from "./Details.module.scss";
import Container from "../../components/container/Container";
import StarList from "./custom-rating/star-list/StarList";
import { useRatedMovies } from "../../contexts/RatedMoviesContext";

// Animations
const animateOptions = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    animate: { scale: 1, x: "-50%", y: "-50%" },
    exit: { scale: 0, x: "-50%", y: "-50%" },
};

function Details() {
    // Hooks
    const data = useLoaderData();
    const navigate = useNavigate();
    const [maxNumRating, setMaxNumRating] = useState(0);
    const [isHidden, setIsHidden] = useState(0);
    const [searchParams] = useSearchParams();
    const media_type = searchParams.get("media_type");
    const {
        functions: { addNewItem },
    } = useFavoriteList();
    const {
        functions: { rateMovie },
        values: { ratedMovies },
    } = useRatedMovies();

    // Variables
    const {
        id,
        overview,
        genres,
        backdrop_path,
        runtime,
        vote_count,
        vote_average,
        spoken_languages,
    } = data.data;
    const title = data.data?.title ?? data.data?.name;
    const date = data.data?.release_date ?? data.data?.first_air_date;

    const { backdrops } = data.data_imgs;
    const img_s = backdrops[0].file_path;

    const videos_num = data.data_videos.results.length;
    const [vid1, vid2] = data.data_videos.results;

    const isRated = ratedMovies.some(r => r.id === id);
    const item = {
        id,
        title,
        backdrop_path,
        vote_average,
        vote_count,
        media_type,
    };

    useEffect(()=>{
        const isRated = ratedMovies.some(r => r.id === id);
        if(isRated){
            const rating = ratedMovies.find(r => r.id === id);
            setMaxNumRating(rating.rating);
        }

    }, [id, ratedMovies])

    useEffect(() => {
        if (maxNumRating !== 0) {
            const item = {
                id,
                rating: maxNumRating,
            };
            rateMovie(item);
        }
    }, [maxNumRating, id, rateMovie]);

    // Functions
    function handleNavigate() {
        navigate(-1);
    }
    function handleOptions(bool) {
        setIsHidden(bool);
    }

    return (
        <main className={styles.details}>
            <div className={styles.details__bg} />
            <img
                className={styles.details__img_l}
                src={`${BASE_IMG}/original${backdrop_path}`}
                alt="movie details"
            />
            <AnimatePresence mode="wait">
                {isHidden && (
                    <motion.div
                        className={styles.details__options}
                        {...animate(animateOptions)}
                    >
                        <div
                            className={styles.details__close}
                            onClick={() => handleOptions(false)}
                        >
                            <i className="ri-close-line"></i>
                        </div>
                        <h3>Add Your Custom Rating</h3>
                        <StarList
                            maxNumRating={maxNumRating}
                            setMaxNumRating={setMaxNumRating}
                            movieId={id}
                        />
                        {maxNumRating !== 0 && (
                            <Button
                                type="primary"
                                onClick={() => {
                                    addNewItem(item);
                                    setIsHidden(false);
                                    navigate("/favorite");
                                }}
                            >
                                Favorite
                            </Button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <section className={styles.details__sec1}>
                <Container>
                    <div className={styles.details__sec1__wrapper}>
                        <div className={styles.details__left}>
                            <img
                                className={styles.details__img_s}
                                src={`${BASE_IMG}/original${img_s}`}
                                alt="movie details"
                            />
                        </div>
                        <div className={styles.details__right}>
                            <h3 className={styles.details__right__title}>
                                {title}
                            </h3>
                            <p className={styles.details__right__overview}>
                                {overview}
                            </p>
                            <div className={styles.details__right__genres}>
                                {genres.map((g, i) => (
                                    <span
                                        key={i}
                                        className={styles.details__right__genre}
                                    >
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                            <p className={styles.details__right__date}>
                                Realease date: {date}
                            </p>
                            {runtime && (
                                <p className={styles.details__right__time}>
                                    Time: {convertRuntime(runtime)}
                                </p>
                            )}

                            <div className={styles.details__right__langs}>
                                Spoken languages:{" "}
                                {spoken_languages.map((l, i) => (
                                    <span
                                        key={i}
                                        className={styles.details__right__lang}
                                    >
                                        {l.english_name}
                                    </span>
                                ))}
                            </div>
                            <div className={styles.details__right__ratesInfo}>
                                <p className={styles.details__right__rate}>
                                    {vote_average.toFixed(2)}{" "}
                                    <span
                                        className={
                                            styles.details__right__iconContainer
                                        }
                                    >
                                        <i className="ri-star-s-fill"></i>
                                    </span>
                                </p>
                                <p className={styles.details__right__rateCount}>
                                    {vote_count}{" "}
                                    <span
                                        className={
                                            styles.details__right__iconContainer
                                        }
                                    >
                                        <i className="ri-user-fill"></i>
                                    </span>
                                </p>
                            </div>
                            {maxNumRating !== 0 && (
                                <p
                                    className={
                                        styles.details__right__customRating
                                    }
                                >
                                    Your rating: {maxNumRating}
                                    <span
                                        className={
                                            styles.details__right__iconContainer
                                        }
                                    >
                                        <i className="ri-star-s-fill"></i>
                                    </span>
                                </p>
                            )}
                            <Button
                                type="secondary"
                                style={{
                                    background: "#24222a",
                                    border: "none",
                                }}
                                onClick={handleNavigate}
                            >
                                Back
                            </Button>
                            <Button
                                type="secondary"
                                style={{
                                    marginLeft: "1rem",
                                    padding: ".5rem",
                                }}
                                onClick={() => handleOptions(true)}
                            >
                                <i className="ri-add-large-line"></i>
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            <section className={styles.details__sec2}>
                <Container>
                    <div className={styles.details__sec2__wrapper}>
                        <div className={styles.details__sec2__videos}>
                            {videos_num !== 0 && (
                                <>
                                    <h3 className={styles.details__sec2__title}>
                                        {vid1.name}
                                    </h3>
                                    <div
                                        className={styles.details__sec2__video}
                                    >
                                        <iframe
                                            src={`https://www.youtube.com/embed/${vid1.key}`}
                                            title="The Stunt That Went Wrong Trailer"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className={
                                                styles.details__sec2__iframe
                                            }
                                        ></iframe>
                                    </div>
                                </>
                            )}

                            {videos_num >= 2 && (
                                <>
                                    <h3
                                        className={styles.details__sec2__title2}
                                    >
                                        {vid2.name}
                                    </h3>
                                    <div
                                        className={styles.details__sec2__video}
                                    >
                                        <iframe
                                            src={`https://www.youtube.com/embed/${vid2.key}`}
                                            title="The Stunt That Went Wrong Trailer"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className={
                                                styles.details__sec2__iframe
                                            }
                                        ></iframe>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}

export async function loader({ request, params }) {
    const { id } = params;
    const url = new URL(request.url);
    const media_type = url.searchParams.get("media_type");

    if (media_type === "movie") {
        const data = await getMovieDetails(id);

        return data;
    }
    if (media_type === "tv") {
        const data = await getTvDetails(id);

        return data;
    }
}

export default Details;
