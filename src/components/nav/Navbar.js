import { Outlet } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <h2>Navbar Page</h2>
            <Outlet />
        </>
    )
};

export default Navbar;