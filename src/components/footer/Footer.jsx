import Button from "../button/Button";
import Container from "../container/Container";
import Reveal from "../reveal/Reveal";
import styles from "./Footer.module.scss";

function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                {/* <Reveal> */}
                    <h2 className={styles.footer__heading}>
                        Subscibe to Our Newsletter
                    </h2>
                {/* </Reveal> */}
                {/* <Reveal> */}
                    <h5 className={styles.footer__subHeading}>
                        Stay tuned for exclusive movies Deals and exciting
                        offers!
                    </h5>
                {/* </Reveal> */}
                <div className={styles.footer__form}>
                    <input
                        className={styles.footer__input}
                        type="text"
                        placeholder="Your email address..."
                    />
                    <Button style={{position: 'absolute', top: 0, right: 0, borderRadius: '0 5px 5px 0', border: '1px solid'}}>Sign up</Button>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
