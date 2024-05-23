import { BASE_URL } from "./apiInfo";

const TRENDING_ALL_PATH = "trending/all/day";
const API_URL = `${BASE_URL}/${TRENDING_ALL_PATH}`;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTRmYTcyNTFhNzdkOTRjMTg0NTFkMmQzM2U0NmFiNyIsInN1YiI6IjY2MzQxYWE0OTU5MGUzMDEyY2JhZjZhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GIdfKqT4Cu80acebsG6wOk91pP8KdU8bK6GRIImGjXE",
    },
};

export async function getTrendingAll() {
    try {
        const response = await fetch(API_URL, options);
        if (!response.ok) throw new Error("Network response was not ok!");

        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie Not found!");

        return data;
    } catch (err) {
        console.log(err.message);

        return null;
    }
}
