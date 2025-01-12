import styles from "./Profile.module.scss";
import testAvatar from "../../assets/profile/default_avatar.jpg";
import {AvatarCircle, CustomButton, ExpandableText, PostCardInProfile, PostModal} from "../../components";

import {useState} from "react";
import {Post} from "../../utils/Entitys.ts";
import {postsArr} from "../../utils/DebugUtils.ts";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@reduxjs/toolkit/query";



export const Profile = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const {user} = useSelector((state: RootState) => state.userReducer);

    const profileName: string = "itcareerhub";
    const isMyProfile = true;

    const posts: number = 129;
    const followers: number = 9993;
    const following: number = 59;



    const text: string =
        "• Гарантия помощи с трудоустройством в ведущие IT-компании\n" +
        "• Выпускники зарабатывают от 45к евро\n" +
        "БЕСПЛАТНАЯ...\n" +
        "• Гарантия помощи с трудоустройством в ведущие IT-компании\n" +
        "• Выпускники зарабатывают от 45к евро\n" +
        "БЕСПЛАТНАЯ...\n" +
        "• Гарантия помощи с трудоустройством в ведущие IT-компании\n" +
        "• Выпускники зарабатывают от 45к евро\n" +
        "БЕСПЛАТНАЯ...\n" +
        "• Гарантия помощи с трудоустройством в ведущие IT-компании\n" +
        "• Выпускники зарабатывают от 45к евро\n" +
        "БЕСПЛАТНАЯ...";

    const [currentPost, setCurrentPost] = useState({});

    const handleOpenModal = (post: Post) => {
        setIsModalOpen(true);
        setCurrentPost(post);
    }

    const handleClose = (e) => {
        setIsModalOpen(false);
        setCurrentPost({});
    }

    const navigate: NavigateFunction = useNavigate();
    const handleRedirect = () => {
        navigate("/edit_profile");
    }

    return (
        <div className={styles.profile}>
            <div className={styles.profile_main}>
                <div>
                    <AvatarCircle avatar={user?.user?.avatar} avatarSize={"big"} />
                </div>

                <div className={styles.profile_info}>
                    <div className={styles.profile_info__first}>
                        <span>{user?.user?.username}</span>
                        {isMyProfile ? (
                            <div>
                                <CustomButton onClick={handleRedirect} title="Edit Profile" className={styles.profile_edit_profile_btn} />
                            </div>
                        ) : (
                            <div className={styles.profile_follow_and_message_btn_container}>
                                <button className={styles.profile_follow_btn}>Follow</button>
                                <button className={styles.profile_message_btn}>Message</button>
                            </div>
                        )}
                    </div>
                    <div className={styles.profile_stats}>
                        <span>{posts} posts</span>
                        <span>{followers} followers</span>
                        <span>{following} following</span>
                    </div>
                    <div className={styles.profile_about}>
                        {/*<p>*/}
                        {/*    • Гарантия помощи с трудоустройством в ведущие IT-компании*/}
                        {/*    • Выпускники зарабатывают от 45к евро*/}
                        {/*    БЕСПЛАТНАЯ...*/}
                        {/*</p>*/}
                        <ExpandableText textClass={styles.profile_desc}  text={text} maxHeight={50} />
                    </div>
                    <div>
                        <span>
                            <svg aria-label="Link-Symbol." className="" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12">
                                <title>Link-Symbol.</title>
                                <path d="m9.726 5.123 1.228-1.228a6.47 6.47 0 0 1 9.15 9.152l-1.227 1.227m-4.603 4.603-1.228 1.228a6.47 6.47 0 0 1-9.15-9.152l1.227-1.227"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2">
                                </path>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="8.471" x2="15.529" y1="15.529" y2="8.471"></line>
                            </svg>
                        </span>
                        <a href="https://bit.ly/3rpiIbh" target="_blank">
                            bit.ly/3rpiIbh
                        </a>

                    </div>
                </div>

            </div>

            <div className={styles.profile_posts}>
                {postsArr.map((post: Post) => (
                    <PostCardInProfile onClick={() => handleOpenModal(post)} key={post.id} post={post}/>
                ))}
            </div>

            {isModalOpen && (
                <PostModal handleClose={handleClose} post={currentPost} />
            )}
        </div>
    );
};