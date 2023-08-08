import {Navigate, Outlet} from "react-router-dom";

const AuthLayout = ({token}) => {
    if (token !== null) {
        return <Outlet/>; // or loading indicator, etc...
    }
    return <Navigate
        to={{
            pathname: "/auth/signin",
        }} replace
    />;
};

export default AuthLayout;