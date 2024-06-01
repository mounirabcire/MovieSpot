import { useState } from "react";
import StarItem from "../star-item/StarItem";
import styles from "./StarList.module.scss";

function StarList({ starNum = 5 }) {
    const [numRating, setNumRating] = useState(null);
    const [maxNumRating, setMaxNumRating] = useState(null);

    function handleHover(num) {
        setNumRating(num);
    }

    function handleClick(num) {
        setMaxNumRating(num);
    }

    return (
        <div className={styles.start__list}>
            {Array.from({ length: starNum }, (v, i) => (
                <StarItem
                    key={i}
                    color="#fbfbfc"
                    index={i}
                    handleHover={handleHover}
                    handleClick={handleClick}
                    numRating={numRating}
                    maxNumRating={maxNumRating}
                />
            ))}
        </div>
    );
}

export default StarList;
