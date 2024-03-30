import { NavLink, Outlet } from "react-router-dom";
// import { useUserAuthContextValue } from "../../contexts/userAuthContext";
import styles from "./Navbar.module.css";
import cartImage from "../../assets/cart.png";
import homeImage from "../../assets/home.png";
import logoutImage from "../../assets/logout.png";
import ordersImage from "../../assets/orders.png";
import signinImage from "../../assets/signin.png";
import { useDispatch, useSelector } from "react-redux";
import { userActions, userSelector } from "../../redux/reducers/userReducer";
import toast from "react-hot-toast";
import { signOut, getAuth } from "firebase/auth";

const Navbar = () => {
    // const { isSignedIn, signOutUser } = useUserAuthContextValue();
    const { userUid } = useSelector(userSelector);
    const dispatch = useDispatch();

    const auth = getAuth();

    const signOutUser = async () => {
        try {
            await signOut(auth);

            toast.success('User signed out successfully!', {
                duration: 2000,
                style: {
                    minWidth: "18rem",
                    minHeight: "3.5rem",
                    marginTo: "2rem"
                }
            });
        } catch (err) {
            toast.error(err.message, {
                duration: 2000,
                style: {
                    minWidth: "18rem",
                    minHeight: "3.5rem",
                    marginTo: "2rem"
                }
            });
            
        } finally {
            // setIsSignedIn(false);
            // dispatch(userActions.changeSignedInStatus(false));
            dispatch(userActions.updateUserUid(null));
        }
    }

    return (
        <>
            <header>
                <nav>
                    <NavLink className={ styles.navHome } to="/">Busy Buy</NavLink>
                    <ul className={ styles.navItemsContainer }>
                        <li className={ styles.navItem }>
                            <NavLink className={ styles.navLink } to="/">
                                <img src={ homeImage } alt="Home" />
                                Home
                            </NavLink>
                        </li>
                        { userUid ? (
                            <>
                                <li className={ styles.navItem }>
                                    <NavLink className={ styles.navLink } to="/myorders">
                                        <img src={ ordersImage } alt="Orders" />
                                        My Orders
                                    </NavLink>
                                </li>
                                <li className={ styles.navItem }>
                                    <NavLink className={ styles.navLink } to="/cart">
                                        <img src={ cartImage } alt="Cart" />
                                        Cart
                                    </NavLink>
                                </li>
                                <li className={ styles.navItem } onClick={ () => {
                                    signOutUser();
                                } }>
                                    <NavLink className={ styles.navLink } to="/">
                                        <img src={ logoutImage } alt="Logout" />
                                        Logout
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className={ styles.navItem }>
                                    <NavLink className={ styles.navLink } to="/signin">
                                        <img src={ signinImage } alt="Sign In" />
                                        SignIn
                                    </NavLink>
                                </li>
                            </>
                        ) }
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    )
};

export default Navbar;