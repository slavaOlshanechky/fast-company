import React, { useEffect } from "react";
import { orderBy } from "lodash";
import CommentList from "../common/comments/commentList";
import { AddCommentForm } from "../common/comments";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const isLoading = useSelector(getCommentsLoadingStatus());

    const comments = useSelector(getComments());

    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    const handleSubmit = (data) => {
        dispatch(createComment({
            ...data,
            pageId: userId
        }));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onAdd={handleSubmit}/>
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr/>
                        {!isLoading ? (
                            <CommentList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : ("Loading...")
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;