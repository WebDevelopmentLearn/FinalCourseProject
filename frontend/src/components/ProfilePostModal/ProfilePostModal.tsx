import styles from "./ProfilePostModal.module.scss";
import {AvatarCircle} from "../AvatarCircle/AvatarCircle.tsx";
import testAvatar from "../../assets/profile/default_avatar.jpg";
export const ProfilePostModal = ({post, handleClose}) => {


    return (
        <div className={styles.profile_post_modal_overlay} onClick={handleClose}>
            <div className={styles.profile_post_modal} onClick={(event) => event.stopPropagation()}>

                <div className={styles.profile_post_modal_image}>
                    <img src={post.image} alt=""/>
                </div>

                <div className={styles.profile_post_modal_details}>
                    <div className={styles.profile_post_modal_author_details}>
                        <AvatarCircle avatar={testAvatar} avatarSize="small" />
                        <span>itcareerhub</span>
                        <button>Subscribe</button>
                    </div>

                    <div>
                        <div className={styles.post_details}>
                            <div>
                                <AvatarCircle avatar={testAvatar} avatarSize="small" />
                            </div>
                            <div>
                                <span>itcareerhub</span>
                                <p>Потрясающие новости пришли к нам из</p>

                                <br/>

                                <p>Черногории! Проект по поддержке бездомных животных
                                    TailBook, в разработке которого участвуют сразу 9 наших
                                    стажёров, будет представлен на Web Summit 2024 в
                                    Португалии🔥
                                </p>

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
                            </div>

                            <div className={styles.post_comments}>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};