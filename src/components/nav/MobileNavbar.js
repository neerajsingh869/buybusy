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
  animate-slide-in-left
  "
      >
        <X
          className="absolute right-2 top-2 cursor-pointer"
          size={20}
          onClick={() => setIsSidebarVisible(false)}
        />
        <h1 className="text-lg font-semibold">Welcome to Buy Busy!</h1>
        <div className="border border-slate-200 my-4"></div>
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
