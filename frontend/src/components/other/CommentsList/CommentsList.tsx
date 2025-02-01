
import {ICommentCard} from "../../../utils/types.ts";
import {Loader} from "../Loader/Loader.tsx";
import {CommentCard} from "../../cards/CommentCard/CommentCard.tsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/ichgramStore.ts";
import {getCommentsByPostId} from "../../../store/api/commentsActionCreators.ts";


interface CommentsListProps {
    postID: string;
}

export const CommentsList = ({postID}: CommentsListProps) => {
    const {currentPostComments: commentsList} = useSelector((state: RootState) => state.postReducer) || [];
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchPosts = async () => {
            if (postID) {
                try {
                    const result = await dispatch(getCommentsByPostId(postID)).unwrap();
                    console.log("Current comments by post: ", result);
                } catch (error) {
                    console.error("Failed to get comments for current post: ", error)
                }
            }
        }

        fetchPosts();
    }, [postID]);

    if (!commentsList) return <Loader />;

    return (
        <div>
            {commentsList && commentsList.length > 0 ? commentsList.map((comment: ICommentCard) => (
                <CommentCard key={comment._id} author={comment.author} content={comment.content}
                             createdAt={comment.createdAt} likes={comment.likes}/>

            )) : <h2 style={{textAlign: "center"}}>No comments</h2>}
        </div>
    );
};