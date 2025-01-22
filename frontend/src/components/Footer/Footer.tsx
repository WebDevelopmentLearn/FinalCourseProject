import {Link} from "react-router-dom";
import styles from "./Footer.module.scss";

export const Footer = () => {

    const currentYear: number = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footer_links}>
                <Link to="/">
                    Home
                </Link>

                <Link to="">
                    Search
                </Link>

                <Link to="/explore">
                    Explore
                </Link>

                <Link to="/messages">
                    Messages
                </Link>

                <Link to="">
                    Notifications
                </Link>

                <Link to="">
                    Create
                </Link>
            </div>

            <div>
                <p>© {currentYear} ICHgram</p>
            </div>
        </footer>
    );
};