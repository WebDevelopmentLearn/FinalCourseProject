import styles from "./Profile.module.scss";
import testAvatar from "../../assets/profile/default_avatar.jpg";
import {AvatarCircle, CustomButton, ExpandableText, PostCardInProfile, PostModal} from "../../components";

import {useCallback, useEffect, useState} from "react";
import {IPost} from "../../utils/Entitys.ts";
import {postsArr} from "../../utils/DebugUtils.ts";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userData} from "../../store/selectors.ts";
import {useCheckMyAccess} from "../../utils/CustomHooks.ts";
import {AppDispatch, RootState} from "../../store/ichgramStore.ts";
import {getAllPostsByUser, logoutUser} from "../../store/api/actionCreators.ts";
import {clearStatus} from "../../store/reducers/authSlice.ts";



export const Profile = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const user = useSelector(userData);
    const {posts} = useSelector((state: RootState) => state.postReducer);
    const {logoutStatus} = useSelector((state: RootState) => state.authReducer);

    const {_id} = useParams();

    const isMyProfile: boolean = useCheckMyAccess(_id, user?._id);

    const postsCount: number = user?.posts ? user?.posts.length as number : 0;
    const followers: number = user?.followers ? user?.followers.length as number : 0;
    const following: number = user?.following ? user?.following.length as number : 0;

    const dispatch = useDispatch<AppDispatch>();


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

    const handleLogout = async() => {
        try {
            await dispatch(logoutUser());
            if (logoutStatus === "SUCCESS") {
                navigate("/signin");
            }
        } catch (error) {
            console.error("Failed to logout: ", error);
        }
    }

    // useEffect(() => {
    //     if (logoutStatus === "SUCCESS") {
    //         navigate("/signin");
    //         clearStatus("logoutStatus");
    //     }
    // }, [dispatch]);

    useEffect(() => {
        const fetchUserPosts = async() => {
            try {
                await dispatch(getAllPostsByUser({userId: _id}));

                console.log("fetchUserPosts is done");

            } catch (error) {
                console.error("Failed to fetch users posts: ", error);
            }
        }
        fetchUserPosts();
    }, [dispatch]);

    console.log("user?.posts: ", posts);
    return (
        <div className={styles.profile}>
            <div className={styles.profile_main}>
                <div>
                    <AvatarCircle user={user} avatarSize={"big"} />
                </div>

                <div className={styles.profile_info}>
                    <div className={styles.profile_info__first}>
                        <span>{user?.username}</span>
                        {isMyProfile ? (
                            <div>
                                <CustomButton onClick={handleRedirect} title="Edit Profile" className={styles.profile_edit_profile_btn} />
                                <CustomButton onClick={handleLogout} title="Logout" className={styles.logout_btn} />
                            </div>
                        ) : (
                            <div className={styles.profile_follow_and_message_btn_container}>
                                <button className={styles.profile_follow_btn}>Follow</button>
                                <button className={styles.profile_message_btn}>Message</button>
                            </div>
                        )}
                    </div>
                    <div className={styles.profile_stats}>
                        <span>{postsCount} posts</span>
                        <span>{followers} followers</span>
                        <span>{following} following</span>
                    </div>
                    <div className={styles.profile_about}>
                        <ExpandableText textClass={styles.profile_desc}  text={user?.bio} maxHeight={50} />
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
                        <a href={user?.website} target="_blank">
                            {user?.website}
                        </a>

                    </div>
                </div>

            </div>

            <div className={styles.profile_posts}>
                {(posts && posts?.length > 0) ? posts?.map((post) => (
                    <PostCardInProfile  key={post._id} post={post}/>
                )) : <h1>No posts</h1>}
            </div>

            {/*{isModalOpen && (*/}
            {/*    <PostModal handleClose={handleClose} post={currentPost} />*/}
            {/*)}*/}
        </div>
    );
};