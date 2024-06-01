import { useState } from "react";
import StarItem from "../star-item/StarItem";
import styles from "./StarList.module.scss";

function StarList({ starNum = 5, maxNumRating, setMaxNumRating }) {
    const [numRating, setNumRating] = useState(0);

    return (
        <div className={styles.star__list}>
            {Array.from({ length: starNum }, (v, i) => (
                <StarItem
                    key={i}
                    color="#fbfbfc"
                    index={i + 1}
                    handleHover={setNumRating}
                    handleClick={() => setMaxNumRating(i + 1)}
                    numRating={numRating}
                    maxNumRating={maxNumRating}
                />
            ))}
        </div>
    );
}

export default StarList;
