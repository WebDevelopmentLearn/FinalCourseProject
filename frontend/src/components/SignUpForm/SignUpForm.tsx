import styles from "./SignUpForm.module.scss";
import ichgramLogo from "../../assets/logo.svg";
import {CustomButton} from "../CustomButton/CustomButton.tsx";

import {FC} from "react";
import {Link} from "react-router-dom";
import {CustomInput} from "../CustomInput/CustomInput.tsx";
import {SubmitHandler, useForm} from "react-hook-form";

type SignUpFormValues = {
    email: string;
    fullName: string;
    username: string;
    password: string;
}



export const SignUpForm: FC = () => {



    const {register, handleSubmit, formState: {errors}} = useForm<SignUpFormValues>();


    const onFormSubmit: SubmitHandler<SignUpFormValues> = (data) => {
        console.log("Form Data:", data);
    };


    return (
        <div className={styles.sign_up_form_container}>
            <img src={ichgramLogo} alt="logo"/>
            <h2>Sign up to see photos and videos from your friends.</h2>
            <form name="sign_up_form" action="" className={styles.sign_up_form} onSubmit={handleSubmit(onFormSubmit)}>
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

                <CustomInput {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address"
                    }
                })} placeholder="Email" type="email" />

                {errors.email && <p className={styles.error_message}>{errors.email.message}</p>}

                <CustomInput {...register("fullName", {
                    required: "Full Name is required",
                    minLength: {
                        value: 3,
                        message: "Full Name must be at least 3 characters"
                    },
                    pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: "Full Name must contain only alphabets and spaces"
                    }
                })} placeholder="Full Name" type="text" />

                {errors.fullName && <p className={styles.error_message}>{errors.fullName.message}</p>}

                <CustomInput {...register("username", {
                    required: "Username is required",
                    minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters"
                    }
                })} placeholder="Username" type="text" />

                {errors.username && <p className={styles.error_message}>{errors.username.message}</p>}

                <CustomInput {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                })} placeholder="Password" type="password"  />

                {errors.password && <p className={styles.error_message}>{errors.password.message}</p>}

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