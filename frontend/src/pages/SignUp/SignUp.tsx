import {SignUpForm} from "../../components";
import styles from "./SignUp.module.scss";
import {Link} from "react-router-dom";
// import ichgramLogo from "../../assets/logo.svg";

export const SignUp = () => {
    return (
        <div className={styles.signup_page}>
            {/*<div className={styles.signup_header}>*/}
            {/*    <img src={ichgramLogo} alt="logo"/>*/}
            {/*</div>*/}
            <div className={styles.signup}>
                <SignUpForm/>
                <div className={styles.have_account_container}>
                    <div className={styles.have_account}>
                        <span>
                            Have an account?
                        </span>
                        <Link to="/signin">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};