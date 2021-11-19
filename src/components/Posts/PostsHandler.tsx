import React, {ChangeEvent, useState} from 'react';
import style from "../../styles/PostsHandler.module.scss";
import {Button} from "../UI/Button/Button";
import {Input} from "../UI/Input/Input";

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
        <Input value={title} handler={titleHandler} className={style.input}/>
        <Input value={description} handler={descriptionHandler} className={style.input}/>
        <Button handler={buttonHandler} className={style.button}>Add</Button>
    </div>

};
