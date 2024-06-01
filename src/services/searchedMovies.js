import { ACCESS, BASE_URL } from "./apiInfo";

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

export const getSearchedMovies = async url => {
    try {
        const response = await fetch(`${BASE_URL}/${url}`, options);
        if (!response.ok) {
            throw new Error("Network response was not ok!");
        }

        const data = await response.json();
        if (data.Response === "False") {
            throw new Error("Movie Not found!");
        }

        return data;
    } catch (err) {
        console.error(err.message);
    }
};
