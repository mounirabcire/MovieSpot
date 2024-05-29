import { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Loader from "../../loader/Loader";

function AppLayout() {
    // Hooks
    const navigation = useNavigation();
    // Keep track of wether the borowser has painted or not
    const [hasPainted, setHasPainted] = useState();

    useEffect(() => {
        // Request animation frame to check if the browser has painted
        const rafId = requestAnimationFrame(() => {
            setHasPainted(true);
        });

        // Clean up the requestAnimationFrame callback
        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <>
            <Navbar />
            {navigation.state === "loading" || !hasPainted ? (
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
