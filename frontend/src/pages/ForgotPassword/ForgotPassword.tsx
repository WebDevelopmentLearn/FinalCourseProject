import styles from "./ForgotPassword.module.scss";
import {ForgotPasswordForm} from "../../components";
import {Link} from "react-router-dom";

export const ForgotPassword = () => {
    return (
        <div className={styles.forgot_password}>
            <ForgotPasswordForm/>
            <div className={styles.forgot_password_back_to_login}>
                <Link to="/signin">Back to login</Link>
            </div>
        </div>
    );
};