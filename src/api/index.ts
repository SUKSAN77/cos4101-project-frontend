import axios from "axios";

const ruBackofficeApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

console.log(process.env.REACT_APP_API_URL);

export default ruBackofficeApi;
