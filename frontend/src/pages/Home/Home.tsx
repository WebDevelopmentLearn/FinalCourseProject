import {useEffect, useRef, useState} from "react";
import LazyLoad from "react-lazyload";

import styles from "./Home.module.scss";
import {PostCard} from "../../components";
import check from "../../assets/home/check_in_circle.svg";
import {SkeletonPost} from "../../components/skeletons/SkeletonPost/SkeletonPost.tsx";
import {getAllPosts} from "../../store/api/postsActionCreators.ts";
import {useAppDispatch, useAppSelector} from "../../utils/CustomHooks.ts";

export const Home = () => {
    const dispatch = useAppDispatch();
    const { posts, loading, hasMore, page } = useAppSelector(state => state.postReducer);

    const [loadingMore, setLoadingMore] = useState(false);

    // Функция для загрузки данных с учетом пагинации
    const loadMorePosts = () => {
        if (!loading && hasMore && !loadingMore) {
            setLoadingMore(true);
            console.log('Loading more posts, current page:', page);
            dispatch(getAllPosts(page)); // Отправляем запрос для получения новых постов
        }
    };

    useEffect(() => {
        if (loadingMore) {
            setLoadingMore(false);
        }
    }, [posts]);


    // Ссылка на элемент, который будет отслеживаться
    const observerTarget = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Создаем новый IntersectionObserver
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMorePosts(); // Загружаем больше постов, если целевой элемент стал видимым
                }
            },
            { threshold: 1.0 } // Устанавливаем порог, чтобы срабатывать, когда целевой элемент полностью в пределах экрана
        );

        // Начинаем отслеживание элемента
        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        // Очищаем наблюдатель при размонтировании компонента
        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [loadingMore]);

    return (
        <div>
            <div className={styles.home}>
                <div className={styles.home_posts__list} >
                    {posts.map((post) => (
                        <LazyLoad key={post._id} height={200} offset={100}>
                            <PostCard post={post}/>
                        </LazyLoad>
                    ))}
                    {loading && (
                        new Array(12).fill(0).map((_, i) => (
                                <SkeletonPost key={i}/>
                            ))
                    )}
                </div>
                <div ref={observerTarget} className={styles.home_end}>
                    <img src={check} alt="check"/>
                    <h2>You've seen all the updates</h2>
                    <h3>You have viewed all new publications</h3>
                </div>
            </div>
        </div>
    );
};