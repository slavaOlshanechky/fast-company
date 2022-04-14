import React from "react";
import { orderBy } from "lodash";
import CommentList from "../common/comments/commentList";
import { useComments } from "../../hooks/useComments";
import { AddCommentForm } from "../common/comments";

const Comments = () => {
    const {
        createComment,
        comments,
        removeComment
    } = useComments();

    //Where from id ?
    const handleRemoveComment = async (id) => {
        removeComment(id);
    };
    const handleSubmit = async (data) => {
        createComment(data);
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onAdd={handleSubmit}/>
                </div>
            </div>
            {comments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr/>
                        <CommentList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;