import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AccessDenied from "../AccessDenied/AccessDenied";

const PrivateRoute = ({
                          children,
                          roles,
                      }) => {
    const {token, role} = useSelector(({auth}) => auth);


    if (token == null) {
        return <Navigate to="/auth/signin" />;
    }

    const arrayRole = JSON.parse(role);
    let userHasRequiredRole = false;
    for (const element of arrayRole) {
        if (roles.includes(element)) {
            userHasRequiredRole = true;
        }
    }

    if (!userHasRequiredRole) {
        return <AccessDenied />; // build your own access denied page (something like 404)
    }

    return children;
};

export default PrivateRoute;