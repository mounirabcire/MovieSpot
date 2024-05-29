import { ACCESS, BASE_URL } from "./apiInfo";

// Airing today TV shows
const TV_SHOWS_AIRING_TODAY_PATH = "tv/airing_today";
const API_URL_AIRING_TODAY = `${BASE_URL}/${TV_SHOWS_AIRING_TODAY_PATH}`;

// On the air TV shows
const TV_SHOWS_ON_THE_AIR = "tv/on_the_air";
const API_URL_ON_THE_AIR = `${BASE_URL}/${TV_SHOWS_ON_THE_AIR}`;

// Popular TV shows
const TV_SHOWS_POPULAR_PATH = "tv/popular";
const API_URL_POPULAR = `${BASE_URL}/${TV_SHOWS_POPULAR_PATH}`;

// Top rated TV shows
const TV_SHOWS_TOP_RATED_PATH = "tv/top_rated";
const API_URL_TOP_RATED = `${BASE_URL}/${TV_SHOWS_TOP_RATED_PATH}`;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS}`,
    },
};

export async function getTvShows() {
    try {
        const [
            response_airing_today,
            response_on_the_air,
            response_popular,
            response_top_rated,
        ] = await Promise.all([
            fetch(API_URL_AIRING_TODAY, options),
            fetch(API_URL_ON_THE_AIR, options),
            fetch(API_URL_POPULAR, options),
            fetch(API_URL_TOP_RATED, options),
        ]);
        if (
            !response_airing_today.ok ||
            !response_on_the_air ||
            !response_popular ||
            !response_top_rated
        )
            throw new Error("Network response was not ok!");

        const data_airing_today = await response_airing_today.json();
        const data_on_the_air = await response_on_the_air.json();
        const data_popular = await response_popular.json();
        const data_top_rated = await response_top_rated.json();

        if (
            data_airing_today.Response === "False" ||
            data_on_the_air.Response === "False" ||
            data_popular.Response === "False" ||
            data_top_rated.Response === "False"
        )
            throw new Error("Movie Not found!");

        return {
            data_airing_today,
            data_on_the_air,
            data_popular,
            data_top_rated,
        };
    } catch (err) {
        console.log(err.message);

        return null;
    }
}
