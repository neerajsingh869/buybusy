import { Navigate } from "react-router-dom";
import { useUserAuthContextValue } from "../../contexts/userAuthContext";

const PrivateRoute = ({ children }) => {
    const { isSignedIn } = useUserAuthContextValue();

    if (!isSignedIn) return <Navigate to="/" replace={ true } />;

    return (
        children
    )
};

export default PrivateRoute;