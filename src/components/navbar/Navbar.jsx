import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import Container from "../container/Container";

function Navbar() {
    return (
        <nav className={styles.nav}>
            <Container>
                <div className={styles.nav__wrapper}>
                    <h1 className={styles.nav__logo}>MovieSpot</h1>

                    <ul className={styles.nav__linkList}>
                        <li className={styles.nav__linkItem}>
                            <NavLink className={styles.nav__link} to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className={styles.nav__linkItem}>
                            <NavLink className={styles.nav__link} to="/movies">
                                Movies
                            </NavLink>
                        </li>
                        <li className={styles.nav__linkItem}>
                            <NavLink className={styles.nav__link} to="/tvshows">
                                Tv Shows
                            </NavLink>
                        </li>
                        <li className={styles.nav__linkItem}>
                            <NavLink className={styles.nav__link} to="/kids">
                                Kids
                            </NavLink>
                        </li>
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
                </div>
            </Container>
        </nav>
    );
}

export default Navbar;
