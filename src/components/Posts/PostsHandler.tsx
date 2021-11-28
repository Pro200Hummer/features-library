import React, {ChangeEvent, useState} from 'react';
import style from "../../styles/PostsHandler.module.scss";
import {Button} from "../UI/Button/Button";
import {Input} from "../UI/Input/Input";

interface PropsType {
    addPost: (params: { title: string, body: string }) => void
}

interface Post {
    title: string
    body: string
}

export const PostsHandler = React.memo((props: PropsType) => {
    const {addPost} = props

    const [post, setPost] = useState<Post>({title: '', body: ''})

    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPost({...post, title: e.currentTarget.value})
    }

    const descriptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPost({...post, body: e.currentTarget.value})
    }

    const buttonHandler = () => {
        addPost({...post})
        setPost({title: '', body: ''})
    }


    return <div className={style.container}>
        <Input
            type={'text'}
            value={post.title}
            placeholder={'Enter the title'}
            className={style.input}
            handler={titleHandler}
        />
        <Input
            type={'text'}
            value={post.body}
            placeholder={'Enter the post description'}
            className={style.input}
            handler={descriptionHandler}
        />
        <Button handler={buttonHandler} className={style.button}>Add</Button>
    </div>

});
