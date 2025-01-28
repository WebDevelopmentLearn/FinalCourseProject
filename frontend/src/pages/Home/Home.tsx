import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import LazyLoad from "react-lazyload";

import styles from "./Home.module.scss";
import {PostCard} from "../../components";
import check from "../../assets/home/check_in_circle.svg";
import {AppDispatch, RootState} from "../../store/ichgramStore.ts";
import {getAllPosts} from "../../store/api/actionCreators.ts";
import {posts} from "../../store/selectors.ts";
import {IPost} from "../../utils/Entitys.ts";

export const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, hasMore, page } = useSelector((state: RootState) => state.postReducer);

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
                    {/*{(posts.map((post: IPost, index) => (*/}
                    {/*    <LazyLoad key={index} height={200} offset={100}>*/}
                    {/*        <PostCard post={post}/>*/}
                    {/*    </LazyLoad>*/}
                    {/*)) : <h1>No posts</h1}*/}
                    {posts.length === 0 ? (
                        <p>No posts available.</p>
                    ) : (
                        posts.map((post) => {
                            console.log("Post: ", post);
                            return <LazyLoad key={post._id} height={200} offset={100}>
                                <PostCard post={post}/>
                            </LazyLoad>
                        })
                    )}
                    {loading && <p>Loading...</p>}
                    {/*{!hasMore && <p>No more posts to load.</p>}*/}
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