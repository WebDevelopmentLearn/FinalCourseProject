import styles from "./SignUpForm.module.scss";
import ichgramLogo from "../../assets/logo.svg";
import {CustomButton} from "../CustomButton/CustomButton.tsx";

import {FC, useState} from "react";
import {Link} from "react-router-dom";
import {CustomInput} from "../CustomInput/CustomInput.tsx";

export const SignUpForm: FC = () => {

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    return (
        <div className={styles.sign_up_form_container}>
            <img src={ichgramLogo} alt="logo"/>
            <h2>Sign up to see photos and videos from your friends.</h2>
            <form name="sign_up_form" action="" className={styles.sign_up_form}>
                {/*<input type="text" placeholder="Email" value={email} onChange={(event) => {*/}
                {/*    setEmail(event.target.value);*/}
                {/*}}/>*/}
                {/*<input type="text" placeholder="Full Name" value={fullName} onChange={(event) => {*/}
                {/*    setFullName(event.target.value);*/}
                {/*}}/>*/}
                {/*<input type="text" placeholder="Username" value={username} onChange={(event) => {*/}
                {/*    setUsername(event.target.value);*/}
                {/*}}/>*/}
                {/*<input type="text" placeholder="Password" value={password} onChange={(event) => {*/}
                {/*    setPassword(event.target.value);*/}
                {/*}}/>*/}

                <CustomInput placeholder="Email" type="email" value={email} onChange={(event) => {
                    setEmail(event.target.value);
                }} />
                <CustomInput placeholder="Full Name" type="text" value={fullName} onChange={(event) => {
                    setFullName(event.target.value);
                }} />

                <CustomInput placeholder="Username" type="text" value={username} onChange={(event) => {
                    setUsername(event.target.value);
                }} />
                <CustomInput placeholder="Password" type="password" value={password} onChange={(event) => {
                    setPassword(event.target.value);
                }} />


                <div className={styles.sign_up_text_block}>
                    <p>
                        People who use our service may have uploaded
                        your contact information to Instagram.
                        <Link to={"/signup"}>Learn More</Link>
                    </p>

                    <p>
                        <span>By signing up, you agree to our </span>
                        <Link to={"/signup"}>Terms</Link>, <Link to={"/signup"}>Privacy Policy</Link> and <Link to={"/signup"}>Cookies Policy</Link>.
                    </p>
                </div>


                <CustomButton type="submit" title={"Sign up"}/>


                {/*<div className={styles.sign_up_form_forgot_password}>*/}
                {/*    <Link to="/">Forgot password?</Link>*/}
                {/*</div>*/}
            </form>
        </div>
    );
};