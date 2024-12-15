import {FC, useState} from "react";
import styles from "./SignInForm.module.scss";
import {CustomButton} from "../CustomButton/CustomButton.tsx";
import {Link} from "react-router-dom";
import ichgramLogo from "../../assets/logo.svg";
import {CustomInput} from "../CustomInput/CustomInput.tsx";

export const SignInForm: FC = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className={styles.sign_in_form_container}>
            <img src={ichgramLogo} alt="logo"/>
            <form name="sign_in_form" action="" className={styles.sign_in_form}>
                {/*<input type="text" placeholder="Username, or email" value={usernameOrEmail} onChange={(event) => {*/}
                {/*    setUsernameOrEmail(event.target.value);*/}
                {/*}}/>*/}
                {/*<input type="text" placeholder="Password" value={password} onChange={(event) => {*/}
                {/*    setPassword(event.target.value);*/}
                {/*}}/>*/}
                <CustomInput placeholder="Username, or email" type="text" value={usernameOrEmail} onChange={(event) => {
                    setUsernameOrEmail(event.target.value);
                }} />
                <CustomInput placeholder="Password" type="password" value={password} onChange={(event) => {
                    setPassword(event.target.value);
                }} />
                <CustomButton className={styles.sign_in_button} type="submit" title={"Log in"}/>
                <div className={styles.separator}>
                    <hr/>
                    <span>OR</span>
                    <hr/>
                </div>

                <div className={styles.sign_in_form_forgot_password}>
                    <Link to="/">Forgot password?</Link>
                </div>
            </form>
        </div>
    );
};