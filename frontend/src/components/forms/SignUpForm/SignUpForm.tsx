import {FC} from "react";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";

import styles from "./SignUpForm.module.scss";
import ichgramLogo from "../../../assets/logo.svg";
import logo_dark from "../../../assets/logo_dark.svg";
import {CustomButton} from "../../inputs/CustomButton/CustomButton.tsx";
import {CustomInput} from "../../inputs/CustomInput/CustomInput.tsx";
import {registerUser} from "../../../store/api/authActionCreators.ts";
import {IRegisterData} from "../../../utils/types.ts";
import {useTheme} from "../../../context/ThemeContext.tsx";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../../../utils/CustomHooks.ts";


interface SignUpFormValues {
    email: string;
    full_name: string;
    username: string;
    password: string;
}

export const SignUpForm: FC = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<SignUpFormValues>({
        defaultValues: {
            email: "",
            full_name: "",
            username: "",
            password: ""
        }
    });
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();
    const {theme} = useTheme();
    const {registerError} = useAppSelector(state => state.authReducer);

    const onFormSubmit: SubmitHandler<SignUpFormValues> = async(data): Promise<void> => {
        try {
            const registerData: IRegisterData = {
                email: data.email,
                full_name: data.full_name,
                username: data.username,
                password: data.password
            }

            // console.log(registerData);
            const result = await dispatch(registerUser(registerData));
            if (result.type !== "auth/registerUser/rejected") {
                // console.log("User registered successfully");
                toast.success("User registered successfully", {
                    autoClose: 2000
                });
                navigate('/signin');
            }
        } catch (error) {
            console.log(error);
            toast.error("Error occurred while registering user", {
                autoClose: 2000
            });
        }
    };


    return (
        <div className={styles.sign_up_form_container}>
            {theme === "light" ? <img src={ichgramLogo} alt="ichgram logo" /> : <img src={logo_dark} alt="ichgram logo" />}
            <h2>Sign up to see photos and videos from your friends.</h2>
            <form name="sign_up_form" action="" className={styles.sign_up_form} onSubmit={handleSubmit(onFormSubmit)}>
                <CustomInput {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address"
                    }
                })} placeholder="Email" type="email" />

                {errors.email && <p className={styles.error_message}>{errors.email.message}</p>}

                <CustomInput {...register("full_name", {
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

                {errors.full_name && <p className={styles.error_message}>{errors.full_name.message}</p>}

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
                {registerError && <p className={styles.error_message}>{registerError}</p>}
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

            </form>
        </div>
    );
};