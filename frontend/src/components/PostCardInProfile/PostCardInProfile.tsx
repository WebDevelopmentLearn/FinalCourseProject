import styles from "./PostCardInProfile.module.scss";
import {PostCardInProfileProps} from "../../utils/Entitys.ts";
import {SimpleSlider} from "../SimpleSlider/SimpleSlider.tsx";
import {useEffect, useRef, useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

export const PostCardInProfile = ({post}: PostCardInProfileProps) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        const updateSize = () => {
            if (elementRef.current) {
                const { width, height } = elementRef.current.getBoundingClientRect();
                setSize({ width, height });
            }
        };

        // Используем MutationObserver для отслеживания изменений DOM
        const observer = new MutationObserver(() => {
            updateSize();
        });

        // Следим за элементом, если он существует
        if (elementRef.current) {
            observer.observe(elementRef.current, {
                attributes: true,
                childList: true,
                subtree: true,
            });
        }

        // Принудительно вызываем расчет размеров после полной загрузки страницы
        const handleLoad = () => updateSize();
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        // Подписка на изменения размера окна
        window.addEventListener("resize", updateSize);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateSize);
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    console.log("Post: ", post);

    return (
        <div ref={elementRef} onClick={() => {
            navigate(`/profile/${post?.author}/${post?._id}`);
        }} className={styles.post_card_in_profile} >
            {/*<Slider inModal={false} postImages={post.photo} />*/}
            <SimpleSlider maxWidth={size.width} postImages={post?.photo} sliderType="ViewPost"/>
        </div>
    );
};