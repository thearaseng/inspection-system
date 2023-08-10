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

export const getUsers = (
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
                `api/admin/users?page=${page}&size=${pageSize}`,
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

export const getAvailableInspector = (
    {page},
    callback = (code, response) => {}
) => {
    // console.log(page, page_size);
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        const token = Cookies.get("token");
        dispatch({type: FETCH_START});
        api
            .get(
                `api/manager/available-inspectors?page=${page}`,
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

export const getHireInspector = (
    {page},
    callback = (code, response) => {}
) => {
    // console.log(page, page_size);
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        const token = Cookies.get("token");
        dispatch({type: FETCH_START});
        api
            .get(
                `api/manager/inspectors?page=${page}`,
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

export const hireInspector = (
    domainInfo,
    callback = (code, response) => {}
) => {
    // console.log(page, page_size);
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        const token = Cookies.get("token");
        dispatch({type: FETCH_START});
        api
            .post(
                `api/manager/inspectors`,
                {
                    inspectorId: domainInfo[0].value,
                },
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

export const fireInspector = (
    id,
    callback = (code, response) => {}
) => {
    // console.log(page, page_size);
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        const token = Cookies.get("token");
        dispatch({type: FETCH_START});
        api
            .delete(
                `api/manager/inspectors`,
                {
                    headers:  {
                        Authorization: `Bearer ${token}`,
                    },
                    data: {
                        inspectorId: id
                    }
                })
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
