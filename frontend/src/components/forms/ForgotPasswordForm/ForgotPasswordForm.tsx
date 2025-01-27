import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

import styles from "./ForgotPasswordForm.module.scss"
import {CustomInput} from "../../inputs/CustomInput/CustomInput.tsx";
import {CustomButton} from "../../inputs/CustomButton/CustomButton.tsx";
import {Separator} from "../../Separator/Separator.tsx";
import lock_icon from "../../../assets/forgot_password/lock_icon.svg";
import {ForgotPasswordFormValues} from "../../../utils/Entitys.ts";


export const ForgotPasswordForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<ForgotPasswordFormValues>();

    const onFormSubmit = (data: ForgotPasswordFormValues) => {
        console.log("Form Data:", data);
    };

    return (
        <div className={styles.forgot_password_container}>
            <img className={styles.lock_icon} src={lock_icon} alt="lock_icon"/>
            <div className={styles.forgot_password_text}>
                <h2>Trouble logging in?</h2>
                <h3>Enter your email, phone, or username and we'll
                    send you a link to get back into your account.</h3>
            </div>
            <form name="forgot_password_form" action="" className={styles.forgot_password_form}
                  onSubmit={handleSubmit(onFormSubmit)}>
                <CustomInput {...register("emailOrUsername", {
                    required: "Username or email is required"
                })} placeholder="Email or Username" type="text" className={styles.forgot_password_input}/>
                {errors.emailOrUsername && <p className={styles.error_message}>{errors.emailOrUsername.message}</p>}

                <CustomButton title={"Reset your password"} className={styles.forgot_password_btn}/>

                <Separator/>

                <div className={styles.forgot_password_sign_up}>
                    <Link to="/signup">Create new account</Link>
                </div>


            </form>

        </div>
    );
};