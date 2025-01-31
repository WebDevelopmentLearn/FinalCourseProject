import {MouseEvent, useState, useEffect, useRef} from "react";
import Picker, {EmojiClickData} from "emoji-picker-react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Не забудьте подключить стили

import styles from "./CreatePostModal.module.scss";
import {CustomButton} from "../../inputs/CustomButton/CustomButton.tsx";
import {AvatarCircle} from "../../other/AvatarCircle/AvatarCircle.tsx";
import {closeCreatePostModal} from "../../../store/reducers/modalSlice.ts";
import {useTheme} from "../../../context/ThemeContext.tsx";
import {createPost} from "../../../store/api/actionCreators.ts";
import {AppDispatch, RootState} from "../../../store/ichgramStore.ts";
import {getEnumTheme} from "../../../utils/Utils.ts";
import {Slider} from "../../inputs/Slider/Slider.tsx";
import {useImages} from "../../../context/ImageContext.tsx";
import {IImage} from "../../../utils/types.ts";


interface CreatePostFormInputs {
    photos: FileList;
    content: string;
}

export const CreatePostModal = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const elementRef = useRef<HTMLDivElement | null>(null);
    const { images } = useImages();
    const {theme} = useTheme();
    const {user} = useSelector((state: RootState) => state.userReducer);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm<CreatePostFormInputs>({defaultValues: {content: ""}});
    const currentContent = watch("content") || ""; // Get current content value

    const handleCloseModal = () => {
        dispatch(closeCreatePostModal());
    }

    useEffect(() => {
        if (images) {
            const filePreviews: string[] = []; // Массив для превью

            // Итерация по всем выбранным файлам
            Array.from(images).forEach((file) => {

                const reader = new FileReader();

                reader.onloadend = () => {
                    if (reader.result) {
                        filePreviews.push(reader.result as string); // Добавляем превью в массив
                    }

                    // Если это последний файл, обновляем состояние
                    if (filePreviews.length === images.length) {
                        setPreviews(filePreviews);
                    }
                };

                reader.readAsDataURL(file.blob); // Читаем файл как Data URL
            });
        }
    }, [images]);

    // useEffect((): void => {
    //
    //     return setValue("photos", images.map((image: IImage) => image.blob));
    // }, [images, setValue]);

    useEffect(() => {
        const dataTransfer = new DataTransfer();

        images.forEach((image: IImage) => {
            const file = new File([image.blob], "image.jpg", { type: image.blob.type });
            dataTransfer.items.add(file);
        });

        setValue("photos", dataTransfer.files); // ✅ Correctly sets a FileList
    }, [images, setValue]);

    const handleOpenEmojiPicker = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setEmojiPickerIsOpen(!emojiPickerIsOpen);
    };

    // Handle emoji click
    const onEmojiClick = (emojiData: EmojiClickData) => {
        const newContent = currentContent + emojiData.emoji; // Append emoji to content
        setValue("content", newContent); // Update content using setValue
    };

    const handleSubmitCreatePost: SubmitHandler<CreatePostFormInputs> = async(data: CreatePostFormInputs) => {
        try {
            setIsSubmitting(true);
            if (data) {
               const result = await dispatch(createPost({ photos: data.photos, content: data.content }));
               if (createPost.fulfilled.match(result)) {
                   console.log("Post created");
                   handleCloseModal();
                   toast.success("Post created successfully!", {
                       autoClose: 2000
                   });
               }
           }
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Error creating post. Please try again.", {
                autoClose: 2000
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        const updateSize = () => {
            if (elementRef.current) {
                const { width, height } = elementRef.current.getBoundingClientRect();
                setSize({ width, height });
            }
        };

        const observer = new MutationObserver(() => {
            updateSize();
        });

        if (elementRef.current) {
            observer.observe(elementRef.current, {
                attributes: true,
                childList: true,
                subtree: true,
            });
        }

        const handleLoad = () => updateSize();
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        window.addEventListener("resize", updateSize);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateSize);
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    if (!user) {
        return null;
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
                        <CustomButton disabled={isSubmitting || images.length > 0 && currentContent.length > 0 && images.length < 1 && currentContent.length < 1} className={styles.share_post_btn} title="Share" type="submit"/>
                    </header>
                    <main className={styles.create_post_modal_content}>
                        <div ref={elementRef} className={`${styles.upload_photo} ${emojiPickerIsOpen ? styles.test : styles.test2} ${previews ? styles.test3 : styles.test4}`}>
                            <Slider maxImages={5} maxWidth={size.width - 32}/>
                        </div>

                        <div className={styles.create_post_modal_form} style={{
                            minWidth: emojiPickerIsOpen ? "auto" : "240px"
                        }}>
                            <div className={styles.personal_info}>
                                <AvatarCircle user={user}/>
                                <p>{user?.username}</p>
                                {errors && errors.photos && <span>{errors.photos.message}</span>}
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