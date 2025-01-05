import {Link} from "react-router-dom";

export const PostCardInProfile = ({post}) => {
    return (
        <Link to={`${post.postId}`} >
            <img src={post.image} alt={post.image}/>
        </Link>
    );
};