import {Link} from "react-router-dom";

import {Phone, SignInForm} from "../../components";
import styles from "./SignIn.module.scss";

export const SignIn = () => {

    return (
        <div className={styles.signin}>

            <Phone />

            <div className={styles.signin_form_container}>
                <SignInForm/>

                <div className={styles.dont_have_account_container}>
                    <div className={styles.dont_have_account}>
                        <span>
                            Don't have an account?
                        </span>
                        <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};