import {FC} from "react";
import styles from "./SignInForm.module.scss";
import {CustomButton} from "../CustomButton/CustomButton.tsx";
import {Link} from "react-router-dom";
import ichgramLogo from "../../assets/logo.svg";
import {CustomInput} from "../CustomInput/CustomInput.tsx";
import {useForm} from "react-hook-form";
import {Separator} from "../Separator/Separator.tsx";
import {SignInFormValues} from "../../utils/Entitys.ts";


export const SignInForm: FC = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<SignInFormValues>();

    const onFormSubmit = (data: SignInFormValues) => {
        console.log("Form Data:", data);
    };

    return (
        <div className={styles.sign_in_form_container}>
            <img src={ichgramLogo} alt="logo"/>
            <form name="sign_in_form" action="" className={styles.sign_in_form} onSubmit={handleSubmit(onFormSubmit)}>
                <CustomInput {...register("usernameOrEmail", {
                    required: "Username or email is required"
                })} placeholder="Username, or email" type="text" />
                {errors.usernameOrEmail && <p className={styles.error_message}>{errors.usernameOrEmail.message}</p>}

                <CustomInput {...register("usernameOrEmail", {
                    required: "Password is required"
                })} placeholder="Password" type="password" />
                {errors.password && <p className={styles.error_message}>{errors.password.message}</p>}

                <CustomButton className={styles.sign_in_button} type="submit" title={"Log in"}/>
                <Separator />

                <div className={styles.sign_in_form_forgot_password}>
                    <Link to="/forgot_password">Forgot password?</Link>
                </div>
            </form>
        </div>
    );
};