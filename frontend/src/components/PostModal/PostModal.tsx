import styles from "./PostModal.module.scss";
import {AvatarCircle} from "../AvatarCircle/AvatarCircle.tsx";
import testAvatar from "../../assets/profile/default_avatar.jpg";
import {Link} from "react-router-dom";

import like_icon from "../../assets/icons/like_icon.svg";
import {CustomButton} from "../CustomButton/CustomButton.tsx";
export const PostModal = ({post, handleClose}) => {


    return (
        <div className={styles.profile_post_modal_overlay} onClick={handleClose}>
            <div className={styles.profile_post_modal} onClick={(event) => event.stopPropagation()}>

                <div className={styles.profile_post_modal_image}>
                    <img src={post.image} alt=""/>
                </div>

                <div className={styles.profile_post_modal_details}>
                    <div className={styles.profile_post_modal_author_details}>
                        <AvatarCircle avatar={testAvatar} avatarSize="small" />
                        <span>{post.author.username}</span>
                        <span>•</span>
                        <CustomButton className={styles.subscribe_btn} title={"Subscribe"}/>
                    </div>

                    <div>
                        <div className={styles.post}>
                            <div>
                                <AvatarCircle avatar={testAvatar} avatarSize="small"/>
                            </div>
                            <div className={styles.post_details}>
                                <p><Link to={"/"}>itcareerhub</Link> Потрясающие новости пришли к нам из Черногории!
                                    Проект по поддержке бездомных животных
                                    TailBook, в разработке которого участвуют сразу 9 наших
                                    стажёров, будет представлен на Web Summit 2024 в
                                    Португалии🔥</p>

                                <br/>

                                <p>Мы поздравляем наших студентов, приглашаем вас на
                                    Web Summit и предлагаем стать частью огромного
                                    сообщества крутых специалистов, помогающих развивать
                                    и очищать нашу планету.

                                </p>

                                <br/>

                                <p>Занимайте место на бесплатной консультации по ссылке в
                                    шапке профиля, чтобы узнать подробности!
                                </p>

                                <div className={styles.post_date}>
                                    <span>
                                    1 day.
                                </span>
                                </div>
                            </div>

                        </div>
                        <div className={styles.post_comments}>

                            <div className={styles.post_comment}>
                                <div className={styles.post_comment_details}>
                                    <AvatarCircle avatar={testAvatar} avatarSize="small"/>
                                    <div className={styles.comment_desc_and_stats}>
                                        <div className={styles.comment_desc}>
                                            <span>coach.tonia</span>
                                            <p>😍 спасибо!!!! 👏</p>
                                        </div>
                                        <div className={styles.comment_stats}>
                                            <span>17 h.</span>
                                            <span>Likes: 1</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.comment_like}>
                                    <img src={like_icon} alt=""/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};