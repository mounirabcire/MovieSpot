import { ACCESS, BASE_URL } from "./apiInfo";

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
        const [response_popular, response_top_rated] = await Promise.all([
            fetch(API_URL_POPULAR, options),
            fetch(API_URL_TOP_RATED, options),
        ]);
        if (!response_popular || !response_top_rated)
            throw new Error("Network response was not ok!");

        const data_popular = await response_popular.json();
        const data_top_rated = await response_top_rated.json();

        if (
            data_popular.Response === "False" ||
            data_top_rated.Response === "False"
        )
            throw new Error("Movie Not found!");

        return {
            data_popular,
            data_top_rated,
        };
    } catch (err) {
        console.log(err.message);

        return null;
    }
}
