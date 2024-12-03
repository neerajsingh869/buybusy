import { NavLink, Outlet } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { userActions } from "../../redux/reducers/userReducer";
import { showNotification } from "../../utility/showNotifications";
import MobileNavbar from "./MobileNavbar";
import MenuItems from "./MenuItems";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const updateTheme = (theme) => {
      localStorage.setItem("theme", theme);

      if (theme === "dark") {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    };

    updateTheme(theme);
  }, [theme]);

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
    <div className="dark:bg-neutral-950 min-h-[100vh]">
      <header className="w-full h-20 border-b-[2px] dark:border-b-black dark:bg-neutral-800">
        <nav className="flex items-center h-full justify-between px-4 dark:text-white">
          <NavLink className="text-xl font-semibold dark:text-white" to="/">
            Buy Busy
          </NavLink>
          <ul className="lg:flex gap-8 lg:gap-12 hidden">
            <MenuItems
              setIsSidebarVisible={setIsSidebarVisible}
              signOutUser={signOutUser}
            />
          </ul>
          {theme === "light" ? (
            <Sun className="cursor-pointer" onClick={() => setTheme("dark")} />
          ) : (
            <Moon
              className="cursor-pointer"
              color="white"
              onClick={() => setTheme("light")}
            />
          )}
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
    </div>
  );
};

export default Navbar;
