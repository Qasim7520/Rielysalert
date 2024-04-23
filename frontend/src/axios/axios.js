import axios from "axios";

export const BASE_URL = `${process.env.REACT_APP_PUBLIC_BASE_URL}`;
const Api = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
});
export default Api;