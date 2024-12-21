import {Link, NavLink, NavLinkRenderProps, useNavigate} from "react-router-dom";
import logo from "../../assets/logo.svg";
import React, {useCallback} from "react";
import styles from "./Sidebar.module.scss";

import homeIcon from "../../assets/sidebar/home_icon.svg";
import searchIcon from "../../assets/sidebar/search_icon.svg";
import exploreIcon from "../../assets/sidebar/explore_icon.svg";
import messageIcon from "../../assets/sidebar/message_icon.svg";
import notificationIcon from "../../assets/sidebar/notification_icon.svg";
import createIcon from "../../assets/sidebar/create_icon.svg";

import profileAvatar from "../../assets/ich_logo.png";


export const Sidebar = () => {

    const navigate = useNavigate();

    const handleGoToHomeLink = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/");
    }, []);

    const handleOpenSearch = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        // open search
    }, []);

    const handleGoToExplore = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/explore");
    }, []);

    const handleOpenMessages = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        // open messages
    }, []);

    const handleOpenNotifications = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        // open notifications
    }, []);

    const handleOpenCreate = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        // open create
    }, []);


    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_content}>
                <img className={styles.sidebar_desktop_logo} src={logo} alt="logo"/>
                <svg aria-label="Instagram" className={styles.sidebar_mobile_logo} fill="currentColor" height="24"
                     role="img" viewBox="0 0 24 24" width="24"><title>Ichgram</title>
                    <path
                        d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z">
                    </path>
                </svg>
                <div className={styles.sidebar_links_list}>
                    <NavLink
                        className={({isActive}: NavLinkRenderProps) => isActive ? "active activeLink" : null}
                        to={"/"} onClick={handleGoToHomeLink}>
                        <img src={homeIcon} alt="homeIcon"/>
                        {/*<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                        {/*    <path*/}
                        {/*        d="M10.005 15.545C10.005 14.7501 10.3208 13.9878 10.8828 13.4258C11.4448 12.8638 12.2071 12.548 13.002 12.548C13.3957 12.5479 13.7855 12.6253 14.1492 12.7758C14.5129 12.9264 14.8434 13.1471 15.1218 13.4254C15.4002 13.7038 15.6211 14.0342 15.7718 14.3979C15.9224 14.7615 16 15.1513 16 15.545V21H23V10.543L13 1L3 10.543V21H10.005V15.545Z"*/}
                        {/*        stroke="black" stroke-width="2" stroke-linejoin="round"/>*/}
                        {/*</svg>*/}
                        <span className={styles.sidebar_mobile_content}>Home</span>
                    </NavLink>

                    <NavLink className={({isActive}: NavLinkRenderProps) => isActive ? "active activeLink" : ""} to={"/search"} onClick={handleOpenSearch}>
                        <img src={searchIcon} alt="searchIcon"/>
                        <span className={styles.sidebar_mobile_content}>Search</span>
                    </NavLink>

                    <NavLink className={({isActive}: NavLinkRenderProps) => isActive ? "active activeLink" : ""} to={"/explore"} onClick={handleGoToExplore}>
                        <img src={exploreIcon} alt="exploreIcon"/>
                        <span className={styles.sidebar_mobile_content}>Explore</span>
                    </NavLink>

                    <NavLink className={({isActive}: NavLinkRenderProps) => isActive ? "active activeLink" : ""} to={"/messages"} onClick={handleOpenMessages}>
                        <img src={messageIcon} alt="messageIcon"/>
                        <span className={styles.sidebar_mobile_content}>Messages</span>
                    </NavLink>

                    <NavLink className={({isActive}: NavLinkRenderProps) => isActive ? "active activeLink" : ""} to={"/notifications"} onClick={handleOpenNotifications}>
                        <img src={notificationIcon} alt="notificationIcon"/>
                        <span className={styles.sidebar_mobile_content}>Notification</span>
                    </NavLink>

                    <NavLink className={({isActive}: NavLinkRenderProps) => isActive ? "active activeLink" : ""} to={"/create"} onClick={handleOpenCreate}>
                        <img src={createIcon} alt="createIcon"/>
                        <span className={styles.sidebar_mobile_content}>Create</span>
                    </NavLink>
                </div>

                {/*<div className={styles.sidebar_profile}>*/}
                {/*    <NavLink className={({isActive}: NavLinkRenderProps) => isActive ? "active activeLink" : null} to={"/profile"}>*/}
                {/*        <img src={profileAvatar} alt="profileAvatar"/>*/}
                {/*        <span className={styles.sidebar_mobile_content}>Profile</span>*/}
                {/*    </NavLink>*/}
                {/*</div>*/}
                <NavLink className={({isActive}: NavLinkRenderProps) => isActive ? `active activeLink ${styles.sidebar_profile}` : styles.sidebar_profile} to={"/profile"}>
                    <img src={profileAvatar} alt="profileAvatar"/>
                    <span className="text">Profile</span>
                </NavLink>
            </div>
        </div>
    );
};