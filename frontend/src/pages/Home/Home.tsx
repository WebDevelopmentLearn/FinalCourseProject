import {PostCard} from "../../components";
import styles from "./Home.module.scss";

import check from "../../assets/home/check_in_circle.svg";
import LazyLoad from "react-lazyload";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/ichgramStore.ts";
import {useEffect} from "react";
import {getAllPosts} from "../../store/api/actionCreators.ts";
import {posts} from "../../store/selectors.ts";
import {IPost} from "../../utils/Entitys.ts";


export const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const postsArr: IPost[] = useSelector(posts);

    useEffect(() => {
        const fetchData = async () => {
            try {
               const result = await dispatch(getAllPosts());
                if (getAllPosts.fulfilled.match(result)) {
                    console.log("getAllPosts.fulfilled");
                }
            } catch (error) {
                console.log("getUser.rejected");
            }
        }
        fetchData();
    }, [dispatch]);

    console.log("Posts: ", postsArr);

    return (
        <div>
            <div className={styles.home}>
                <div className={styles.home_posts__list}>
                    {(postsArr && postsArr.length > 0) ? postsArr.map((post: IPost, index) => (
                        <LazyLoad key={index} height={200} offset={100}>
                            <PostCard post={post}/>
                        </LazyLoad>
                    )) : <h1>No posts</h1>}

                </div>
                <div className={styles.home_end}>
                    <img src={check} alt="check"/>
                    <h2>You've seen all the updates</h2>
                    <h3>You have viewed all new publications</h3>
                </div>
            </div>
        </div>
    );
};