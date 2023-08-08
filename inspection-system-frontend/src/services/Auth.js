import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, INIT_URL, USER_TOKEN_SET} from "../constants/ActionTypes";
import Cookies from 'js-cookie';
import {authApi} from "../util/Api";
import * as jose from 'jose'

export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url,
    };
};

export const userSignOut = (callback = (res) => {

}) => {
    return (dispatch) => {
        try {
            dispatch({type: FETCH_START});
            Cookies.remove("token");
            Cookies.remove("role");
            Cookies.remove("refresh_token");
            Cookies.remove("email");
            Cookies.remove("decoded_token");
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: USER_TOKEN_SET, payload: null});
            callback(200)
        } catch (e) {
            dispatch({type: FETCH_ERROR, payload: null});
            callback(404)
        }


    }
}

export const userSignIn = (
    {username, password},
    callback = (res) => {
    }
) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        authApi
            .post(
                "oauth/token",
                {
                    grant_type: "password",
                    username: username,
                    password: password,
                }
            )
            .then((res) => {
                console.log("userSignIn: ", res);
                if (res.status === 200) {
                    if (Cookies.get("token") != null || Cookies.get("role") != null) {
                        Cookies.remove("token");
                        Cookies.remove("role");
                    }

                    const decoded_token = jose.decodeJwt(res.data.access_token);
                    console.log("decoded_token: ", decoded_token);
                    Cookies.set("token", res.data.access_token);
                    Cookies.set("refresh_token", res.data.refresh_token);
                    Cookies.set("role", JSON.stringify(decoded_token.authorities));
                    Cookies.set("email", JSON.stringify(decoded_token.user_name));

                    authApi.defaults.headers.common["Authorization"] = "Bearer" + res.data.access_token;

                    dispatch({type: FETCH_SUCCESS});
                    dispatch({type: USER_TOKEN_SET, payload: res.data.access_token});
                    callback(res.status);
                } else {
                    callback(res.status);
                }
            })
            .catch(function (error) {
                dispatch({type: FETCH_ERROR, payload: error});
                console.log("Error****:", error);
                callback(404);
            });
    };
};

