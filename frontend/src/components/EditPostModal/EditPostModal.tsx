import {ChangeEvent, MouseEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/ichgramStore.ts";
import {useTheme} from "../../context/ThemeContext.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {closeCreatePostModal} from "../../store/reducers/modalSlice.ts";
import Picker, {EmojiClickData} from "emoji-picker-react";
import {createPost, updatePost} from "../../store/api/actionCreators.ts";
import styles from "../CreatePostModal/CreatePostModal.module.scss";
import {CustomButton} from "../CustomButton/CustomButton.tsx";
import {AvatarCircle} from "../AvatarCircle/AvatarCircle.tsx";
import testAvatar from "../../assets/profile/default_avatar.jpg";
import {getEnumTheme} from "../../utils/Utils.ts";

interface EditPostFormInputs {
    content: string;
    photo: FileList | null;
}

export const EditPostModal = ({post}) => {
    const [preview, setPreview] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);

    const {theme} = useTheme();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm<EditPostFormInputs>({defaultValues: {content: post?.content, photo: post?.photo}});
    const currentContent = watch("content") || ""; // Get current content value

    const handleCloseModal = () => {
        dispatch(closeCreatePostModal());
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };



    const handleOpenEmojiPicker = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setEmojiPickerIsOpen(!emojiPickerIsOpen);
    };

    // Handle emoji click
    const onEmojiClick = (emojiData: EmojiClickData) => {
        const newContent = currentContent + emojiData.emoji; // Append emoji to content
        setValue("content", newContent); // Update content using setValue
    };

    const allValues = watch();
    console.log("All values:", allValues);

    const handleSubmitCreatePost: SubmitHandler<EditPostFormInputs> = async(data: EditPostFormInputs) => {
        try {
            if (data) {
                console.log("Create post data:", data);

                const result = await dispatch(updatePost({
                    postId: post._id,
                    content: data.content,
                    photo: data.photo
                }));
                if (createPost.fulfilled.match(result)) {
                    console.log("Post created");
                    handleCloseModal();
                }
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }


    return (
        <div className={styles.create_post_modal_overlay} onClick={handleCloseModal}>
            <div
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                }}
            >
                <form className={styles.create_post_modal} onSubmit={handleSubmit(handleSubmitCreatePost)}>
                    <header className={styles.create_post_modal_header}>
                        <div className={styles.header}>
                            <h1>Create new post</h1>
                        </div>
                        <CustomButton className={styles.share_post_btn} title="Share" type="submit"/>
                    </header>
                    <main className={styles.create_post_modal_content}>
                        <div className={`${styles.upload_photo} ${emojiPickerIsOpen ? styles.test : styles.test2} ${preview ? styles.test3 : styles.test4}`}>
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
                                />
                            ) : (
                                <svg
                                    style={{display: preview ? "none" : "initial",
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translateY(-50%) translateX(-50%)"}}
                                    fill="#000000"
                                    width="40px"
                                    height="40px"
                                    viewBox="0 0 36 36"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>upload-cloud-line</title>
                                    <path
                                        d="M30.31,13c0-.1,0-.21,0-.32a10.26,10.26,0,0,0-10.45-10,10.47,10.47,0,0,0-9.6,6.1A9.74,9.74,0,0,0,1.6,18.4,9.62,9.62,0,0,0,11.25,28H15V26H11.25A7.65,7.65,0,0,1,11,10.74l.67,0,.23-.63a8.43,8.43,0,0,1,8-5.4,8.26,8.26,0,0,1,8.45,8,7.75,7.75,0,0,1,0,.8l-.08.72.65.3A6,6,0,0,1,26.38,26H21v2h5.38a8,8,0,0,0,3.93-15Z"></path>
                                    <path
                                        d="M22.28,21.85A1,1,0,0,0,23,20.14l-5-5-5,5a1,1,0,0,0,1.41,1.41L17,19V31.25a1,1,0,1,0,2,0V19l2.57,2.57A1,1,0,0,0,22.28,21.85Z"></path>
                                    <rect x="0" y="0" width="36" height="36" fillOpacity="0"/>
                                </svg>
                            )}
                            <input type="file"
                                   {...register("photo", {required: "Photo is required"})}

                                   onChange={handleFileChange}/>
                        </div>

                        <div className={styles.create_post_modal_form} style={{
                            minWidth: emojiPickerIsOpen ? "auto" : "240px"
                        }}>
                            <div className={styles.personal_info}>
                                <AvatarCircle avatar={post?.author?.avatar}/>
                                <p>{post?.author?.username}</p>
                                {errors && errors.photo && <span>{errors.photo.message}</span>}
                                {errors && errors.content && <span>{errors.content.message}</span>}

                            </div>
                            <div className={styles.comment_input}>
                                <label htmlFor="content"></label>
                                <textarea {...register("content", {
                                    required: "Description is required",
                                    maxLength: 2200
                                })}
                                          id="content"
                                          name="content"
                                          placeholder="Write a caption..."></textarea>

                            </div>
                            <div className={styles.emoji_picker_and_symbol_counter} style={{
                                flexDirection: emojiPickerIsOpen ? "column" : "row"
                            }}>
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
                                        <Picker theme={getEnumTheme(theme)} lazyLoadEmojis={true} width={"100%"}
                                                onEmojiClick={onEmojiClick}/>
                                    </div>}
                                <span>{currentContent?.length}/{2200}</span>
                            </div>
                        </div>

                    </main>
                </form>
            </div>
        </div>
    );
};