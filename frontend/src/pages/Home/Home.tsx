import {PostCard} from "../../components";
import styles from "./Home.module.scss";

import check from "../../assets/home/check_in_circle.svg";
import LazyLoad from "react-lazyload";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/ichgramStore.ts";
import {useEffect, useState} from "react";
import {IUser} from "../../utils/Entitys.ts";
import {getUser} from "../../store/api/actionCreators.ts";
import {RootState} from "@reduxjs/toolkit/query";

export const Home = () => {
    const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // const [userData, setUserData] = useState<IUser>({
    //     _id: "",
    //     avatar: "",
    //     bio: "",
    //     email: "",
    //     followers: [],
    //     following: [],
    //     full_name: "",
    //     notifications: [],
    //     password: "",
    //     posts: [],
    //     username: "",
    //     website: ""
    // });



    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dispatch(getUser());
                if (getUser.fulfilled.match(result)) {
                    console.log("getUser.fulfilled");
                }
            } catch (error) {
                console.log("getUser.rejected");
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className={styles.home}>
                <div className={styles.home_posts__list}>
                    {posts.map((_el, index) => (
                        <LazyLoad key={index} height={200} offset={100}>
                            <PostCard/>
                        </LazyLoad>
                    ))}

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