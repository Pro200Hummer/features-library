import React, {ChangeEvent, useState} from 'react';
import style from "../../styles/PostsHandler.module.scss";

interface PropsType {
    addPost: (title: string, description: string) => void
}

export const PostsHandler = (props: PropsType) => {
    const {addPost} = props

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const descriptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.currentTarget.value)
    };
    const buttonHandler = () => {
        addPost(title, description)
        setTitle('')
        setDescription('')
    }


    return <div className={style.container}>
        <input type="text" placeholder={'Enter the title'} value={title} onChange={titleHandler}/>
        <input type="text" placeholder={'Enter a description'} value={description} onChange={descriptionHandler}/>
        <button onClick={buttonHandler}>Add</button>
    </div>

};
