import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from "framer-motion";

import { animate } from "../../utils/motionAnimation";

import styles from "./Navbar.module.scss";
import Container from "../container/Container";

// Links data
const links = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Movies",
        path: "/movies",
    },
    {
        name: "Tv Shows",
        path: "/tvshows",
    },
];

// Animations
const hideMenu = {
    visible: {
        y: "0",
    },
    hidden: {
        y: "-100%",
    },
};

const animateMenu = {
    initial: {
        x: "100%",
        opacity: 0,
    },
    animate: {
        x: "0",
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
        },
    },
    exit: {
        x: "100%",
        opacity: 0,
        transition: {
            duration: 0.8,
            ease: [0.5, 1, 0.89, 1],
        },
    },
};

const animateLinks = {
    initial: {
        x: "50px",
        opacity: 0,
    },
    animate: i => ({
        x: 0,
        opacity: 1,
        transition: {
            delay: i * 0.3,
            duration: 0.3,
            ease: [0, 0.55, 0.45, 1],
        },
    }),
};

function Navbar({ handleSearchBar }) {
    // Hooks
    const [menuIsOpened, setMenuIsOpened] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", latest => {
        const previous = scrollY.getPrevious();

        if (latest > previous && latest > 150) {
            handleIsHidden(true);
            setMenuIsOpened(false);
        } else handleIsHidden(false);
    });

    // functions
    function handleOpenMenu() {
        setMenuIsOpened(prev => !prev);
    }
    function handleIsHidden(bool) {
        setIsHidden(bool);
    }

    return (
        <motion.nav
            className={styles.nav}
            variants={hideMenu}
            animate={isHidden ? "hidden" : "visible"}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
        >
            <Container>
                <div className={styles.nav__wrapper}>
                    <h1 className={styles.nav__logo}>MovieSpot</h1>

                    <ul className={styles.nav__linkList}>
                        {links.map((link, i) => (
                            <li className={styles.nav__linkItem} key={i}>
                                <NavLink
                                    className={styles.nav__link}
                                    to={link.path}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <ul className={styles.nav__paramsList}>
                        <li
                            className={styles.nav__paramsItem}
                            onClick={() => handleSearchBar(true)}
                        >
                            <i className="ri-search-line"></i>
                        </li>
                        {/* <li className={styles.nav__paramsItem}>
                            <i className="ri-heart-line"></i>
                        </li> */}
                    </ul>

                    {/* Small devices */}
                    <div className={styles.nav__menu} onClick={handleOpenMenu}>
                        <i className="ri-menu-line"></i>
                    </div>
                    <AnimatePresence mode="wait">
                        {menuIsOpened && (
                            <>
                                <motion.div
                                    className={styles.nav__menu__listsContainer}
                                    {...animate(animateMenu)}
                                >
                                    <div
                                        className={styles.nav__menu__closeMenu}
                                        onClick={handleOpenMenu}
                                    >
                                        <i className="ri-close-line"></i>
                                    </div>

                                    <h3 className={styles.nav__menu__heading}>
                                        Menu
                                    </h3>

                                    <motion.ul
                                        className={styles.nav__menu__linkList}
                                        animate={{
                                            transition: {
                                                staggerChildren: 2,
                                            },
                                        }}
                                    >
                                        {links.map((link, i) => (
                                            <motion.li
                                                className={
                                                    styles.nav__menu__linkItem
                                                }
                                                key={i}
                                                {...animate(
                                                    animateLinks,
                                                    i + 1
                                                )}
                                                onClick={handleOpenMenu}
                                            >
                                                <NavLink
                                                    className={
                                                        styles.nav__menu__link
                                                    }
                                                    to={link.path}
                                                >
                                                    {link.name}
                                                </NavLink>
                                            </motion.li>
                                        ))}
                                    </motion.ul>

                                    <h3 className={styles.nav__menu__heading}>
                                        Options
                                    </h3>
                                    <ul
                                        className={styles.nav__menu__paramsList}
                                    >
                                        <li
                                            className={
                                                styles.nav__menu__paramsItem
                                            }
                                            onClick={() => {
                                                handleSearchBar(true);
                                                handleOpenMenu();
                                            }}
                                        >
                                            <span>
                                                <i className="ri-search-line"></i>
                                            </span>
                                            Search
                                        </li>
                                        {/* <li
                                            className={
                                                styles.nav__menu__paramsItem
                                            }
                                        >
                                            <span>
                                                <i className="ri-heart-line"></i>
                                            </span>
                                            Favorite
                                        </li> */}
                                    </ul>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </Container>
        </motion.nav>
    );
}

export default Navbar;
