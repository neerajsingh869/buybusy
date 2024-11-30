import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import cartImage from "../../assets/cart.png";
import homeImage from "../../assets/home.png";
import logoutImage from "../../assets/logout.png";
import ordersImage from "../../assets/orders.png";
import signinImage from "../../assets/signin.png";
import { userSelector } from "../../redux/reducers/userReducer";

const MenuItems = ({ setIsSidebarVisible, signOutUser }) => {
  const { userUid } = useSelector(userSelector);

  return (
    <>
      <li>
        <NavLink
          className="text-lg flex items-center text-violet-600 font-semibold"
          to="/"
          onClick={() => setIsSidebarVisible(false)}
        >
          <img className="mx-2 w-9 h-9" src={homeImage} alt="Home" />
          Home
        </NavLink>
      </li>
      {userUid ? (
        <>
          <li>
            <NavLink
              className="text-lg flex items-center text-violet-600 font-semibold"
              to="/myorders"
              onClick={() => setIsSidebarVisible(false)}
            >
              <img className="mx-2 w-9 h-9" src={ordersImage} alt="Orders" />
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-lg flex items-center text-violet-600 font-semibold"
              to="/cart"
              onClick={() => setIsSidebarVisible(false)}
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
              className="text-lg flex items-center text-violet-600 font-semibold"
              to="/"
              onClick={() => setIsSidebarVisible(false)}
            >
              <img className="mx-2 w-9 h-9" src={logoutImage} alt="Logout" />
              Logout
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              className="text-lg flex items-center text-violet-600 font-semibold"
              to="/signin"
              onClick={() => setIsSidebarVisible(false)}
            >
              <img className="mx-2 w-9 h-9" src={signinImage} alt="Sign In" />
              SignIn
            </NavLink>
          </li>
        </>
      )}
    </>
  );
};

export default MenuItems;
