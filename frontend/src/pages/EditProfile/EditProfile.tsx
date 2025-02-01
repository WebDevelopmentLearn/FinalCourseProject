import {useCallback, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import styles from "./EditProfile.module.scss";
import {CustomButton, CustomInput, ThemeSwitcher} from "../../components";
import {useTheme} from "../../context/ThemeContext.tsx";
import {userData} from "../../store/selectors.ts";
import {IUser} from "../../utils/types.ts";
import {AppDispatch} from "../../store/ichgramStore.ts";
import {updateUserProfile} from "../../store/api/userActionCreators.ts";
import {UploadAvatarModal} from "../../components/modals/UploadAvatarModal/UploadAvatarModal.tsx";
import {useImages} from "../../context/ImageContext.tsx";
import {SimpleAvatarCircle} from "../../components";
import {toast} from "react-toastify";

interface EditProfileValues {
    avatar_input: File;
    username_input: string;
    about_input: string;
    website_input: string;
}

export const EditProfile = () => {
    const [isOpenUploadAvatarModal, setIsOpenUploadAvatarModal] = useState<boolean>(false);
    const maxSymbols: number = 150;
    const user: IUser | null = useSelector(userData);
    const dispatch = useDispatch<AppDispatch>();
    const {handleSubmit, register, watch, setValue} = useForm<EditProfileValues>({
        mode: "onChange"
    });

    const {images, clearImages } = useImages();
    const { theme, setTheme } = useTheme();
    const navigate: NavigateFunction = useNavigate();
    const aboutValue = watch("about_input");

    const handleEditProfile: SubmitHandler<EditProfileValues> = async(data: EditProfileValues) => {
        if (data) {
            try {
                const updateData: {avatar?: File, username?: string, bio?: string, website?: string} = {};
                if (data.avatar_input) updateData.avatar = data.avatar_input;
                if (data.username_input.length > 0) updateData.username = data.username_input;
                if (data.about_input.length > 0) updateData.bio = data.about_input;
                if (data.website_input.length > 0) updateData.website = data.website_input;
                await dispatch(updateUserProfile(updateData));
                clearImages("all");
                toast.success("Profile updated successfully", {
                    autoClose: 2000
                });

            } catch (error) {
                console.error("Failed to edit profile: ", error);
                toast.error("Failed to edit profile", {
                    autoClose: 2000
                });
            }
        }
    }

    const handleSwitchTheme = useCallback((): void => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
        document.documentElement.className = theme === 'light' ? 'dark-theme' : '';

        //Save theme to local storage
        localStorage.setItem("theme", theme === 'light' ? 'dark' : 'light');

        toast.info(`Theme switched to ${theme === 'light' ? 'dark' : 'light'}`, {
            autoClose: 2000,
            theme: theme === 'light' ? 'dark' : 'light'
        });
    }, [theme, setTheme]);


    const handleOpenUploadAvatar = () => {
        setIsOpenUploadAvatarModal(true);
    }

    useEffect((): void => {
       if (images.length > 0) {
           setValue("avatar_input", images[0].blob as File); // Сохраняем только Blob
       }
    }, [images, setValue]);
    const handleBackToProfile = useCallback(() => {
        navigate(-1);
    }, [navigate]);


    return (
        <div className={styles.edit_profile_page}>
            <div className={styles.edit_profile_header}>
                <button onClick={handleBackToProfile} className={styles.edit_profile_back_to_profile_btn}>
                    <svg width="24px" height="24px" viewBox="0 0 1024 1024" className="icon" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                        <g id="SVGRepo_iconCarrier">
                            <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                                  fill="currentColor"></path>
                        </g>
                    </svg>
                </button>
                <h1>Edit Profile</h1>
            </div>

            <div className={styles.profile_details}>
                <div className={styles.profile_avatar_and_desc}>
                    <SimpleAvatarCircle avatarSize="56px" url={images[0]?.url ?? user?.avatar}/>
                    <div className={styles.profile_username_and_desc}>
                        <h3>{user?.username}</h3>
                        <p>
                            {user?.bio}
                        </p>
                        <p>
                            {user?.website}
                        </p>
                    </div>
                </div>

                <div>
                    <CustomButton type="button" title={"New Photo"} onClick={handleOpenUploadAvatar} />
                </div>
            </div>

            <div>
                <label htmlFor="theme_switcher">Switch theme</label>
                <ThemeSwitcher onChange={handleSwitchTheme} currentTheme={theme}/>
            </div>

            <form onSubmit={handleSubmit(handleEditProfile)} action="" className={styles.edit_profile_form}>
                <div>
                    <label htmlFor="username_input">Username</label>
                    <CustomInput {...register("username_input", {
                        minLength: {
                            value: 4,
                            message: "Min username length = 4"
                        }
                    })} defaultValue={user?.username} className={styles.edit_profile_input} id="username_input"
                                 type="text"/>
                </div>

                <div>
                    <label htmlFor="website_input">Website</label>
                    <div className={styles.test}>
                        <CustomInput {...register("website_input", {
                            minLength: {
                                value: 4,
                                message: "Min website length = 4"
                            },
                            pattern: {
                                value: /^https?:\/\//,
                                message: "Ссылка должна содержать в себе http:// или https://"
                            }
                        })} className={`${styles.edit_profile_input} ${styles.website_input}`}
                                     defaultValue={user?.website}  id="website_input" type="url"/>
                        <svg aria-label="Link-Symbol." className={styles.link_icon} fill="currentColor" height="12"
                             role="img"
                             viewBox="0 0 24 24" width="12">
                            <title>Link-Symbol.</title>
                            <path
                                d="m9.726 5.123 1.228-1.228a6.47 6.47 0 0 1 9.15 9.152l-1.227 1.227m-4.603 4.603-1.228 1.228a6.47 6.47 0 0 1-9.15-9.152l1.227-1.227"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2">
                            </path>
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" x1="8.471" x2="15.529" y1="15.529" y2="8.471"></line>
                        </svg>
                    </div>

                </div>

                <div className={styles.about_input_container}>
                    <label htmlFor="about_input">About</label>
                    {/*<CustomInput className={styles.edit_profile_input} id="about_input" type="textarea"/>*/}
                    <textarea {...register("about_input", {
                        maxLength: {
                            value: maxSymbols,
                            message: `Max about length = ${maxSymbols}`
                        },
                    })} defaultValue={user?.bio}
                              className={`${styles.edit_profile_input} ${styles.about_input}`} name="about_input"
                              id="about_input"/>

                    <span>{aboutValue?.length}/{maxSymbols}</span>
                </div>

                <CustomButton className={styles.save_btn} type="submit" title="Save"/>
            </form>
            {isOpenUploadAvatarModal && (
                <UploadAvatarModal setIsOpenUploadAvatarModal={setIsOpenUploadAvatarModal}  />
            )}
        </div>
    );
};