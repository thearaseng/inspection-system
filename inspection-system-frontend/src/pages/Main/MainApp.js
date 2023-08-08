import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Routes, useResolvedPath} from "react-router-dom";
import {useSelector} from "react-redux";
import Login from "../Login/Login";
import Home from "../Home/Home";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import {memo} from "react";

function MainApp() {
    const {token} = useSelector(({auth}) => auth);

    const match = useResolvedPath("");

    return (
        <Routes>
            <Route path="auth/signin" element={<Login/>}/>
            <Route element={<AuthLayout token={token}/>}>
                <Route path={match.pathname}
                       token={token}
                       element={<Home/>}/>
            </Route>
        </Routes>

    );
}

export default memo(MainApp);
