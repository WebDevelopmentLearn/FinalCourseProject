import {FC} from "react";
import styles from "./SignInForm.module.scss";
import {CustomButton} from "../CustomButton/CustomButton.tsx";
import {Link, useNavigate} from "react-router-dom";
import ichgramLogo from "../../assets/logo.svg";
import {CustomInput} from "../CustomInput/CustomInput.tsx";
import {useForm} from "react-hook-form";
import {Separator} from "../Separator/Separator.tsx";
import {ILoginData, SignInFormValues} from "../../utils/Entitys.ts";
import {AppDispatch} from "../../store/ichgramStore.ts";
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/api/actionCreators.ts";



export const SignInForm: FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {register, handleSubmit, formState: {errors}} = useForm<SignInFormValues>({
        defaultValues: {
            usernameOrEmail: "",
            password: ""
        }
    });

    const onFormSubmit = async(data: SignInFormValues) => {
        try {
            const loginData: ILoginData = {password: ""}
            if (data.usernameOrEmail.includes("@")) {
                loginData.email = data.usernameOrEmail;
            } else {
                loginData.username = data.usernameOrEmail;
            }
            loginData.password = data.password;

            const result = await dispatch(loginUser(loginData));
            if (loginUser.fulfilled.match(result)) {
                navigate("/");
                console.log("User logged in successfully", result.payload);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.sign_in_form_container}>
            <img src={ichgramLogo} alt="logo"/>
            <form name="sign_in_form" action="" className={styles.sign_in_form} onSubmit={handleSubmit(onFormSubmit)}>
                <CustomInput {...register("usernameOrEmail", {
                    required: "Username or email is required"
                })} placeholder="Username, or email" type="text" />
                {errors.usernameOrEmail && <p className={styles.error_message}>{errors.usernameOrEmail.message}</p>}

                <CustomInput {...register("password", {
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