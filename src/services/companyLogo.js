import { ACCESS, BASE_URL } from "./apiInfo";

const COMPANY_LOGO_PATH = "company/2/images";
const API_URL = `${BASE_URL}/${COMPANY_LOGO_PATH}`;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS}`,
    },
};

export async function getCompanyLogo(){
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