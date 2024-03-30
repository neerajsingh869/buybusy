import { Navigate } from "react-router-dom";
// import { useUserAuthContextValue } from "../../contexts/userAuthContext";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/userReducer";

const PrivateRoute = ({ children }) => {
    // const { isSignedIn } = useUserAuthContextValue();
    const { userUid } = useSelector(userSelector);

    if (!userUid) return <Navigate to="/" replace={ true } />;

    return (
        children
    )
};

export default PrivateRoute;