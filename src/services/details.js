import { ACCESS, BASE_URL } from "./apiInfo";

const IMGS_PATH = "images";
const VIDEOS_PATH = "videos";

// Movie details info
const MOVIE_DETAILS_PATH = "movie";
const API_URL_MVD = `${BASE_URL}/${MOVIE_DETAILS_PATH}`;

// Tv details info
const TV_DETAILS_PATH = "tv";
const API_URL_TVD = `${BASE_URL}/${TV_DETAILS_PATH}`;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS}`,
    },
};

export async function getMovieDetails(id) {
    try {
        // Fetch both resources in parallel
        const [response, response_imgs, response_videos] = await Promise.all([
            fetch(`${API_URL_MVD}/${id}`, options),
            fetch(`${API_URL_MVD}/${id}/${IMGS_PATH}`, options),
            fetch(`${API_URL_MVD}/${id}/${VIDEOS_PATH}`, options),
        ]);

        // Check if both responses are OK
        if (!response.ok) {
            throw new Error(
                `Failed to fetch movie details: ${response.statusText}`
            );
        }
        if (!response_imgs.ok) {
            throw new Error(
                `Failed to fetch movie images: ${response_imgs.statusText}`
            );
        }
        if (!response_videos.ok) {
            throw new Error(
                `Failed to fetch movie images: ${response_imgs.statusText}`
            );
        }

        // Parse the JSON data
        const data = await response.json();
        const data_imgs = await response_imgs.json();
        const data_videos = await response_videos.json();

        // Check for application-level errors in the responses
        if (data.Response === "False") {
            throw new Error("Movie not found!");
        }
        if (data_imgs.Response === "False") {
            throw new Error("Movie images not found!");
        }
        if (data_videos.Response === "False") {
            throw new Error("Movie images not found!");
        }

        // Return an object containing both data and data_imgs
        return { data, data_imgs, data_videos };
    } catch (err) {
        // Log the error message and return null
        console.error(err.message);
        return null;
    }
}

export async function getTvDetails(id) {
    try {
        const [response, response_imgs, response_videos] = await Promise.all([
            fetch(`${API_URL_TVD}/${id}`, options),
            fetch(`${API_URL_TVD}/${id}/${IMGS_PATH}`, options),
            fetch(`${API_URL_TVD}/${id}/${VIDEOS_PATH}`, options),
        ]);

        // Check if both responses are OK
        if (!response.ok) {
            throw new Error(
                `Failed to fetch movie details: ${response.statusText}`
            );
        }
        if (!response_imgs.ok) {
            throw new Error(
                `Failed to fetch movie images: ${response_imgs.statusText}`
            );
        }
        if (!response_videos.ok) {
            throw new Error(
                `Failed to fetch movie images: ${response_imgs.statusText}`
            );
        }

        // Parse the JSON data
        const data = await response.json();
        const data_imgs = await response_imgs.json();
        const data_videos = await response_videos.json();

        // Check for application-level errors in the responses
        if (data.Response === "False") {
            throw new Error("Movie not found!");
        }
        if (data_imgs.Response === "False") {
            throw new Error("Movie images not found!");
        }
        if (data_videos.Response === "False") {
            throw new Error("Movie images not found!");
        }

        // Return an object containing both data and data_imgs
        return { data, data_imgs, data_videos };
    } catch (err) {
        // Log the error message and return null
        console.error(err.message);
        return null;
    }
}
