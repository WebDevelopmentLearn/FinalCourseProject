import {Link} from "react-router-dom";

import styles from "./PostCardInProfile.module.scss";

type PostCardInProfileProps = {
    post: {
        postId: number;
        image: string;
    },
    onClick?: () => void;
}


export const PostCardInProfile = ({post, onClick}: PostCardInProfileProps) => {
    return (
        <div onClick={onClick} className={styles.post_card_in_profile} >
            <img src={post.image} alt={post.image}/>
        </div>
    );
};