import styles from "./PostCard.module.scss";
import {Link} from "react-router-dom";

import testPostImage from "../../assets/post/test_post.png";
import testAvatar from "../../assets/post/test_avatar.png";

import {AvatarCircle} from "../AvatarCircle/AvatarCircle.tsx";
import {useCallback, useState} from "react";
export const PostCard = () => {

    //let isLiked = true;//#FF3040
    const [isLiked, setIsLiked] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const handleFollow = useCallback(() => {
        isLiked ? setIsLiked(false) : setIsLiked(true);
        console.log("handleFollow");
        setIsAnimating(true);

        // Убираем класс анимации после её завершения
        if (!isLiked) {
            setTimeout(() => {
                setIsAnimating(false);
            }, 300); // Должно совпадать с длительностью анимации в CSS
        }

    }, [isLiked]);




    const commentsCount: number = 442;

    return (
        <div className={`${styles.post_card}`}>
            <div className={styles.post_card__author}>
                <div className={styles.post_card__avatar}>
                    <AvatarCircle avatar={testAvatar} className={styles.post_card__avatar__circle}/>
                    {/*<img src={testAvatar} alt=""/>*/}
                </div>

                <div className={styles.post_card__author__right_block}>
                    <span className={styles.post_card__author__name}>sashaa</span>
                    <span className={styles.post_card__author__date}>2 wek</span>
                    {/*<Link to="/">follow</Link>*/}
                    <button className={styles.post_card__author__follow}>follow</button>
                </div>
            </div>

            <div className={styles.post_card__image}>
                <img src={testPostImage} alt="testPostImage"/>
            </div>

            <div className={styles.post_card__content}>
                <div className={styles.post_card_like_and_comment}>
                    <div onClick={handleFollow} className={`${styles.hearth} ${(isAnimating && isLiked) ? styles.animate : ""}`}>
                        <svg className={isLiked ? styles.post_card__like : ""} width="21"
                             height="19"
                             viewBox="0 0 21 19" fill={"currentColor"} xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="currentColor"
                                d="M14.4633 2.6354C15.5955 2.69798 16.657 3.2055 17.4166 4.04736C18.1762 4.88921 18.5722 5.99716 18.5184 7.12975C18.5184 9.77572 16.2342 11.401 14.0422 13.3502C11.8785 15.2821 10.7132 16.3381 10.3359 16.5819C9.92506 16.3157 8.49011 15.0117 6.62966 13.3502C4.42813 11.3933 2.15339 9.75247 2.15339 7.12975C2.09961 5.99716 2.49567 4.88921 3.25524 4.04736C4.01481 3.2055 5.07633 2.69798 6.20847 2.6354C6.83564 2.61639 7.45701 2.76044 8.01183 3.05348C8.56665 3.34652 9.03594 3.7785 9.37382 4.30721C10.0973 5.31926 10.2179 5.82572 10.3385 5.82572C10.4591 5.82572 10.5779 5.31926 11.2946 4.30463C11.6305 3.77347 12.1 3.33977 12.656 3.04686C13.2121 2.75394 13.8353 2.61206 14.4633 2.6354ZM14.4633 0.91276C13.6812 0.887718 12.9035 1.03945 12.1881 1.35664C11.4728 1.67384 10.8382 2.14833 10.3316 2.74478C9.82547 2.15007 9.19218 1.67667 8.47852 1.35957C7.76486 1.04247 6.98907 0.889774 6.20847 0.91276C4.61923 0.974906 3.11925 1.66381 2.03654 2.82884C0.953831 3.99387 0.376485 5.54022 0.430753 7.12975C0.430753 10.2391 2.62711 12.1487 4.75026 13.9945C4.99402 14.2063 5.24035 14.4199 5.48497 14.6379L6.36954 15.4286C7.33425 16.3465 8.34563 17.2142 9.39966 18.028C9.67854 18.2086 10.0037 18.3047 10.3359 18.3047C10.6681 18.3047 10.9933 18.2086 11.2722 18.028C12.3597 17.1893 13.4022 16.2937 14.3953 15.345L15.1894 14.6353C15.4418 14.4113 15.6976 14.1883 15.9517 13.9686C17.962 12.2245 20.2411 10.2477 20.2411 7.12975C20.2953 5.54022 19.718 3.99387 18.6353 2.82884C17.5526 1.66381 16.0526 0.974906 14.4633 0.91276Z"
                            />
                        </svg>
                    </div>
                    <div className={styles.comment_icon}>
                        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.244 13.9222C18.2906 12.1118 18.6424 9.98231 18.2335 7.93151C17.8246 5.88071 16.6831 4.0489 15.0223 2.77829C13.3614 1.50768 11.2947 0.885182 9.2084 1.02708C7.12206 1.16898 5.15874 2.06558 3.68521 3.54937C2.21167 5.03317 1.32872 7.00267 1.20131 9.08994C1.07389 11.1772 1.71071 13.2395 2.99282 14.8915C4.27492 16.5435 6.11461 17.6723 8.16819 18.0669C10.2218 18.4615 12.3488 18.095 14.1519 17.0359L18.4016 18.2219L17.244 13.9222Z"
                                stroke="currentColor" strokeWidth="1.72264" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <span>101 824</span><span>likes</span>
                </div>
                <div>
                    <p>
                        Sashaa 𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅𝒆𝒏, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!
                        heyyyyy | M... more
                    </p>
                </div>
                <div className={styles.post_card__comments}>
                    <Link to={"/"}>
                        <span>View all comments ({commentsCount})</span>
                    </Link>
                </div>
            </div>

        </div>
    );
};