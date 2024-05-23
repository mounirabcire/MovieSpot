import { useState } from "react";
import TrendingAll from "../../features/movie-categories/trending-all/TrendingAll";
import styles from "./Home.module.scss";

function Home() {
    const [activeTrend, setActiveTrend] = useState(0);
    return (
        <>
            <header className={styles.header}>
                <TrendingAll activeTrend={activeTrend} />
                <button
                    onClick={() => {
                        setActiveTrend(prev => (prev === 4 ? 0 : prev + 1));
                    }}
                >
                    cli
                </button>
            </header>
        </>
    );
}

export default Home;
