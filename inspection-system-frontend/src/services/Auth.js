import {api, authApi} from "../util/Api";
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, INIT_URL, USER_TOKEN_SET} from "../constants/ActionTypes";

export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url,
    };
};

export const userSignIn = (
    {username, password},
    callback = (response) => {
    }
) => {
    console.log("userSignIn: ", username, password);
    return (dispatch) => {
        dispatch({type: FETCH_START});
        authApi
            .post(
                "oauth/token",
                {
                    grand_type: "password",
                    username: username,
                    password: password,
                }
            )
            .then((res) => {
                console.log("userSignIn: ", res);
                if (res.status === 200) {
                    // if (Cookies.get("token") != null || Cookies.get("role") != null) {
                    //     Cookies.remove("token");
                    //     Cookies.remove("role");
                    // }
                    //
                    // var decoded_token = jwt.decode(res.data.access_token);
                    // Cookies.set("token", res.data.access_token);
                    // Cookies.set("role", decoded_token.user.role);
                    // Cookies.set("userId", decoded_token.user.id);
                    //
                    // axios.defaults.headers.common["x-auth-token"] = res.data.token;
                    //
                    // dispatch({type: FETCH_SUCCESS});
                    // dispatch({type: USER_TOKEN_SET, payload: res.data.token});
                    // if (typeof callback === "function") {
                    //     callback(res.status);
                    // }
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

