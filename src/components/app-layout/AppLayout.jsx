import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

function AppLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default AppLayout;
