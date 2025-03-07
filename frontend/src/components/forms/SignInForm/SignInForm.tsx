import {FC} from "react";
import {useForm} from "react-hook-form";

import styles from "./SignInForm.module.scss";
import {CustomButton} from "../../inputs/CustomButton/CustomButton.tsx";
import {Link, useLocation, useNavigate, Location, NavigateFunction} from "react-router-dom";
import ichgramLogo from "../../../assets/logo.svg";
import logo_dark from "../../../assets/logo_dark.svg";
import {CustomInput} from "../../inputs/CustomInput/CustomInput.tsx";
import {Separator} from "../../other/Separator/Separator.tsx";
import {ILoginData} from "../../../utils/types.ts";
import {useTheme} from "../../../context/ThemeContext.tsx";
import {loginUser} from "../../../store/api/authActionCreators.ts";
import {useAppDispatch, useAppSelector} from "../../../utils/CustomHooks.ts";

interface SignInFormValues {
    usernameOrEmail: string;
    password: string;
}

export const SignInForm: FC = () => {
    const {theme} = useTheme();
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const {loginError} = useAppSelector(state => state.authReducer);
    const location: Location<any> = useLocation();
    const {register, handleSubmit, formState: {errors}} = useForm<SignInFormValues>({
        defaultValues: {
            usernameOrEmail: "",
            password: ""
        }
    });

    const onFormSubmit = async(data: SignInFormValues): Promise<void> => {
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
            {theme === "light" ? <img src={ichgramLogo} alt="logo"/> : <img src={logo_dark} alt="logo"/>}
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
                {location.state && location.state.message && <p className={styles.error_message}>{location.state.message}</p>}
                {loginError && <p className={styles.error_message}>{loginError}</p>}
                <Separator />

                <div className={styles.sign_in_form_forgot_password}>
                    <Link to="/forgot_password">Forgot password?</Link>
                </div>
            </form>
        </div>
    );
};