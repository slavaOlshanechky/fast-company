import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentList from "../common/comments/commentList";
import { useParams } from "react-router-dom";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    }, []);

    const handleRemoveComment = async (id) => {
        try {
            await api.comments.remove(id);
            setComments((prevState) =>
                prevState.filter((comment) => comment._id !== id));
        } catch (error) {
            console.log(error);
        }
    };
    const handleAddComment = async (data) => {
        try {
            await api.comments
                .add({
                    ...data,
                    pageId: userId
                })
                .then((data) => setComments([...comments, data]));
        } catch (error) {
            console.log(error);
        }
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm pageId={userId} onAdd={handleAddComment}/>
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

Comments.propTypes = {
    userId: PropTypes.string
};

export default Comments;