import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../constants/ActionTypes";
import Cookies from "js-cookie";
import {api} from "../util/Api";

export const getTasks = (
    {page, pageSize},
    callback = (code, response) => {}
) => {
    // console.log(page, page_size);
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        const token = Cookies.get("token");
        dispatch({type: FETCH_START});
        api
            .get(
                `api/admin/tasks?page=${page}&size=${pageSize}`,
                {headers:  {
                        Authorization: `Bearer ${token}`,
                    },})

            .then((res) => {
                if (res.status === 200) {
                    callback(res.status, res.data.data);
                } else callback(404);
            })
            .catch(function (error) {
                dispatch({type: FETCH_ERROR, payload: error});
                console.log("Error****:", error);
                callback(404);
            });
    };
};

export const getTasksByManager = (
    {page, pageSize},
    callback = (code, response) => {}
) => {
    // console.log(page, page_size);
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        const token = Cookies.get("token");
        dispatch({type: FETCH_START});
        api
            .get(
                `api/manager/tasks?page=${page}&size=${pageSize}`,
                {headers:  {
                        Authorization: `Bearer ${token}`,
                    },})

            .then((res) => {
                if (res.status === 200) {
                    callback(res.status, res.data.data);
                } else callback(404);
            })
            .catch(function (error) {
                dispatch({type: FETCH_ERROR, payload: error});
                console.log("Error****:", error);
                callback(404);
            });
    };
};

export const createTask = (
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
                "api/manager/tasks",
                {
                    inspectorId: domainInfo[0].value,
                    formType: domainInfo[1].value,
                    dueDate: domainInfo[2].value.unix(),
                    title: domainInfo[4].value,
                    location: domainInfo[3].value,

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
