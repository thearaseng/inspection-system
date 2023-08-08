import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
var authorization = ""
if (token != null) {
    authorization = "Bearer" + token;
}

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": authorization,
    }
})

export const authApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic bXlDbGllbnQ6bXlDbGllbnRTZWNyZXQ=",
    }
})
