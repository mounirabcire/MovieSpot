import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./Navbar.module.scss";
import Container from "../container/Container";
import { animate } from "../../utils/motionAnimation";

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
    {
        name: "Kids",
        path: "/kids",
    },
];

// Animations
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

function Navbar() {
    // Hooks
    const [menuIsOpened, setMenuIsOpened] = useState(false);

    // functions
    function handleOpenMenu() {
        setMenuIsOpened(prev => !prev);
    }

    return (
        <nav className={styles.nav}>
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
                        <li className={styles.nav__paramsItem}>
                            <i className="ri-search-line"></i>
                        </li>
                        <li className={styles.nav__paramsItem}>
                            <i className="ri-heart-line"></i>
                        </li>
                        <li className={styles.nav__paramsItem}>
                            <i className="ri-sun-line"></i>
                        </li>
                        <li className={styles.nav__paramsItem}>
                            <i className="ri-user-line"></i>
                        </li>
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

                                    {/* <ul className={styles.nav__menu__paramsList}>
                                    <li
                                        className={styles.nav__menu__paramsItem}
                                    >
                                        <i className="ri-search-line"></i>
                                    </li>
                                    <li
                                        className={styles.nav__menu__paramsItem}
                                    >
                                        <i className="ri-heart-line"></i>
                                    </li>
                                    <li
                                        className={styles.nav__menu__paramsItem}
                                    >
                                        <i className="ri-sun-line"></i>
                                    </li>
                                    <li
                                        className={styles.nav__menu__paramsItem}
                                    >
                                        <i className="ri-user-line"></i>
                                    </li>
                                </ul> */}
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </Container>
        </nav>
    );
}

export default Navbar;
