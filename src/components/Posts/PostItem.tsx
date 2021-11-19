import React from 'react';
import style from "../../styles/PostItem.module.scss";
import {PostItemType} from "./Posts";
import {Button} from "../UI/Button/Button";

interface PropsType extends PostItemType {
    deletePost: (postId: number) => void
}

export const PostItem = (props: PropsType) => {

    const {id, title, description, deletePost} = props

    const buttonHandler = () => {
        deletePost(id)
    }

    return (
        <div className={style.post}>
            <div className={style.postContent}>
                <h4>{id}. {title}</h4>
                <div>
                    {description}
                </div>
            </div>
            <div className={style.btns}>
                {/*<button onClick={buttonHandler}>Delete</button>*/}
                <Button handler={buttonHandler} className={style.button}>Delete</Button>
            </div>
        </div>
    )
};

