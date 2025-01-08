import styles from "./PostCardInProfile.module.scss";
import {PostCardInProfileProps} from "../../utils/Entitys.ts";


export const PostCardInProfile = ({post, onClick}: PostCardInProfileProps) => {
    return (
        <div onClick={onClick} className={styles.post_card_in_profile} >
            <img src={post.image} alt={post.image}/>
        </div>
    );
};