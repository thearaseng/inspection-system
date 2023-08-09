import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../constants/ActionTypes";
import {api} from "../util/Api";
import Cookies from "js-cookie";

export const createUser = (
        domainInfo,
    callback = (res) => {
    }
) => {
    return (dispatch) => {
        console.log("domain: "+domainInfo);
        const token = Cookies.get("token");
        dispatch({type: FETCH_START});
        api
            .post(
                "api/admin/users",
                {
                    email: domainInfo[0].value,
                    firstName: domainInfo[1].value,
                    lastName: domainInfo[2].value,
                    password: domainInfo[3].value,
                    authorities: domainInfo[6].value,
                    phone: domainInfo[5].value,
                    location: domainInfo[7].value,
                },{headers:  {
            Authorization: `Bearer ${token}`,
        },}
            )
            .then((res) => {
                dispatch({type: FETCH_SUCCESS});
                console.log(res);
                if (res.status === 200) {
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