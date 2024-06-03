import { ACCESS, API_KEY, BASE_URL } from "./apiInfo";

console.log(process.env.API_KEY);
const TRENDING_ALL_PATH = "trending/all/day";
const API_URL = `${BASE_URL}/${TRENDING_ALL_PATH}?api_key=${process.env.API_KEY}`;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS}`,
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
