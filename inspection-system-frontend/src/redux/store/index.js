import {combineReducers, configureStore} from '@reduxjs/toolkit'
import Auth from "../reducers/Auth";
import Common from "../reducers/Common";

export default configureStore({
    reducer: combineReducers({
        auth: Auth,
        common: Common,
    }),
})