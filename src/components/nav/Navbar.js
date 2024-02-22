import { Outlet, useNavigate } from "react-router-dom";
import { useUserAuthContextValue } from "../../contexts/userAuthContext";

const Navbar = () => {
    const { isSignedIn, setIsSignedIn } = useUserAuthContextValue();
    const navigate = useNavigate();

    return (
        <>
            <h2>Navbar Page</h2>
            <ul>
                <li>BuyBusy</li>
                <li>Home</li>
                { isSignedIn ? (
                    <>
                        <li>My Orders</li>
                        <li>Cart</li>
                        <li onClick={ () => {
                            navigate("/");
                            setIsSignedIn(false);
                        } }>Logout</li>
                    </>
                ) : (
                    <>
                        <li>Signin</li>
                    </>
                ) }
            </ul>
            <Outlet />
        </>
    )
};

export default Navbar;