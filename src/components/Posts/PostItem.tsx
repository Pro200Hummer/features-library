import React from 'react';
import style from "../../styles/PostItem.module.scss";
import {PostItemType} from "./Posts";

interface PropsType extends PostItemType {
    deletePost: (postId: number) => void
}

export const PostItem = (props: PropsType) => {

    const {id, title, description, deletePost} = props

    return (
        <div className={style.post}>
            <div className={style.postContent}>
                <h4>{id}. {title}</h4>
                <div>
                    {description}
                </div>
            </div>
            <div className={style.btns}>
                <button onClick={() => deletePost(id)}>Delete</button>
            </div>
        </div>
    )
};

