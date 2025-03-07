import styles from "../../../pages/Profile/Profile.module.scss";
import {AvatarCircle} from "../AvatarCircle/AvatarCircle.tsx";
import {CustomButton} from "../../inputs/CustomButton/CustomButton.tsx";
import {ExpandableText} from "../ExpandableText/ExpandableText.tsx";
import {followUser} from "../../../store/api/userActionCreators.ts";
import {toast} from "react-toastify";

import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {IUser} from "../../../utils/types.ts";
import {logoutUser} from "../../../store/api/authActionCreators.ts";
import {useAppDispatch, useAppSelector} from "../../../utils/CustomHooks.ts";


interface ProfileHeaderProps {
    user: IUser;
}

export const ProfileHeader = ({user}: ProfileHeaderProps) => {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();
    const {_id} = useParams();
    const {user: primaryUser} = useAppSelector(state => state.userReducer);
    const isMyProfile = _id === primaryUser?._id;
    const postsCount = user?.posts?.length ?? 0;
    const followers = user?.followers?.length ?? 0;
    const following = user?.following?.length ?? 0;

    const isFollowing = user?.followers?.some(follower => follower._id === user?._id) ?? false;

    const handleRedirect = () => navigate("/edit_profile");

    const handleFollow = async () => {
        try {
            if (!_id) return;

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

    if (!primaryUser || !user) return null;

    return (
        <div className={styles.profile_main}>
            <div>
                <AvatarCircle user={user} avatarSize={"big"} hasLink={false}/>
            </div>

            <div className={styles.profile_info}>
                <div className={styles.profile_info__first}>
                    <span>{user?.username}</span>
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
                    <ExpandableText textClass={styles.profile_desc} text={user?.bio ?? ""} maxHeight={50}/>
                </div>
                <div className={styles.profile_website}>
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
                    <a href={user?.website} target="_blank" rel="noopener noreferrer">
                        {user?.website}
                    </a>
                </div>
            </div>
        </div>
    );
};