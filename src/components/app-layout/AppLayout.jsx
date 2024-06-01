import { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Loader from "../../loader/Loader";
import SearchBar from "../search-bar/SearchBar";
import { AnimatePresence } from "framer-motion";

function AppLayout() {
    // Hooks
    const navigation = useNavigation();
    const [searchBarIsOpened, setSearchBarIsOpened] = useState(false);
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

    // Functions
    function handleSearchBar(bool) {
        setSearchBarIsOpened(bool);
    }

    return (
        <>
            <Navbar handleSearchBar={handleSearchBar} />

            {navigation.state === "loading" || !hasPainted ? (
                <Loader />
            ) : (
                <>
                    <AnimatePresence mode="wait">
                        {searchBarIsOpened && (
                            <SearchBar handleSearchBar={handleSearchBar} />
                        )}
                    </AnimatePresence>
                    <Outlet />
                    <Footer />
                </>
            )}
        </>
    );
}

export default AppLayout;
