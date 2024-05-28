import { ACCESS, BASE_URL } from "./apiInfo";

// Trending movies
const MOVIES_TRENDING_PATH = "trending/movie/day";
const API_URL_TRENDING = `${BASE_URL}/${MOVIES_TRENDING_PATH}`;

// Now playin movies
const MOVIES_NOW_PLAYING_PATH = "movie/now_playing";
const API_URL_NOW_PLAYING = `${BASE_URL}/${MOVIES_NOW_PLAYING_PATH}`;

// Popular movies
const MOVIES_POPULAR_PATH = "movie/popular";
const API_URL_POPULAR = `${BASE_URL}/${MOVIES_POPULAR_PATH}`;

// Up comming movies
const MOVIES_UPCOMING_PATH = "movie/upcoming";
const API_URL_UPCOMING = `${BASE_URL}/${MOVIES_UPCOMING_PATH}`;

// Top rated movies
const MOVIES_TOP_RATED_PATH = "movie/top_rated";
const API_URL_TOP_RATED = `${BASE_URL}/${MOVIES_TOP_RATED_PATH}`;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS}`,
    },
};

export async function getTrendingMovies() {
    try {
        const response = await fetch(API_URL_TRENDING, options);
        if (!response.ok) throw new Error("Network response was not ok!");

        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie Not found!");

        return data;
    } catch (err) {
        console.log(err.message);

        return null;
    }
}

export async function getMovies() {
    try {
        const [
            response_now_playing,
            response_popular,
            response_upcoming,
            response_top_rated,
        ] = await Promise.all([
            fetch(API_URL_NOW_PLAYING, options),
            fetch(API_URL_POPULAR, options),
            fetch(API_URL_UPCOMING, options),
            fetch(API_URL_TOP_RATED, options),
        ]);
        if (
            !response_now_playing.ok ||
            !response_popular ||
            !response_upcoming ||
            !response_top_rated
        )
            throw new Error("Network response was not ok!");

        const data_now_playing = await response_now_playing.json();
        const data_popular = await response_popular.json();
        const data_upcoming = await response_upcoming.json();
        const data_top_rated = await response_top_rated.json();

        if (
            data_now_playing.Response === "False" ||
            data_popular.Response === "False" ||
            data_upcoming.Response === "False" ||
            data_top_rated.Response === "False"
        )
            throw new Error("Movie Not found!");

        return { data_now_playing, data_popular, data_upcoming, data_top_rated };
    } catch (err) {
        console.log(err.message);

        return null;
    }
}
