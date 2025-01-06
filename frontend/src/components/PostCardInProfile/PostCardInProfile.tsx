import {Link} from "react-router-dom";

import styles from "./PostCardInProfile.module.scss";

export const PostCardInProfile = ({post}) => {
    return (
        <Link to={`${post.postId}`} className={styles.post_card_in_profile} >
            <img src={post.image} alt={post.image}/>
        </Link>
    );
};