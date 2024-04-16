import { NavLink, Outlet } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import cartImage from "../../assets/cart.png";
import homeImage from "../../assets/home.png";
import logoutImage from "../../assets/logout.png";
import ordersImage from "../../assets/orders.png";
import signinImage from "../../assets/signin.png";
import { userActions, userSelector } from "../../redux/reducers/userReducer";
import { showNotification } from "../../utility/showNotifications";

const Navbar = () => {
  const { userUid } = useSelector(userSelector);
  const dispatch = useDispatch();

  const auth = getAuth();

  const signOutUser = async () => {
    try {
      await signOut(auth);

      showNotification("User signed out successfully!");
    } catch (err) {
      showNotification(err.message);
    } finally {
      dispatch(userActions.updateUserUid(null));
    }
  };

  return (
    <>
      <header className="w-full h-20 shadow-md">
        <nav className="flex items-center h-full justify-between px-4">
          <NavLink className="text-xl font-semibold" to="/">
            Busy Buy
          </NavLink>
          <ul className="flex gap-8 lg:gap-12">
            <li>
              <NavLink
                className="text-lg flex items-center text-violet-600 font-bold"
                to="/"
              >
                <img className="mx-2 w-9 h-9" src={homeImage} alt="Home" />
                Home
              </NavLink>
            </li>
            {userUid ? (
              <>
                <li>
                  <NavLink
                    className="text-lg flex items-center text-violet-600 font-bold"
                    to="/myorders"
                  >
                    <img
                      className="mx-2 w-9 h-9"
                      src={ordersImage}
                      alt="Orders"
                    />
                    My Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="text-lg flex items-center text-violet-600 font-bold"
                    to="/cart"
                  >
                    <img className="mx-2 w-9 h-9" src={cartImage} alt="Cart" />
                    Cart
                  </NavLink>
                </li>
                <li
                  onClick={() => {
                    signOutUser();
                  }}
                >
                  <NavLink
                    className="text-lg flex items-center text-violet-600 font-bold"
                    to="/"
                  >
                    <img
                      className="mx-2 w-9 h-9"
                      src={logoutImage}
                      alt="Logout"
                    />
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className="text-lg flex items-center text-violet-600 font-bold"
                    to="/signin"
                  >
                    <img className="mx-2 w-9 h-9" src={signinImage} alt="Sign In" />
                    SignIn
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
