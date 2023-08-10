import Cookies from "js-cookie";
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../constants/ActionTypes";
import {api} from "../util/Api";

export const createForm = (
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
                "api/inspector/forms",
                {
                    taskId: domainInfo[0].value,
                    formType: domainInfo[1].value,
                    numberOfRoom: domainInfo[2].value,

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