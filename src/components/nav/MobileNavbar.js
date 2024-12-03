import { X } from "lucide-react";
import MenuItems from "./MenuItems";

const MobileNavbar = ({ setIsSidebarVisible, signOutUser }) => {
  return (
    <div>
      <div
        className="fixed inset-0 z-50 bg-black/80"
        onClick={() => setIsSidebarVisible(false)}
      ></div>
      <div
        className="h-[100vh] w-[280px] bg-white fixed right-0 top-0 z-50 p-6 shadow-lg
  animate-slide-in-left dark:bg-neutral-800 dark:text-white
  "
      >
        <X
          className="absolute right-2 top-2 cursor-pointer"
          size={20}
          onClick={() => setIsSidebarVisible(false)}
        />
        <h1 className="text-lg font-semibold dark:text-white">Welcome to Buy Busy!</h1>
        <div className="border border-slate-200 dark:border-white my-4"></div>
        <ul className="flex flex-col gap-4 mx-auto">
          <MenuItems
            setIsSidebarVisible={setIsSidebarVisible}
            signOutUser={signOutUser}
          />
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
