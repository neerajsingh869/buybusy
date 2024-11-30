import { NavLink, Outlet } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { userActions } from "../../redux/reducers/userReducer";
import { showNotification } from "../../utility/showNotifications";
import MobileNavbar from "./MobileNavbar";
import MenuItems from "./MenuItems";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Handle adding/removing the `overflow-hidden` class to the body
  useEffect(() => {
    if (isSidebarVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup when the component unmounts
    return () => document.body.classList.remove("overflow-hidden");
  }, [isSidebarVisible]);

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
            Buy Busy
          </NavLink>
          <ul className="lg:flex gap-8 lg:gap-12 hidden">
            <MenuItems
              setIsSidebarVisible={setIsSidebarVisible}
              signOutUser={signOutUser}
            />
          </ul>
          <Menu
            className="lg:hidden cursor-pointer"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          />
        </nav>
      </header>
      {isSidebarVisible && (
        <MobileNavbar
          setIsSidebarVisible={setIsSidebarVisible}
          signOutUser={signOutUser}
        />
      )}
      <Outlet />
    </>
  );
};

export default Navbar;
