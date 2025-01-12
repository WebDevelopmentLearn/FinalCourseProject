import {NavigateFunction, NavLink, NavLinkRenderProps, useNavigate} from "react-router-dom";
import logo from "../../assets/logo.svg";
import logo_dark from "../../assets/logo_dark.svg";
import React, {FC, MutableRefObject, ReactNode, useCallback, useRef, useState} from "react";
import styles from "./Sidebar.module.scss";

import profileAvatar from "../../assets/ich_logo.png";
import {SearchModal} from "../SearchModal/SearchModal.tsx";
import {NotificationModal} from "../NotificationModal/NotificationModal.tsx";
import {useTheme} from "../../context/ThemeContext.tsx";
import {useDispatch, useSelector} from "react-redux";
import {openCreatePostModal} from "../../store/reducers/modalSlice.ts";
import {RootState} from "@reduxjs/toolkit/query";
import {AvatarCircle} from "../AvatarCircle/AvatarCircle.tsx";
// import {ThemeSwitcher} from "../ThemeSwitcher/ThemeSwitcher.tsx";


export const Sidebar: FC = () => {
    const navigate: NavigateFunction = useNavigate();
    const sidebarRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const {createPostModalIsOpen} = useSelector((state: RootState) => state.modalReducer);
    const [modalContent, setModalContent] = useState<ReactNode>(null);
    const {user} = useSelector((state: RootState) => state.userReducer);

    const handleGoToHomeLink = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/");
    }, []);

    const handleOpenSearch = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        // open search
        if (sidebarRef.current) {
            sidebarRef.current.classList.add(styles.small);
            setIsModalOpen(true);
            setModalContent(<SearchModal />);
        }
        console.log("handleOpenSearch");
    }, []);

    const handleGoToExplore = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/explore");
    }, []);

    const handleOpenMessages = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        // open messages
    }, []);

    const handleOpenNotifications = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        // open notifications
        if (sidebarRef.current) {
            sidebarRef.current.classList.add(styles.small);
            setIsModalOpen(true);
            setModalContent(<NotificationModal />);
        }
        console.log("handleOpenNotifications");
    }, []);

    const handleOpenCreate = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        // open create
        dispatch(openCreatePostModal());
    }, [dispatch]);


    const handleCloseModal = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        const target: EventTarget = event.target;

        if (sidebarRef.current) {

            sidebarRef.current.classList.remove(styles.small);
            setIsModalOpen(false);
        }
        console.log("handleCloseModal");
    }, []);

    const {theme} = useTheme();

    return (
        <div ref={sidebarRef} className={`${styles.sidebar}`}>
            <div className={styles.sidebar_content}>
                {theme === "light" ? <img className={styles.sidebar_desktop_logo} src={logo} alt="logo_light"/>  : <img className={styles.sidebar_desktop_logo} src={logo_dark} alt="logo_dark"/>
                }

                <svg aria-label="Instagram" className={styles.sidebar_mobile_logo} fill="currentColor" height="24"
                     role="img" viewBox="0 0 24 24" width="24"><title>Ichgram</title>
                    <path
                        d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z">
                    </path>
                </svg>
                <div className={styles.sidebar_links_list}>
                    <NavLink
                        className={({isActive}: NavLinkRenderProps) => isActive ? "active activeLink" : ""}
                        to={"/"} onClick={handleGoToHomeLink}>
                        {/*<img src={homeIcon} alt="homeIcon"/>*/}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.005 16.545C9.005 15.7501 9.32075 14.9878 9.8828 14.4258C10.4448 13.8638 11.2071 13.548 12.002 13.548C12.3957 13.5479 12.7855 13.6253 13.1492 13.7758C13.5129 13.9264 13.8434 14.1471 14.1218 14.4254C14.4002 14.7038 14.6211 15.0342 14.7718 15.3979C14.9224 15.7615 15 16.1513 15 16.545V22H22V11.543L12 2L2 11.543V22H9.005V16.545Z"
                                stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                        <span className={styles.sidebar_mobile_content}>Home</span>
                    </NavLink>

                    <button
                        // className={({isActive}: NavLinkRenderProps) => isActive ? "active activeLink" : ""} to={"/search"}
                        onClick={handleOpenSearch}>
                        {/*<img src={searchIcon} alt="searchIcon"/>*/}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 10.5C19 12.1811 18.5015 13.8245 17.5675 15.2223C16.6335 16.6202 15.306 17.7096 13.7528 18.353C12.1996 18.9963 10.4906 19.1647 8.84174 18.8367C7.1929 18.5087 5.67834 17.6992 4.4896 16.5104C3.30085 15.3217 2.4913 13.8071 2.16333 12.1583C1.83535 10.5094 2.00368 8.80036 2.64703 7.24719C3.29037 5.69402 4.37984 4.3665 5.77766 3.43251C7.17547 2.49852 8.81886 2 10.5 2C12.7543 2 14.9164 2.89553 16.5104 4.48959C18.1045 6.08365 19 8.24566 19 10.5Z"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.511 16.511L22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        <span className={styles.sidebar_mobile_content}>Search</span>
                    </button>

                    <NavLink className={({isActive}: NavLinkRenderProps) => isActive ? "active activeLink" : ""}
                             to={"/explore"} onClick={handleGoToExplore}>
                        {/*<img src={exploreIcon} alt="exploreIcon"/>*/}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.941 13.953L7.58099 16.424L10.06 10.056L16.42 7.585L13.941 13.953Z"
                                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M10.06 10.056L13.949 13.945L7.58099 16.424L10.06 10.056Z" fill="currentColor"/>
                            <path
                                d="M12.001 22.505C17.8 22.505 22.501 17.804 22.501 12.005C22.501 6.20601 17.8 1.505 12.001 1.505C6.20199 1.505 1.50098 6.20601 1.50098 12.005C1.50098 17.804 6.20199 22.505 12.001 22.505Z"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className={styles.sidebar_mobile_content}>Explore</span>
                    </NavLink>

                    <NavLink className={({isActive}: NavLinkRenderProps) => isActive ? "active activeLink" : ""}
                             to={"/messages"} onClick={handleOpenMessages}>
                        {/*<img src={messageIcon} alt="messageIcon"/>*/}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.003 2.001C13.303 1.95925 14.5982 2.17926 15.8115 2.64794C17.0248 3.11662 18.1316 3.82442 19.066 4.72927C20.0003 5.63412 20.7433 6.71757 21.2507 7.91522C21.758 9.11288 22.0195 10.4003 22.0195 11.701C22.0195 13.0017 21.758 14.2891 21.2507 15.4868C20.7433 16.6844 20.0003 17.7679 19.066 18.6727C18.1316 19.5776 17.0248 20.2854 15.8115 20.7541C14.5982 21.2227 13.303 21.4427 12.003 21.401C11.0251 21.4037 10.0514 21.2746 9.10802 21.017C8.93103 20.9687 8.7428 20.9828 8.57502 21.057L6.59102 21.933C6.47105 21.9857 6.33998 22.0083 6.20929 21.9985C6.0786 21.9888 5.95229 21.9472 5.84143 21.8773C5.73058 21.8074 5.63856 21.7114 5.57346 21.5977C5.50835 21.484 5.47215 21.356 5.46802 21.225L5.41402 19.445C5.40951 19.3369 5.38328 19.2308 5.33689 19.133C5.29051 19.0353 5.22491 18.9479 5.14402 18.876C4.14019 17.9724 3.34082 16.8649 2.79932 15.6275C2.25782 14.3902 1.98668 13.0515 2.00402 11.701C1.99642 10.3995 2.25215 9.11 2.75585 7.90994C3.25954 6.70989 4.00077 5.62412 4.93496 4.71795C5.86915 3.81179 6.97699 3.10396 8.19183 2.63704C9.40666 2.17013 10.7024 1.95377 12.003 2.001Z"
                                stroke="currentColor" strokeWidth="1.739" strokeMiterlimit="10"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M17.79 10.132C17.8735 10.0009 17.908 9.84443 17.8873 9.69033C17.8667 9.53623 17.7922 9.3944 17.677 9.28992C17.5619 9.18543 17.4135 9.12502 17.2582 9.11936C17.1028 9.11371 16.9504 9.16317 16.828 9.25901L14.272 11.309C14.163 11.3916 14.03 11.4364 13.8933 11.4368C13.7566 11.4371 13.6234 11.393 13.514 11.311L11.06 9.47001C10.8859 9.33966 10.6867 9.24676 10.4749 9.19715C10.2632 9.14755 10.0434 9.1423 9.82957 9.18175C9.61569 9.2212 9.41229 9.30449 9.23217 9.42638C9.05206 9.54827 8.89911 9.70613 8.78297 9.89001L6.21597 13.87C6.13169 14.001 6.09655 14.1577 6.11679 14.3121C6.13703 14.4666 6.21134 14.6089 6.32654 14.7138C6.44173 14.8187 6.59036 14.8794 6.74604 14.8851C6.90173 14.8908 7.0544 14.8412 7.17697 14.745L9.73297 12.696C9.84208 12.6132 9.97518 12.5682 10.1121 12.5679C10.2491 12.5675 10.3824 12.6118 10.492 12.694L12.944 14.534C13.1181 14.6645 13.3174 14.7576 13.5292 14.8073C13.7411 14.857 13.9609 14.8622 14.1749 14.8228C14.3889 14.7833 14.5924 14.7 14.7727 14.578C14.9529 14.456 15.1058 14.298 15.222 14.114L17.79 10.132Z"
                                  fill="currentColor"/>
                        </svg>

                        <span className={styles.sidebar_mobile_content}>Messages</span>
                    </NavLink>

                    <button
                        // className={({isActive}: NavLinkRenderProps) => isActive ? "active activeLink" : ""} to={"/notifications"}
                        onClick={handleOpenNotifications}>
                        {/*<img src={notificationIcon} alt="notificationIcon"/>*/}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.792 3.904C18.1064 3.97667 19.3389 4.56591 20.2207 5.54331C21.1026 6.52071 21.5624 7.80705 21.5 9.122C21.5 12.194 18.848 14.081 16.303 16.344C13.791 18.587 12.438 19.813 12 20.096C11.523 19.787 9.85698 18.273 7.69698 16.344C5.14098 14.072 2.49998 12.167 2.49998 9.122C2.43755 7.80705 2.89737 6.52071 3.77924 5.54331C4.66111 4.56591 5.89355 3.97667 7.20798 3.904C7.93613 3.88193 8.65754 4.04919 9.30169 4.3894C9.94585 4.72962 10.4907 5.23117 10.883 5.845C11.723 7.02 11.863 7.608 12.003 7.608C12.143 7.608 12.281 7.02 13.113 5.842C13.503 5.22533 14.0481 4.7218 14.6937 4.38172C15.3393 4.04164 16.0628 3.87691 16.792 3.904ZM16.792 1.904C15.8839 1.87493 14.981 2.05109 14.1504 2.41935C13.3199 2.78762 12.5831 3.33851 11.995 4.031C11.4074 3.34053 10.6721 2.79091 9.84353 2.42276C9.01496 2.0546 8.11427 1.87732 7.20798 1.904C5.36285 1.97615 3.62136 2.77599 2.36432 4.1286C1.10728 5.48121 0.436977 7.27654 0.499982 9.122C0.499982 12.732 3.04998 14.949 5.51498 17.092C5.79798 17.338 6.08398 17.586 6.36798 17.839L7.39498 18.757C8.51502 19.8228 9.68925 20.8301 10.913 21.775C11.2368 21.9846 11.6143 22.0962 12 22.0962C12.3857 22.0962 12.7632 21.9846 13.087 21.775C14.3497 20.8013 15.56 19.7615 16.713 18.66L17.635 17.836C17.928 17.576 18.225 17.317 18.52 17.062C20.854 15.037 23.5 12.742 23.5 9.122C23.563 7.27654 22.8927 5.48121 21.6356 4.1286C20.3786 2.77599 18.6371 1.97615 16.792 1.904Z"
                                fill="currentColor"/>
                        </svg>
                        <span className={styles.sidebar_mobile_content}>Notification</span>
                    </button>

                    <button className={createPostModalIsOpen ? "active activeLink" : ""}
                              onClick={handleOpenCreate}>
                        {/*<img src={createIcon} alt="createIcon"/>*/}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2 12V15.45C2 18.299 2.698 19.455 3.606 20.394C4.546 21.303 5.704 22.002 8.552 22.002H15.448C18.296 22.002 19.454 21.302 20.394 20.394C21.302 19.455 22 18.3 22 15.45V8.552C22 5.703 21.302 4.546 20.394 3.607C19.454 2.7 18.296 2 15.448 2H8.552C5.704 2 4.546 2.699 3.606 3.607C2.698 4.547 2 5.703 2 8.552V12Z"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.54498 12.001H17.455" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M12.003 6.545V17.455" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>

                        <span className={styles.sidebar_mobile_content}>Create</span>
                    </button>
                </div>

                {/*<div className={styles.sidebar_profile}>*/}
                {/*    <NavLink className={({isActive}: NavLinkRenderProps) => isActive ? "active activeLink" : null} to={"/profile"}>*/}
                {/*        <img src={profileAvatar} alt="profileAvatar"/>*/}
                {/*        <span className={styles.sidebar_mobile_content}>Profile</span>*/}
                {/*    </NavLink>*/}
                {/*</div>*/}
                <NavLink
                    className={({isActive}: NavLinkRenderProps) => isActive ? `active activeLink ${styles.sidebar_profile}` : styles.sidebar_profile}
                    to={"/profile"}>
                    {/*<img className={styles.sidebar_avatar} src={user?.user?.avatar} alt="profileAvatar"/>*/}
                    <AvatarCircle avatar={user?.user?.avatar} className={styles.sidebar_avatar} avatarSize={"small"} hasLink={false}/>
                    <span className={styles.text}>Profile</span>
                </NavLink>

            </div>
            {isModalOpen && (
                <div className={`${styles.modal_layout} ${isModalOpen ? styles.active : styles.close}`}
                     onClick={handleCloseModal}>
                    <div className={`${styles.modal} ${isModalOpen ? styles.open : styles.close}`}
                         onClick={(event) => event.stopPropagation()}>
                        {modalContent}
                    </div>
                </div>
            )}
        </div>
    );
};