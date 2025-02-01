
import {ICommentCard} from "../../../utils/types.ts";
import {Loader} from "../Loader/Loader.tsx";
import {CommentCard} from "../../cards/CommentCard/CommentCard.tsx";
import {useEffect} from "react";
import {getCommentsByPostId} from "../../../store/api/commentsActionCreators.ts";
import {useAppDispatch, useAppSelector} from "../../../utils/CustomHooks.ts";


interface CommentsListProps {
    postID: string;
}

export const CommentsList = ({postID}: CommentsListProps) => {
    const {currentPostComments: commentsList} = useAppSelector(state => state.postReducer) || [];
    const dispatch = useAppDispatch();

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