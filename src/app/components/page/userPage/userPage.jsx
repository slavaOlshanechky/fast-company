import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import { validator } from "../../../utils/validator";
import {nanoid} from 'nanoid'
import TextAreaField from "../../common/form/textAreaField";
import UserCard from "../../ui/userCard";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    const handleUserEdit = () => {
        history.push(`/users/${userId}/edit`);
    };

    const validatorConfig = {
        content: {
            isRequired: {
                message: "Fill the comment"
            }
        }
    };

    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const onAdd = ({ data, userId, currentUserId }) =>{

                    const comment = {
                        ...data,
                        _id: nanoid(),
                        pageId: userId,
                        userId: currentUserId,
                        created_at: Date.now()
                    };
                    return comment
                    // dispatch(commentCreateRequested());
                    // try {
                    //     const { content } = await commentService.createComment(comment);
                    //     dispatch(commentCreated(content));
                    // } catch (error) {
                    //     dispatch(commentCreateFailed(error.message));
                    // }

    };
    const clearForm = () => {
        setData({});
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onAdd(data);
        clearForm();
    };

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="container">
            <div className="row gutters-sm">
                {/* left column */}
                <div className="col-md-4 mb-3">
                    <UserCard user={user}/>
                    <QualitiesCard qualities={user.qualities}/>
                    <MeetingsCard value={user.completedMeetings}/>

                    {/* <div className="card mb-3"> */}
                    {/*     <div className="card-body d-flex flex-column justify-content-center text-center"> */}
                    {/*         <h5 className="card-title"> */}
                    {/*             <span>Qualities</span> */}
                    {/*         </h5> */}
                    {/*         <p className="card-text"> */}
                    {/*             <Qualities qualities={user.qualities}/> */}
                    {/*         </p> */}
                    {/*     </div> */}
                    {/* </div> */}
                    {/* <div className="card mb-3"> */}
                    {/*     <div className="card-body d-flex flex-column justify-content-center text-center"> */}
                    {/*         <h5 className="card-title"> */}
                    {/*             <span>Completed meetings</span> */}
                    {/*         </h5> */}

                    {/*         <h1 className="display-1">{user.completedMeetings}</h1> */}
                    {/*     </div> */}
                    </div>
                </div>

                {/* right column */}
                <div className="col-md-8">
                    <Commments userId={user._id}/>
                {/*     <div className="card mb-2"> */}
                {/*         {" "} */}
                {/*         <div className="card-body "> */}
                {/*             /!* //add comment *!/ */}
                {/*             <h2>New comment</h2>                            */}
                {/*             <form onSubmit={handleSubmit}></form>                            */}
                {/*             <div className="d-flex justify-content-end" onClick={handleSubmit}> */}
                {/*                 <button className="btn btn-primary">Опубликовать</button> */}
                {/*             </div> */}
                {/*         </div> */}
                {/*     </div> */}
                {/*     <div className="card mb-3"> */}
                {/*         <div className="card-body "> */}
                {/*             <h2>Comments</h2> */}
                {/*             <hr/> */}
                {/*             <div className="bg-light card-body  mb-3"> */}
                {/*                 <div className="row"> */}
                {/*                     <div className="col"> */}
                {/*                         <div className="d-flex flex-start "> */}
                {/*                             <img */}
                {/*                                 src="https://avatars.dicebear.com/api/avataaars/qweqwdas.svg" */}
                {/*                                 className="rounded-circle shadow-1-strong me-3" */}
                {/*                                 alt="avatar" */}
                {/*                                 width="65" */}
                {/*                                 height="65" */}
                {/*                             /> */}
                {/*                             <div className="flex-grow-1 flex-shrink-1"> */}
                {/*                                 <div className="mb-4"> */}
                {/*                                     <div className="d-flex justify-content-between align-items-center"> */}
                {/*                                         <p className="mb-1 "> */}
                {/*                                             /!* //User Name *!/ */}
                {/*                                             <span className="small"> */}
		        {/*                          /!* //Published Time *!/ */}
                {/*                                             </span> */}
                {/*                                         </p> */}
                {/*                                         <button */}
                {/*                                             className="btn btn-sm text-primary d-flex align-items-center"> */}
                {/*                                             <i className="bi bi-x-lg"></i> */}
                {/*                                         </button> */}
                {/*                                     </div> */}
                {/*                                     <p className="small mb-0">//Comment content</p> */}
                {/*                                 </div> */}
                {/*                             </div> */}
                {/*                         </div> */}
                {/*                     </div> */}
                {/*                 </div> */}
                {/*             </div> */}
                {/*         </div> */}
                {/*     </div> */}
                {/* </div> */}
            </div>
        </div>

    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
