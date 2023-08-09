import Cookies from 'js-cookie';
import {INIT_URL, SIGN_OUT_USER_SUCCESS, USER_DATA, USER_ROLE_SET, USER_TOKEN_SET} from "../../constants/ActionTypes";

const INIT_STATE = {
    token: Cookies.get("token") != null ? Cookies.get("token") : null,
    initURL: "",
    authUser: Cookies.get("user") != null ? Cookies.get("user") : null,
    role: Cookies.get("role") != null ? Cookies.get("role") : null,
};
const authReducer =  (state = INIT_STATE, action) => {
    switch (action.type) {
        case INIT_URL: {
            return { ...state, initURL: action.payload };
        }

        case SIGN_OUT_USER_SUCCESS: {
            return {
                ...state,
                token: null,
                authUser: null,
                initURL: "",
            };
        }

        case USER_DATA: {
            return {
                ...state,
                authUser: action.payload,
            };
        }

        case USER_TOKEN_SET: {
            console.log("token: " + action.payload);
            return {
                ...state,
                token: action.payload,
            };
        }

        case USER_ROLE_SET: {
            console.log("token: " + action.payload);
            return {
                ...state,
                role: action.payload,
            };
        }

        default:
            return state;
    }
};

export default authReducer;