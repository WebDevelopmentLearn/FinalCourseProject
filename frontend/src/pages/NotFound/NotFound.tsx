import styles from "./NotFound.module.scss";
import {Phone} from "../../components";

export const NotFound = () => {
    return (
        <div className={styles.not_found}>
            <div className={styles.phone_container}>
                <Phone />
            </div>
            <div className={styles.not_found_container__text}>
                <h1>Oops! Page Not Found (404 Error)</h1>
                <h2>We're sorry, but the page you're looking for doesn't seem to exist.
                    If you typed the URL manually, please double-check the spelling.
                    If you clicked on a link, it may be outdated or broken.</h2>
            </div>
        </div>
    );
};