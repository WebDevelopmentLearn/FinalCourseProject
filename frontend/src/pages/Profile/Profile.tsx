import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useParams} from "react-router-dom";

import styles from "./Profile.module.scss";
import {PostCardInProfile, ProfileHeader} from "../../components";
import {AppDispatch, RootState} from "../../store/ichgramStore.ts";
import {getAllPostsByUser, getUserById} from "../../store/api/actionCreators.ts";
import {IPost, IUser} from "../../utils/Entitys.ts";

export const Profile = () => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const user = useSelector((state: RootState) => state.userReducer.user); // Текущий пользователь
    const posts = useSelector((state: RootState) => state.postReducer.postsByUser);
    const dispatch = useDispatch<AppDispatch>();
    const {_id} = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!_id) return;

            if (_id === user?._id) {
                setCurrentUser(user);
            } else {
                const result = await dispatch(getUserById({userId: _id}));
                if (getUserById.fulfilled.match(result)) {
                    setCurrentUser(result.payload);
                }
            }


            // if (_id === user?._id) {
            //     // Если это личный профиль, то мы уже имеем все данные в Redux
            // } else {
            //     const result = await dispatch(getUserById({userId: _id}));
            //     // Если профиль другого пользователя, данные уже в Redux
            // }
        };
        fetchUserData();
    }, [_id]);

    // Загрузка постов пользователя
    useEffect(() => {
        if (_id) {
            dispatch(getAllPostsByUser({userId: _id}));
        }
    }, [_id, dispatch]);

    return (
        <div className={styles.profile}>
            <ProfileHeader user={currentUser} />

            <div className={styles.profile_posts}>
                {posts.length ? (
                    posts.map((post: IPost) => <PostCardInProfile key={post._id} post={post} />)
                ) : (
                    <h1>No posts</h1>
                )}
            </div>
        </div>
    );
};