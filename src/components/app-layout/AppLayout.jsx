import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Loader from "../../loader/Loader";

function AppLayout() {
    const navigation = useNavigation();

    return (
        <>
            <Navbar />
            {navigation.state === "loading" ? (
                <Loader />
            ) : (
                <>
                    <Outlet />
                    <Footer />
                </>
            )}
        </>
    );
}

export default AppLayout;
