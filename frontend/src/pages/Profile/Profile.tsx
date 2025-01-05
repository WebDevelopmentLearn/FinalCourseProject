import styles from "./Profile.module.scss";
import {Link} from "react-router-dom";
import testAvatar from "../../assets/profile/default_avatar.jpg";
import {AvatarCircle, PostCardInProfile} from "../../components";

import firstPost from "../../assets/profile/posts/1.png";
import secondPost from "../../assets/profile/posts/2.png";
import thirdPost from "../../assets/profile/posts/3.png";
import fourthPost from "../../assets/profile/posts/4.png";
import fifthPost from "../../assets/profile/posts/5.png";
import sixthPost from "../../assets/profile/posts/6.png";

interface Post {
    postId: number;
    image: string;
}

export const Profile = () => {

    const profileName: string = "itcareerhub";
    const isMyProfile = false;

    const posts: number = 129;
    const followers: number = 9993;
    const following: number = 59;

    const postsArr: Post[] = [
        {
            postId: 1,
            image: firstPost
        },
        {
            postId: 2,
            image: secondPost
        },
        {
            postId: 3,
            image: thirdPost
        },
        {
            postId: 4,
            image: fourthPost
        },
        {
            postId: 5,
            image: fifthPost
        },
        {
            postId: 6,
            image: sixthPost
        }
    ]

    return (
        <div className={styles.profile}>
            <div className={styles.profile_main}>
                <div>
                    <AvatarCircle avatar={testAvatar} avatarSize={"big"} />
                </div>

                <div className={styles.profile_info}>
                    <div className={styles.profile_info__first}>
                        <span>{profileName}</span>
                        {isMyProfile ? (
                            <div>
                                <button className={styles.profile_edit_profile_btn}>Edit Profile</button>
                            </div>
                        ) : (
                            <div className={styles.profile_follow_and_message_btn_container}>
                                <button className={styles.profile_follow_btn}>Follow</button>
                                <button className={styles.profile_message_btn}>Message</button>
                            </div>
                        )}
                    </div>
                    <div>
                        <span>{posts} posts</span>
                        <span>{followers} followers</span>
                        <span>{following} following</span>
                    </div>
                    <div>
                        <p>
                            • Гарантия помощи с трудоустройством в ведущие IT-компании
                            • Выпускники зарабатывают от 45к евро
                            БЕСПЛАТНАЯ...
                        </p>
                    </div>
                    <div>
                        <Link to="">
                            bit.ly/3rpiIbh
                        </Link>

                    </div>
                </div>

            </div>

            <div className={styles.profile_posts}>
                {postsArr.map((post: Post) => (
                    <PostCardInProfile key={post.postId} post={post} />
                ))}
            </div>
        </div>
    );
};