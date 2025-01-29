import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";

import styles from "./Profile.module.scss";
import {AvatarCircle, CustomButton, ExpandableText, PostCardInProfile} from "../../components";
import {userData} from "../../store/selectors.ts";
import {useCheckMyAccess} from "../../utils/CustomHooks.ts";
import {AppDispatch, RootState} from "../../store/ichgramStore.ts";
import {followUser, getAllPostsByUser, getUserById, logoutUser} from "../../store/api/actionCreators.ts";
import {IPost, IUser} from "../../utils/Entitys.ts";
import {toast} from "react-toastify";

export const Profile = () => {

    const user = useSelector((state: RootState) => state.userReducer.user); // Текущий пользователь
    const {currentUser} = useSelector((state: RootState) => state.userReducer); // Для использования в getUserById
    const posts = useSelector((state: RootState) => state.postReducer.postsByUser);
    const dispatch = useDispatch<AppDispatch>();
    const navigate: NavigateFunction = useNavigate();
    const {_id} = useParams();

    // Проверка, является ли это личный профиль или чужой
    const isMyProfile = _id === user?._id;

    // Считаем статистику постов и подписок
    const postsCount = currentUser?.posts?.length ?? 0;
    const followers = currentUser?.followers?.length ?? 0;
    const following = currentUser?.following?.length ?? 0;
    const isFollowing = currentUser?.followers?.includes(user?._id) ?? false;

    const handleRedirect = () => navigate("/edit_profile");

    const handleFollow = async () => {
        try {
            await dispatch(followUser({userId: _id}));
            toast.success("You have successfully subscribed to the user", {autoClose: 2000});
        } catch (error) {
            console.error("Failed to follow user: ", error);
            toast.error("Failed to follow user", {autoClose: 2000});
        }
    };

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser());
            navigate("/signin");
        } catch (error) {
            console.error("Failed to logout: ", error);
        }
    };

    // Загрузка данных профиля
    useEffect(() => {
        const fetchUserData = async () => {
            if (!_id) return;

            if (_id === user?._id) {
                // Если это личный профиль, то мы уже имеем все данные в Redux
            } else {
                const result = await dispatch(getUserById({userId: _id}));
                // Если профиль другого пользователя, данные уже в Redux
            }
        };
        fetchUserData();
    }, [_id]);

    // Загрузка постов пользователя
    useEffect(() => {
        if (_id) {
            dispatch(getAllPostsByUser({userId: _id}));
        }
    }, [_id, dispatch]);

    return (
        <div className={styles.profile}>
            <div className={styles.profile_main}>
                <div>
                    <AvatarCircle user={currentUser} avatarSize={"big"} hasLink={false}/>
                </div>

                <div className={styles.profile_info}>
                    <div className={styles.profile_info__first}>
                        <span>{currentUser?.username}</span>
                        {isMyProfile ? (
                            <div>
                                <CustomButton onClick={handleRedirect} title="Edit Profile"
                                              className={styles.profile_edit_profile_btn}/>
                                <CustomButton onClick={handleLogout} title="Logout" className={styles.logout_btn}/>
                            </div>
                        ) : (
                            <div className={styles.profile_follow_and_message_btn_container}>
                                <CustomButton disabled={isFollowing} onClick={handleFollow}
                                              title={isFollowing ? "Unfollow" : "Follow"}
                                              className={styles.profile_follow_btn}/>
                                <CustomButton title="Message" className={styles.profile_message_btn}/>
                            </div>
                        )}
                    </div>
                    <div className={styles.profile_stats}>
                        <span>{postsCount} posts</span>
                        <span>{followers} followers</span>
                        <span>{following} following</span>
                    </div>
                    <div className={styles.profile_about}>
                        <ExpandableText textClass={styles.profile_desc} text={currentUser?.bio ?? ""} maxHeight={50}/>
                    </div>
                    <div>
                        <span>
                            <svg aria-label="Link-Symbol." className="" fill="currentColor" height="12" role="img"
                                 viewBox="0 0 24 24" width="12">
                                <title>Link-Symbol.</title>
                                <path
                                    d="m9.726 5.123 1.228-1.228a6.47 6.47 0 0 1 9.15 9.152l-1.227 1.227m-4.603 4.603-1.228 1.228a6.47 6.47 0 0 1-9.15-9.152l1.227-1.227"
                                    fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2"></path>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" x1="8.471" x2="15.529" y1="15.529" y2="8.471"></line>
                            </svg>
                        </span>
                        <a href={currentUser?.website} target="_blank" rel="noopener noreferrer">
                            {currentUser?.website}
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.profile_posts}>
                {posts.length ? (
                    posts.map((post: IPost) => <PostCardInProfile key={post._id} post={post} />)
                ) : (
                    <h1>No posts</h1>
                )}
            </div>
        </div>
    );
};