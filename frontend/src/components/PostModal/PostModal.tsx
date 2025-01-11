import styles from "./PostModal.module.scss";
import {AvatarCircle} from "../AvatarCircle/AvatarCircle.tsx";
import testAvatar from "../../assets/profile/default_avatar.jpg";
import {Link} from "react-router-dom";

import {CustomButton} from "../CustomButton/CustomButton.tsx";
import {ChangeEvent, MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import {CommentCard} from "../CommentCard/CommentCard.tsx";
import {CustomInput} from "../CustomInput/CustomInput.tsx";
import Picker, {EmojiClickData} from "emoji-picker-react";
import {useForm} from "react-hook-form";
import {useTheme} from "../../context/ThemeContext.tsx";

interface PostModalInputProps {


}

export const PostModal = ({post, handleClose}) => {
    const {theme} = useTheme();
    const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);
    const [moreOptionModalIsOpen, setMoreOptionModalIsOpen] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [text, setText] = useState('');
    const textareaRef: MutableRefObject<HTMLTextAreaElement> = useRef(null);


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        reset,
    } = useForm<PostModalInputProps>({mode: "onChange"});


    const handleOpenEmojiPicker = (e) => {
        e.preventDefault();
        setEmojiPickerIsOpen(!emojiPickerIsOpen);
    };
    const currentContent = watch("content") || ""; // Get current content value
    // Handle emoji click
    const onEmojiClick = (emojiData: EmojiClickData) => {
        const newContent = currentContent + emojiData.emoji; // Append emoji to content
        setValue("content", newContent); // Update content using setValue
    };


    const handleOpenMoreOptionModal = () => {
        setMoreOptionModalIsOpen(true);
    }

    const handleCloseMoreOptionModal = () => {
        setMoreOptionModalIsOpen(false);
        console.log("handleCloseMoreOptionModal")
    }


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




    const handleChange = (e) => {
        setText(e.target.value);
    };

    // Функция для авто-изменения высоты
    const autoResize = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            // Сбросим высоту перед измерением
            textarea.style.height = 'auto';
            // Устанавливаем высоту в зависимости от содержимого
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        // Вызовем autoResize каждый раз, когда меняется текст
        autoResize();
    }, [text]);


    return (
        <div className={styles.profile_post_modal_overlay} onClick={handleClose}>
            <div className={styles.profile_post_modal} onClick={(event) => event.stopPropagation()}>

                <div className={styles.profile_post_modal_image}>
                    <img src={post.image} alt=""/>
                </div>


                <div className={styles.profile_post_modal_details}>
                    <div className={styles.author}>
                        <div>
                            <AvatarCircle avatar={testAvatar} avatarSize="small" />
                            <span>{post.author.username}</span>
                            <span>•</span>
                            <CustomButton className={styles.subscribe_btn} title={"Subscribe"}/>
                        </div>

                        <div>
                            <button onClick={handleOpenMoreOptionModal} className={styles.more_btn}>
                                <svg width="22" height="21" viewBox="0 0 22 21" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.8444 11.6939C11.5464 11.6939 12.1155 11.1248 12.1155 10.4228C12.1155 9.72072 11.5464 9.15161 10.8444 9.15161C10.1424 9.15161 9.57324 9.72072 9.57324 10.4228C9.57324 11.1248 10.1424 11.6939 10.8444 11.6939Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M5.7604 11.6939C6.46243 11.6939 7.03154 11.1248 7.03154 10.4228C7.03154 9.72072 6.46243 9.15161 5.7604 9.15161C5.05837 9.15161 4.48926 9.72072 4.48926 10.4228C4.48926 11.1248 5.05837 11.6939 5.7604 11.6939Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M15.9293 11.6939C16.6314 11.6939 17.2005 11.1248 17.2005 10.4228C17.2005 9.72072 16.6314 9.15161 15.9293 9.15161C15.2273 9.15161 14.6582 9.72072 14.6582 10.4228C14.6582 11.1248 15.2273 11.6939 15.9293 11.6939Z"
                                        fill="currentColor"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={styles.post_comments}>
                        <ul>
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

                            <CommentCard avatar={testAvatar} author={"Tom"} commentDesc={"Отличный пост"}
                                         date={"10.05.2025"} likesCount={10}/>

                            <CommentCard avatar={testAvatar} author={"Alice"}
                                         commentDesc={"Отличный пост, а главное информативный"} date={"11.05.2025"}
                                         likesCount={5}/>

                            <CommentCard avatar={testAvatar} author={"Tom"}
                                         commentDesc={"Ну такое, фотки еды как по мне - интереснее"} date={"10.05.2025"}
                                         likesCount={2}/>

                            <CommentCard avatar={testAvatar} author={"Sasha"}
                                         commentDesc={"А когда этот саммит проводится? Я просто читать не умею"}
                                         date={"10.05.2025"} likesCount={1}/>

                            <CommentCard avatar={testAvatar} author={"Sasha"}
                                         commentDesc={"На самом деле крайне интересная тема. Я бы тоже хотела участвовать в таких проектах. Но у меня нет таких возможностей. Поэтому я просто смотрю на вас и восхищаюсь."}
                                         date={"10.05.2025"} likesCount={1}/>

                            <CommentCard avatar={testAvatar} author={"Sasha"}
                                         commentDesc={"Мне кажется, что людям стоит больше внимания уделять таким проектам. Ведь это действительно важно."}
                                         date={"10.05.2025"} likesCount={1}/>


                            <CommentCard avatar={testAvatar} author={"Tom"} commentDesc={"Отличный пост"}
                                         date={"10.05.2025"} likesCount={10}/>

                            <CommentCard avatar={testAvatar} author={"Alice"}
                                         commentDesc={"Отличный пост, а главное информативный"} date={"11.05.2025"}
                                         likesCount={5}/>

                            <CommentCard avatar={testAvatar} author={"Tom"}
                                         commentDesc={"Ну такое, фотки еды как по мне - интереснее"} date={"10.05.2025"}
                                         likesCount={2}/>

                            <CommentCard avatar={testAvatar} author={"Sasha"}
                                         commentDesc={"А когда этот саммит проводится? Я просто читать не умею"}
                                         date={"10.05.2025"} likesCount={1}/>

                            <CommentCard avatar={testAvatar} author={"Sasha"}
                                         commentDesc={"На самом деле крайне интересная тема. Я бы тоже хотела участвовать в таких проектах. Но у меня нет таких возможностей. Поэтому я просто смотрю на вас и восхищаюсь."}
                                         date={"10.05.2025"} likesCount={1}/>

                            <CommentCard avatar={testAvatar} author={"Sasha"}
                                         commentDesc={"Мне кажется, что людям стоит больше внимания уделять таким проектам. Ведь это действительно важно."}
                                         date={"10.05.2025"} likesCount={1}/>
                        </ul>

                    </div>

                    <div className={styles.post_stats}>
                        <div className={styles.post_card_like_and_comment}>
                            <div onClick={handleFollow}
                                 className={`${styles.hearth} ${(isAnimating && isLiked) ? styles.animate : ""}`}>
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
                                <svg width="19" height="19" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.244 13.9222C18.2906 12.1118 18.6424 9.98231 18.2335 7.93151C17.8246 5.88071 16.6831 4.0489 15.0223 2.77829C13.3614 1.50768 11.2947 0.885182 9.2084 1.02708C7.12206 1.16898 5.15874 2.06558 3.68521 3.54937C2.21167 5.03317 1.32872 7.00267 1.20131 9.08994C1.07389 11.1772 1.71071 13.2395 2.99282 14.8915C4.27492 16.5435 6.11461 17.6723 8.16819 18.0669C10.2218 18.4615 12.3488 18.095 14.1519 17.0359L18.4016 18.2219L17.244 13.9222Z"
                                        stroke="currentColor" strokeWidth="1.72264" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>

                        <div className={styles.likes_and_date_container}>
                            <span>25 likes</span>
                            <span>2 days.</span>
                        </div>
                    </div>

                    <div className={styles.comment_control}>
                        <button onClick={handleOpenEmojiPicker}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.6795 9.11678C13.484 9.11678 13.2928 9.17479 13.1301 9.28345C12.9675 9.39212 12.8407 9.54657 12.7659 9.72728C12.691 9.90798 12.6714 10.1068 12.7096 10.2987C12.7478 10.4905 12.842 10.6667 12.9803 10.805C13.1186 10.9433 13.2948 11.0375 13.4866 11.0757C13.6785 11.1138 13.8773 11.0943 14.058 11.0194C14.2387 10.9446 14.3932 10.8178 14.5018 10.6552C14.6105 10.4925 14.6685 10.3013 14.6685 10.1057C14.6685 9.84345 14.5643 9.5919 14.3788 9.40644C14.1934 9.22098 13.9418 9.11678 13.6795 9.11678ZM8.17127 10.1057C8.17127 9.9101 8.11325 9.71886 8.00454 9.55621C7.89584 9.39356 7.74133 9.26681 7.56058 9.19198C7.37982 9.11716 7.18093 9.09762 6.98907 9.13585C6.79721 9.17408 6.621 9.26835 6.48273 9.40674C6.34446 9.54513 6.25033 9.72143 6.21227 9.91332C6.17421 10.1052 6.19391 10.3041 6.26889 10.4848C6.34388 10.6655 6.47076 10.8199 6.63351 10.9284C6.79625 11.037 6.98754 11.0948 7.18317 11.0947C7.44531 11.0945 7.69663 10.9902 7.88191 10.8047C8.06719 10.6193 8.17127 10.3679 8.17127 10.1057ZM12.5465 12.8514C12.2769 13.1414 11.9504 13.3728 11.5875 13.5312C11.2245 13.6896 10.8329 13.7717 10.4369 13.7722C10.0409 13.7728 9.649 13.6919 9.28562 13.5345C8.92224 13.3771 8.59513 13.1466 8.32465 12.8573C8.18351 12.6824 7.97864 12.5706 7.75511 12.5467C7.53159 12.5228 7.30772 12.5886 7.13275 12.7298C6.95778 12.8709 6.84604 13.0758 6.82212 13.2993C6.79821 13.5229 6.86406 13.7467 7.00521 13.9217C7.43438 14.4076 7.96195 14.7967 8.55292 15.0632C9.14389 15.3297 9.78477 15.4675 10.4331 15.4675C11.0813 15.4675 11.7222 15.3297 12.3132 15.0632C12.9042 14.7967 13.4317 14.4076 13.8609 13.9217C13.9965 13.7469 14.0583 13.526 14.0332 13.3062C14.0081 13.0864 13.898 12.8852 13.7265 12.7455C13.555 12.6057 13.3357 12.5386 13.1154 12.5584C12.8951 12.5782 12.6912 12.6833 12.5474 12.8514H12.5465ZM10.4339 0.223877C8.50644 0.223877 6.62226 0.795436 5.01964 1.86628C3.41701 2.93712 2.16791 4.45914 1.43031 6.23989C0.692699 8.02063 0.499707 9.98011 0.875736 11.8705C1.25177 13.761 2.17993 15.4974 3.54285 16.8603C4.90577 18.2233 6.64224 19.1514 8.53266 19.5275C10.4231 19.9035 12.3826 19.7105 14.1633 18.9729C15.9441 18.2353 17.4661 16.9862 18.5369 15.3836C19.6078 13.7809 20.1793 11.8968 20.1793 9.9693C20.1764 7.38555 19.1487 4.90845 17.3217 3.08146C15.4947 1.25448 13.0177 0.226793 10.4339 0.223877ZM10.4339 18.0199C8.84165 18.0199 7.28516 17.5477 5.96125 16.6631C4.63734 15.7785 3.60548 14.5212 2.99615 13.0501C2.38682 11.5791 2.22739 9.96037 2.53803 8.39871C2.84866 6.83705 3.6154 5.40258 4.74129 4.27669C5.86718 3.1508 7.30166 2.38405 8.86331 2.07342C10.425 1.76279 12.0437 1.92222 13.5147 2.53155C14.9858 3.14087 16.2431 4.17273 17.1277 5.49664C18.0123 6.82055 18.4845 8.37705 18.4845 9.9693C18.4822 12.1038 17.6333 14.1501 16.124 15.6594C14.6147 17.1687 12.5684 18.0176 10.4339 18.0199Z"
                                    fill="black"/>
                            </svg>
                        </button>

                        {emojiPickerIsOpen &&
                            <div
                                // className="absolute bottom-28 md:bottom-0 z-10
                                //     -right-50 md:right-60 lg:right-80 xl:right-96"

                            >
                                <Picker theme={theme} lazyLoadEmojis={true} width={"100%"}
                                        onEmojiClick={onEmojiClick}/>
                            </div>}
                        <textarea
                            {...register("content", {required: "Content is required", maxLength: 2200})}
                            ref={textareaRef}
                            rows={1} // Начальная высота
                            style={{
                                width: '100%',
                                minHeight: '18px',
                                overflowY: 'auto'
                            }} // Стиль для авто-изменения
                            placeholder="Add a comment..."
                            className={styles.add_comment_input}/>
                        <CustomButton title="send" className={styles.post_comment_btn}/>
                    </div>
                </div>
                {moreOptionModalIsOpen && (
                    <div className={styles.post_more_modal_overlay} onClick={handleCloseMoreOptionModal}>
                        <div className={styles.post_more_modal} onClick={(event) => event.stopPropagation()}>
                            <CustomButton title={"Delete"} className={`${styles.more_btn} ${styles.delete_btn}`}/>
                            <CustomButton title={"Edit"} className={`${styles.more_btn} ${styles.edit_btn}`}/>
                            <CustomButton title={"Go to Post"}
                                          className={`${styles.more_btn} ${styles.go_to_post_btn}`}/>
                            <CustomButton title={"Copy Link"} className={`${styles.more_btn} ${styles.copy_link_btn}`}/>
                            <CustomButton title={"Cancel"} className={`${styles.more_btn} ${styles.cancel_btn}`}
                                          onClick={handleCloseMoreOptionModal}/>
                        </div>

                    </div>
                )}
            </div>

        </div>
    );
};