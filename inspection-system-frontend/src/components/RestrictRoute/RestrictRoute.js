import {Navigate, Route} from "react-router-dom";

const RestrictedRoute = ({
                             component: Component,
                             token,
                             ...rest
                         }) => (
    <Route
        {...rest}
        render={(props) =>
            token ? (
                    <Component {...props} />
                ) :
                <Navigate
                    to={{
                        pathname: "/auth/signin",
                    }} replace
                />
        }
    />
);