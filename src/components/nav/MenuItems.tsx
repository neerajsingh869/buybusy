import { NavLink } from "react-router-dom";

import cartImage from "../../assets/cart.png";
import homeImage from "../../assets/home.png";
import logoutImage from "../../assets/logout.png";
import ordersImage from "../../assets/orders.png";
import signinImage from "../../assets/signin.png";
import { userSelector } from "../../redux/reducers/userReducer";
import { useAppSelector } from "../../hook";

type Props = {
  setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  signOutUser: () => Promise<void>;
}

const MenuItems = ({ setIsSidebarVisible, signOutUser }: Props) => {
  const { userUid } = useAppSelector(userSelector);

  return (
    <>
      <li>
        <NavLink
          className="text-lg flex items-center text-violet-600 dark:text-violet-400 font-semibold"
          to="/"
          onClick={() => setIsSidebarVisible(false)}
        >
          <img className="mx-2 w-9 h-9" src={homeImage} alt="Home" />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="text-lg flex items-center text-violet-600 dark:text-violet-400 font-semibold"
          to="/myorders"
          onClick={() => setIsSidebarVisible(false)}
        >
          <img className="mx-2 w-9 h-9" src={ordersImage} alt="Orders" />
          Orders
        </NavLink>
      </li>
      <li>
        <NavLink
          className="text-lg flex items-center text-violet-600 dark:text-violet-400 font-semibold"
          to="/cart"
          onClick={() => setIsSidebarVisible(false)}
        >
          <img className="mx-2 w-9 h-9" src={cartImage} alt="Cart" />
          Cart
        </NavLink>
      </li>
      {userUid ? (
        <>
          <li
            onClick={() => {
              signOutUser();
            }}
          >
            <NavLink
              className="text-lg flex items-center text-violet-600 dark:text-violet-400 font-semibold"
              to="/"
              onClick={() => setIsSidebarVisible(false)}
            >
              <img className="mx-2 w-9 h-9" src={logoutImage} alt="Logout" />
              Sign Out
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              className="text-lg flex items-center text-violet-600 dark:text-violet-400 font-semibold"
              to="/signin"
              onClick={() => setIsSidebarVisible(false)}
            >
              <img className="mx-2 w-9 h-9" src={signinImage} alt="Sign In" />
              Sign In
            </NavLink>
          </li>
        </>
      )}
    </>
  );
};

export default MenuItems;
