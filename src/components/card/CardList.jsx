import CardItem from "./CardItem";
import styles from "./Card.module.scss";

function CardList({ arrayData, maxRowData = 6, page, isFavpage = false }) {
    return (
        <div className={styles.cardsContainer}>
            {arrayData.slice(0, maxRowData).map((data, i) => (
                <CardItem key={i} data={data} page={page} isFavpage={isFavpage} />
            ))}
        </div>
    );
}

export default CardList;
