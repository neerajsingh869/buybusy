import { NavLink, Outlet } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { userActions } from "../redux/slices/userSlice";
import { showNotification } from "../utility/showNotifications";
import MobileNavbar from "./MobileNavbar";
import MenuItems from "./MenuItems";
import { useAppDispatch } from "../hook";
import { Theme } from "../types";
import { getValidTheme } from "../utility/getValidTheme";
import { LIGHT_THEME, THEME_NAME } from "../constants";
import { ThemeContext } from "../contexts/themeContext";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const [theme, setTheme] = useState<Theme>(
    getValidTheme(localStorage.getItem(THEME_NAME)) || LIGHT_THEME
  );

  useEffect(() => {
    const updateTheme = (theme: string) => {
      localStorage.setItem(THEME_NAME, theme);

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

      showNotification("User signed out successfully!", "success", theme);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showNotification(err.message, "error", theme);
      } else {
        showNotification("An unknown error occurred.", "error", theme);
      }
    } finally {
      dispatch(userActions.updateUserUid(null));
    }
  };

  return (
    <div className="dark:bg-neutral-950 min-h-[100vh] flex flex-col">
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
      <ThemeContext.Provider value={theme}>
        <Outlet />
      </ThemeContext.Provider>
    </div>
  );
};

export default Navbar;
