import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import styles from "./Profile.module.scss";
import {PostCardInProfile, ProfileHeader} from "../../components";

import {getUserById} from "../../store/api/userActionCreators.ts";
import {IPost, IUser} from "../../utils/types.ts";
import {SkeletonProfile} from "../../components/skeletons/SkeletonProfile/SkeletonProfile.tsx";
import {getAllPostsByUser} from "../../store/api/postsActionCreators.ts";
import {useAppDispatch, useAppSelector} from "../../utils/CustomHooks.ts";


export const Profile = () => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const user = useAppSelector(state => state.userReducer.user); // Текущий пользователь
    const posts = useAppSelector(state => state.postReducer.postsByUser);
    const dispatch = useAppDispatch();
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
        };
        fetchUserData();
    }, [_id]);

    // Загрузка постов пользователя
    useEffect(() => {
        if (_id) {
            dispatch(getAllPostsByUser({userId: _id}));
        }
    }, [_id, dispatch]);

    if (!currentUser || !user) return <SkeletonProfile />;

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