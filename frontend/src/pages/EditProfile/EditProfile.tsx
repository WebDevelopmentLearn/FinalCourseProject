import styles from "./EditProfile.module.scss";
import {AvatarCircle, CustomButton, CustomInput, ThemeSwitcher} from "../../components";
import testAvatar from "../../assets/profile/default_avatar.jpg";
import React, {ChangeEvent, useCallback, useState} from "react";
import {useTheme} from "../../context/ThemeContext.tsx";
import {useSelector} from "react-redux";
import {userData} from "../../store/selectors.ts";
import {IUser} from "../../utils/Entitys.ts";

export const EditProfile = () => {

    const maxSymbols: number = 150;
    const [symbolsLeft, setSymbolsLeft] = useState<number>(maxSymbols);
    const [aboutText, setAboutText] = useState<string>("");
    const user: IUser | null = useSelector(userData);

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;

        if (inputText.length <= maxSymbols) {
            setAboutText(inputText);
            setSymbolsLeft(maxSymbols - inputText.length);
        }

    }

    const { theme, setTheme } = useTheme();
    const onButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
        console.log('theme', theme);
        document.documentElement.className = theme === 'light' ? 'dark-theme' : '';
    }, [theme, setTheme]);

    return (
        <div className={styles.edit_profile_page}>
            <h1>Edit Profile</h1>

            <div className={styles.profile_details}>
                <div className={styles.profile_avatar_and_desc}>
                    <AvatarCircle avatarSize="56px" avatar={user?.avatar}/>
                    <div className={styles.profile_username_and_desc}>
                        <h3>{user?.username}</h3>
                        <p>
                            • Гарантия помощи с трудоустройством в ведущие IT-компании
                        </p>
                    </div>
                </div>

                <div>
                    <CustomButton title="New Photo" className={styles.new_photo_btn}/>
                </div>
            </div>

            <div>
                <label htmlFor="theme_switcher">Switch theme</label>
                <ThemeSwitcher onClick={onButtonClick} currentTheme={theme}/>
            </div>

            <form action="" className={styles.edit_profile_form}>
                <div>
                    <label htmlFor="username_input">Username</label>
                    <CustomInput defaultValue={user?.username} className={styles.edit_profile_input} id="username_input"
                                 type="text"/>
                </div>

                <div>
                    <label htmlFor="website_input">Website</label>
                    <div className={styles.test}>
                        <CustomInput className={`${styles.edit_profile_input} ${styles.website_input}`}
                                     id="website_input" type="url"/>
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
                    <textarea value={aboutText} onChange={handleInput}
                              className={`${styles.edit_profile_input} ${styles.about_input}`} name="about_input"
                              id="about_input"/>

                    <span>{symbolsLeft}/{maxSymbols}</span>
                </div>

                <CustomButton className={styles.save_btn} type="submit" title="Save"/>
            </form>
        </div>
    );
};