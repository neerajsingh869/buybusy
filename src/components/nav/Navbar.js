import { NavLink, Outlet } from "react-router-dom";
import { useUserAuthContextValue } from "../../contexts/userAuthContext";
import styles from "./Navbar.module.css";
import cartImage from "../../assets/cart.png";
import homeImage from "../../assets/home.png";
import logoutImage from "../../assets/logout.png";
import ordersImage from "../../assets/orders.png";
import signinImage from "../../assets/signin.png";

const Navbar = () => {
    const { isSignedIn, setIsSignedIn } = useUserAuthContextValue();

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
                        { isSignedIn ? (
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
                                    setIsSignedIn(false);
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