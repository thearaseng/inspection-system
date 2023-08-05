import axios from "axios";
import Cookies from "js-cookie";
import {CLIENT_ID, CLIENT_SECRET} from "../constants/Security";

const token = Cookies.get("token");
var authorization = ""
if (token != null) {
    authorization = "Bearer" + token;
}

export const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
        "Authorization": authorization,
    }
})

export const authApi = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic bXlDbGllbnQ6bXlDbGllbnRTZWNyZXQ=",
        "Access-Control-Allow-Origin": "*"
    }
})
