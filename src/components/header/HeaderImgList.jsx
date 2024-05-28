import HeaderImgItem from './HeaderImgItem';
import styles from './Header.module.scss'

function HeaderImgList({data, activeData}) {
    return (
        <div className={styles.header__imgsContainer}>
            {data.map(t => (
                        <HeaderImgItem
                            key={t.id}
                            trend={t}
                            currentData={activeData}
                        />
                    ))}
        </div>
    );
}

export default HeaderImgList;
