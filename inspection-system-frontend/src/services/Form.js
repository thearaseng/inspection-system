import Cookies from "js-cookie";
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../constants/ActionTypes";
import {api} from "../util/Api";

export const createHotelForm = (
    domainInfo,
    submitted,
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
                    hotelName: domainInfo[3].value,
                    numberOfRooms: domainInfo[4].value,
                    numberOfEmployees: domainInfo[5].value,
                    cleanlinessScore: domainInfo[6].value,
                    fireSafetyCompliance: domainInfo[7].value,
                    roomServiceQuality: domainInfo[8].value,
                    summited: submitted
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

export const createRestaurantForm = (
    domainInfo,
    submitted,
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
                    restaurantName: domainInfo[2].value,
                    seatingCapacity: domainInfo[3].value,
                    kitchenHygiene: domainInfo[4].value,
                    foodSafetyCompliance: domainInfo[5].value,
                    serviceQuality: domainInfo[6].value,
                    customerSatisfaction: domainInfo[7].value,
                    healthInspectionScore: domainInfo[8].value,
                    summited: submitted
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